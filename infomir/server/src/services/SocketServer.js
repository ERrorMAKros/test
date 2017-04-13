import WebSocketServer from "nodejs-websocket";
import Environments from "./../Environments";

export const SOCKET_HANDSHAKE = "HANDSHAKE" ;
export const SOCKET_HANDSHAKE_ECHO = "HANDSHAKE_ECHO" ;
export const SOCKET_DATA_UPDATE = "SOCKET_DATA_UPDATE" ;

export default class SocketServer {
	
	constructor( callback ) {
		this.callback = callback ;
		return this.init() ;
	}
	init = () => {
		this.instance = WebSocketServer.createServer( this.onConnect ).listen( Environments.ports.socket );
		return this ;
	}
	broadcast = ( session_id , data ) => {
		this.instance.connections.forEach(
			(connection) => {
				if( connection.session_id == session_id ) connection.sendText( JSON.stringify( data ) )
			}
		) ;
	}
	
	onConnect = ( connection ) => {
		const session_id = connection.path.split( '/' ).pop();
		
		connection.session_id = session_id ;
		connection.on( "text", this.onSocketData.bind( { connection, callback: this.callback } ) );
		connection.on( "close", this.onSocketClose );
		connection.on( "error", this.onSocketError );
	}
	onSocketClose =( code, reason )=> {
		console.warn( "[ close ]" , code , reason ) ;
	}
	onSocketData( json ) {
		const data = JSON.parse( json );
		this.callback( data , this.connection ) ;
	}
	onSocketError =( error )=> {
		console.error( "[ error ]" , error ) ;
	}
}