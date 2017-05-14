import { LS_CATALOG_ID } from "../../controller/constants/Environment";
import LocalStorageAdaptor from "../../controller/helpers/LocalStorageAdaptor";

export const CATALOG_INIT = 'Catalog.INIT' ;
export const CATALOG_ADD = 'Catalog.ADD' ;
export const CATALOG_FETCH = 'Catalog.FETCH' ;

export function initCatalog() {
	const data = LocalStorageAdaptor.get( LS_CATALOG_ID ) ;
	/* debug */ console.warn( `[A] initCatalog([ data ])`, data ) ;
	return (dispatch) => dispatch({ type: CATALOG_INIT, data }) ;
}

export function addICatalogItems(data) {
	/* debug */ console.warn( `[A] addICatalogItems([ data ])`, data ) ;
	const items = LocalStorageAdaptor.get( LS_CATALOG_ID ) || [] ;
	LocalStorageAdaptor.set( LS_CATALOG_ID, { ...items, ...data } ) ;
	return (dispatch) => dispatch({ type: CATALOG_ADD, data }) ;
}

export function fetchCatalog() {
	/* debug */ console.warn( `[A] fetchCatalog()` ) ;
	
	const fetchLocalStorage = function(items) {
		/* debug */ console.warn( `[A] fetchLocalStorage([ items ])`, items ) ;
		LocalStorageAdaptor.set( LS_CATALOG_ID, items ) ;
	}
	
	return (dispatch) => dispatch({ type: CATALOG_FETCH, fetchLocalStorage }) ;
}
