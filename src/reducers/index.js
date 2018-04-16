import { combineReducers } from "redux";
import loadRecordsByUsername from "./loadRecordsByUsername";
import loadRecordById from "./loadRecordById";
import loadYoutubeVideos from "./loadYoutubeVideos";

export default combineReducers({
	loadRecordsByUsername,
	loadRecordById,
	loadYoutubeVideos
});
