const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,uniqueL:true,required:true},
    password:{type:String,required:true},
    isVerified:{type:Boolean,default:false},
})

const users=mongoose.model('users',userSchema)

module.exports=users;