    import { configureStore } from '@reduxjs/toolkit';
    import counterReducer from './counterSlice';
    import restaurantDetailReducer from './restaurantDetailsSlice';
    import restaurantListReducer  from './restaurantListSlice';
    export const store = configureStore({
      reducer: {
        counter: counterReducer,
        restaurantDetails: restaurantDetailReducer,
        restaurantList: restaurantListReducer

      },
    });

    export type RootState = ReturnType<typeof store.getState>;
    export type AppDispatch = typeof store.dispatch;