import ConnectionCtrl from "../../controllers/ConnectionCtrl";
import Constants from "../../constants";

export const CATALOGUE_GET = 'CATALOGUE.GET' ;
export const CATALOGUE_POST = 'CATALOGUE.POST' ;
export const CATALOGUE_PUT = 'CATALOGUE.PUT' ;
export const CATALOGUE_REMOVE = 'CATALOGUE.DELETE' ;
export const CATALOGUE_ERROR = 'CATALOGUE.ERROR' ;
export const CATALOGUE_LOCKER = 'CATALOGUE.LOCKER' ;

const locker = () => ({ type: CATALOGUE_LOCKER, data:{ fetching: true } })
const getRootCatalogue = ( data ) => ({ type: CATALOGUE_GET, data })
const postCatRecord = ( data ) => ({ type: CATALOGUE_POST, data })
const putCatRecord = ( id, data ) => ({ type: CATALOGUE_PUT, data:{ id, data } })
const removeCatRecord = ( id ) => ({ type: CATALOGUE_REMOVE, data:{ id } })
const setError = ( error ) => ({ type: CATALOGUE_ERROR, error })

export const getRootCatalogueAction = () => async ( dispatch ) => {
  let data ;
  try { data = await ConnectionCtrl.Get( Constants.ROUTES.PRODUCTS ) }
  catch ( error ) { return dispatch( setError( error ) ) }
  dispatch( getRootCatalogue( data ) ) ;
}
export const postRootCatalogueAction = ( data ) => async ( dispatch ) => {
  dispatch( locker() ) ;
  let payload ;
  try { payload = await ConnectionCtrl.Post( Constants.ROUTES.PRODUCTS, data ) }
  catch ( error ) { return dispatch( setError( error ) ) }
  dispatch( postCatRecord( payload ) ) ;
}
export const editCatalogueRecordAction = ( id, data ) => async ( dispatch ) => {
  dispatch( locker() ) ;
  let payload ;
  try { payload = await ConnectionCtrl.Put( Constants.ROUTES.PRODUCTS, id, data ) }
  catch ( error ) { return dispatch( setError( error ) ) }
  /**
   * @todo
   * В этом месте "костыль" с подстановкой подлинного id ,
   * потому как сервер неправильно и всегда возвращает id === 1
   */
  dispatch( putCatRecord( id, payload ) ) ;
}
export const removeCatalogueRecordAction = ( id ) => async ( dispatch ) => {
  dispatch( locker() ) ;
  try { await ConnectionCtrl.Delete( Constants.ROUTES.PRODUCTS, id ) }
  catch ( error ) { return dispatch( setError( error ) ) }
  dispatch( removeCatRecord( id ) ) ;
}
