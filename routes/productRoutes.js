const router = require('express').Router()
const productController = require('../controllers/productController')

// Make a create user API
router.post('/create',productController.Createproduct)

//fetch all
router.get('/get_all_products', productController.getAllProducts)

//  fetch single product
// IF POST, body(data)/
router.get('/get_single_product/:id',productController.getProduct)

// exporting
module.exports = router;