import { LS_CATALOG_ID } from "../../controller/constants/Environment";
import LocalStorageAdaptor from "../../controller/helpers/LocalStorageAdaptor";

export const CATALOG_INIT = 'Catalog.INIT';
export const CATALOG_ADD = 'Catalog.ADD';

export function initCatalog() {
	const data = LocalStorageAdaptor.get( LS_CATALOG_ID ) ;
	return (dispatch) => dispatch({ type: CATALOG_INIT, data }) ;
}

export function addICatalogItems( data ) {
	return (dispatch) => dispatch({ type: CATALOG_ADD, data }) ;
}