const mongoose = require('mongoose');


const CatalogSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
        unique: true
    },
    products: [{ type: mongoose.Schema.Types.ObjectId, required: true, ref: "Product" }]
},
    {
        timestamps: true
    })

const Catalog = mongoose.model('Catalog', CatalogSchema);

module.exports = Catalog;