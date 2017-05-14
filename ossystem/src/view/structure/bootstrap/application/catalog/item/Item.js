import React, { Component, PropTypes } from "react";

export default class Item extends Component {
	static propTypes = {
		data: PropTypes.shape({
			id: PropTypes.string.isRequired ,
			name: PropTypes.string.isRequired ,
			description: PropTypes.string.isRequired ,
			price: PropTypes.string.isRequired
		}).isRequired,
	}
	render() {
		const { id, name, description, price } = this.props.data ;
		return (
			<span className="item" key={ id }>
				<ul className="wrapper">
					<li className="name">{ name }</li>
					<li className="price">{ parseFloat(price) }</li>
					<li className="description">{ description }</li>
				</ul>
			</span>
		)
	}
}