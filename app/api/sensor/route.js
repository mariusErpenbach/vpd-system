import fs from 'fs';
import path from 'path';
import 'dotenv/config';

// Simulierter Sensor-Auslesefunktion
function getMockSensorData() {
    return {
        temperature: (Math.random() * 5) + 20, // Beispielwert: zwischen 20°C und 25°C
        humidity: (Math.random() * 10) + 40,    // Beispielwert: zwischen 40% und 50%
        timestamp: new Date().toISOString()
    };
}
export async function GET(req) {
    let sensorData;

    // Prüfe, ob die Umgebungsvariable für Mock-Daten gesetzt ist
    if (process.env.USE_MOCK_SENSOR_DATA === 'true') {
        sensorData = getMockSensorData();
    } else {
        sensorData = getRealSensorData();
    }

    return new Response(JSON.stringify(sensorData), {
        headers: { 'Content-Type': 'application/json' },
    });
}
