import { PROFILE_INIT } from "../actions/Profile";

const defaults = {}

export default function Profile( state = defaults, action ) {
	switch( action.type ) {
		case PROFILE_INIT: {
			/* debug */ console.warn( `[R] Profile([${PROFILE_INIT}])` , { state, action } ) ;
			const data = action.data ;
			return data ;
		}
		default: return state ;
	}
}