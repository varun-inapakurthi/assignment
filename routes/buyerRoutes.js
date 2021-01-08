const express = require('express');
const { getAllSellers, getSellerCatalogById, createOrder } = require('../controllers/buyerController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();


router.route('/list-of-sellers').get(protect, getAllSellers)
router.route('/seller-catalog/:seller_id').get(protect, getSellerCatalogById)
router.route('/create-order/:seller_id').post(protect, createOrder)

module.exports = router