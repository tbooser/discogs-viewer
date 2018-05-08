import {
  LOAD_RECORDS_BY_USERNAME_SUCCESS,
  LOAD_RECORDS_BY_USERNAME_ERROR,
  RECEIVE_YOUTUBE_VIDEOS_SUCCESS,
  LOADING_SPINNER_ACTIVE,
  LOADING_SPINNER_INACTIVE,
  TICK_YOUTUBE_PROGRESS_BAR,
  SET_ALBUM_IMAGE
} from "../constants.js";
const _ = require("underscore");

////////// LOAD RECORD COLLECTION BY USERNAME

export const loadRecordsByUsernameSuccess = response => {
  return dispatch => {
    dispatch({ response, type: LOAD_RECORDS_BY_USERNAME_SUCCESS });
  };
};

export const receiveYoutubeVideosSuccess = response => {
  return dispatch => {
    dispatch({ response, type: RECEIVE_YOUTUBE_VIDEOS_SUCCESS });
  };
};

export const loadRecordsByUsernameError = error => {
  return { error, type: LOAD_RECORDS_BY_USERNAME_ERROR };
};

export const getRecordsByUsername = () => {
  return dispatch => {
    fetch("/music", {
      accept: "application/json",
      method: "GET"
    })
      .then(response => {
        return response.json();
      })
      .then(response => {
        dispatch(loadRecordsByUsernameSuccess(response));
      });
  };
};

export const fetchYoutubeVideos = resource_url => {
  return dispatch => {
    fetch(resource_url, {
      accept: "application/json",
      method: "GET"
    })
      .then(response => {
        return response.json();
      })
      .then(response => {
        dispatch(receiveYoutubeVideosSuccess(response));
      });
  };
};

export const loadingSpinnerActive = () => {
  return dispatch => {
    console.log("LOADING_SPINNER_ACTIVE");
    dispatch({ type: LOADING_SPINNER_ACTIVE });
  };
};

export const loadingSpinnerInactive = () => {
  return dispatch => {
    console.log("LOADING_SPINNER_INACTIVE");
    dispatch({ type: LOADING_SPINNER_INACTIVE });
  };
};

export const tickYoutubeProgressBar = response => {
  return dispatch => {
    console.log("TICK_YOUTUBE_PROGRESS_BAR ACTION");
    dispatch({ response, type: TICK_YOUTUBE_PROGRESS_BAR });
  };
};

export const setAlbumImage = response => {
  return dispatch => {
    console.log("SET_ALBUM_IMAGE");
    dispatch({ response, type: SET_ALBUM_IMAGE });
  };
};

