    import { configureStore } from '@reduxjs/toolkit';
    import counterReducer from './counterSlice';
    import restaurantReducer from './restaurantDetailsSlice';
    import riderReducer from './riderSlice-am';

    export const store = configureStore({
      reducer: {
        counter: counterReducer,
        restaurant: restaurantReducer,

        rider: riderReducer,
      },
    });

    export type RootState = ReturnType<typeof store.getState>;
    export type AppDispatch = typeof store.dispatch;