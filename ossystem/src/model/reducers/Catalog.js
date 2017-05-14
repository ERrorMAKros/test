import { CATALOG_INIT, CATALOG_ADD } from "../actions/Catalog";
import _ from "lodash" ;

const defaults = {
	items: []
} ;
export default function Catalog( state = defaults, action ) {
	switch( action.type ) {
		case CATALOG_INIT: {
			/* debug */ console.warn( `[R] Catalog([${CATALOG_INIT}])` , { state, action } ) ;
			const items =  action.data || [] ;

			return { items };
		}
		case CATALOG_ADD: {
			/* debug */ console.warn( `[R] Catalog([${CATALOG_ADD}])` , { state, action } ) ;
			const data = action.data || [] ;
			const items = state.items ;
			const splitter = _.concat( [], data, items ) ;

			return { items: splitter };
		}
		default: return state ;
	}
}