const mongoose = require('mongoose');
const orderSchema = mongoose.Schema({
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    orderItems: [{ type: mongoose.Schema.Types.ObjectId, required: true, ref: "Product" }],
},
    {
        timestamps: true
    })

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;