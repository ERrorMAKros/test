import React, { Component } from "react";
import "../../styles/view/application.less";
import Uploader from "../view/uploader/Uploader";
import Connect from "../view/connect/Connect";
import { connect } from "react-redux";
import _ from "lodash";

@connect( ( model ) => { return { Connect: model.Connect } } )

export default class Application extends Component {
	
	render = () => <div className="application-ui">{ _.isNull( this.props.Connect.session_id ) ? <Connect/> : <Uploader/> }</div>
	
}