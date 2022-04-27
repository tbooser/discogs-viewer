import { HOVER_STATE_INACTIVE, LOADING_SPINNER_ACTIVE } from '../constants';

const loadingSpinnerState = {
  loading: true,
};

function loadingSpinner(state = loadingSpinnerState, action: { type: any }) {
  switch (action.type) {
    case LOADING_SPINNER_ACTIVE:
      return state;
    case HOVER_STATE_INACTIVE:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}

export default loadingSpinner;
