import { PROFILE_INIT } from "../actions/Profile";

const defaults = {}

export default function Profile( state = defaults, action ) {
	switch( action.type ) {
		case PROFILE_INIT: {
			const data = action.data ;
			return data ;
		}
		default: return state ;
	}
}