const express=require('express')
const Router=new express.Router()

const userController=require('../controllers/userController')
const Authentication=require('../middlwares/jwtMiddleware')

//on register

Router.post('/register',userController.onRegister)

//onOTP

Router.post('/register/:otp',userController.onVerifyOTP)

//onLogin

Router.post('/login',userController.onLogin)

//onFetchProfile 

Router.get('/fetch/profile',Authentication,userController.onFetchProfile)



module.exports=Router