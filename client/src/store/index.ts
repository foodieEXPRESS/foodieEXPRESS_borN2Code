
import riderReducer from './riderSlice-am';
import authReducer from './authSlice';
    import { configureStore, type Action, type ThunkAction } from '@reduxjs/toolkit';
    import counterReducer from './counterSlice';
    import restaurantDetailReducer from './restaurantDetailsSlice';
    import orderHistoryReducer from './orderHistorySlice';
    import restaurantListReducer  from './restaurantListSlice';
    import CartReducer from './CartReducer';
import restaurantProfileReducer from './restaurantProfileSlice';

import orderTrackingReducer from './orderTrackingSlice';
    import deliveryHistoryReducer from '../pages/5Mohamed/DeliveryHistoryComponents/deliveryHistorySlice';


export const store = configureStore({
  reducer: {
    counter: counterReducer,
    restaurantDetails: restaurantDetailReducer,
    restaurantList: restaurantListReducer,
    orderHistory: orderHistoryReducer,
    rider: riderReducer,
    auth: authReducer,
    restaurantProfile: restaurantProfileReducer,
    orderTracking: orderTrackingReducer,
    cart: CartReducer,
    deliveryHistory: deliveryHistoryReducer
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