import MenuModel from "../models/MenuModel" ;
import { MenuActionEvents } from "../actions/MenuActions" ;

const model = { ...MenuModel } ;
export default function(state = model, action) {
	
	const { type } = action ;
	switch ( type ) {
		case MenuActionEvents.MENU_ITEMCHANGED: {

			const { data } = action ;
			const { path } = data ;
			
			return { ...state, path } ;
		}
		default: return { ...state } ;
	};
}