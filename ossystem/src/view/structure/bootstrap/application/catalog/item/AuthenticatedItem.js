import React, { Component, PropTypes } from "react";
import Item from './Item';
import RoleBasedComponentDecoration from "../../../../../../controller/decorators/RoleBasedComponentDecoration" ;
import RemoveButton from '../buttons/RemoveButton';

export default class AuthenticatedItem extends Component {
	static propTypes = {
		data: PropTypes.shape({
			id: PropTypes.string.isRequired ,
			name: PropTypes.string.isRequired ,
			description: PropTypes.string.isRequired ,
			price: PropTypes.string.isRequired
		}).isRequired,
		authenticated: PropTypes.array.isRequired,
		onDelete: PropTypes.func
	}
	render() {
		const RemoveItemButton = this.getRemoveButton() ;
		const data = this.props.data ;
		return (
			<div className="item-authenticated">
				<RemoveItemButton/>
				<Item {...{data}}/>
			</div>
		)
	}
	getRemoveButton = () => {
		const attributes = {
			className: "btn-remove",
			title: "УДАЛИТЬ",
			onClick: this.onRemoveHandler
		}
		return RoleBasedComponentDecoration( RemoveButton, attributes, null, null, this.props.authenticated ) ;
	}
	onRemoveHandler = ( event ) => {
		const { onDelete, data } = this.props ;
		if( onDelete ) onDelete( data ) ;
	}
}