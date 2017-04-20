import React, { Component } from "react";
import "../../styles/view/application.less";
import { connect } from "react-redux";
import { Modal, Row, Col, Checkbox, Select, Button } from "antd";
import Lodash from "lodash";
import AppActions from "../model/actions/AppActions";

@connect( ( model ) => model )

export default class Application extends Component {

	state = {
		isSequenced: false
	};
	constructor( props = null ) {
		super( props );

		this._actions = new AppActions( this.props.dispatch );
	}
	render = () => {
		return (
			<Row className="ui-application" type="flex" justify="space-around" align="middle">
				<Col className="ui-application-content" span="4">
					<Modal visible={ this.props.app.popupOpened } footer={ <Button type="primary" onClick={ this.onPopupClose }>OKEY</Button> }>{ this.displayPopupContent() }</Modal>
					<Checkbox onChange={ this.onCheckboxChange } checked={ this.props.app.checkboxChecked }>Check all</Checkbox>
					<Select onChange={ this._actions.setSelectedValue } value={ this.displaySelectedItemName( this.props.app.selected ) }>{ this.displayPopupList() }</Select>
					<Button onClick={ this.onPopupOpen } type="primary">Open</Button>
				</Col>
			</Row>
		)
	};

	displayPopupList = () => {
		return Lodash.map(
			this.props.app.dataset,
			( item , index ) => <Select.Option key={ index } value={ String( index ) }>{ item.name }</Select.Option>
		);
	};
	displaySelectedItemName = ( index ) => {
		const { dataset } = this.props.app ;
		const item = dataset[ index ] ;

		return item.name ;
	};
	displayPopupContent = () => {
		const { dataset , selected } = this.props.app ;
		const item = dataset[ selected ] ;

		return item.name ;
	};

	onCheckboxChange = () => {
		const { checkboxChecked } = this.props.app ;

		if( checkboxChecked && this.state.isSequenced ) this.setState( { isSequenced: false } ) ;
		this._actions.setCheckboxValue( ! checkboxChecked ) ;
	};
	onPopupOpen = () => {
		
		const { checkboxChecked , selected , dataset } = this.props.app ;
		
		if( checkboxChecked == true) {
			if( ! this.state.isSequenced ) {
				this._actions.setSelectedValue( 0 ) ;
				this.setState({ isSequenced: true }) ;
			} else
				if( this.state.isSequenced ) {
					const index = selected + 1;
					if( index < dataset.length ) this._actions.setSelectedValue( index );
					else return this.setState( { isSequenced: false } );
				}
		}
		
		this._actions.setPopupVisibility( true ) ;
	};
	onPopupClose = () => {
		this._actions.setPopupVisibility( false ) ;

		const { checkboxChecked } = this.props.app ;
		if( checkboxChecked == true ) this.onPopupOpen() ;
	}

}