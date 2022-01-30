var asyncHandler = require('express-async-handler')
var Variant = require('../models/variantModel')
var Product = require('../models/productModel')

// @desc Fetch all products
// @route GET/api/products
// @access Public

const getProducts = asyncHandler(async(req, res) => {
    const pageSize = Number(req.query.pageSize) || 8

    const category = req.query.category || '' 
    const gender = req.query.gender ? (req.query.gender[0].toUpperCase() + req.query.gender.slice(1)) : ''
    // console.log(gender);
    const page = Number(req.query.pageNumber) || 1
    // console.log(page);

    const keyword = req.query.keyword ? {
        name: {
            $regex: req.query.keyword,
            $options: 'i'
        }
    } : {}

    const allProducts = await Product.find({})

    const categoriesData = allProducts.map(product => {
        return product.category
    })
    

    const categories = categoriesData.filter((val, idx) => categoriesData.indexOf(val) === idx)

    categories.push('all')

    categories.sort()

    const count = await Product.countDocuments({...keyword})

    if(gender && category !== 'all'){
        const products = await Product.find({ ...keyword, gender: gender, category: category}).limit(pageSize).skip(pageSize * (page - 1))
        res.json({categories, products, page, pages: Math.ceil(count / pageSize)})
    }

    else if(gender && category === 'all'){
        const category = ''
        const products = await Product.find({ ...keyword, gender: gender, ...category}).limit(pageSize).skip(pageSize * (page - 1))
        res.json({categories, products, page, pages: Math.ceil(count / pageSize)})
    }

    else if(gender && !category){
        const products = await Product.find({ ...keyword, gender: gender, ...category}).limit(pageSize).skip(pageSize * (page - 1))
        res.json({categories, products, page, pages: Math.ceil(count / pageSize)})
    }

    else {
        const products = await Product.find({ ...keyword, ...gender, ...category}).limit(pageSize).skip(pageSize * (page - 1))
        res.json({categories, products, page, pages: Math.ceil(count / pageSize)})
    }
    
})

const getProductById = asyncHandler(async(req, res) => {
    const product = await Product.findById(req.params.id)

    if(product){
        res.json(product)
    }

    else {
        res.status(404)
        throw new Error('Product not found')
    }
})

const createProduct = asyncHandler(async(req, res) => {
    const {name, description, category, gender, price, defaultColor} = req.body

    const product = await Product.create({
        name,
        description,
        category,
        gender,
        defaultColor,
        price,
    })

    const createdProduct = await product.save()

    if(createdProduct._id){
        res.status(201).json(createdProduct)
    }

})

const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if(product){
        const variants = await Variant.deleteMany({"productId" : req.params.id})
        console.log(variants);
        await product.remove()
        res.json({message: 'Product is removed'})
    }

    else {
        res.status(404)
        throw new Error('Product not found')
    }

})

const updateProduct = asyncHandler(async(req, res) => {
    const {name, description, category, gender, price, defaultColor} = req.body

    const product = await Product.findById(req.params.id)

    if(product){
        product.name = name || product.name
        product.description = description || product.description
        product.category = category || product.category
        product.gender = gender || product.gender
        product.price = price || product.price
        product.defaultColor = defaultColor || product.defaultColor

        const updatedProduct = await product.save()
        res.json(updatedProduct)
    }

    else {
        res.status(404)
        throw new Error('Product not found')
    }

})


module.exports = {getProducts, getProductById, createProduct, deleteProduct, updateProduct}