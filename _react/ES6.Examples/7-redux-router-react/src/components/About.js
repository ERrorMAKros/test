import React, { Component } from "react";
import { connect } from "react-redux";

@connect( ( model ) => model )

export default class About extends Component {
	
	static middleware = ( nextState, replace ) => {
		if(nextState.location.pathname == '/about/5/124') {
			console.error( "[middleware][#1]" , { nextState, replace } ) ;
			replace( nextState, "/home" )
		}
	}
	
	constructor( props = null ) {
		super( props ) ;
		
		console.log( "About", props );
	}
	render = () => <div id="about">{ `[ ABOUT ] ${JSON.stringify( this.props.dataset.menu ) }` }</div>
	
}