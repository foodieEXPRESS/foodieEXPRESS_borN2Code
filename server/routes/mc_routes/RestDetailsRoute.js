const express = require("express")
const {getRestbyId} =require('../../controllers/mc_controllers/RestDetailsCtrl') 
const router = express.Router()



router.get('/:restId',getRestbyId)


module.exports = router