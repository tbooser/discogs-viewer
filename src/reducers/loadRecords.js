import { LOAD_RECORDS_SUCCESS,
  LOAD_RECORDS_ERROR 
} from '../constants'

const recordList = {
  records: ['']
}

function loadRecordsReducer (state = recordList, action){
  switch (action.type) {
    case LOAD_RECORDS_SUCCESS:
      console.log('LOAD_RECORDS_SUCCESS')
      return Object.assign({}, state, {
        records: [...state.records, {
          response: action.response
        }]
      })
    case LOAD_RECORDS_ERROR:
     	return state 
    default:
      return state  
  }
}


export default loadRecordsReducer
