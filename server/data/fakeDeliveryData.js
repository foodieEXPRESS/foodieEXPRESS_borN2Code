// ============================================================================
// FAKE DELIVERY DATA
// ============================================================================
// This file contains mock data for delivery system testing
// Used until real database data is prepared
// ============================================================================

// ============================================================================
// SUMMARY DATA STRUCTURE
// ============================================================================
const createSummaryData = () => ({
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
});

// ============================================================================
// ORDER STATUS CONSTANTS
// ============================================================================
const ORDER_STATUS = {
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  PREPARING: 'PREPARING',
  OUT_FOR_DELIVERY: 'OUT_FOR_DELIVERY',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED'
};

// ============================================================================
// RESTAURANT DATA
// ============================================================================
const RESTAURANTS = [
  'Bella Italia',
  'Sushi Master',
  'Burger Palace',
  'Pizza Express',
  'Taco Fiesta',
  'Chicken King',
  'Salad Bar',
  'Steak House',
  'Noodle World',
  'Fish Market',
  'Dessert Corner',
  'BBQ Grill',
  'Vegan Delight',
  'Mexican Spice'
];

// ============================================================================
// CUSTOMER DATA
// ============================================================================
const CUSTOMERS = [
  'Sarah Johnson',
  'Mike Chen',
  'Emily Davis',
  'David Wilson',
  'Lisa Brown',
  'John Smith',
  'Maria Garcia',
  'Tom Anderson',
  'Anna Lee',
  'Robert Taylor',
  'Jennifer White',
  'Michael Johnson',
  'Amanda Clark',
  'Kevin Martinez'
];

// ============================================================================
// ORDER GENERATION FUNCTIONS
// ============================================================================

/**
 * Generate a single order with realistic data
 * @param {string} orderId - Unique order ID
 * @param {string} customer - Customer name
 * @param {string} restaurant - Restaurant name
 * @param {string} date - Order date
 * @param {string} time - Order time
 * @param {string} status - Order status
 * @param {number} items - Number of items
 * @param {number} earnings - Driver earnings
 * @param {number} tip - Customer tip
 * @returns {Object} - Generated order
 */
const generateOrder = (orderId, customer, restaurant, date, time, status, items, earnings, tip) => ({
  orderId,
  customer,
  items,
  restaurant,
  date,
  time,
  status,
  earnings: earnings.toString(),
  tip: tip.toString()
});

/**
 * Generate sample orders data
 * @returns {Array} - Array of generated orders
 */
const generateOrdersData = () => [
  // January 15, 2024 Orders
  generateOrder('ORD-2024-001', CUSTOMERS[0], RESTAURANTS[0], 'Jan 15, 2024', '2:45 PM', ORDER_STATUS.COMPLETED, 3, 18.50, 5.00),
  generateOrder('ORD-2024-002', CUSTOMERS[1], RESTAURANTS[1], 'Jan 15, 2024', '1:30 PM', ORDER_STATUS.COMPLETED, 2, 22.75, 7.25),
  generateOrder('ORD-2024-003', CUSTOMERS[2], RESTAURANTS[2], 'Jan 15, 2024', '12:15 PM', ORDER_STATUS.COMPLETED, 4, 25.00, 8.00),
  generateOrder('ORD-2024-004', CUSTOMERS[3], RESTAURANTS[3], 'Jan 15, 2024', '11:00 AM', ORDER_STATUS.OUT_FOR_DELIVERY, 1, 15.50, 3.50),
  generateOrder('ORD-2024-005', CUSTOMERS[4], RESTAURANTS[4], 'Jan 15, 2024', '10:30 AM', ORDER_STATUS.PREPARING, 2, 12.75, 2.25),
  
  // January 14, 2024 Orders
  generateOrder('ORD-2024-006', CUSTOMERS[5], RESTAURANTS[5], 'Jan 14, 2024', '9:45 PM', ORDER_STATUS.COMPLETED, 3, 28.00, 10.00),
  generateOrder('ORD-2024-007', CUSTOMERS[6], RESTAURANTS[6], 'Jan 14, 2024', '8:20 PM', ORDER_STATUS.COMPLETED, 1, 16.25, 4.75),
  generateOrder('ORD-2024-008', CUSTOMERS[7], RESTAURANTS[7], 'Jan 14, 2024', '7:15 PM', ORDER_STATUS.COMPLETED, 2, 35.00, 12.00),
  generateOrder('ORD-2024-009', CUSTOMERS[8], RESTAURANTS[8], 'Jan 14, 2024', '6:30 PM', ORDER_STATUS.CANCELLED, 3, 0.00, 0.00),
  generateOrder('ORD-2024-010', CUSTOMERS[9], RESTAURANTS[9], 'Jan 14, 2024', '5:45 PM', ORDER_STATUS.COMPLETED, 2, 31.50, 9.50),
  generateOrder('ORD-2024-011', CUSTOMERS[10], RESTAURANTS[10], 'Jan 14, 2024', '4:20 PM', ORDER_STATUS.COMPLETED, 1, 8.75, 2.25),
  generateOrder('ORD-2024-012', CUSTOMERS[11], RESTAURANTS[11], 'Jan 14, 2024', '3:10 PM', ORDER_STATUS.COMPLETED, 4, 42.00, 15.00),
  generateOrder('ORD-2024-013', CUSTOMERS[12], RESTAURANTS[12], 'Jan 14, 2024', '2:00 PM', ORDER_STATUS.CANCELLED, 2, 0.00, 0.00),
  generateOrder('ORD-2024-014', CUSTOMERS[13], RESTAURANTS[13], 'Jan 14, 2024', '1:15 PM', ORDER_STATUS.COMPLETED, 3, 26.25, 8.75)
];

// ============================================================================
// MAIN DATA OBJECT
// ============================================================================
const fakeDeliveryData = {
  // Summary information
  summary: createSummaryData(),
  
  // Orders collection
  orders: generateOrdersData(),
  
  // Metadata
  metadata: {
    totalOrders: 14,
    totalRestaurants: RESTAURANTS.length,
    totalCustomers: CUSTOMERS.length,
    dateRange: {
      start: 'Jan 14, 2024',
      end: 'Jan 15, 2024'
    },
    statusDistribution: {
      COMPLETED: 12,
      CANCELLED: 2,
      OUT_FOR_DELIVERY: 1,
      PREPARING: 1
    }
  }
};

// ============================================================================
// EXPORTS
// ============================================================================
module.exports = fakeDeliveryData;
