import { LOADING_SPINNER_ACTIVE, LOADING_SPINNER_INACTIVE } from '../constants';

export const loadingSpinnerActive = () => {
  return (dispatch) => {
    dispatch({ type: LOADING_SPINNER_ACTIVE });
  };
};

export const loadingSpinnerInactive = () => {
  return (dispatch) => {
    dispatch({ type: LOADING_SPINNER_INACTIVE });
  };
};
