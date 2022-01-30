var express = require('express')
var dotenv = require('dotenv')
var path = require('path')
var connectDB = require('./config/db')
var productRoutes = require('./routes/productRoutes')
var variantRoutes = require('./routes/variantRoutes')
var userRoutes = require('./routes/userRoutes')
var orderRoutes = require('./routes/orderRoutes')
var uploadRoutes = require('./routes/uploadRoutes')
var S3Routes = require('./routes/S3Routes')
var {notFound, errorHandler} = require('./middleware/errorMiddleware')

dotenv.config('')

connectDB()

const app = express()

app.use(express.json())

app.use('/api/products' , productRoutes)

app.use('/api/users' , userRoutes)

app.use('/api/variants' , variantRoutes)

app.use('/api/orders' , orderRoutes)

app.use('/api/upload', uploadRoutes)

app.use('/api/s3', S3Routes)


app.get('/api/config/paypal' , (req, res) => 
    res.send(process.env.PAYPAL_CLIENT_ID)
)

const dirname = path.resolve()

app.use('/public', express.static(path.join(dirname, 'frontend/public/images')))

console.log(path.join(dirname, 'public/images'))

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(dirname, 'frontend/build')))

    console.log(path.resolve(dirname, 'frontend' , 'build' , 'index.html'))
    app.get('*' , (req, res) => res.sendFile(path.resolve(dirname, 'frontend' , 'build' , 'index.html')))
}

else {
    app.get('/', (req,res) => {
        res.send('API is running...')
    })
}

app.use(notFound)

app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`))