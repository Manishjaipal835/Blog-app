const express = require('express');
const { registrationController, loginController, isLogin, profileController, logoutController } = require('../controllers/Auth.controller');
const router = express.Router()
const blog = require('../modals/Blog.modal');

router.post("/login",loginController)
router.post('/reg',registrationController)
router.post('/logout',logoutController)
router.get('/profile',isLogin,profileController)

module.exports = router;