const express = require('express');
const router = express.Router();
const { getDeliveryHistory, getAllOrders, getDeliverySummary } = require('../../controllers/MO_conntrollers/DeliveryHistory');

// Route to get delivery history for a specific driver
router.get('/driver/:driverId', getDeliveryHistory);

// New route to get all orders (for testing)
router.get('/all', getAllOrders);

// New route to get delivery summary
router.get('/summary', getDeliverySummary);

module.exports = router;