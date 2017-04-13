import WebSocketServer from "nodejs-websocket" ;
import { PORT, PLAYERS_MAX } from  './Environment' ;
import  _ from  'lodash' ;
import Timer from './Timer' ;

const Processor = {
	onHandshake: "handshake",
	onGetPlayers: "players",
	onEnterUser: "enter",
	onAwayUser: "away",
	onStart: "start",
	onTimer: "timer",
	onEnd: "end"
}

export default class Server {
	
	constructor(){
		this._players = {};
		this._timer = new Timer( this.onTimerCounter, this.onTimerEnd );
		this._server = WebSocketServer.createServer( this.onConnect ).listen( PORT );
	}
	
	getConnectionByUID =( id )=> {
		return this._players.hasOwnProperty( id )? this._players[ id ] : null;
	}
	broadcastMessage =( data )=> {
		const callback =( connection, uid )=> {
			connection.sendText( JSON.stringify( data ));
		}
		_.forIn( this._players, callback );
	}
	expiredConnectionsGarbageCollector =()=> {
		
		let availableConnections = {};
		this._server.connections.forEach(( connection )=> {
			availableConnections[ connection._uid ] = null;
		} );
		
		let deathConnections = {};
		_.forIn( this._players,( connection, uid )=> {
			if( ! availableConnections.hasOwnProperty( uid ))deathConnections[ uid ] = null;
		} );

		_.forIn( deathConnections,( value, uid )=> {
			delete this._players[ uid ];
			this.broadcastMessage( { type: Processor.onAwayUser, uid: uid } );
		} );
	}
	getAllPlayers =()=> {
		let info = {};
		const callback =( connection, uid )=> {
			info[ connection._uid ] = connection._profile;
		}
		_.forIn( this._players, callback );
		
		return info;
	}
	getAllPlayersCount =()=> {
		return this._server.connections.length;
	}
	checkGameStart =()=> {
		if( this.getAllPlayersCount()>= PLAYERS_MAX ){
			this.broadcastMessage( { type: Processor.onStart } );
			this._timer.start();
		}
	}
	
	onTimerCounter =( counter )=> {
		this.broadcastMessage( { type: Processor.onTimer, counter: counter } )
	}
	onTimerEnd =()=> {
		this.broadcastMessage( { type: Processor.onEnd } );
	}
	onConnect =( connection )=> {
		
		this._timer.reset();
		
		const uid = connection.path.split( '/' ).pop();
		
		if( this.getConnectionByUID( uid )){
			connection.close( 405, "Already signed in!" );
		}
		
		this._players[ uid ] = connection;
		
		connection._uid = uid;
		connection.on( "text", this.onData );
		connection.on( "close", this.onClose );
		connection.on( "error", this.onError );
		
		this.checkGameStart();
		
	}
	onClose =( code, reason )=> {
		this._timer.reset();
		this.expiredConnectionsGarbageCollector();
	}
	onData =( json )=> {
		const data = JSON.parse( json );
		switch( data.type ){
			case Processor.onHandshake : {
				
				const uid = data.user.googleId;
				const connection = this.getConnectionByUID( uid );
				connection._profile = data.user;
				connection.sendText( JSON.stringify( {
					type: Processor.onGetPlayers,
					players: this.getAllPlayers()
				} ));
				
				this.broadcastMessage( { type: Processor.onEnterUser, user: data.user } );
				break;
			}
			default: {
				console.error( "Server()onData([ " + data.type + " ])", data );
			}
		}
	}
	onError =( event )=> {
		console.error( "Server()onError([ event ])", event );
		this._timer.reset();
	}
	
}
