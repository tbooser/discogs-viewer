import loadItems from './loadItems'
import loadRecordsByUsername from './loadRecordsByUsername'
import loadRecordById from './loadRecordById'
import loadYoutubeVideos from './loadYoutubeVideos'
import updateHoverState from './hoverState'
import { combineReducers } from 'redux'

export default combineReducers({
  loadItems,
  loadRecordsByUsername,
  loadRecordById,
  loadYoutubeVideos,
  updateHoverState
})