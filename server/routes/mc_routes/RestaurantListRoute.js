const express = require("express")
const {getUserById,getAllRestaurants,updateUserProfile,/*getUserPictureById,*/updateUserLocation} =require('../../controllers/mc_controllers/RestaurantListCtrl') 
const { authenticateToken } = require('../../middleware/auth');
const router = express.Router()

router.get('/', authenticateToken, getAllRestaurants);
router.get('/picture', authenticateToken, /*getUserPictureById*/);
router.get('/user',authenticateToken, getUserById);
router.put('/user/location', authenticateToken, updateUserLocation);
router.put('/', authenticateToken, updateUserProfile);


module.exports = router;