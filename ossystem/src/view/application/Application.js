import React, { Component, PropTypes } from "react";
import { Link } from "react-router";
import { connect } from "react-redux";
import "../../../styles/view/Application.less";
import { setProfile } from "../../model/actions/Profile";
import { initCatalog } from "../../model/actions/Catalog";
import { bindActionCreators } from "redux";

@connect(
	( store ) => {
		return {
			profile: store.Profile
		}
	} ,
	( dispatch ) => ( bindActionCreators( { setProfile, initCatalog }, dispatch ) )
)
export default class Application extends Component {
	constructor() {
		super( ...arguments );
		/* debug */ console.info( "Application()", this );
	}
	componentWillMount() {
		/* debug */ console.log( "Application() componentWillMount()", this );
		
		this.props.initCatalog();
		this.props.setProfile( __WEBPACK_AUTHENTICATION );
	}
	render = () => {
		return (
			<div className="application">
				<ul className="menu">
				    <li>{ `${this.props.profile.name}: ${this.props.profile.role}` }</li>
					<li><Link to='/catalog'>catalog</Link></li>
					<li><Link to='/add'>add</Link></li>
				</ul>
				{ this.props.children }
			</div>
		);
	}
}