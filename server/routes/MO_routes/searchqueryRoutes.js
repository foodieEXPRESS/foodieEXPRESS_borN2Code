const express = require('express');
const { searchRestaurants, getCuisines } = require('../../controllers/MO_conntrollers/searchquerycontroller');

const router = express.Router();

// GET /api/search?query=something
router.get('/', searchRestaurants);

// GET /api/search/cuisines
router.get('/cuisines', getCuisines);

module.exports = router;
