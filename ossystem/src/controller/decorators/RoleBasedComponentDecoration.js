import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import Restricted from "../../view/structure/error/Restricted";

const RoleBasedComponentDecoration = ( ComponentClass, allowed = [] ) => {

	class Proxy extends Component {
		render() {
			const { role } = this.props.Profile ;
			const isAllowed = Boolean( _.indexOf( allowed, role ) + 1 ) ;
			return isAllowed ? <ComponentClass {...this.props} /> : <Restricted/> ;
		}
	}
	const mapStateToProps = (store) => {
		return {
			Profile: store.Profile
		} ;
	}
	return connect(mapStateToProps)(Proxy)
}



export default RoleBasedComponentDecoration ;