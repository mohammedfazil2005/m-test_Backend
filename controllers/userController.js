const users=require('../models/userModel')
const randomString=require('randomstring')
const jwt=require('jsonwebtoken')
const sendOTP=require('../middlwares/emailMiddleware')


let userData={}
//on user Register
exports.onRegister=async(req,res)=>{
    const {name,email,password}=req.body
    try {
        const  isUserAlreadyExists=await users.findOne({email})
        if(isUserAlreadyExists){
            res.status(409).json({message:"User already exists!"})
        }else{
            let expiryDate=new Date(Date.now()+5*60*1000)
            let OTP=randomString.generate({charset:'numeric',length:6})
            userData={
                name:name,
                email:email,
                password:password,
                isValid:false,
                otp:OTP,
                expiryDate:expiryDate
            }
            console.log(userData)
            let otpFunction=await sendOTP(email,OTP)
            if(otpFunction.status==200){
                res.status(201).json({message:"OTP sent succesfully!"})
            }else{
                console.log('bad')
                res.status(400).json({message:otpFunction.message})
            }
         
        }
        
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }

}
//onOTP
exports.onVerifyOTP=async(req,res)=>{
    const OTP=req.params.otp
    if(userData.otp==OTP){
        if(userData.expiryDate<Date.now()){
            res.status(401).json({message:"OTP expires"})
        }else{
            const newUser=new users({
                name:userData.name,
                email:userData.email,
                isVerified:true,
                password:userData.password
            })
            await newUser.save()
            res.status(201).json({message:"Registration Success!"})
        }
        
    }else{
        res.status(401).json({message:"Invalid OTP"})
    }
}

//onLogin
exports.onLogin=async(req,res)=>{
    const {email,password}=req.body
    try {
        const isUserExists=await users.findOne({email:email,password:password})
        
        if(isUserExists){
            let token=jwt.sign({userID:isUserExists._id},process.env.SUPER_SECRET_KEY)
            res.status(200).json({message:"Login success",token:token})
        }else{
            res.status(404).json({message:"User not found!"})
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

//onProfile

exports.onFetchProfile=async(req,res)=>{
    const userID=req.userID
    try {
        const isUserExists=await users.findById(userID)
        if(isUserExists){
            let payload={
                name:isUserExists.name,
                email:isUserExists.email
            }
            res.status(200).json({data:payload})
        }else{
            res.status(404).json({message:"User not found!"})
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

