import { RECEIVE_YOUTUBE_VIDEOS_SUCCESS, RECEIVE_YOUTUBE_VIDEOS_ERROR } from '../constants';

const videoList = {
  videos: [{}],
  currentImage: null,
};

function loadYoutubeVideos(state = videoList, action: { type: string; response_json: any; img_url: any; error: any }) {
  switch (action.type) {
    case RECEIVE_YOUTUBE_VIDEOS_SUCCESS:
      // console.log('Success', action);
      return Object.assign({}, state, {
        videos: [
          ...state.videos,
          {
            response: action.response_json,
          },
        ],
        currentImage: action.img_url,
      });
    case RECEIVE_YOUTUBE_VIDEOS_ERROR:
      console.log('Error', action.error);
      return;
    default:
      return state;
  }
}

export default loadYoutubeVideos;
