    import { configureStore } from '@reduxjs/toolkit';
    import counterReducer from './counterSlice';
    import restaurantReducer from './restaurantDetailsSlice';
    import featuredRestaurantsReducer from './featuredRestaurantsSlice';
    export const store = configureStore({
      reducer: {
        counter: counterReducer,
        restaurant: restaurantReducer,
        featuredRestaurants: featuredRestaurantsReducer,

      },
    });

    export type RootState = ReturnType<typeof store.getState>;
    export type AppDispatch = typeof store.dispatch;