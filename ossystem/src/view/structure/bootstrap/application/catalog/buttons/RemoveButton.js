import React, { Component, PropTypes } from "react";
import { Button } from 'antd';

export default class RemoveButton extends Component {
	static defaultProps = {
		onClick: function() {}
	}
	static propTypes = {
		className: PropTypes.string,
		title: PropTypes.string,
		onClick: PropTypes.func.isRequired
	}
	render() {
		const { className, title, onClick } = this.props ;
		return <Button { ...{ className, onClick }}>{ title }</Button>
	}
}