const express = require("express")
const {getUserById,getAllRestaurants} =require('../mc_controllers/RestaurantListCtrl.js') 
const router = express.Router()



router.get('/:userId', getUserById);
router.get('/', getAllRestaurants);

module.exports = router;