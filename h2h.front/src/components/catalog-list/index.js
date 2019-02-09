import React, { PureComponent } from "react";
import { Debug } from "../../utils/Common";
import PropTypes from "prop-types";
import Modal from "@material-ui/core/Modal";
import Header from "./header";
import List from "./list";
import Footer from "./footer";
import Form from "./form";
import Style from "./style.scss";
import EventTypes from "./eventTypes";

export default class CatalogList extends PureComponent {
  static defaultProps = {
    fetching: false,
    data: null,
    onEvent: ( type, listItem )=> Debug.warn( CatalogList.name, "onEvent([ type, listItem ])", { type, listItem } ),
  }
  static propTypes = {
    fetching: PropTypes.bool,
    data: PropTypes.array,
    onEvent: PropTypes.func,
  }
  state={
    action: null,
    item: null
  }
  render() {
    const { data, fetching } = this.props ;
    const { action, item } = this.state ;
    const opened = [ EventTypes.Create, EventTypes.Edit ].includes( action ) ;

    return (
      <div className={ Style.CatalogList } disabled={ fetching }>
        <Modal open={ opened }>
          <Form data={ item } onClose={ this.onCloseModal } onSubmit={ this.onForm } />
        </Modal>
        <Header enabled={ fetching } onClick={ this.onClick( EventTypes.Create ) }/>
        <List data={ data } onEdit={ this.onClick( EventTypes.Edit ) } onRemove={ this.onClick( EventTypes.Remove ) }/>
        <Footer data={ data }/>
      </div>
    )
  }
  reset = () => {
    this.setState({ action: null, item: null })
  }
  dispatch = ( data ) => {
    const { onEvent } = this.props ;
    const { action } = this.state ;
    onEvent && onEvent( action, data ) ;
  }
  onClick = ( action ) => ( item ) => {
    this.setState({ action, item }, () => {
      if( action === EventTypes.Remove ) this.dispatch( item ) ;
    })
  }
  onCloseModal = () => {
    this.reset()
  }
  onForm = ( data ) => {
    this.dispatch( data ) ;
    this.reset() ;
  }
}
