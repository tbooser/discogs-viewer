import { combineReducers } from 'redux';
import requestSuccessfulReducer from './RequestState/index';
import youtubeVideosReducer from './Youtube/index';

export const rootReducer = combineReducers({
  youtubeVideosReducer,
  requestSuccessfulReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
