var express = require('express')
const router = express.Router()
var { getProducts, getProductById, createProduct, deleteProduct, updateProduct} = require('../controllers/productController')
var { protect, admin } = require('../middleware/authMiddleware')

// @desc Fetch all products
// @route GET/api/products
// @access Public

router.route('/').get(getProducts).post(protect, admin, createProduct)

// @desc Fetch single product
// @route GET/api/products/:id
// @access Public

router.route('/:id').get(getProductById).delete(protect, admin, deleteProduct).put(protect,admin, updateProduct)

module.exports = router