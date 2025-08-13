//---------------------- Media & Tags ----------------------
export type MediaType = 'video' | 'audio' | 'image' | 'document' | 'other';

export interface Media {
  id: string;
  url: string;
  type: MediaType;
  uploadedAt: string;
}

export interface Tag {
  id: string;
  name: string;
}

//---------------------- Menu & Restaurant ----------------------
export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  available: boolean;      // required
  menuId?: string;
  menu?: Menu;
  tags?: string[];
  media?: Media[];
  restaurantName?: string;
}

export interface Menu {
  id: string;
  name: string;
  description?: string;
  available: boolean;
  items: MenuItem[];
  media?: Media[];
}

export interface Review {
  id: string;
  rating: number;
  comment?: string;
  user: {
    id: string;
    fullName: string;
    profileImage?: string | null;
  };
}

export interface RestaurantDetails {
  id: string;
  name: string;
  category?: string;
  cuisine?: string;
  cuisineType?: string;
  description?: string;
  rating?: number;
  eta?: string;
  priceLevel?: string;
  logoText?: string;
  deliveryTime?: string;
  deliveryFee?: string;
  freeDelivery?: boolean;
  latitude?: number;
  longitude?: number;
  openingHours?: string;
  closingHours?: string;
  address?: string;          
  contactPhone?: string;     
  media?: Media[];
  menus: Menu[];
  reviews: Review[];
}

export interface AboutCardProps {
  restaurantId?: string;
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
  data: RestaurantDetails | null;
  loading: boolean;
  error: string | null;
  imageUrl: string | null;
}

export interface RestaurantListState {
  user: User | null;
  restaurants: RestaurantDetails[];
  loading: boolean;
  error: string | null;
}

//---------------------- User Types ----------------------
export interface User {
  id: string;
  fullName: string;
  email: string;
  role: 'CUSTOMER' | 'RESTAURANT' | 'DRIVER';
  phoneNumber?: string;
  address?: string;
  profileImage?: string | null;
  latitude?: number;
  longitude?: number;
  createdAt: string;
  updatedAt: string;
}

export interface CustomerProfileWithFetchProps {
  userId: string;
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

//---------------------- Order Types ----------------------
export interface OrderSummaryCard {
  icon: string;
  label: string;
  value?: number;
  color: string;
}

export interface OrderSummary {
  totalOrders: OrderSummaryCard;
  totalPrice: OrderSummaryCard;
}

export interface OrderRecord {
  id: string;
  status: string;
  totalAmount: number | null;
  createdAt: string;
  customerId: string;
}

export interface OrderHistoryState {
  records: OrderRecord[];
  loading: boolean;
  error: string | null;
  totalOrders: number;
}

export interface FetchOrderHistoryResponse {
  success: boolean;
  totalOrders: number;
  orders: OrderRecord[];
}

//---------------------- Cart Types ----------------------
export interface CartItem {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  tags?: string[];
  restaurantId?: string;
  restaurantName?: string;
}

//---------------------- Constants ----------------------
export const colorMap: Record<string, string> = {
  '#22c55e': 'bg-green-500',   // green
  '#6366f1': 'bg-purple-500',  // purple
  '#f43f5e': 'bg-red-500',     // red
  '#fbbf24': 'bg-yellow-400',  // yellow
};

export const cuisineTypes = [
  'Italian',
  'Chinese',
  'Indian',
  'Mexican',
  'American',
  'French',
  'Japanese',
  'Mediterranean',
  'Thai',
  'Spanish',
];