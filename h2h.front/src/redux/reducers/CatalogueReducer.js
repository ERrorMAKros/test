import Model from "../models/CatalogueModel";
import {
  CATALOGUE_ERROR,
  CATALOGUE_GET,
  CATALOGUE_LOCKER,
  CATALOGUE_POST,
  CATALOGUE_PUT,
  CATALOGUE_REMOVE
} from "../actions/CatalogueActions";
import { clone, findIndex, isNil, isUndefined, reject } from "lodash";

const model = { ...Model };

export default function ( state = model, action ) {
  const { type, data } = action;
  switch ( type ) {
    case CATALOGUE_ERROR: {
      return {  ... state, fetched: true, fetching: false, error: data }
    }
    case CATALOGUE_LOCKER: {
      return { ... state, fetching: true }
    }
    case CATALOGUE_POST: {
      delete data.createdAt ;
      return {  ... state, data: [ ... state.data, data ], fetched: true, fetching: false, error: null }
    }
    case CATALOGUE_PUT: {
      const { id } = data ;
      let _data = clone( state.data )
      const index = findIndex( _data, { id } )

      if( Boolean( index + 1 ) ) {
        _data[ index ] = data.data ;
        _data[ index ].id = id ;
        delete _data[ index ].updatedAt ;
      }

      return {  ... state, data: _data, fetched: true, fetching: false, error: null }
    }
    case CATALOGUE_GET: {
      return {  ... state, data, fetched: true, fetching: false, error: null }
    }
    case CATALOGUE_REMOVE: {
      const { id } = data ;
      let _data = clone( state.data )
      const index = findIndex( _data, { id } )

      if( Boolean( index + 1 ) ) {
        delete _data[ index ] ;
        _data = reject( _data, isNil, isUndefined ) ;
      }

      return {  ... state, data: _data, fetched: true, fetching: false, error: null }
    }
    default: return { ...state };
  }
}
