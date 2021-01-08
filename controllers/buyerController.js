const mongoose = require('mongoose')
const User = require('./../models/userModel');
const Catalog = require('./../models/catalogModel');
const Order = require('../models/orderModel');



exports.getAllSellers = async (req, res) => {

    try {

        let allSellers = await User.find({ typeOfUser: 'seller' });
        if (allSellers) {
            res.json(allSellers)
        } else {
            res.json({ message: "No seller available" })
        }
    } catch (error) {
        res.json(error)
    }

}
exports.getSellerCatalogById = async (req, res) => {
    try {
        let { seller_id } = req.params
        let catalog = await Catalog.findOne({ user: seller_id }).populate('products', 'name price');
        if (catalog) {
            res.json(catalog)
        } else {
            res.json({ message: "Seller catalog not available" })
        }
    } catch (error) {
        res.json(error)
    }

}
exports.createOrder = async (req, res) => {
    try {
        let orders = req.body.orders;
        let buyer = req.user._id;
        let seller = req.params.seller_id;
        let catalog = await Catalog.findOne({ user: seller });
        let checkValidItems = orders.every(order => catalog.products.includes(order));
        if (checkValidItems) {
            let newOrder = await Order.create({ buyer, seller, orderItems: orders });
            let orderDetails = await Order.findOne({ _id: newOrder._id }).populate('orderItems', 'name price')
            res.json(orderDetails)
        } else {
            res.json({ message: "Invalid order items" })
        }

    } catch (error) {
        res.json(error)
    }

}