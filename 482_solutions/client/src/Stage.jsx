import './Stage.less';
import React, { Component } from 'react';
import GoogleAuth from "./net/auth/GoogleAuth" ;
import Game from './game/Game' ;
import { notification, LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';
import _ from 'underscore' ;

export default class Stage extends Component {
	
	constructor() {
		super ();
		
		this.state = {
			user: null
		};
	}
	render() {
		return !  _.isNull( this.state.user )
		?   <LocaleProvider locale={enUS}>
				<Game user={ this.state.user }/>
			</LocaleProvider>
		:   <div className="login">
				<GoogleAuth onSuccess={this.onSuccess} onFailure={ this.onFailure }/>
			</div>
	}
	
	onSuccess = ( response ) => {
		const { profileObj } = response;
		this.setState ( { user: profileObj } );
	}
	onFailure = ( response ) => {
		notification[ "error" ] ( { message: "Authorization Failed!", description: JSON.stringify ( response ) } );
	}
	
}