import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type {  PayloadAction } from '@reduxjs/toolkit';
import type {RestaurantListState,User,Restaurant,} from '../types/mc_Types';
import axios from 'axios';



const initialState: RestaurantListState = {
  user: null,
  restaurants: [],
  loading: false,
  error: null,
};

// mc : Fetch the user by his ID

export const fetchUserById = createAsyncThunk<User>(
  'restaurantList/fetchUserById',
  async (_, { rejectWithValue }) => {
     try {
      const token = localStorage.getItem('token');
      const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {}
      const res = await axios.get(`http://localhost:8080/api/restaurants/user`, config)
      console.log('fetchUserById response:', res.data);
      return res.data;
    } catch (error: any) {
      console.error('fetchUserById error:', error.response || error.message);
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);


// mc : update user location

export const updateUserLocation = createAsyncThunk<User, { latitude: number; longitude: number }>(
  'restaurantList/updateUserLocation',
  async ({ latitude, longitude }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};

      const res = await axios.put('http://localhost:8080/api/restaurants/user/location', { latitude, longitude }, config);
      return res.data;  
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

//mc : Fetch the restaurants >>>>>> then >>>>>>>> sort by proximity meaning closed to user location

export const fetchRestaurantsNearUser = createAsyncThunk<
  Restaurant[],
  { userLat: number; userLng: number },
  { rejectValue: string }
>(
  'restaurantList/fetchRestaurantsNearUser',
  async ({ userLat, userLng }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
      const res = await axios.get(`http://localhost:8080/api/restaurants`, config);

      const restaurants: Restaurant[] = res.data;

      const getDistanceKm = (lat1: number, lon1: number, lat2: number, lon2: number) => {
        const R = 6371; // Radius of the Earth in meters
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

      const sortedRestaurants = restaurants
        .map((rest) => ({
          ...rest,
          distance: getDistanceKm(userLat, userLng, rest.latitude, rest.longitude),
        }))
        .sort((a, b) => a.distance - b.distance);

      return sortedRestaurants;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const updateUserProfile = createAsyncThunk<
  User,
  Partial<User> & { picture?: File }, // mc : add profileImage as optional File
  { rejectValue: string }
>(
  'restaurantList/updateUserProfile',
  async (updatedData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const config = token ? { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } } : {};
      
        const formData = new FormData();

      // mc : Append each key except profileImage normally

      (Object.keys(updatedData) as (keyof typeof updatedData)[]).forEach((key) => {
        const value = updatedData[key]
        if (value !== undefined && value !== null) {
          if (key === 'picture' && value instanceof File) {
            formData.append('picture', value)
          } else {
            // mc : Convert non-string to string to be safe

            formData.append(key, String(value))
          }
        }
      });
      
      
      
      const res = await axios.put<User>('http://localhost:8080/api/restaurants/', formData,
 config);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const restaurantListSlice = createSlice({
  name: 'restaurantList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

 
    
      // mc : <<<<<< fetching the user >>>>>>

      // mc : either still loading ...         ⏳
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
       // mc : either fetched successfully ... 👌
      .addCase(fetchUserById.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
      })
      // mc :either failed to fetch            👎
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to fetch user'
      })
      

    // mc : <<<<<< updating the user profile >>>>>>

  .addCase(updateUserProfile.pending, (state) => {
    state.loading = true;
    state.error = null;
  })
  .addCase(updateUserProfile.fulfilled, (state, action: PayloadAction<User>) => {
    state.loading = false;
    state.user = action.payload; // mc : in case of success update the state with new user data
  })
  .addCase(updateUserProfile.rejected, (state, action) => {
    state.loading = false;
    
    state.error = (action.payload as string) || action.error.message || 'Failed to update profile';
  })

     // <<<<<< fetching the Restaurants >>>>>>

      //mc : either still loading ...         ⏳
      .addCase(fetchRestaurantsNearUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      //mc : either fetched successfully ...  👌
      .addCase(fetchRestaurantsNearUser.fulfilled, (state, action: PayloadAction<Restaurant[]>) => {
        state.loading = false;
        state.restaurants = action.payload;
      })
      //mc : either failed to fetch           👎
      .addCase(fetchRestaurantsNearUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch restaurants';
      });
  },
});

export default restaurantListSlice.reducer;
