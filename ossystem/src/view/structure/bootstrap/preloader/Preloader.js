import React, { Component, PropTypes } from "react";
import { Spin } from "antd";

export default class Preloader extends Component {
	render() {
		return <div className="bootstrap"><Spin className="preloader" spinning={true} tip="loading" /></div>
	}
}