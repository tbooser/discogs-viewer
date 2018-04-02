import {
  LOAD_RECORDS_BY_USERNAME_SUCCESS,
  LOAD_RECORDS_BY_USERNAME_ERROR,
  RECEIVE_YOUTUBE_VIDEOS_SUCCESS,
  HOVER_STATE_ACTIVE,
  HOVER_STATE_INACTIVE,
  LOADING_SPINNER_ACTIVE,
  LOADING_SPINNER_INACTIVE
} from "../constants.js";

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

export const hoverStateActive = () => {
  return dispatch => {
    console.log("HOVER_STATE_ACTIVE");
    dispatch({ type: HOVER_STATE_ACTIVE });
  };
};

export const hoverStateInactive = () => {
  return dispatch => {
    console.log("HOVER_STATE_INACTIVE");
    dispatch({ type: HOVER_STATE_INACTIVE });
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

////////// LOAD RECORD BY ID

// export const loadRecordByIdSuccess = (response) => {
//  console.log('Action in loadRecordByIdSuccess')
//  return dispatch => {
//    dispatch({ response, type: LOAD_RECORD_BY_ID_SUCCESS })
//  }
// }

// export const loadRecordByIdError = (error) => {
//  return { error, type: LOAD_RECORD_BY_ID_ERROR }
// }

// export const getRecordById = (id) => {
//  console.log('id', id)
//  return dispatch => {
//    fetch('/id', {
//      accept: 'application/json',
//      method: 'POST',
//      body: JSON.stringify(id)
//    }).then(response => {
//      return response.json()
//    }).then(response => {
//      dispatch(loadRecordByIdSuccess(response))
//    })
//  }
// }
