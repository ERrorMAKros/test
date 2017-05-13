import { LS_CATALOG_ID } from "../../controller/constants/Environment";
import LocalStorageAdaptor from "../../controller/helpers/LocalStorageAdaptor";

export const CATALOG_INIT = 'Catalog.INIT';
export function initCatalog() {
	const data = LocalStorageAdaptor.get( LS_CATALOG_ID ) ;
	return (dispatch) => dispatch({ type: CATALOG_INIT, data }) ;
}
