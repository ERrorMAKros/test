import {CATALOG_INIT, CATALOG_FETCH} from "../actions/Catalog";

export default function Catalog( state = {}, action ) {
	switch( action.type ) {
		case CATALOG_INIT: {
			/* debug */ console.warn( `[R] Catalog([${CATALOG_INIT}])` , { state, action } ) ;
			return action.data ;
		}
		case CATALOG_FETCH: {
			/* debug */ console.warn( `[R] Catalog([${CATALOG_FETCH}])` , { state, action } ) ;
			return action.data ;
		}
		default: return state ;
	}
}