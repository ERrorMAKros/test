import { CATALOG_INIT, CATALOG_ADD, CATALOG_REMOVE, CATALOG_FETCH, CATALOG_CLEAR, CATALOG_INFO } from "../actions/Catalog";
import _ from "lodash" ;

const defaults = {
	itemsAmount: 0 ,
	priceSum: 0 ,
	priceAverage: 0 ,
	items: []
} ;

export default function Catalog( state = defaults, action ) {
	switch( action.type ) {
		case CATALOG_INIT: {
			const items =  action.data || [] ;
			return { ...state, items };
		}
		case CATALOG_ADD: {
			const data = action.data || [] ;
			const items = _.concat( [], data, state.items ) ;

			return { ...state, items };
		}
		case CATALOG_REMOVE: {
			const id = action.id ;
			const items = _.clone( state.items ) ;
			
			_.remove( items , (value) => value.id === id );
			
			return { ...state, items } ;
		}
		case CATALOG_FETCH: {
			const items = state.items ;
			action.fetchLocalStorage(items);
			
			return { ...state } ;
		}
		case CATALOG_INFO: {
			const items = state.items ;
			const calc = action.calculator(items);

			return { ...state, ...calc } ;
		}
		case CATALOG_CLEAR: {
			const items = [] ;
			return { ...state, items } ;
		}
		default: return { ...state };
	}
}