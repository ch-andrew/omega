var asyncHandler = require('express-async-handler')
var Variant = require('../models/variantModel')
var Product = require('../models/productModel')

const getVariants = asyncHandler(async (req,res) => {
    const variants = await Variant.find({})
    res.json(variants)
})

const getVariantById = asyncHandler(async(req,res) => {
    const variant = await Variant.find({productId : req.params.id})

    if(variant){
        res.json(variant)
    }

    else {
        res.status(404)
        throw new Error('Product not found')
    }
})

const createVariant = asyncHandler(async(req, res) => {
    const {productId, color, colorCodes, image, stock } = req.body

    const product = await Product.findById(productId)

    if(product){
        const variant = await Variant.create({
            productId,
            color,
            colorCodes,
            image,
            stock
        })

        const createdVariant = await variant.save()

        res.status(201).json(createdVariant)
    }

    else {
        res.status(404)
        throw new Error('Product not found')
    }
})

const updateVariant = asyncHandler(async (req, res) => {
    const { color, colorCodes, image, stock } = req.body

    const variant = await Variant.findById(req.params.id)

    if(variant){
        variant.color = color
        variant.colorCodes = colorCodes
        variant.image = image
        variant.stock = stock

        const updatedVariant = await variant.save()
        res.json(updatedVariant)
    }

    else {
        res.status(404)
        throw new Error('Variant not found')
    }

})

const updateStock = asyncHandler(async (req, res) => {
    const { operator, size} = req.body
    
    const variant = await Variant.findById(req.params.id)

    if(variant && operator){
        if(operator == 'add'){
            variant.stock[size] = variant.stock[size] + 1
            const updatedVariant = await variant.save()
            res.json(updatedVariant)
        }

        else {
            variant.stock[size] = variant.stock[size] - 1
            const updatedVariant = await variant.save()
            res.json(updatedVariant)
        }

    }

    else {
        res.status(404)
        throw new Error('Variant not found')
    }
})

const deleteVariant = asyncHandler(async (req, res) => {
    const variant = await Variant.findById(req.params.id)
    if(variant){
        await variant.remove()
        res.json({message: 'Product variant is removed'})
    }

    else {
        res.status(404)
        throw new Error('Product variant not found')
    }

})

module.exports = {getVariants, getVariantById, createVariant, deleteVariant, updateVariant, updateStock}