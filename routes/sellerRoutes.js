const express = require('express');
const { addProducts, getAllOrders } = require('../controllers/sellerController');
const { protect, isSeller } = require('../middleware/authMiddleware');

const router = express.Router();


router.route('/create-catalog').post(protect, isSeller, addProducts)
router.route('/orders').get(protect, isSeller, getAllOrders)

module.exports = router