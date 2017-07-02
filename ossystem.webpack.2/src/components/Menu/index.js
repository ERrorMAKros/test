import React, { Component } from "react";
import NavLink from "../NavLink";
import { Debug } from "../../utils/Common" ;
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { menuItemChanged } from "../../redux/actions/MenuActions" ;
import Styles from "./style.scss";
import _ from "lodash" ;

const $__NAVIGATION_MENU_ITEMS = {
	Home: "/home" ,
	About: "/about" ,
	SignIn: "/signin" ,
	All: "/all"
}

@connect(
	null ,
	( dispatch ) => ( bindActionCreators( { menuItemChanged }, dispatch ) )
)
export default class Menu extends Component {
	render() {
		const items = this.renderMenuItems() ;
		return (
			<ul className={ Styles.navigator }>
				{ items }
			</ul>
		) ;
	}
	
	renderMenuItems = () => {
		const items = ( path, key ) => {
			return (
				<li key={ _.uniqueId( "MenuItem_" ) } data-path={ path } onClick={ this.onItemClick }>
					<NavLink to={ path } label={ key } styles={ Styles } />
				</li>
			)
		} ;
		
		return _.map( $__NAVIGATION_MENU_ITEMS, items ) ;
	}
	
	onItemClick = ( event ) => {
		
		const { menuItemChanged } = this.props ;
		const { currentTarget } = event ;
		const { dataset } = currentTarget ;
		const { path } = dataset ;
		
		menuItemChanged( path ) ;
	}
}