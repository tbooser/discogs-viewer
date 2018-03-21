import { FETCH_YOUTUBE_VIDEOS,
  RECEIVE_YOUTUBE_VIDEOS_SUCCESS,
} from '../constants'

const videoList = {
  videos: [''],
}

function loadYoutubeVideos (state = videoList, action) {
  switch (action.type) {
    case RECEIVE_YOUTUBE_VIDEOS_SUCCESS:
      return Object.assign({}, state, {
    		videos: [...state.videos, {
    			response: action.response
    		}]
    	})
    case FETCH_YOUTUBE_VIDEOS:
    	return
    default:
    	return state
  }
}

export default loadYoutubeVideos