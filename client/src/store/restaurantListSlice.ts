import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type {  PayloadAction } from '@reduxjs/toolkit';
import type {RestaurantListState,User,Restaurant,} from '../types/mc_Types';
import axios from 'axios';



const initialState: RestaurantListState = {
  user: null,
  userPictureUrl: null, 
  restaurants: [],
  loading: false,
  error: null,
};

// mc : Fetch the user by his ID

export const fetchUserById = createAsyncThunk<User, string>(
  'restaurantList/fetchUserById',
  async (userId) => {
    const res = await axios.get(`http://localhost:8080/api/restaurants/${userId}`);
    return res.data; 
  }
);
// mc : Fetch the picture of the user by his ID

export const fetchUserPictureById = createAsyncThunk<string | null, string>(
  'restaurantList/fetchUserPictureById',
  async (userId) => {
    try {
      const picRes = await axios.get(`http://localhost:8080/api/restaurants/picture/${userId}`);
      return picRes.data;  
    } catch (err) {
      return null; 
    }
  }
);

//mc : Fetch the restaurants >>>>>> then >>>>>>>> sort by proximity meaning closed to user location

export const fetchRestaurantsNearUser = createAsyncThunk<
  Restaurant[],
  { userLat: number; userLng: number }
>('restaurantList/fetchRestaurantsNearUser', async ({ userLat, userLng }) => {
  const res = await axios.get(`http://localhost:8080/api/restaurants`);

  const restaurants: Restaurant[] = res.data;

  const getDistanceKm = (lat1: number, lon1: number, lat2: number, lon2: number) => {

    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  return restaurants
    .map((rest) => ({
      ...rest,
      distance: getDistanceKm(userLat, userLng, rest.latitude, rest.longitude),
    }))
    .sort((a, b) => a.distance - b.distance);
});

const restaurantListSlice = createSlice({
  name: 'restaurantList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // mc : <<<<<< fetching the user picture >>>>>>
     .addCase(fetchUserPictureById.pending, (state) => {
      state.userPictureUrl = null;
    })
    .addCase(fetchUserPictureById.fulfilled, (state, action: PayloadAction<string | null>) => {
      state.userPictureUrl = action.payload;
    })
    .addCase(fetchUserPictureById.rejected, (state) => {
      state.userPictureUrl = null;
    })

      // mc : <<<<<< fetching the user >>>>>>

      // mc : either still loading ... ⏳
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
       // mc : either fetched successfully ... 👌
      .addCase(fetchUserById.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
      })
      // mc :either failed to fetch  👎
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch user';
      })

     // <<<<<< fetching the Restaurants >>>>>>

      // either still loading ... ⏳
      .addCase(fetchRestaurantsNearUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // either fetched successfully ... 👌
      .addCase(fetchRestaurantsNearUser.fulfilled, (state, action: PayloadAction<Restaurant[]>) => {
        state.loading = false;
        state.restaurants = action.payload;
      })
      //either failed to fetch  👎
      .addCase(fetchRestaurantsNearUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch restaurants';
      });
  },
});

export default restaurantListSlice.reducer;
