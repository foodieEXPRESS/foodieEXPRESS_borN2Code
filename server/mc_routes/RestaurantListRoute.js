const express = require("express")
const {getUserById} =require('../mc_controllers/RestaurantListCtrl.js') 
const router = express.Router()



router.get('/user/:userId', getUserById);

module.exports = router