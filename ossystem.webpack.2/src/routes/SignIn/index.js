import React, { Component } from 'react';
import Chunk from 'components/Chunk';

const loadSignInContainer = () => import( '../../containers/SignIn' ) ;

class SignIn extends Component {
	render() {
		return <Chunk load={ loadSignInContainer } />;
	}
}

export default SignIn;
