import Lodash from "lodash";
import AppActions from "../actions/AppActions";

const DEFAULTS = {
	checkboxChecked: false,
	popupOpened: false,
	selected: 0,
	dataset: [
		{ name: "Первый" } ,
		{ name: "Второй" } ,
		{ name: "Третий" } ,
		{ name: "Последний *" }
	]
};

export default function AppProps( state = DEFAULTS, action ) {
	
	if( Lodash.isNull( action.type ) ) return state;
	else switch( action.type ) {
		case AppActions.ON_CHECKBOX_VALUE:
		case AppActions.ON_SELECT_VALUE:
		case AppActions.ON_POPUP_VISIBILITY: {
			delete action.type;
			return { ...state, ...action };
		}
		default:
			return state;
	}
}