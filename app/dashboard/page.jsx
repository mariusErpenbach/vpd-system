"use client";
import { useEffect, useState } from 'react';
import SensorStatus from '../ui/SensorStatus';
import EquipmentPlanner from '../ui/EquipmentPlanner';
import SensorDataGraph from '../ui/SensorDataGraph';
export default function page () {
    const [sensorData, setSensorData] = useState({ temperature: null, humidity: null });
    const [currentVpd, setCurrentVpd] = useState(null);
    const [sensorDataArray, setSensorDataArray] = useState([]); 
    const [timeLabels, setTimeLabels] = useState([]);
    const [temperatureData, setTemperatureData] = useState([]);
  const [humidData, setHumidData] = useState([])
 

    function calculateVPD(temp, humid) {
        // Check if temp and humid are valid numbers
        if (isNaN(temp) || isNaN(humid) || temp === null || humid === null) {
          console.error('Invalid temperature or humidity values:', temp, humid);
          return 'Invalid data'; // Return error message if values are invalid
        }
        // Berechne den Sättigungsdampfdruck (SVP) in kPa
        const svp = 0.6108 * Math.exp((17.27 * temp) / (temp + 237.3));
        // Berechne den tatsächlichen Dampfdruck (Actual Vapor Pressure)
        const avp = (humid / 100) * svp;
        // Berechne den VPD
        const vpd = svp - avp;
        return vpd.toFixed(2); // Rückgabe des VPD-Werts auf 2 Dezimalstellen
      }
    
      useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:5000/get-sensor-data");
                if (!response.ok) {
                    throw new Error("Network response was not ok " + response.statusText);
                }
                const data = await response.json();
                console.log("Fetched Data:", data);

                setSensorDataArray(prevData => [...prevData, data]);
                setTimeLabels(prevLabels => [...prevLabels, data.timestamp]);
                setTemperatureData(prevTemps => [...prevTemps, data.temperature]);
                setHumidData(prevHumidData => [...prevHumidData, data.humidity]);
            } catch (error) {
                console.error("Fetch error:", error);
            }
        };

        // Intervall festlegen
        const intervalId = setInterval(fetchData, 10000); // alle 10 Sekunden

        // Aufräumen beim Verlassen des Intervalls
        return () => clearInterval(intervalId);
    }, []);

    const updateSensorData = (newData) => {
        if (newData.temperature !== null && newData.humidity !== null) {
            setCurrentVpd(calculateVPD(newData.temperature, newData.humidity));
          }
    }

    return (
        <div id="dashboardPage">
          {/* <p>VPD: {currentVpd !== null ? currentVpd : 'Calculating...'}</p>
          <SensorStatus updateSensorData={updateSensorData}></SensorStatus> */}
          <EquipmentPlanner></EquipmentPlanner>
          <SensorDataGraph humidData={humidData} timeLabels={timeLabels} temperatureData={temperatureData} sensorDataArray={sensorDataArray }></SensorDataGraph> 
          
          <div>
        <p>phase 0 = 0.4 - 0.8 VPD</p>
        <p>phase 1 = 0.8 - 1.2 VPD</p>
        <p>phase 2 = 1.2 - 1.6 VPD</p>
        </div>
        </div>
    )
}