const express = require('express');
const router = express.Router();
const { getDeliveryHistory, getAllOrders, getDeliverySummary } = require('../../controllers/MO_conntrollers/DeliveryHistory');

// Route لجلب سجل التوصيل لسائق معين
router.get('/driver/:driverId', getDeliveryHistory);

// Route جديد لجلب جميع الطلبات (للتجربة)
router.get('/all', getAllOrders);

// Route جديد لجلب ملخص التوصيل
router.get('/summary', getDeliverySummary);

module.exports = router;