import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { removeAllCatalogItems } from "../../../../../model/actions/Catalog";
import { Row, Col } from 'antd';
import RemoveButton from "../catalog/buttons/RemoveButton" ;

@connect(
	( store ) => {
		return {
			Catalog: store.Catalog
		}
	} ,
	( dispatch ) => ( bindActionCreators( { removeAllCatalogItems }, dispatch ) )
)
export default class Info extends Component {
	render() {
		const { itemsAmount, priceSum, priceAverage } = this.props.Catalog ;
		return (
			<Row className="info">
				<Col span={6}>{ `Кол-во товаров: ${itemsAmount}` }</Col>
				<Col span={6}>{ `Сумма цен: ${priceSum}` }</Col>
				<Col span={6}>{ `Средняя цена: ${priceAverage}` }</Col>
				<Col span={6}>
					<RemoveButton className="info-remove-all" title="УДАЛИТЬ ВСЕ" onClick={ this.onRemoveAllHandler }/>
				</Col>
			</Row>
		)
	}
	onRemoveAllHandler = () => {
		this.props.removeAllCatalogItems() ;
	}
}
