import React, { Component } from "react";
import "../../../styles/view/connect.less";
import { Alert, Input, Button, Row, Col } from "antd";
import { SERVICE_HOST } from "../../controller/constants/Environment";
import { connect } from "react-redux";
import ConnectActions from "../../model/actions/connect";
import _ from "lodash";

@connect( ( model ) => { return { Connect: model.Connect } } )

export default class Connect extends Component {

	state = {
		isControlsDisabled: false
	}
	constructor( props ) {
		super( props ) ;
	}
	componentWillMount() {
		this._actions = new ConnectActions( this.props.dispatch ) ;
		this._urlServerAddress = SERVICE_HOST ;
	}
	renderError = () => {
		return ! _.isNull( this.props.Connect.error )
		?   <Alert
				message="Error"
				description={ JSON.stringify( this.props.Connect.error ) }
				type="error"
				showIcon
			/>
		:   null ;
	}
	render() {
		
		const isDisabled = this.state.isControlsDisabled ;
		
		return (
			<Row type="flex" justify="space-around" align="middle">
				<Col className="connect-ui" span={ 8 }>
					<Input { ...{
						className: "host",
						disabled: isDisabled ,
						placeholder: "server url" ,
						defaultValue: SERVICE_HOST ,
						onChange: this.onChange ,
						addonAfter: <Button { ... {
							disabled: isDisabled ,
							loading: isDisabled ,
							className: "button-connect" ,
							onClick: this.onClick
						}} >CONNECT</Button>
					}} />
					{ this.renderError() }
				</Col>
			</Row>
		) ;
	}
	
	onClick = () => {
		const host = this._urlServerAddress ;
		const isControlsDisabled = ! this.state.isControlsDisabled ;

		this._actions.sessionStart( host ) ;
		this.setState({ isControlsDisabled }) ;
	}
	onChange = ( event ) => {
		this._urlServerAddress = event.target.value.trim() ;
	}
}