import React from 'react';

export const SOCKET_HANDSHAKE = "HANDSHAKE" ;
export const SOCKET_HANDSHAKE_ECHO = "HANDSHAKE_ECHO" ;
export const SOCKET_DATA_UPDATE = "SOCKET_DATA_UPDATE" ;

export default class SocketClient {
	
	constructor( host , session_id , { onConnect , onDisconnect , onData , onError } ) {
		
		this.id = session_id ;
		
		this._socket = new WebSocket( [ host , session_id ].join( "/" ) ) ;
		this._socket.onopen = onConnect ;
		this._socket.onclose = onDisconnect ;
		this._socket.onmessage = onData ;
		this._socket.onerror = onError ;
	}
	send( data ) {
		return this._socket.send( JSON.stringify( data ) ) ;
	}
	handshake() {
		return this.send({ type: SOCKET_HANDSHAKE }) ;
		
	}
	
}