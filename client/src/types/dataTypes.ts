export type Role = "CUSTOMER" | "RESTAURANT" | "DRIVER";

export type OrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "PREPARING"
  | "OUT_FOR_DELIVERY"
  | "DELIVERED"
  | "CANCELLED";

export interface User {
  id: string;
  fullName: string;
  email: string;
  password: string;
  role: Role;
  phoneNumber?: string;
  address?: string;
  media?: Media[];
  restaurant?: Restaurant;
  driver?: Driver;
  customerOrders?: Order[];
  reviews?: Review[];
  creditCards?: CreditCard[];
  notifications?: Notification[];
  rooms?: UserRooms[];
  messages?: Message[];
}

export interface Restaurant {
  id: string;
  name: string;
  cuisineType?: string;
  description?: string;
  location?: string;
  contactEmail?: string;
  contactPhone?: string;
  openingHours?: string;
  closingHours?: string;
  rating?: number;
  ownerId: string;
  owner?: User;
  cuisineId: string;
  cuisine?: Cuisine;
  menus?: Menu[];
  orders?: RestaurantOrder[];
  reviews?: Review[];
  notifications?: Notification[];
  media?: Media[];
}

export interface Cuisine {
  id: string;
  name: string;
  restaurants?: Restaurant[];
}

export interface Menu {
  id: string;
  name: string;
  description?: string;
  available: boolean;
  restaurantId: string;
  restaurant?: Restaurant;
  items?: MenuItem[];
  orderItems?: OrderItem[];
  media?: Media[];
}

export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  available: boolean;
  menuId: string;
  menu?: Menu;
  tags?: ItemTags[];
  media?: Media[];
}

export interface Tag {
  id: string;
  name: string;
  items?: ItemTags[];
}

export interface ItemTags {
  itemId: string;
  item?: MenuItem;
  tagId: string;
  tag?: Tag;
}

export interface Media {
  id: string;
  url: string;
  type?: string;
  uploadedAt: string;
  userId?: string;
  restaurantId?: string;
  menuId?: string;
  menuItemId?: string;
  driverId?: string;
  user?: User;
  restaurant?: Restaurant;
  menu?: Menu;
  menuItem?: MenuItem;
  driver?: Driver;
}

export interface Room {
  id: string;
  name?: string;
  participants?: UserRooms[];
  messages?: Message[];
}

export interface UserRooms {
  userId: string;
  user?: User;
  roomId: string;
  room?: Room;
  joinedAt: string;
  role?: string;
}

export interface Message {
  id: string;
  content: string;
  createdAt: string;
  senderId: string;
  sender?: User;
  roomId: string;
  room?: Room;
}

export interface CreditCard {
  id: string;
  cardLast4: string;
  cardBrand: string;
  isDefault: boolean;
  userId: string;
  user?: User;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  userId: string;
  user?: User;
  restaurantId?: string;
  restaurant?: Restaurant;
  driverId?: string;
  driver?: Driver;
  orderId?: string;
  order?: Order;
}

export interface Order {
  id: string;
  status: OrderStatus;
  totalAmount?: number;
  customerId: string;
  customer?: User;
  restaurantId: string;
  restaurant?: RestaurantOrder[];
  driverId?: string;
  driver?: Driver;
  orderItems?: OrderItem[];
  payment?: Payment;
  orderTracking?: OrderTracking;
  notifications?: Notification[];
}

export interface RestaurantOrder {
  restaurantId: string;
  orderId: string;
  restaurant?: Restaurant;
  order?: Order;
}

export interface OrderItem {
  id: string;
  quantity: number;
  price: number;
  orderId: string;
  order?: Order;
  menuId: string;
  menu?: Menu;
}

export interface Driver {
  id: string;
  vehicleInfo?: string;
  isAvailable: boolean;
  userId: string;
  user?: User;
  orders?: Order[];
  notifications?: Notification[];
  media?: Media[];
}

export interface Review {
  id: string;
  rating: number;
  comment?: string;
  userId: string;
  user?: User;
  restaurantId: string;
  restaurant?: Restaurant;
}

export interface Payment {
  id: string;
  method?: string;
  amount?: number;
  status?: string;
  orderId: string;
  order?: Order;
}

export interface OrderTracking {
  id: string;
  status: OrderStatus;
  lastLocation?: string;
  updatedAt: string;
    orderId: string;
  order?: Order;
}