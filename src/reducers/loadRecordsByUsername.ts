const _ = require('underscore');
import { LOAD_RECORDS_BY_USERNAME_SUCCESS, LOAD_RECORDS_BY_USERNAME_ERROR } from '../constants';

interface Records {
  records: Array<object>;
}

interface ResponseObject {
  response: Object;
}

const initialRecordsState: Records = {
  records: [{}],
};

type LoadRecordsReducerType = typeof initialRecordsState;

export default function loadRecordsByUsername(
  state = initialRecordsState,
  action: { type: any; response: any }
): LoadRecordsReducerType {
  switch (action.type) {
    case LOAD_RECORDS_BY_USERNAME_SUCCESS:
      return Object.assign({}, state, {
        records: [
          ...state.records,
          {
            response: _.shuffle(action.response),
          },
        ],
      });
    case LOAD_RECORDS_BY_USERNAME_ERROR:
      return state;
    default:
      return state;
  }
}
