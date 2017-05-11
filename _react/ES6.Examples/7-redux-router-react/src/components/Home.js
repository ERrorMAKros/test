import React, { Component } from "react";
import { connect } from "react-redux";

@connect( ( model ) => model )

export default class Home extends Component {
	
	render = () => <div id="home">[ HOME ] { `${ this.props.location.pathname }` }</div>
	
}