const _ = require('underscore');
import { LOAD_RECORDS_BY_USERNAME_SUCCESS, LOAD_RECORDS_BY_USERNAME_ERROR } from '../constants';

interface ResponseObject {
  response: Object;
}

interface InitialStateInterface {
  records: Array<any>;
}

const initialRecordsState: InitialStateInterface = {
  records: [],
};

type LoadRecordsReducerType = typeof initialRecordsState;

export default function loadRecordsByUsername(
  state = initialRecordsState,
  action: { type: string; response_json: any }
): LoadRecordsReducerType {
  switch (action.type) {
    case LOAD_RECORDS_BY_USERNAME_SUCCESS:
      return Object.assign({ records: _.shuffle(action.response_json) });
    // records: Object.assign({}, ...state.records, _.shuffle(action.response_json));
    case LOAD_RECORDS_BY_USERNAME_ERROR:
      // console.log(action);
      return state;
    default:
      return state;
  }
}
