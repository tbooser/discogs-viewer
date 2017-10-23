import { ADD_ITEM, LOAD_TRACKS, LOAD_TRACKS_ERROR, LOAD_TRACKS_SUCCESS } from '../constants.js'

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
	console.log('hello from loadTracks')
	return dispatch =>
		fetch('/music', {
			method: 'GET'
		}).then(response => {
			console.log('API Response', response)
			return response
		})
}

