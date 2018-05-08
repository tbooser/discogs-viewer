import { TICK_YOUTUBE_PROGRESS_BAR } from "../constants";

const tick = {
  tick: []
};

function tickYoutubeProgressBarReducer(state = tick, action) {
  switch (action.type) {
    case TICK_YOUTUBE_PROGRESS_BAR:
      console.log("TICK_YOUTUBE_PROGRESS_BAR REDUCER");
      return Object.assign({}, state, {
        videos: [
          ...state.tick,
          {
            response: action.response
          }
        ]
      });

    default:
      return state;
  }
}

export default tickYoutubeProgressBarReducer;
