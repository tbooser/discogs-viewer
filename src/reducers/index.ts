import { combineReducers } from 'redux';
import youtubeVideosReducer from './Youtube/index';

export const rootReducer = combineReducers({
  youtubeVideosReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
