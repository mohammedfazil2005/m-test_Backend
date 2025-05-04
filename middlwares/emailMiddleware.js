const nodemailer=require('nodemailer')

//created a transporter for sending email from where
const transporter=nodemailer.createTransport({
    service:'gmail',
    //provider email and pass
    auth:{
        user:process.env.GMAIL_ID,
        pass:process.env.GMAIL_PASSWORD
    }
})

const sendOTP=async(email,OTP)=>{
    //email options
    const mailOptions={
        from:process.env.GMAIL_ID,
        to:email,
        subject:"Verfication Mail",
        text:`Verfiy your account by entering the OTP ${OTP},  It will expire in 5 minutes.`
    }
    try {
        //sending mail
        await transporter.sendMail(mailOptions)
        return {status:200,message:"OTP Sent succesfully"}
    } catch (error) {
        return {status:500,message:error}
    }
}

module.exports=sendOTP