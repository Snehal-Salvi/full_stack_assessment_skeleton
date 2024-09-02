import { configureStore } from '@reduxjs/toolkit';
import { myApi } from '../api/myApi';

// Configure the Redux store with the API reducer and middleware
export const store = configureStore({
  reducer: {
    [myApi.reducerPath]: myApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(myApi.middleware),
});
