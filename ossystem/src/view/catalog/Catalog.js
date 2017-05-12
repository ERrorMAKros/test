import React, { Component, PropTypes } from "react";

export default class Catalog extends Component {
	constructor() {
		super( ...arguments ) ;
		/* debug */ console.info( "Catalog()" , this ) ;
	}
	render = () => <div>[ catalog ]</div> ;
}