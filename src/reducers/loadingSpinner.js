import { LOADING_SPINNER_ACTIVE, LOADING_SPINNER_INACTIVE } from "../constants";

const loadingSpinnerState = {
  loading: true
};

function loadingSpinner(state = loadingSpinnerState, action) {
  switch (action.type) {
    case LOADING_SPINNER_ACTIVE:
      return state;
    case HOVER_STATE_INACTIVE:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
}

export default loadingSpinner;
