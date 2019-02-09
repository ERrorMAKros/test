import Model from "../models/CatalogueModel";
import { Debug } from "../../utils/Common";
import { CATALOGUE_ALL, CATALOGUE_ERROR } from "../actions/CatalogueActions";

const model = { ...Model };

export default function ( state = model, action ) {
  const { type, data } = action;
  switch ( type ) {
    case CATALOGUE_ALL: {
      /* debug */ Debug.log( "CatalogueReducer()", type, data ) ;
      return {  ... state, data, fetched: true, error: null }
    }
    case CATALOGUE_ERROR: {
      /* debug */ Debug.error( "CatalogueReducer()", type, data ) ;
      return {  ... state, error: data }
    }
    default: return { ...state };
  }
}
