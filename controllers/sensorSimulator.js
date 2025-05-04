let isRunning = false;
let interval;



exports.generateData = () => {
    let temp = (Math.random() * 40 - 20 + 20).toFixed(2);
    let hum = (Math.random() * (80 - 40) + 20).toFixed(2);
    let date=new Date()
    let time=date.toLocaleTimeString()
    let payload = {
        temperature: temp,
        humidity: hum,
        time:time
    };
    return payload;
};

//start the sensor
exports.startSensoring = (io) => {
    if (isRunning) {
        console.log("Started");
        return;
    }
    isRunning = true;
    interval = setInterval(() => {
        let sensorData = this.generateData(); // Call the function directly
        io.emit('payload', sensorData); // Emit data using the passed io
        
    }, 2000);
};

