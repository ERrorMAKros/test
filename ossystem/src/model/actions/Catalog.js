import { LOCALSTORE_ID } from "../../controller/constants/Environment";
import _ from "lodash";

export const CATALOG_INIT = 'Catalog.INIT';
export const CATALOG_FETCH = 'Catalog.FETCH';

export function initCatalog() {
	const json = localStorage.getItem( LOCALSTORE_ID ) ;
	const data = ! _.isNull(json) && Boolean(json.length) ? JSON.parse( json ) : [] ;
	return (dispatch) => dispatch({ type: CATALOG_INIT, data }) ;
}
export function fetchCatalog( data) {
	localStorage.setItem( LOCALSTORE_ID, JSON.stringify(data) );
	initCatalog() ;
	return (dispatch) => dispatch({ type: CATALOG_FETCH }) ;
}