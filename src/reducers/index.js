import { combineReducers } from "redux";
import loadRecordsByUsername from "./loadRecordsByUsername";
import loadRecordById from "./loadRecordById";
import loadYoutubeVideos from "./loadYoutubeVideos";
import tickYoutubeProgressBar from "./tickYoutubeProgressBar";

export default combineReducers({
	loadRecordsByUsername,
	loadRecordById,
	loadYoutubeVideos,
	tickYoutubeProgressBar
});
