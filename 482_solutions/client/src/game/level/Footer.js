import React, { Component, PropTypes } from 'react' ;
import FooterItem from './FooterItem' ;
import _ from 'lodash' ;

export default class Footer extends Component {
	
	static propTypes = {
		players: PropTypes.object.isRequired
	}
	
	constructor( props = {} ) {
		super ( props );
	}
	render() {
		const decorator = ( key, index ) => {
			const user = this.props.players[ key ] ;
			return <FooterItem key={ key } user={ user } />
		}
		const users = _.map( _.keys( this.props.players ) , decorator ) ;
		
		return <div className="footer">{ users }</div>
	}
}