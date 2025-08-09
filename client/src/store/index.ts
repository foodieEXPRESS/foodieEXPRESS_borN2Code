    import { configureStore } from '@reduxjs/toolkit';
    import counterReducer from './counterSlice';
    import restaurantDetailReducer from './restaurantDetailsSlice';
    import restaurantListReducer  from './restaurantListSlice';
    import riderReducer from './riderSlice-am';
    import authReducer from './authSlice';

    export const store = configureStore({
      reducer: {
        counter: counterReducer,
        restaurantDetails: restaurantDetailReducer,
        restaurantList: restaurantListReducer,

        rider: riderReducer,
        auth: authReducer
        
      },
    });

    export type RootState = ReturnType<typeof store.getState>;
    export type AppDispatch = typeof store.dispatch;