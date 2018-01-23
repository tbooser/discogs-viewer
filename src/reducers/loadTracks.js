import { LOAD_TRACKS_SUCCESS,
  LOAD_TRACKS_ERROR 
} from '../constants'

const trackList = {
  tracks: ['']
}

function loadTracksReducer (state = trackList, action){
  switch (action.type) {
    case LOAD_TRACKS_SUCCESS:
      // console.log('LOAD_TRACKS_SUCCESS')
      // console.log('Action ', action)
      return Object.assign({}, state, {
        tracks: [...state.tracks, {
          response: action.response
        }]
      })
    case LOAD_TRACKS_ERROR:
      // console.log('LOAD_TRACKS_ERROR')
     	return state 
    default:
      // console.log('RETURNING DEFAULT')
      return state  
  }
}


export default loadTracksReducer
