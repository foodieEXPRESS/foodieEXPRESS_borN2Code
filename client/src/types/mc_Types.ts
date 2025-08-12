export interface MenuItem {
  id: string;
  name: string;
  tags?: string[];
  description: string;
  price: number;
  restaurantName?: string;
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

   export interface OrderTableProps {
    records: OrderRecord[];
  }

  export interface OrderRecord {
    orderId: string;
    owner: string;
    items: number;
    restaurant: string;
    date: string;
    time: string;
    prices: string;
  }

export const colorMap: Record<string, string> = {
  '#22c55e': 'bg-green-500',
  '#6366f1': 'bg-purple-500',
  '#f43f5e': 'bg-red-500',
  '#fbbf24': 'bg-yellow-400',
};

  export const orderSummary: OrderSummary = {
    totalOrders: {
      icon: '✔️',
      label: 'Total Orders',
      color: '#22c55e',
    },
    totalPrice: {
      icon: '⭐',
      label: 'Total Price',
      color: '#6366f1',
    }
  };

  export const orderRecords: OrderRecord[] = [
    {
      orderId: 'ORD-2024-1547',
      owner: 'Sarah Johnson',
      items: 3,
      restaurant: 'Bella Italia',
      date: 'Jan 15, 2024',
      time: '2:45 PM',
      prices: '12.50',
    },
    {
      orderId: 'ORD-2024-1546',
      owner: 'Mike Chen',
      items: 2,
      restaurant: 'Sushi Master',
      date: 'Jan 15, 2024',
      time: '1:30 PM',
      prices: '15.75',
    },
    {
      orderId: 'ORD-2024-1545',
      owner: 'Emma Wilson',
      items: 4,
      restaurant: 'Pizza Palace',
      date: 'Jan 15, 2024',
      time: '12:15 PM',
      prices: '9.25',
    },
    {
      orderId: 'ORD-2024-1544',
      owner: 'David Brown',
      items: 2,
      restaurant: 'Burger House',
      date: 'Jan 14, 2024',
      time: '8:45 PM',
      prices: '11.00',
    },
  ]; 

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
