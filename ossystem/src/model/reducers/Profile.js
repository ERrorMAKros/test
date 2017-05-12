import {PROFILE_SET} from "../actions/Profile";

export default function Profile( state = {}, action ) {
	switch( action.type ) {
		case PROFILE_SET: {
			/* debug */ console.warn( `[R] Profile([${PROFILE_SET}])` , { state, action } ) ;
			return action.data ;
		}
		default: return state ;
	}
}