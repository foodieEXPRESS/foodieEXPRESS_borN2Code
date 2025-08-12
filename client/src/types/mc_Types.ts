export interface MenuItem {
  id: string;
  name: string;
  tags?: string[];
  description: string;
  price: number;
}



export interface AboutCardProps {
  name?: string;
  description: string;
  rating: number;
  deliveryTime: string;
  deliveryFee: string;
  address: string;
  contactPhone: string;
}



export interface StatisticCardProps {
  value: string | number;
  label: string;
  date: string;
  dateLabel: string;

}


export interface RestaurantDetailsState {
  data: any | null;
  loading: boolean;
  error: string | null;
  imageUrl: string | null;
}



export interface Restaurant {
  id: string;
  name: string;
  category: string;
  cuisine: string;
  cuisineType: string;
  description: string;
  rating: number;
  eta: string;
  priceLevel: string;
  logoText: string;
  deliveryTime: string;
  openingHours: string;
  freeDelivery?: boolean;
  latitude: number;
  longitude: number;
}

export interface RestaurantListState {
  user: User | null;
  restaurants: Restaurant[];
  loading: boolean;
  error: string | null;
}



export interface CustomerProfileWithFetchProps {
  userId: string;
}


export interface User {
  id: string;
  fullName: string;
  email: string;
  role: 'CUSTOMER' | 'RESTAURANT' | 'DRIVER';
  phoneNumber: string;
  address: string;
  profileImage?: string | null;
  latitude: number;
  longitude: number;
  createdAt: string;
  updatedAt: string;

  
}

export type UserUpdatePayload = Omit<Partial<User>, 'image'> & {
  image?: File;
};

export interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
  successMessage: string | null;
}

export interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
  successMessage: string | null;
}


