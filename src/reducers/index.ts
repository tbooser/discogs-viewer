import { combineReducers } from 'redux';
import loadRecordsByUsername from './loadRecordsByUsername';
import loadRecordById from './loadRecordById';
import loadYoutubeVideos from './loadYoutubeVideos';

export const rootReducer = combineReducers({
  loadRecordsByUsername,
  loadRecordById,
  loadYoutubeVideos,
});

export type RootState = ReturnType<typeof rootReducer>;
