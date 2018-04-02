import { HOVER_STATE_ACTIVE, HOVER_STATE_INACTIVE } from "../constants";

const hoverState = {
  hoverStateActive: false
};

function updateHoverState(state = hoverState, action) {
  switch (action.type) {
    case HOVER_STATE_ACTIVE:
      return {
        ...state,
        hoverStateActive: true
      };
    case HOVER_STATE_INACTIVE:
      return {
        ...state,
        hoverStateActive: false
      };
    default:
      return state;
  }
}

export default updateHoverState;
