import React, { Component , PropTypes } from 'react';
import OAuth from 'react-google-login' ;
import {API_KEY} from '../../environment/Config';

export default class GoogleAuth extends Component {
	
	static propTypes = {
		onSuccess: PropTypes.func ,
		onFailure: PropTypes.func
	}
	
	constructor( props = {} ) {
		super( props ) ;
	}
	render() {
		return <OAuth clientId={ API_KEY } buttonText="ENTER" offline={ false } onSuccess={ this.props.onSuccess } onFailure={ this.props.onFailure }/>
	}
	
}