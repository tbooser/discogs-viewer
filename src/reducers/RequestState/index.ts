import { createReducer } from '@reduxjs/toolkit';
import { requestSuccessful } from './actionCreators';
import { initialState } from './initialState';

const requestSuccessfulReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(requestSuccessful, (state, action) => {
      const { payload } = action;
      console.log('payload', payload);
      /* This is not actually mutating the state https://redux-toolkit.js.org/usage/immer-reducers */
      state.requestSuccessful = payload.isSuccessful;
    })
    .addDefaultCase((state, action) => {});
});

export default requestSuccessfulReducer;
