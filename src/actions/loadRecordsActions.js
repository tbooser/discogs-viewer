import { 
	LOAD_RECORDS_ERROR, 
	LOAD_RECORDS_SUCCESS 
} from '../constants.js'

export const loadRecordsSuccess = (response) => {
	console.log('Action in loadRecordsSuccess', response)
  return dispatch => {
    dispatch({ response, type: LOAD_RECORDS_SUCCESS });
  };
}

export const loadRecordsError = (error) => {
	return {error, type: LOAD_RECORDS_ERROR}
}

export const loadRecords = () => {
	return dispatch => {
		fetch('/music', {
			accept: 'application/json',
			method: 'GET'
		}).then(response => {
			return response.json()
		}).then(response => {
			dispatch(loadRecordsSuccess(response))
			// console.log('Response ', response)
		})
	}
}
