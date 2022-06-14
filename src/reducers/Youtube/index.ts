import { createReducer } from '@reduxjs/toolkit';
import { receiveYoutubeVideos, receiveYoutubeVideosError } from './actionCreators';
import { initialState } from './initialState';

const youtubeVideosReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(receiveYoutubeVideos, (state, action) => {
      const { payload } = action;
      /* This is not actually mutating the state https://redux-toolkit.js.org/usage/immer-reducers */
      state.videosList.push(payload);
      state.currentImage = payload.img_url;
    })
    .addCase(receiveYoutubeVideosError, (state, action) => {
      const videoDataPayload = action.payload;
    })
    .addDefaultCase((state, action) => {});
});

export default youtubeVideosReducer;
