const jwt=require('jsonwebtoken')

const Authentication=async(req,res)=>{
    if(req.headers['authorization']){
        const token=req.headers['authorization'].split(' ')[1]
        try {
            const verifiedToken=jwt.verify(token,process.env.SUPER_SECRET_KEY)
            req.userID=verifiedToken.userID
            next()
        } catch (error) {
            res.status(500).json({message:error})
        }
    }else{
        res.status(401).json({message:"Token required"})
    }
}

module.exports=Authentication
