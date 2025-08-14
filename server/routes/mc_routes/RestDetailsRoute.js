const express = require("express")
const {getRestbyId,getImageById,menuItemIdImage,getOrderHistoryByUser ,addRestaurantReview} =require('../../controllers/mc_controllers/RestDetailsCtrl') 
const router = express.Router()
const { authenticateToken } = require('../../middleware/auth');
    

router.get('/OrderH', getOrderHistoryByUser);
router.put('/review/:restId', authenticateToken, addRestaurantReview);
router.get('/image/:restId',authenticateToken, getImageById)
router.get('/image/menuitems/:menuItemId', menuItemIdImage)
router.get('/:restId',authenticateToken, getRestbyId)

module.exports = router