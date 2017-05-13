import React, { Component, PropTypes } from "react";
import { Alert } from "antd";

export default class Restricted extends Component {
	render() {
		return <Alert className="error-message" message="Restricted" description="Enough permissions!" type="error" showIcon />
	}
}