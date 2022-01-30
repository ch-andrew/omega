// var mongoose = require('mongoose')
var dotenv = require('dotenv')
var users = require('./database/temp-users')
var products = require('./database/temp-products')
var variants = require('./database/temp-variants')
var User = require('./models/userModel')
var Product = require('./models/productModel')
var Variant = require('./models/variantModel')
var Order = require('./models/orderModel')
var connectDB = require('./config/db')

dotenv.config('')

connectDB()

const importData = async () => {
    try {
        await User.deleteMany()
        await Product.deleteMany()
        await Variant.deleteMany()
        await Order.deleteMany()

        const createdUsers = await User.insertMany(users)

        const adminUser = createdUsers.find(user => user.isAdmin === true)

        const sampleProducts = products.map(product => {
            return {...product, user: adminUser}
        })

        const sampleVariants = variants.map(variant => {
            return {...variant, productId: '61a610fff939180329e9b6fd'}
        })
        
        await Product.insertMany(sampleProducts)
        await Variant.insertMany(sampleVariants)

        console.log('Data Imported');
        process.exit()
    } catch (error) {
        console.error(`${error}`);
        process.exit(1)
    }
}

// const importVariants = async () => {
//     try {
//         await User.deleteMany()
//         await Product.deleteMany()
//         await Variant.deleteMany()
//         await Order.deleteMany()

//         const createdUsers = await User.insertMany(users)

//         const adminUser = createdUsers.find(user => user.isAdmin === true)

//         const sampleProducts = products.map(product => {
//             return {...product, user: adminUser}
//         })
        
//         const sampleVariants = variants.map(variant => {
//             return {...variant}
//         })

//         await Product.insertMany(sampleProducts)
//         await Variant.insertMany(sampleVariants)

//         console.log('Data Imported');
//         process.exit()
//     } catch (error) {
//         console.error(`${error}`);
//         process.exit(1)
//     }
// }

const destroyData = async () => {
    try {
        await User.deleteMany()
        await Product.deleteMany()
        await Variant.deleteMany()
        await Order.deleteMany()

        console.log('Data Destroyed');
        process.exit()
    } catch (error) {
        console.error(`${error}`);
        process.exit(1)
    }
}

if(process.argv[2] === '-d'){
    destroyData()
}

else {
    importData()
}