import React, { Component, PropTypes } from "react";
import Logo from "../../../../../../assets/logo.png" ;

export default class Home extends Component {
	render() {
		return (
			<div className="home">
				<span className="img-wrapper">
					<img src={Logo} />
				</span>
			</div>
		)
	}
}
