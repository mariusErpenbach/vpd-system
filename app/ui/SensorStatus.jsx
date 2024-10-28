"use client";
import { useEffect, useState } from 'react';

export default function SensorStatus(props) {
  const [sensorData, setSensorData] = useState({ temperature: null, humidity: null });
    
  return (
    <div id="sensorStatus">
      <h1>Sensor Status</h1>
      <p>Temperature: {props.currentTemp !== null ? `${props.currentTemp}°C` : 'Loading...'}</p>
      <p>Humidity: {props.currentHumid !== null ? `${props.currentHumid}%` : 'Loading...'}</p>
    </div>
  );
}
