import React, { Component, PropTypes } from 'react' ;


export default class FooterItem extends Component {
	
	static propTypes = {
		user: PropTypes.object.isRequired
	}
	
	constructor( props = {} ) {
		super ( props );
	}
	render() {
		return (
			<div className="footer-user">
				<img className="picture" src={ this.props.user.imageUrl }/>
				<p className="name">{ this.props.user.name }</p>
				<p className="mail">{ this.props.user.email }</p>
			</div>
		)
	}
}