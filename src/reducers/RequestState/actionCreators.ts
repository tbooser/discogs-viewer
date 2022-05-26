import { createAction } from '@reduxjs/toolkit';

export const requestSuccessful = createAction('REQUEST_SUCCESSFUL', (isSuccessful) => {
  console.log('action??');
  return {
    payload: {
      isSuccessful,
    },
  };
});
