import React, { Component, PropTypes } from "react";
import { Alert } from "antd";

export default class NotFound extends Component {
	render() {
		return <Alert className="error-message" message="404" description="Page not found!" type="error" showIcon />
	}
}