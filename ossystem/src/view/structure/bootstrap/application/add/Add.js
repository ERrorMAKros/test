import React, { Component, PropTypes } from "react";
import { bindActionCreators } from "redux";
import { Icon, Modal, Button } from 'antd';
import { connect } from "react-redux";
import { addICatalogItems } from "../../../../../model/actions/Catalog";
import Form from "./form/Form" ;
import Item from "../catalog/item/Item" ;
import _ from "lodash" ;

@connect(
	null ,
	( dispatch ) => ( bindActionCreators( { addICatalogItems }, dispatch ) )
)
export default class Add extends Component {
	state = {
		items: [],
		visible: false
	}
	render() {
		const items = _.map( this.state.items, (data) => <Item data={data}/> ) ;
		return (
			<div className="add">
				<Modal className="form-modal" title="Добавление товара" onCancel={this.onModalTrigger} footer={null} visible={this.state.visible}>
					<Form onSubmit={this.onSubmitHandler}/>
				</Modal>
				<span className="wrapper new-item">
					<Button onClick={this.onModalTrigger}>
						<Icon type="plus-square" />
					</Button>
				</span>
				{items}
			</div>
		)
	}
	onModalTrigger = () => {
		/* debug */ console.log( "Add() onModalTrigger([ visible ])" , this.state.visible ) ;
		const { visible } = this.state ;
		this.setState({ visible: !visible });
	}
	onSubmitHandler = ( data ) => {
		/* debug */ console.log( "Add() onSubmitHandler([ data ])" , data ) ;
		const { items } = this.state ;
		items.unshift( data ) ;
		this.setState({ items }) ;
	}
	
	componentWillUnmount() {
		/* debug */ console.warn('Add() componentWillUnmount([ items ])' , this.state.items );
		const visible = false ;
		this.setState({ visible });
		
		const { items } = this.state ;
		this.props.addICatalogItems(items) ;
	}
}