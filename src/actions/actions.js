const requestHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "Origin, X-Requested-With, content-type, accept",
  "access-control-max-age": 10,
  'Content-Type': "application/json"
}

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
		fetch('http://localhost:3000/music', {
			method: 'GET',
			headers: requestHeaders
		}).then(response => {
			console.log('resonse ', response.json())
			return response.json()
		}).then(response => {
			if (response.status >= 200 && response.status < 300) {
				console.log('API Response Success -->>', response)
				dispatch(loadTracksSuccess(response.body))
			} else {
				const error = new Error(response.statusText)
				error.response = response
				dispatch(loadTracksError(response))
				throw error
			}
		})
	}
}

