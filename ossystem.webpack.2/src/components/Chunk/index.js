import React, { Component, PropTypes } from "react";
import Loading from "components/Loading";

export default class Chunk extends Component {

	static propTypes = {
		load: PropTypes.func.isRequired
	};
	state = {
		LoadedComponent: null
	};

	componentWillMount() {
		this.load( this.props );
	}
	componentWillReceiveProps( nextProps ) {
		if( nextProps.load !== this.props.load ) this.load( nextProps ) ;
	}
	render() {
		const { LoadedComponent } = this.state;
		
		return LoadedComponent ? <LoadedComponent {...this.props} /> : <Loading />;
	}
	
	load = ( props ) => {
		this.setState( {
			LoadedComponent: null,
		} );
		
		props.load().then( ( mod ) => {
			this.setState( {
				// handle both es imports and cjs
				LoadedComponent: mod.default ? mod.default : mod,
			} );
		} );
	}
} ;