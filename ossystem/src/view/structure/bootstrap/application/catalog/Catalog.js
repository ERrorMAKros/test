import React, { Component, PropTypes } from "react";
import { ROLE_ADMIN } from "../../../../../controller/authentication/Roles" ;
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getRandomId } from "../../../../../controller/helpers/Common" ;
import { removeCatalogItem } from "../../../../../model/actions/Catalog";
import AuthenticatedItem from "./item/AuthenticatedItem" ;

@connect(
	( store ) => {
		return {
			items: store.Catalog.items
		}
	},
	( dispatch ) => ( bindActionCreators( { removeCatalogItem }, dispatch ) )
)
export default class Catalog extends Component {
	render() {
		const items = _.map( this.props.items, (data) => <AuthenticatedItem key={getRandomId()} data={ data } authenticated={[ ROLE_ADMIN ]} onDelete={this.onDeleteHandler}/> ) ;
		return <div className="catalog">{items}</div> ;
	}
	onDeleteHandler = ( data ) => {
		const id = data.id;
		this.props.removeCatalogItem( id );
	}
}