export const PROFILE_INIT = 'Profile.INIT';

export function initProfile( data ) {
	return (dispatch) => {
		dispatch({ type: PROFILE_INIT, data }) ;
	}
}