const express = require('express');
const router = express.Router();
const { getDeliveryHistory } = require('../../controllers/MO_conntrollers/DeliveryHistory');

// Route to get delivery history for a specific driver
router.get('/driver/:driverId', getDeliveryHistory);

module.exports = router;