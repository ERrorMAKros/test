import React, { Component } from "react"
import { Debug } from "../../utils/Common"
import Style from "./style.scss"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { getRootCatalogueAction } from "../../redux/actions/CatalogueActions"
import CatalogList from '../../components/catalog-list'
import Preloader from '../../components/preloader'

@connect(
  ({ Catalogue })=>({ Catalogue }),
  ( dispatch ) => bindActionCreators({ getRootCatalogueAction }, dispatch )
)
export default class Catalog extends Component {
  constructor( props ) {
    super( props );
    /* debug */ Debug.info( Catalog.name, null, this );
  }
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
    /* debug */ Debug.info( Catalog.name, "onCatalogEvent([ type, data ])", { type, data } );
  }
}
