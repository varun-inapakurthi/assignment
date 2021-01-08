const Catalog = require('./../models/catalogModel');
const Product = require('./../models/productModel');
const Order = require('../models/orderModel');


exports.addProducts = async (req, res) => {
    try {
        let { products: allProducts } = req.body;
        allProducts = allProducts.map(product => ({ ...product, user: req.user._id }))
        let products = await Product.insertMany(allProducts);

        let productIds = products.map(product => product._id);
        let catalog = await Catalog.findOne({ user: req.user._id });
        if (catalog) {
            catalog.products = [...catalog.products, ...productIds]
            catalog = await catalog.save()
        } else {
            catalog = await Catalog.create({ user: req.user._id, products: productIds })
        }
        return res.json({
            products,
            catalog
        })

    } catch (error) {

        res.json(error)

    }
}
exports.getAllOrders = async (req, res) => {
    try {
        let orders = await Order.find({ seller: req.user._id }).populate('orderItems', 'name price')
        return res.json({
            orders,
            user: req.user
        })

    } catch (error) {
        res.json(error)
    }
}