import React, { Component, PropTypes } from "react";
import { Layout } from 'antd';
import Menu from "./menu/Menu";
import Info from "./info/Info";

const { Header, Footer, Content } = Layout;

export default class Application extends Component {
	render() {
		return (
			<Layout className="application">
				<Header>
					<Menu/>
				</Header>
				<Content>
					{ this.props.children }
				</Content>
				<Footer>
					<Info/>
				</Footer>
			</Layout>
		) ;
	}
}