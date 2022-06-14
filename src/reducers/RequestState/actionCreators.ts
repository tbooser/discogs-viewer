import { createAction } from '@reduxjs/toolkit';

export const requestSuccessful = createAction('REQUEST_SUCCESSFUL', (isSuccessful) => {
  return {
    payload: {
      isSuccessful,
    },
  };
});
