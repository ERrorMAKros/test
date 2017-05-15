import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { initProfile } from "../../../model/actions/Profile";
import { initCatalog } from "../../../model/actions/Catalog";
import { bindActionCreators } from "redux";
import { ROLE_USER, ROLE_ADMIN } from "../../../controller/authentication/Roles" ;
import Application from "../bootstrap/application/Application";

@connect(
	( store ) => {
		return {
			Profile: store.Profile
		}
	} ,
	( dispatch ) => ( bindActionCreators( { initProfile, initCatalog }, dispatch ) )
)
export default class Bootstrap extends Component {
	static defaultProps = {
		user: {
			id: 1,
			name: "OSSYSTEM",
			role: ROLE_ADMIN // ROLE_ADMIN or ROLE_USER
		}
	}
	static propTypes = {
		user: PropTypes.shape({
			id: PropTypes.number ,
			name: PropTypes.string ,
			role: PropTypes.string
		})
	}
	componentWillMount() {
		this.props.initProfile( this.props.user );
		this.props.initCatalog();
	}
	render() {
		return <Application>{ this.props.children }</Application> ;
	}
}