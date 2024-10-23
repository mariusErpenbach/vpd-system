'use server';

import db from '../util/db';

export async function fetchSensorReadingsFromDB() {
    try {
        const [rows] = await new Promise((resolve, reject) => {
            db.query('SELECT * FROM sensor_readings', (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve([results]);
                }
            });
        });
        return rows;
    } catch (error) {
        console.error('Error fetching sensor_readings from database:', error);
        throw error;
    }
}
