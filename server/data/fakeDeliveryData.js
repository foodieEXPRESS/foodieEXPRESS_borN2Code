// بيانات مزيفة للتوصيل - تستخدم حتى تجهز البيانات الحقيقية
const fakeDeliveryData = {
  // بيانات الملخص
  summary: {
    totalEarnings: {
      icon: '✔️',
      label: 'Total Earnings',
      value: '$245.75',
      color: '#22c55e',
    },
    completedOrders: {
      icon: '⭐',
      label: 'Completed Orders',
      value: '12',
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
      value: '$20.48',
      color: '#fbbf24',
    },
  },

  // بيانات الطلبات
  orders: [
    {
      orderId: 'ORD-2024-001',
      customer: 'Sarah Johnson',
      items: 3,
      restaurant: 'Bella Italia',
      date: 'Jan 15, 2024',
      time: '2:45 PM',
      status: 'DELIVERED',
      earnings: '18.50',
      tip: '5.00'
    },
    {
      orderId: 'ORD-2024-002',
      customer: 'Mike Chen',
      items: 2,
      restaurant: 'Sushi Master',
      date: 'Jan 15, 2024',
      time: '1:30 PM',
      status: 'DELIVERED',
      earnings: '22.75',
      tip: '7.25'
    },
    {
      orderId: 'ORD-2024-003',
      customer: 'Emily Davis',
      items: 4,
      restaurant: 'Burger Palace',
      date: 'Jan 15, 2024',
      time: '12:15 PM',
      status: 'DELIVERED',
      earnings: '25.00',
      tip: '8.00'
    },
    {
      orderId: 'ORD-2024-004',
      customer: 'David Wilson',
      items: 1,
      restaurant: 'Pizza Express',
      date: 'Jan 15, 2024',
      time: '11:00 AM',
      status: 'OUT_FOR_DELIVERY',
      earnings: '15.50',
      tip: '3.50'
    },
    {
      orderId: 'ORD-2024-005',
      customer: 'Lisa Brown',
      items: 2,
      restaurant: 'Taco Fiesta',
      date: 'Jan 15, 2024',
      time: '10:30 AM',
      status: 'PREPARING',
      earnings: '12.75',
      tip: '2.25'
    },
    {
      orderId: 'ORD-2024-006',
      customer: 'John Smith',
      items: 3,
      restaurant: 'Chicken King',
      date: 'Jan 14, 2024',
      time: '9:45 PM',
      status: 'DELIVERED',
      earnings: '28.00',
      tip: '10.00'
    },
    {
      orderId: 'ORD-2024-007',
      customer: 'Maria Garcia',
      items: 1,
      restaurant: 'Salad Bar',
      date: 'Jan 14, 2024',
      time: '8:20 PM',
      status: 'DELIVERED',
      earnings: '16.25',
      tip: '4.75'
    },
    {
      orderId: 'ORD-2024-008',
      customer: 'Tom Anderson',
      items: 2,
      restaurant: 'Steak House',
      date: 'Jan 14, 2024',
      time: '7:15 PM',
      status: 'DELIVERED',
      earnings: '35.00',
      tip: '12.00'
    },
    {
      orderId: 'ORD-2024-009',
      customer: 'Anna Lee',
      items: 3,
      restaurant: 'Noodle World',
      date: 'Jan 14, 2024',
      time: '6:30 PM',
      status: 'CANCELLED',
      earnings: '0.00',
      tip: '0.00'
    },
    {
      orderId: 'ORD-2024-010',
      customer: 'Robert Taylor',
      items: 2,
      restaurant: 'Fish Market',
      date: 'Jan 14, 2024',
      time: '5:45 PM',
      status: 'DELIVERED',
      earnings: '31.50',
      tip: '9.50'
    },
    {
      orderId: 'ORD-2024-011',
      customer: 'Jennifer White',
      items: 1,
      restaurant: 'Dessert Corner',
      date: 'Jan 14, 2024',
      time: '4:20 PM',
      status: 'DELIVERED',
      earnings: '8.75',
      tip: '2.25'
    },
    {
      orderId: 'ORD-2024-012',
      customer: 'Michael Johnson',
      items: 4,
      restaurant: 'BBQ Grill',
      date: 'Jan 14, 2024',
      time: '3:10 PM',
      status: 'DELIVERED',
      earnings: '42.00',
      tip: '15.00'
    },
    {
      orderId: 'ORD-2024-013',
      customer: 'Amanda Clark',
      items: 2,
      restaurant: 'Vegan Delight',
      date: 'Jan 14, 2024',
      time: '2:00 PM',
      status: 'CANCELLED',
      earnings: '0.00',
      tip: '0.00'
    },
    {
      orderId: 'ORD-2024-014',
      customer: 'Kevin Martinez',
      items: 3,
      restaurant: 'Mexican Spice',
      date: 'Jan 14, 2024',
      time: '1:15 PM',
      status: 'DELIVERED',
      earnings: '26.25',
      tip: '8.75'
    }
  ]
};

module.exports = fakeDeliveryData;
