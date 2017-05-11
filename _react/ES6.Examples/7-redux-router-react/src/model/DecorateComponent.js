import React from 'react'
import { connect } from 'react-redux'

const DecorateComponent = ( Component ) => {
	
	class ProxyComponent extends React.Component {
		static contextTypes = {
			router: React.PropTypes.object.isRequired
		}
		render() {
			console.error( "[middleware][#2]" , this ) ;
			const isPassed = false ;
			
			setTimeout( () => this.props.history.push('/about/5/124') , 5000 ) ;
			
			return isPassed ? <Component {...this.props} /> : <div>[ RESTRICTED! ]</div>
		}
	}
	
	const mapStateToProps = (model) => model ;
	
	return connect(mapStateToProps)(ProxyComponent)
}



export default DecorateComponent ;