import React, { Component, PropTypes } from "react";

export default class Item extends Component {
	static propTypes = {
		id: PropTypes.string.isRequired ,
		name: PropTypes.string.isRequired ,
		description: PropTypes.string.isRequired ,
		price: PropTypes.string.isRequired
	}
	render() {
		return (
			<ul className="item" key={ this.props.id } >
				<li className="name">{ this.props.name }</li>
				<li className="price">{ parseFloat(this.props.price) }</li>
				<li className="description">{ this.props.description }</li>
			</ul>
		)
	}
}