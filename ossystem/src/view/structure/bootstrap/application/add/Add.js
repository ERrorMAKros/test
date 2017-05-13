import React, { Component, PropTypes } from "react";

export default class Add extends Component {
	
	constructor() {
		super( ...arguments ) ;
		/* debug */ console.info( "Add()" , this ) ;
	}
	render = () => <div>[ add ]</div> ;
}