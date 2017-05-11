import React, { Component } from "react";
import { connect } from "react-redux";

@connect( ( model ) => model )

export default class Application extends Component {
	
	render = () => <div id="application">[ APPLICATION ]</div>
	
}