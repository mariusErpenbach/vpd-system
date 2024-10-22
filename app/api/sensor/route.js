import fs from 'fs';
import path from 'path';

// export default async function handler(req, res) {
//     // Beispiel: Lade die zuletzt gespeicherten Sensordaten aus einer Datei
//     const filePath = path.join(process.cwd(), 'sensorData.json');
//     const data = fs.readFileSync(filePath, 'utf8');
    
//     res.status(200).json(JSON.parse(data));
// }

// app/api/sensor/route.js
// app/api/sensor/route.js
export async function GET(req) {
    const constantTemperature = 25.0; // Feste Temperatur von 25°C

    // Generiere eine zufällige Luftfeuchtigkeit zwischen 40% und 60%
    const randomHumidity = (Math.random() * 20 + 40).toFixed(1);

    const sensorData = {
        temperature: constantTemperature.toFixed(1),  // Feste Temperatur
        humidity: randomHumidity                      // Zufällige Luftfeuchtigkeit
    };

    return new Response(JSON.stringify(sensorData), {
        headers: { 'Content-Type': 'application/json' },
    });
}

