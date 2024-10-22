'use server';

import { db} from "../util/db";

export async function fetchSensorReadingsFromDB() {
    try {
      const rows = await db.execute('SELECT * FROM sensor_readings');
      return rows;
    } catch (error) {
      console.error('Error fetching sensor_readings from database:', error);
      throw error;
    }
  }
  