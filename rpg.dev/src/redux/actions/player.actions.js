import { Debug } from "../../utils/Common";
export const SET_PLAYER_PROPERTIES = 'set-player-props' ;
export const setPlayerProperties = ( data ) => dispatch => {
	/* debug */ Debug.action( "PlayerActions()", `setPlayerPosition([ data ])`, data) ;
	dispatch({ type: SET_PLAYER_PROPERTIES, data }) ;
}