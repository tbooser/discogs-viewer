import loadItems from './loadItems'
import loadTracks from './loadTracks'
import { combineReducers } from 'redux'

export default combineReducers({
  loadItems,
  loadTracks
})