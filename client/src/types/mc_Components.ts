export interface MenuItem {
  id: string;
  name: string;
  category: string;
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
