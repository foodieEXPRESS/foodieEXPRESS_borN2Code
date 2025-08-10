const express = require('express');
const router = express.Router();

const { getOrderRestaurantDetails } = require('../../controllers/am_controller/orderDetailsTracking.controller.js');
const { authenticateToken } = require('../../middleware/auth.js');
router.get('/restaurant/:orderId', authenticateToken,getOrderRestaurantDetails);
