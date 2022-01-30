var asyncHandler = require('express-async-handler')
var jwt = require('jsonwebtoken')
var User = require('../models/userModel')

const protect = asyncHandler(async (req,res,next) => {
    let token 

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        console.log('Token found');
        try {
            token = req.headers.authorization.split(' ')[1]

            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            req.user = await User.findById(decoded.id).select('-password')

            next()
        } catch (error) {
            console.error(error);
            res.status(401)
            throw new Error('Not authorized, token failed')
        }
    }

    if(!token) {
        res.status(401)
        throw new Error('Not authorized, token not found')
    }
})

const admin = (req, res, next) => {
    if(req.user && req.user.isAdmin){
        next()
    }

    else {
        res.status(401)
        throw new Error('Not authorized as an admin')
    }
}

module.exports = {protect, admin}