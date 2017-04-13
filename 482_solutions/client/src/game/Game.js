import React, { Component , PropTypes } from 'react';
import { notification, Icon } from 'antd';
import Connection, { Processor } from '../net/service/Connection' ;
import Level from '../game/level/Level' ;
import _ from 'lodash' ;

export default class Game extends Component {
	
	static propTypes = {
		user: PropTypes.object.isRequired
	}

	constructor( props = {} ) {
		super( props ) ;
	
		this.state = {
			isConnected: false ,
			isGameStarted: false ,
			isGameFinished: false ,
			remoteTimer: null ,
			users: {}
		}
		this._connection = new Connection( props.user , {
			onConnect: this.onConnect ,
			onDisconnect: this.onDisconnect ,
			onData: this.onData ,
			onError: this.onError
		} ) ;
	}
	render() {
		return ! this.state.isConnected
		?   <div><Icon type="loading" />&nbsp;CONNECTING TO SERVER...</div>
		:   <Level user={ this.props.user } players={ this.state.users }>
			{   this.state.isGameStarted
				?   <div className="remote-timer">{ this.state.remoteTimer }</div>
				:   <div>{
						this.state.isGameFinished ? <div className="game-finished">THE END</div> : <div className="waiting-for-players"><Icon type="loading" />&nbsp;WAITING FOR PLAYERS...</div>
					}</div>
			}
			</Level>
	}
	
	onConnect = ( event ) => {
		this.setState( { isConnected: true } ) ;
		this._connection.handshake() ;
	}
	onDisconnect = ( event ) => {
		notification[ "warning" ] ( { message: "Connection lost", description: event.reason || "Unknown reason ;("} );
		this.setState( { isConnected: false } ) ;
	}
	onData = ( event ) => {

		const data = JSON.parse( event.data ) ;
		switch( data.type )
		{
			case Processor.onGetPlayers: {
				this.setState( { users: data.players } ) ;
				break ;
			}
			case Processor.onEnterUser: {
				let users = _.clone( this.state.users );
				users[ data.user.googleId ] = data.user ;
				this.setState( { users: users } ) ;
				break ;
			}
			case Processor.onAwayUser: {
				let users = _.clone( this.state.users );
				delete users[ data.uid ] ;
				this.setState( { users: users } ) ;
				break ;
			}
			case Processor.onStart:  {
				this.setState({ isGameStarted: true, isGameFinished: false ,remoteTimer: "--:--" }) ;
				break ;
			}
			case Processor.onTimer: {
				this.setState({ remoteTimer: data.counter }) ;
				break ;
			}
			case Processor.onEnd: {
				this.setState({ isGameStarted: false, isGameFinished: true, remoteTimer: null }) ;
				break ;
			}

			default: {
				console.error( "Game([ ? ]) onData([ " + data.type  + " ])" , data) ;
			}
		}
	}
	onError = ( event ) => {
		console.error( "Game() onError([ event ])", event ) ;
		
		notification[ "error" ] ( { message: "Connection failed!", description: "Error while connecting" } );
		this.setState( { isConnected: false } ) ;
	}

}