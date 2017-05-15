import React, { Component, PropTypes } from "react";
import { Form, Input, Button } from "antd";
import { getRandomId } from "../../../../../../controller/helpers/Common";
import _ from "lodash";

const ClassDecorator = Form.create() ;

class CreateForm extends Component {
	static propTypes = {
		onSubmit: PropTypes.func.isRequired
	}
	formFieldsDecorator( id, options, element ) {
		const { getFieldDecorator } = this.props.form ;
		const decorator = getFieldDecorator( id, { rules: [ options ] } ) ;
		return decorator( element )
	}
	render() {
		const regexpPricePattern = /^\d{0,10}(\.\d{0,2}){0,1}$/ ;
		const fields = {
			name: this.formFieldsDecorator( "name", { required: true, message: 'Введите название!' }, <Input placeholder="Название"/> ) ,
			description: this.formFieldsDecorator( "description", { required: true, message: 'Введите описание!' }, <Input placeholder="Описание"/> ) ,
			price: this.formFieldsDecorator( "price", { required: true, message: 'Неверная цена!', pattern: regexpPricePattern }, <Input placeholder="Цена"/> )
		};
		const items = _.map( fields, (value) => <Form.Item>{value}</Form.Item> ) ;
		
		return (
			<Form className="form" onSubmit={ this.onSubmitHandler }>
				{ items }
				<Button className="submit" type="primary" htmlType="submit">ДОБАВИТЬ</Button>
			</Form>
		)
	}
	onSubmitHandler = ( event ) => {
		event.preventDefault();
		this.props.form.validateFields( ( error, values ) => {
			if( ! error ) this.props.onSubmit( { id: getRandomId(), ...values } ) ;
		} );
	}
}

export default ClassDecorator( CreateForm ) ;
