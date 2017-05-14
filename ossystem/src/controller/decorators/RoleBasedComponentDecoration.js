import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import _ from "lodash";

const RoleBasedComponentDecoration = ( ComponentClass, componentParams={}, ExcludedClass, excludedParams={}, authenticated = [] ) => {
	
	class Empty extends Component {
		render = () => <span/>
	}
	class Proxy extends Component {
		render() {
			const { role } = this.props.Profile ;
			const isAllowed = Boolean( _.indexOf( authenticated, role ) + 1 ) ;
			const Excluded = ExcludedClass || Empty ;
			return isAllowed
				? <ComponentClass { ...this.props } { ...componentParams } />
				: <Excluded { ...this.props } { ...excludedParams }/> ;
		}
	}

	const props = (store) => {
		return {
			Profile: store.Profile
		} ;
	}
	const decoration = connect(props) ;

	return decoration(Proxy) ;
}

export default RoleBasedComponentDecoration ;