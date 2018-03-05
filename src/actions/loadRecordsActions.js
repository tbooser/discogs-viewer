import { 
	LOAD_RECORDS_BY_USERNAME_SUCCESS,
	LOAD_RECORDS_BY_USERNAME_ERROR,
	// LOAD_RECORD_BY_ID_SUCCESS,
	// LOAD_RECORD_BY_ID_ERROR
} from '../constants.js'

////////// LOAD RECORD COLLECTION BY USERNAME

export const loadRecordsByUsernameSuccess = (response) => {
	console.log('Action in loadRecordsByUsernameSuccess', response)
  return dispatch => {
    dispatch({ response, type: LOAD_RECORDS_BY_USERNAME_SUCCESS });
  };
}

export const loadRecordsByUsernameError = (error) => {
	return { error, type: LOAD_RECORDS_BY_USERNAME_ERROR }
}

export const getRecordsByUsername = () => {
	return dispatch => {
		fetch('/music', {
			accept: 'application/json',
			method: 'GET'
		}).then(response => {
			return response.json()
		}).then(response => {
			dispatch(loadRecordsByUsernameSuccess(response))
		})
	}
}

////////// LOAD RECORD BY ID

// export const loadRecordByIdSuccess = (response) => {
// 	console.log('Action in loadRecordByIdSuccess')
// 	return dispatch => {
// 		dispatch({ response, type: LOAD_RECORD_BY_ID_SUCCESS })
// 	}
// }

// export const loadRecordByIdError = (error) => {
// 	return { error, type: LOAD_RECORD_BY_ID_ERROR }
// }

// export const getRecordById = (id) => {
// 	console.log('id', id)
// 	return dispatch => {
// 		fetch('/id', {
// 			accept: 'application/json',
// 			method: 'POST',
// 			body: JSON.stringify(id)
// 		}).then(response => {
// 			return response.json()
// 		}).then(response => {
// 			dispatch(loadRecordByIdSuccess(response))
// 		})
// 	}
// }
