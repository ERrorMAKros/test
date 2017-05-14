import React, { Component, PropTypes } from "react";
import { ROLE_ADMIN } from "../../../../../controller/authentication/Roles" ;
import { connect } from "react-redux";
import AuthenticatedItem from "./item/AuthenticatedItem" ;

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
		const items = _.map( this.props.items, (data) => <AuthenticatedItem data={ data } authenticated={[ ROLE_ADMIN ]} onDelete={this.onDeleteHandler}/> ) ;
		return <div className="catalog">{items}</div> ;
	}
	onDeleteHandler = ( data ) => {
		/* debug */ console.log( "Catalog()", "onDeleteHandler([ data ])", data ) ;
	}
}