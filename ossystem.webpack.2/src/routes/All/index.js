import React, { Component } from 'react';
import Chunk from 'components/Chunk';

const loadAllContainer = () => import('../../containers/All') ;

class All extends Component {
	render() {
		return <Chunk load={loadAllContainer} />;
	}
}

export default All;
