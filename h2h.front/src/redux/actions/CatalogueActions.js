import ConnectionCtrl from "../../controllers/ConnectionCtrl";
import Constants from "../../constants";

export const CATALOGUE_ALL = 'GET.CATALOGUE.ALL' ;
export const CATALOGUE_ERROR = 'CATALOGUE.ERROR' ;

const getRootCatalogue = ( data ) => ({ type: CATALOGUE_ALL, data })
const setCatalogueError = ( error ) => ({ type: CATALOGUE_ERROR, error })

export const getRootCatalogueAction = () => async ( dispatch ) => {
  let data ;
  try { data = await ConnectionCtrl.Get( Constants.ROUTES.PRODUCTS ) }
  catch ( error ) { return dispatch( setCatalogueError( error ) ) }
  dispatch( getRootCatalogue( data ) ) ;
}
