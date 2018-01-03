import { 
  LOAD_TRACKS_SUCCESS,
  LOAD_TRACKS_ERROR 
} from '../constants'

const tracks = {
  tracks: ['']
}

function loadTracks(state = tracks, action){
  console.log('action ', action.type)
  switch(action.type) {
    case LOAD_TRACKS_SUCCESS:
      console.log('LOAD_TRACKS_SUCCESS')
      let answer = action.response
      console.log('Action.response -->> ', answer)
        return Object.assign({}, state, {
          tracks: [...state.tracks, {
            tracks: action.response
          }]
        })
    case LOAD_TRACKS_ERROR:
      console.log('LOAD_TRACKS_ERROR')
     	return state 
    default:
      console.log('returning default')
      return state  
  }
}


export default loadTracks
