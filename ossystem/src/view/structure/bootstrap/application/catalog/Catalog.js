import React, { Component, PropTypes } from "react";
import Item from "./item/Item" ;
import { connect } from "react-redux";

@connect(
	( store ) => {
		return {
			items: store.Catalog.items
		}
	}
)
export default class Catalog extends Component {
	constructor() {
		super( ...arguments ) ;
		/* debug */ console.info( "Catalog()" , this ) ;
	}
	render() {
		const items = _.map( this.props.items, (value) => <Item { ...value }/> ) ;
		return <div className="catalog">{items}</div> ;
	}
}