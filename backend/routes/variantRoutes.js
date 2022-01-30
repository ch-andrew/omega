var express = require('express')
const router = express.Router()
var { getVariants, getVariantById, deleteVariant, createVariant, updateVariant, updateStock} = require('../controllers/variantController')
var { protect, admin } = require('../middleware/authMiddleware')

// GET ALL VARIANTS OF ALL PRODUCTS
router.route('/').get(getVariants).post(protect, admin, createVariant)

// GET ALL VARIANTS FOR A PRODUCT BY PRODUCT ID
router.route('/:id').get(getVariantById).delete(protect, admin, deleteVariant).put(protect, admin, updateStock)

module.exports = router