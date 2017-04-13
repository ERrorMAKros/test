import Environments from "./Environments";
import HttpServer, { SESSION_START, M3U_CONTENT, M3U_ERROR } from "./services/HttpServer";
import SocketServer, { SOCKET_DATA_UPDATE, SOCKET_HANDSHAKE, SOCKET_HANDSHAKE_ECHO } from "./services/SocketServer";
import md5 from "md5";
import _ from "lodash";
import M3UParser from "m3u-parser";
import DataSource, { PLAYLIST_UPDATE } from "./services/DataSource";
import Threads from "./payload/Threads";
import Common from "./common/Common";
import { Logger } from "./Environments";

export default class Main {
	
	constructor() {
		
		/* log */ Logger.info( "ready for connection(s)" ) ;
		
		this._dataSource = new DataSource( this.onDataSource ) ;
		this._payload = new Threads( this._dataSource, this.onThread ) ;
		this._adaptor = {
			http: new HttpServer( this.onHttpEvents ) ,
			socket: new SocketServer( this.onSocketEvents )
		} ;
	}
	onHttpEvents = ( event , content , response ) => {
		
		const finish = ( response , data ) => {
			
			response.writeHead( 200, {
				"Content-Type": 'application/json' ,
			} );
			response.end( JSON.stringify( data ) );
			
			return response ;
		} ;
		
		switch( event.type )
		{
			case M3U_ERROR: {
				return finish( response , event ) ;
			}
			case SESSION_START:{
				const data = {
					session_id: md5( (new Date()).toString() ) ,
					provider: `ws://localhost:${ Environments.ports.socket }`
				} ;
				
				/* log */ Logger.info( "initialize user connection" ) ;
				
				return finish( response , data ) ;
			}
			case M3U_CONTENT:{
				
				if( !Boolean( content.length) ) return finish( response , { type: M3U_ERROR , error: "Wrong [.m3u]" } ) ;
				
				const parse = M3UParser.parse( content ) ;
				parse.then(
					files => {
						const session_id = event.session_id ;
						const process_id = Common.uniqueId() ;
						const data = {
							type: M3U_CONTENT ,
							status: true
						} ;
						
						files = _.map( files , ( value , index ) => {
							const data = {
								id: index ,
								status: 0 ,
								progress: 0 ,
								process_id ,
								session_id ,
								error: null
							} ;

							return { ...value , ...data } ;
						} ) ;
						
						/* log */ Logger.info( "uploading playlist\n" , files ) ;
						
						this._dataSource.add( session_id , {
							...event ,
							count: files.length ,
							files ,
							process_id
						} ) ;
						
						return finish( response , data ) ;
					},
					error => finish( response , { type: M3U_ERROR , error: "Wrong [.m3u]" } )
				) ;
			}
		}
	}
	onDataSource = ( event ) => {
		switch( event.type )
		{
			case PLAYLIST_UPDATE: {
				this._payload.run( event.session_id ) ;
				return this._adaptor.socket.broadcast( event.session_id, event ) ;
			}
		}
	}
	onThread = ( event ) => {
		switch( event.type ) {
			case Threads.THREADS_CHANGES: return this._adaptor.socket.broadcast( event.file.session_id, { type: SOCKET_DATA_UPDATE, file: event.file } ) ;
		}
	}
	onSocketEvents = ( data , response ) => {
		switch( data.type ) {
			case SOCKET_HANDSHAKE: return response.sendText( JSON.stringify({ type: SOCKET_HANDSHAKE_ECHO, status: true }) );
		}
		
	}

}

