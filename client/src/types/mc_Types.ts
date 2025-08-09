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
  phone: string;
}

export interface RestaurantCardProps {
  name: string;
  category: string;
  cuisine: string;
  description: string;
  rating: number;
  eta: string;
  priceLevel: string;
  logoText: string;
  freeDelivery?: boolean;
  lat?: number;
  lng?: number;
}


export interface AboutCardProps {
  description: string;
  rating: number;
  deliveryTime: string;
  deliveryFee: string;
  address: string;
  phone: string;
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

export interface User {
  id: string;
  latitude: number;
  longitude: number;
}

export interface Restaurant {
  id: string;
  name: string;
  category: string;
  cuisine: string;
  description: string;
  rating: number;
  eta: string;
  priceLevel: string;
  logoText: string;
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

export interface RestaurantListProps {
  userId: string;
}
