import { ResourceUrlResponseTypes } from './types';
import { createAction } from '@reduxjs/toolkit';

export const receiveYoutubeVideos = createAction(
  'RECEIVE_YOUTUBE_VIDEOS_SUCCESS',
  (response_json: ResourceUrlResponseTypes, img_url: string) => {
    return {
      payload: {
        response_json,
        img_url,
      },
    };
  }
);

export const receiveYoutubeVideosError = createAction('RECEIVE_YOUTUBE_VIDEOS_ERROR');
