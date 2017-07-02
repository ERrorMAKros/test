import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./styles.scss";

@connect( ( store ) => store.Menu )
export default class Home extends Component {
	render() {
		const { path } = this.props ;
		return <div className={ styles.home }>{`home: current path is "${ path }"`}</div>;
	}
}
