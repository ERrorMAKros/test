import _ from "lodash" ;
import { CATALOG_INIT, CATALOG_ADD, CATALOG_FETCH } from "../actions/Catalog";

const defaults = {
	items: []
} ;

export default function Catalog( state = defaults, action ) {
	switch( action.type ) {
		case CATALOG_INIT: {
			/* debug */ console.warn( `[R] Catalog([${action.type}])` , { state, action } ) ;
			const items =  action.data || [] ;
			return { items };
		}
		case CATALOG_ADD: {
			/* debug */ console.warn( `[R] Catalog([${action.type}])` , { state, action } ) ;
			const data = action.data || [] ;
			const items = _.concat( [], data, state.items ) ;

			return { items };
		}
		case CATALOG_FETCH: {
			/* debug */ console.warn( `[R] Catalog([${action.type}])` , { state, action } ) ;
			const items = state.items ;
			action.fetchLocalStorage(items);
			return state ;
		}
		default: return state ;
	}
}