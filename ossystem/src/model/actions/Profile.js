export const PROFILE_SET = 'Profile.SET';

export function setProfile( data ) {
	return (dispatch) => {
		dispatch({ type: PROFILE_SET, data }) ;
	}
}