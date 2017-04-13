import React, { Component, PropTypes } from 'react' ;
import Footer from './Footer' ;

export default class Level extends Component {
	
	static propTypes = {
		user: PropTypes.object.isRequired,
		players: PropTypes.object.isRequired
	}
	
	constructor( props = {} ) {
		super ( props );
	}
	render() {
		return (
			<div class="wrapper">
				<div className="header">{ this.props.user.name } / { this.props.user.email }</div>
				<div className="content">{ this.props.children }</div>
				<Footer players={ this.props.players } />
			</div>
		)
	}

}
