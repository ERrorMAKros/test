import React from 'react';
import { SERV } from "../../environment/Config" ;

export const Processor = {
	onHandshake: "handshake" ,
	onGetPlayers: "players" ,
	onEnterUser: "enter" ,
	onAwayUser: "away" ,
	onStart: "start" ,
	onTimer: "timer" ,
	onEnd: "end"
}
export default class Connection {

	constructor( user, { onConnect , onDisconnect , onData , onError } ) {
		

		this._user = user ;
		
		this._socket = new WebSocket( SERV + "/" + user.googleId ) ;
		this._socket.onopen = onConnect ;
		this._socket.onclose = onDisconnect ;
		this._socket.onmessage = onData ;
		this._socket.onerror = onError ;
	}
	send( data ) {
		this._socket.send( JSON.stringify( data ) ) ;
	}
	handshake() {
		const info = {
			type: Processor.onHandshake ,
			user: this._user
		}
		this.send( info ) ;
	}

}