const express = require("express")
const {getRestbyId,getImageById} =require('../../controllers/mc_controllers/RestDetailsCtrl') 
const router = express.Router()
const { authenticateToken } = require('../../middleware/auth');
    

router.get('/:restId',authenticateToken, getRestbyId)
router.get('/image/:restId',authenticateToken, getImageById)


module.exports = router