import { configureStore } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import appReducer from './slices/app';

export const store = configureStore({
  reducer: {
    app: appReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
