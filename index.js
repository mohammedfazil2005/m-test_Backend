require('dotenv').config()
const express=require('express')
const cors=require('cors')
const Router=require('./routes/userRoute')
const flowRouter=require('./routes/flowRoute')
const http=require('http')

require('./database/DB')
require('./controllers/sensorSimulator')
const sensorSim=require('./controllers/sensorSimulator')

//creates server
const server=express()


//for parsing
server.use(express.json())
//for communicate frontend and backend
server.use(cors())
//using Router
server.use(Router)
server.use(flowRouter)

//used for websocket server creation
const ioServerCreation=http.createServer(server)

const io=require('socket.io')(ioServerCreation,{
    cors:{origin:"*",methods: ['GET', 'POST']}
})

//for callin the sensor when the server runs
sensorSim.startSensoring(io);

io.on('connection',(socket)=>{
    console.log('Connected io')

    socket.on('disconnect',()=>{
        console.log('Disconnected io')
    })

})

server.set('io',io)



//port
const PORT=3000||process.env.PORT

//server runs
ioServerCreation.listen(PORT,()=>{
    console.log(`Server running on http://localhost:${PORT}`)
})
