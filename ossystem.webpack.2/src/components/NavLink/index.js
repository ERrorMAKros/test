import React, { Component, PropTypes } from "react";
import { Route, Link } from "react-router-dom";
import ClassNames from "classnames";

export default class NavLink extends Component {
	static propTypes = {
		to: PropTypes.string.isRequired,
		label: PropTypes.string.isRequired,
		styles: PropTypes.object.isRequired,
	}
	render() {
		const { to, label, styles } = this.props ;
		const children = this.getChildren({ to, label, styles }) ;
		const attrs = { to, children } ;
		
		return <Route exact { ...attrs }/>
	}
	getChildren = ({ to, label, styles }) => {
		return ({ location: { pathname } }) => {
			const isSelected = Boolean( pathname.indexOf( to ) + 1 );
			const className = ClassNames( styles.navLink, isSelected ? styles.selected : false ) ;
			const attrs = { to, className } ;
			
			return <Link { ...attrs }>{ label }</Link>
		}
	}
}