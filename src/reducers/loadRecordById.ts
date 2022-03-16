import { LOAD_RECORD_BY_ID_SUCCESS, LOAD_RECORD_BY_ID_ERROR } from '../constants';

const clickedRecord = {
  record: [''],
};

function loadRecordById(state = clickedRecord, action) {
  switch (action.type) {
    case LOAD_RECORD_BY_ID_SUCCESS:
      return Object.assign(
        {},
        {
          record: [
            ...state.clickedRecord,
            {
              response: action.response,
            },
          ],
        }
      );
    case LOAD_RECORD_BY_ID_ERROR:
      return state;
    default:
      return state;
  }
}

export default loadRecordById;
