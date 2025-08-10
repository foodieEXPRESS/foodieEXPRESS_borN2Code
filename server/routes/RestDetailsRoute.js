const express = require("express")
const {getRestbyId} =require('../controllers/RestDetailsCtrl') 
const router = express.Router()



router.get('/:restId',getRestbyId)


module.exports = router