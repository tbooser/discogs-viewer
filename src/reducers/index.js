import loadRecordsByUsername from "./loadRecordsByUsername";
import loadRecordById from "./loadRecordById";
import loadYoutubeVideos from "./loadYoutubeVideos";
import updateHoverState from "./hoverState";
import { combineReducers } from "redux";

export default combineReducers({
	loadRecordsByUsername,
	loadRecordById,
	loadYoutubeVideos,
	updateHoverState
});
