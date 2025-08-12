const express = require("express")
const {getUserById,getAllRestaurants,updateUserProfile,updateUserLocation} =require('../../controllers/mc_controllers/RestaurantListCtrl') 
const { authenticateToken } = require('../../middleware/auth');
const { upload } = require ('../../multerConfig.cjs');
const router = express.Router()

router.get('/', authenticateToken, getAllRestaurants);
router.get('/user',authenticateToken, getUserById);
router.put('/user/location', authenticateToken, updateUserLocation);
router.put('/', authenticateToken,upload.single('image'), updateUserProfile); 
// mc : you include 2 middlewares the token and the uploaded image to the updatedProfile

module.exports = router;