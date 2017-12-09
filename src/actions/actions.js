import { ADD_ITEM, 
	LOAD_TRACKS_ERROR, 
	LOAD_TRACKS_SUCCESS 
} from '../constants.js'

export const addItem = (text, id) => {
	const action = {
		type: ADD_ITEM,
		text
	}
	console.log('Action in addItem', action)
	return action 
}

export const loadTracksSuccess = (response) => {
	return dispatch => {
		dispatch({response, type: LOAD_TRACKS_SUCCESS})
	}
}

export const loadTracksError = (error) => {
	return {error, type: LOAD_TRACKS_ERROR}
}


export const loadTracks = (data) => {
	return dispatch => {
		fetch('/music', {
			accept: 'application/json',
			method: 'GET'
		}).then(response => {
			return response.json()
		}).then(response => {
			console.log('Response ', response)
		})
	}
}

