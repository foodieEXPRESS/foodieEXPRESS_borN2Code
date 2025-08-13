
import riderReducer from './riderSlice-am';
import authReducer from './authSlice';
    import { configureStore, type Action, type ThunkAction } from '@reduxjs/toolkit';
    import counterReducer from './counterSlice';
    import restaurantDetailReducer from './restaurantDetailsSlice';
    import orderHistoryReducer from './orderHistorySlice';
    import restaurantListReducer  from './restaurantListSlice';
    import CartReducer from './CartReducer';

import orderTrackingReducer from './orderTrackingSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    restaurantDetails: restaurantDetailReducer,
    restaurantList: restaurantListReducer,
    orderHistory: orderHistoryReducer,
    rider: riderReducer,
    auth: authReducer,
    orderTracking: orderTrackingReducer,
    cart: CartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;