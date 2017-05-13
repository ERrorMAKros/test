import { CATALOG_INIT } from "../actions/Catalog";

export default function Catalog( state = {}, action ) {
	switch( action.type ) {
		case CATALOG_INIT: {
			/* debug */ console.warn( `[R] Catalog([${CATALOG_INIT}])` , { state, action } ) ;
			return action.data ;
		}
		default: return state ;
	}
}