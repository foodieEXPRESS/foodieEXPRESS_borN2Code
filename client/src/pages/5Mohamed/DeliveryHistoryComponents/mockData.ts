interface DeliverySummaryCard {
  icon: string;
  label: string;
  value: string;
  color: string;
}

interface DeliverySummary {
  totalEarnings: DeliverySummaryCard;
  completedOrders: DeliverySummaryCard;
  canceledOrders: DeliverySummaryCard;
  avgPerOrder: DeliverySummaryCard;
}

interface DeliveryRecord {
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

export const deliverySummary: DeliverySummary = {
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

export const deliveryRecords: DeliveryRecord[] = [
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