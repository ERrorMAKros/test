import React, { Component, PropTypes } from "react";
import Menu from "./menu/Menu";

export default class Application extends Component {
	render() {
		return (
			<div className="application">
				<Menu/>
				{ this.props.children }
			</div>
		);
	}
}