import React, { Component, PropTypes } from "react";

export default class Layout extends Component {
	constructor() {
		super( ...arguments ) ;
		/* debug */ console.info( "Layout()" , this ) ;
	}
	render = () => <div>[ layout ]</div>
}
