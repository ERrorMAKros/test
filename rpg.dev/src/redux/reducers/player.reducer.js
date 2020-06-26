import Model from "../models/player.model"
import { SET_PLAYER_PROPERTIES } from "../actions/player.actions"
import { Debug } from "../../utils/Common";

const model = { ...Model };

export default function ( state = model, action ) {
	const { type, data } = action;

	switch ( type ) {
		case SET_PLAYER_PROPERTIES: {
			/* debug */ Debug.reducer( "PlayerReducer()", type, data ) ;
			return { ...state, ...data } ;
		}
		default: return { ... state };
	};
}