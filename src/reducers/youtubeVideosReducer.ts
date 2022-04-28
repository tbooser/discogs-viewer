import { createAction, createReducer, AnyAction } from '@reduxjs/toolkit';

// Types
interface responseVideoArrayTypes {
  uri: string;
}

interface responseTypes {
  artists_sort: string;
  title: string;
  videos: Array<responseVideoArrayTypes>;
}

interface payloadTypes {
  response_json: responseTypes;
  img_url: string;
}

// Action Creators
export const receiveYoutubeVideos = createAction(
  'RECEIVE_YOUTUBE_VIDEOS_SUCCESS',
  (response_json: payloadTypes, img_url: string) => {
    return {
      payload: {
        response_json,
        img_url,
      },
    };
  }
);

export const receiveYoutubeVideosError = createAction('RECEIVE_YOUTUBE_VIDEOS_ERROR');

// Initial State
interface initialStateTypes {
  videos: Array<payloadTypes>;
  currentImage: string | undefined;
}

const videoList: initialStateTypes = {
  videos: [],
  currentImage: undefined,
};

const initialState = videoList;

// Reducer
const youtubeVideosReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(receiveYoutubeVideos, (state, action) => {
      const { payload } = action;

      // This is not actually mutating the state directly thanks to https://immerjs.github.io/immer/
      state.videos.push(payload.response_json);
      state.currentImage = payload.img_url;
    })
    .addCase(receiveYoutubeVideosError, (state, action) => {
      const videoDataPayload = action.payload;
    })
    .addDefaultCase((state, action) => {
      return state;
    });
});

export default youtubeVideosReducer;
