import {
  LOAD_RECORDS_BY_USERNAME_SUCCESS,
  LOAD_RECORDS_BY_USERNAME_ERROR,
  RECEIVE_YOUTUBE_VIDEOS_SUCCESS,
  LOADING_SPINNER_ACTIVE,
  LOADING_SPINNER_INACTIVE,
} from '../constants';

export const loadRecordsByUsernameSuccess = (response: any) => {
  return (dispatch: (arg0: { response: any; type: string }) => void) => {
    dispatch({ response, type: LOAD_RECORDS_BY_USERNAME_SUCCESS });
  };
};

export const receiveYoutubeVideosSuccess = (response: any, img_url: any) => {
  return (dispatch: (arg0: { response: any; img_url: any; type: string }) => void) => {
    dispatch({ response, img_url, type: RECEIVE_YOUTUBE_VIDEOS_SUCCESS });
  };
};

export const loadRecordsByUsernameError = (error: any) => {
  return { error, type: LOAD_RECORDS_BY_USERNAME_ERROR };
};

export const getRecordsByUsername = () => {
  return (dispatch: (arg0: (dispatch: any) => void) => void) => {
    fetch('/music', {
      method: 'GET',
    })
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((response) => {
        dispatch(loadRecordsByUsernameSuccess(response));
      });
  };
};

export const fetchYoutubeVideos = (resource_url: RequestInfo, img_url: any) => {
  return (dispatch: (arg0: (dispatch: any) => void) => void) => {
    fetch(resource_url, {
      method: 'GET',
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        dispatch(receiveYoutubeVideosSuccess(response, img_url));
      });
  };
};

export const loadingSpinnerActive = () => {
  return (dispatch: (arg0: { type: string }) => void) => {
    dispatch({ type: LOADING_SPINNER_ACTIVE });
  };
};

export const loadingSpinnerInactive = () => {
  return (dispatch: (arg0: { type: string }) => void) => {
    dispatch({ type: LOADING_SPINNER_INACTIVE });
  };
};
