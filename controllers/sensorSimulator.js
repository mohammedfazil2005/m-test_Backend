let isRunning = false;
let interval;

exports.generateData = () => {
    let temp = (Math.random() * 40 - 20 + 20).toFixed(2);
    let hum = (Math.random() * (80 - 40) + 20).toFixed(2);
    let payload = {
        temperature: temp,
        humidity: hum,
    };
    return payload;
};

exports.startSensoring = (io) => {
    if (isRunning) {
        console.log("Started");
        return;
    }
    isRunning = true;
    interval = setInterval(() => {
        let sensorData = exports.generateData(); // Call the function directly
        io.emit('payload', sensorData); // Emit data using the passed io
        // console.log(sensorData);
    }, 2000);
};

exports.stopSensoring = () => {
    if (!isRunning) {
        console.log('Not running');
        return;
    }
    clearInterval(interval);
    isRunning = false;
    console.log('Stopped');
};
