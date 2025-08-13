import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './searchSlice';

export const localStore = configureStore({
  reducer: {
    restaurantSearchLocal: searchReducer,
  },
});

export type LocalRootState = ReturnType<typeof localStore.getState>;
export type LocalDispatch = typeof localStore.dispatch;

