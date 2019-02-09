import React, { Component } from "react";
import Style from "./style.scss";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  editCatalogueRecordAction,
  getRootCatalogueAction,
  postRootCatalogueAction,
  removeCatalogueRecordAction
} from "../../redux/actions/CatalogueActions";
import CatalogList from "../../components/catalog-list";
import Preloader from "../../components/preloader";
import EventTypes from "../../components/catalog-list/eventTypes";

@connect(
  ({ Catalogue })=>({ Catalogue }),
  ( dispatch ) => bindActionCreators({ removeCatalogueRecordAction, postRootCatalogueAction, editCatalogueRecordAction, getRootCatalogueAction }, dispatch )
)
export default class Catalog extends Component {
  render() {
    const { Catalogue:{ fetched, fetching, data  } } = this.props ;
    return (
      <div className={ Style.RootCatalog }>
        <Preloader active={ ! fetched }>
          <div className={ Style.Context }>
            <CatalogList fetching={ fetching } data={ data } onEvent={ this.onCatalogEvent }/>
          </div>
        </Preloader>
      </div>
    )
  }
  async componentDidMount() {
    const { Catalogue:{ fetched }, getRootCatalogueAction } = this.props ;
    if( ! fetched ) await getRootCatalogueAction() ;
  }
  onCatalogEvent = ( type, data ) => {
    const { postRootCatalogueAction, removeCatalogueRecordAction, editCatalogueRecordAction } = this.props ;
    switch ( type ) {
      case EventTypes.Create: return postRootCatalogueAction( data ) ;
      case EventTypes.Edit: return editCatalogueRecordAction( data.id, data )
      case EventTypes.Remove: { return removeCatalogueRecordAction( data.id ) }
    }
  }
}
