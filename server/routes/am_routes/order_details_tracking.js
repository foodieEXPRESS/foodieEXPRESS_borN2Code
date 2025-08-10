const express = require('express');
const router = express.Router();
const {
  getOrderDetails,
  getOrderTracking,
  updateOrderTracking,
  getDriverOrders,
  getOrderCustomer,
  getOrderRestaurant,
  getOrderItems,
  getOrderStatus
} = require('../../controllers/am_controller/orderDetailsTracking.controller');
const { authenticateToken } = require('../../middleware/auth');

// Get order details with all related information
router.get('/order/:orderId',  authenticateToken, getOrderDetails);

// Get order tracking status
router.get('/tracking/:orderId', authenticateToken, getOrderTracking);

// Update order tracking status
router.put('/tracking/:orderId', authenticateToken, updateOrderTracking);

// Get all orders for a specific driver
router.get('/driver/:driverId/orders', authenticateToken, getDriverOrders);

// Get customer information from an order
router.get('/order/:orderId/customer', authenticateToken, getOrderCustomer);

// Get restaurant information from an order
router.get('/order/:orderId/restaurant', authenticateToken, getOrderRestaurant);

// Get all order items with quantity and price
router.get('/order/:orderId/items', authenticateToken, getOrderItems);

// Get order status
router.get('/order/:orderId/status', authenticateToken, getOrderStatus);

module.exports = router;
