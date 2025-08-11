const express = require( 'express');
const { upload } = require ('../../multerConfig');
const { authenticateToken } = require('../../middleware/auth') 
const addPicture = require( '../../controllers/mc_controllers/multerCtrl');

const router = express.Router();

// POST /api/upload (single file)

router.post('/pic', authenticateToken,upload.single('image'), addPicture);

module.exports = router;