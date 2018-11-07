const _ = require("underscore");
import {
  LOAD_RECORDS_BY_USERNAME_SUCCESS,
  LOAD_RECORDS_BY_USERNAME_ERROR
} from "../constants";

const recordList = {
  records: [""]
};

function loadRecordsByUsername(state = recordList, action) {
  switch (action.type) {
    case LOAD_RECORDS_BY_USERNAME_SUCCESS:
      return Object.assign({}, state, {
        records: [
          ...state.records,
          {
            response: _.shuffle(action.response)
          }
        ]
      });
    case LOAD_RECORDS_BY_USERNAME_ERROR:
      return state;
    default:
      return state;
  }
}

export default loadRecordsByUsername;
