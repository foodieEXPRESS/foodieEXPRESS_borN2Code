    import { configureStore } from '@reduxjs/toolkit';
    import counterReducer from './counterSlice';
    import restaurantReducer from './restaurantDetailsSlice';
    export const store = configureStore({
      reducer: {
        counter: counterReducer,
        restaurant: restaurantReducer,

      },
    });

    export type RootState = ReturnType<typeof store.getState>;
    export type AppDispatch = typeof store.dispatch;