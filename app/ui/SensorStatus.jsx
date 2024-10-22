"use client";
import { useEffect, useState } from 'react';

export default function SensorStatus(props) {
  const [sensorData, setSensorData] = useState({ temperature: null, humidity: null });

  const fetchData = async () => {
    try {
      const response = await fetch('/api/sensor');
      const data = await response.json();

      // Convert string values to numbers
      const temperature = parseFloat(data.temperature);
      const humidity = parseFloat(data.humidity);

      // Ensure that data contains valid numbers
      if (!isNaN(temperature) && !isNaN(humidity)) {
        const newSensorData = { temperature, humidity };
        setSensorData(newSensorData);
        
        // Gib die neuen Sensordaten direkt an die Parent-Komponente weiter
        props.updateSensorData(newSensorData);
      } else {
        console.error('Received invalid sensor data:', data);
      }
    } catch (error) {
      console.error('Fehler beim Abrufen der Sensordaten:', error);
    }
  };

  useEffect(() => {
    // Fetch beim ersten Laden
    fetchData();

    // Fetch alle 10 Sekunden
    const intervalId = setInterval(fetchData, 10000);

    // Cleanup Funktion, um das Intervall beim Verlassen der Komponente zu stoppen
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div id="sensorStatus">
      <h1>Sensor Status</h1>
      <p>Temperature: {sensorData.temperature !== null ? `${sensorData.temperature}°C` : 'Loading...'}</p>
      <p>Humidity: {sensorData.humidity !== null ? `${sensorData.humidity}%` : 'Loading...'}</p>
    </div>
  );
}
