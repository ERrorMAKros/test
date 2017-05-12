import React, { Component, PropTypes } from "react";

export default class NotFound extends Component {
	constructor() {
		super( ...arguments ) ;
		/* debug */ console.info( "NotFound()" , this ) ;
	}
	render = () => <div>[ 404 ]</div> ;
}