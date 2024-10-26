// SensorDataGraph.jsx
import { useState, useEffect } from 'react';
import { fetchSensorData } from "../util/SensorData";
import MyChart from "./myChart";

export default function SensorDataGraph() {
    const [sensorDataArray, setSensorDataArray] = useState([]); 

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchSensorData();
            if (data) {
                setSensorDataArray(prevData => [...prevData, data]);
            }
        };

        const intervalId = setInterval(fetchData, 10000);
        return () => clearInterval(intervalId);
    }, []);

    // Bereite die Daten für die Chart-Komponente vor
    const timeLabels = sensorDataArray.map(data => data.timestamp);
    const temperatureData = sensorDataArray.map(data => data.temperature);

    return (
        <div id="sensorDataGraph">
            <h1>Sensor Data Graph</h1>
            <MyChart 
                timeLabels={timeLabels}
                data={temperatureData}
            />
            <ul>
                {sensorDataArray.map((data, index) => (
                    <li key={index}>
                        Time: {data.timestamp} | Temp: {data.temperature}°C | Humidity: {data.humidity}%
                    </li>
                ))}
            </ul>
        </div>
    );
}
