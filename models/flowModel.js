const mongoose=require('mongoose')

const flowShema=new mongoose.Schema({
    userID:{type:String,required:true},
    nodes:{type:Array},
    edges:{type:Array},
})

const flowModel=mongoose.model('flows',flowShema)

module.exports=flowModel