import {
  LOAD_RECORDS_BY_USERNAME_SUCCESS,
  LOAD_RECORDS_BY_USERNAME_ERROR,
  RECEIVE_YOUTUBE_VIDEOS_SUCCESS,
  LOADING_SPINNER_ACTIVE,
  LOADING_SPINNER_INACTIVE,
  TICK_YOUTUBE_PROGRESS_BAR
} from "../constants.js";
const _ = require("underscore");

export const loadRecordsByUsernameSuccess = response => {
  return dispatch => {
    dispatch({ response, type: LOAD_RECORDS_BY_USERNAME_SUCCESS });
  };
};

export const receiveYoutubeVideosSuccess = (response, img_url) => {
  return dispatch => {
    dispatch({ response, img_url, type: RECEIVE_YOUTUBE_VIDEOS_SUCCESS });
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
        console.log(response)
        return response.json();
      })
      .then(response => {
        dispatch(loadRecordsByUsernameSuccess(response));
      });
  };
};

export const fetchYoutubeVideos = (resource_url, img_url) => {
  return dispatch => {
    fetch(resource_url, {
      accept: "application/json",
      method: "GET"
    })
      .then(response => {
        return response.json();
      })
      .then(response => {
        dispatch(receiveYoutubeVideosSuccess(response, img_url));
      });
  };
};

export const loadingSpinnerActive = () => {
  return dispatch => {
    dispatch({ type: LOADING_SPINNER_ACTIVE });
  };
};

export const loadingSpinnerInactive = () => {
  return dispatch => {
    dispatch({ type: LOADING_SPINNER_INACTIVE });
  };
};

export const tickYoutubeProgressBar = response => {
  return dispatch => {
    dispatch({ response, type: TICK_YOUTUBE_PROGRESS_BAR });
  };
};
