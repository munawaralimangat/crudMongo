const express = require('express')
const router = express.Router()
const passport = require('passport')

const {
    registerView,
    loginView,
    registerUser,
    loginUser,
    loginView2,

    } = require('../controller/loginController')

const {
    dashbordView,
    logOut,
    updateInfo,
    editView,
    removeInfo
} = require('../controller/dashbordcontroller')

const {protectRoute} = require('../../auth/protect')
const { loginCheck } = require('../../auth/passport')


router.get('/register',registerView);
router.get('/login',loginView)
router.get('/dashbord',protectRoute,dashbordView)
router.get('/edit',protectRoute,editView)

//register and login
router.post('/register',registerUser)
router.post('/login',loginUser)

//editInfo
router.post('/edit/:_id',updateInfo)
//deleteInfo
router.delete('/dashbord/:_id',removeInfo)

//logout
router.get('/logout',logOut)

module.exports = router;