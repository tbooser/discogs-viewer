import { 
	LOAD_TRACKS_ERROR, 
	LOAD_TRACKS_SUCCESS 
} from '../constants.js'

export const loadTracksSuccess = (response) => {
	// console.log('Action in loadTracksSuccess', response)
  return dispatch => {
    dispatch({ response, type: LOAD_TRACKS_SUCCESS });
  };
}

export const loadTracksError = (error) => {
	return {error, type: LOAD_TRACKS_ERROR}
}

export const loadTracks = () => {
	return dispatch => {
		fetch('/music', {
			accept: 'application/json',
			method: 'GET'
		}).then(response => {
			return response.json()
		}).then(response => {
			dispatch(loadTracksSuccess(response))
			// console.log('Response ', response)
		})
	}
}
