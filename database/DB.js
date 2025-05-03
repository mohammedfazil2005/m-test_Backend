const mongoose=require('mongoose')
const connectionString=process.env.CONNECTIONSTRING

mongoose.connect(connectionString).then(()=>{
    console.log('DB Connected')
}).catch((err)=>{
    console.log(err)
})