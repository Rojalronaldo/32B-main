const mongoose = require('mongoose')

//Making schema
const productSchema = new mongoose.Schema({
    productName : {
        type: String,
        required : true
    },
    productPrice : {
        type: Number,
        required : true
    },
    productDescription: {
        type: String,
        required : true
    },
    productCategory : {
        type: String,
        required : true
    },
    productImage : {
        type: String,
        required : true
    },

});

//exporting
const products = mongoose.model('products', productSchema);
module.exports = products;