const express = require('express');
const router = express.Router();
const restaurantProfileController = require('../../controllers/restaurantprofile/restaurantProfileController');
const {authenticateToken} = require('../../middleware/auth');
const { 
  checkMenuAccess, 
  checkMenuItemAccess, 
  checkOrderAccess 
} = require('../../middleware/restaurantAuth');

// Apply authentication middleware to all routes
router.use(authenticateToken);

// Restaurant Profile Routes (no restaurantId needed - gets from authenticated user)
router.get('/profile', restaurantProfileController.getRestaurantProfile);
router.put('/profile', restaurantProfileController.updateRestaurantProfile);

// Dashboard Routes
router.get('/dashboard', restaurantProfileController.getRestaurantDashboard);

// Menu Management Routes
router.get('/menus', restaurantProfileController.getRestaurantMenus);
router.post('/menus', restaurantProfileController.createMenu);
router.put('/menus/:menuId', checkMenuAccess, restaurantProfileController.updateMenu);
router.delete('/menus/:menuId', checkMenuAccess, restaurantProfileController.deleteMenu);

// Menu Item Management Routes
router.get('/menus/:menuId/items', checkMenuAccess, restaurantProfileController.getMenuItems);
router.post('/menus/:menuId/items', checkMenuAccess, restaurantProfileController.createMenuItem);
router.put('/menus/:menuId/items/:itemId', checkMenuItemAccess, restaurantProfileController.updateMenuItem);
router.delete('/menus/:menuId/items/:itemId', checkMenuItemAccess, restaurantProfileController.deleteMenuItem);

// Order Management Routes
router.get('/orders', restaurantProfileController.getRestaurantOrders);
router.put('/orders/:orderId/status', checkOrderAccess, restaurantProfileController.updateOrderStatus);

// Earnings & Reports Routes
router.get('/earnings', restaurantProfileController.getRestaurantEarnings);

// Reviews Management Routes
router.get('/reviews', restaurantProfileController.getRestaurantReviews);

module.exports = router;
