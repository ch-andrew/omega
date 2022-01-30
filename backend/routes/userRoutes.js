var express = require('express')
const router = express.Router()
var { authUser, getUserProfile, registerUser, updateUserProfile, getUserById, getUsers, updateUser, deleteUser} = require('../controllers/userController')
var { protect, admin } = require('../middleware/authMiddleware')


router.route('/').post(registerUser).get(protect, admin, getUsers)

router.post('/login', authUser)

router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)

router.route('/:id').delete(protect, admin, deleteUser).get(protect, admin, getUserById).put(protect, admin, updateUser)



module.exports = router