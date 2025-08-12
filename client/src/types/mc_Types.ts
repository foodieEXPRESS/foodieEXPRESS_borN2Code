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
    value: string;
    color: string;
  }

  export interface OrderSummary {
    totalEarnings: OrderSummaryCard;
    completedOrders: OrderSummaryCard;
    canceledOrders: OrderSummaryCard;
    avgPerOrder: OrderSummaryCard;
  }

   export interface OrderTableProps {
    records: OrderRecord[];
  }

  export interface OrderRecord {
    orderId: string;
    customer: string;
    items: number;
    restaurant: string;
    date: string;
    time: string;
    status: 'Completed' | 'Canceled';
    earnings: string;
    tip: string;
  }

 

export interface OrderSummaryCard {
  icon: string;
  label: string;
  value: string;
  color: string;
}


export const colorMap: Record<string, string> = {
  '#22c55e': 'bg-green-500',
  '#6366f1': 'bg-purple-500',
  '#f43f5e': 'bg-red-500',
  '#fbbf24': 'bg-yellow-400',
};

  export const orderSummary: OrderSummary = {
    totalEarnings: {
      icon: '✔️',
      label: 'Total Earnings',
      value: '$103.50',
      color: '#22c55e',
    },
    completedOrders: {
      icon: '⭐',
      label: 'Completed Orders',
      value: '8',
      color: '#6366f1',
    },
    canceledOrders: {
      icon: '⛔',
      label: 'Canceled Orders',
      value: '2',
      color: '#f43f5e',
    },
    avgPerOrder: {
      icon: '⏰',
      label: 'Avg. Per Order',
      value: '$12.94',
      color: '#fbbf24',
    },
  };

  export const orderRecords: OrderRecord[] = [
    {
      orderId: 'ORD-2024-1547',
      customer: 'Sarah Johnson',
      items: 3,
      restaurant: 'Bella Italia',
      date: 'Jan 15, 2024',
      time: '2:45 PM',
      status: 'Completed',
      earnings: '12.50',
      tip: '5.00',
    },
    {
      orderId: 'ORD-2024-1546',
      customer: 'Mike Chen',
      items: 2,
      restaurant: 'Sushi Master',
      date: 'Jan 15, 2024',
      time: '1:30 PM',
      status: 'Completed',
      earnings: '15.75',
      tip: '7.25',
    },
    {
      orderId: 'ORD-2024-1545',
      customer: 'Emma Wilson',
      items: 4,
      restaurant: 'Pizza Palace',
      date: 'Jan 15, 2024',
      time: '12:15 PM',
      status: 'Completed',
      earnings: '9.25',
      tip: '3.50',
    },
    {
      orderId: 'ORD-2024-1544',
      customer: 'David Brown',
      items: 2,
      restaurant: 'Burger House',
      date: 'Jan 14, 2024',
      time: '8:45 PM',
      status: 'Completed',
      earnings: '11.00',
      tip: '4.00',
    },
  ]; 