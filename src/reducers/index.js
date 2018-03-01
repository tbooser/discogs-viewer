import loadItems from './loadItems'
import loadRecordsByUsername from './loadRecordsByUsername'
import loadRecordById from './loadRecordById'
import { combineReducers } from 'redux'

export default combineReducers({
  loadItems,
  loadRecordsByUsername,
  loadRecordById
})