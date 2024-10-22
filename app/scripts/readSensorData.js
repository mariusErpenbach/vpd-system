const sensor = require('node-dht-sensor').promises;

const sensorType = 22; // DHT22
const gpioPin = 4;     // GPIO-Pin, an dem der Sensor angeschlossen ist

async function readSensorData() {
    try {
        const result = await sensor.read(sensorType, gpioPin);
        console.log(`Temperature: ${result.temperature.toFixed(1)}°C`);
        console.log(`Humidity: ${result.humidity.toFixed(1)}%`);

        // Hier könntest du die Daten z.B. in eine Datei oder eine Datenbank schreiben
        saveToFileOrDB(result);
    } catch (err) {
        console.error('Failed to read sensor data:', err);
    }
}

// Alle 10 Sekunden Sensordaten auslesen
setInterval(readSensorData, 10000);
