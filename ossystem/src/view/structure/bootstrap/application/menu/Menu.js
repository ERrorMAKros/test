import React, { Component, PropTypes } from "react";
import { Link } from "react-router";
import { Menu } from "antd";
import { connect } from "react-redux";

@connect(
	( store ) => {
		return {
			Profile: store.Profile
		}
	}
)
export default class AppMenu extends Component {
	render() {
		const { name, role } = this.props.Profile ;
		return (
			<Menu mode="horizontal">
				<Menu.Item className="app-user" disabled={true} key="user">
					{name}
					<span className="role">{role}</span>
				</Menu.Item>
				<Menu.Item key="a">
					<Link to='/a'>a</Link>
				</Menu.Item>
				<Menu.Item key="catalog">
					<Link to='/catalog'>catalog</Link>
				</Menu.Item>
				<Menu.Item key="add">
					<Link to='/add'>add</Link>
				</Menu.Item>
			</Menu>
		);
	}
}