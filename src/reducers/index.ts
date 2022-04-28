import { combineReducers } from 'redux';
import youtubeVideosReducer from './youtubeVideosReducer';

export const rootReducer = combineReducers({
  youtubeVideosReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
