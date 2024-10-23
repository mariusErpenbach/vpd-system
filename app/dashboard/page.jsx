"use client";
import { useEffect, useState } from 'react';
import SensorStatus from '../ui/SensorStatus';
import EquipmentPlanner from '../ui/EquipmentPlanner';
import SensorDataGraph from '../ui/SensorDataGraph';
export default function page () {
    const [sensorData, setSensorData] = useState({ temperature: null, humidity: null });
    const [currentVpd, setCurrentVpd] = useState(null);
    const [phase, setPhase] = useState([0,1,2]);

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
    

    const updateSensorData = (newData) => {
        console.log(newData)
        if (newData.temperature !== null && newData.humidity !== null) {
            setCurrentVpd(calculateVPD(newData.temperature, newData.humidity));
          }
    }

    return (
        <div id="dashboardPage">
          <p>VPD: {currentVpd !== null ? currentVpd : 'Calculating...'}</p>
          <SensorStatus updateSensorData={updateSensorData}></SensorStatus>
          <EquipmentPlanner></EquipmentPlanner>
        <SensorDataGraph></SensorDataGraph> 
          <div>
        <p>phase 0 = 0.4 - 0.8 VPD</p>
        <p>phase 1 = 0.8 - 1.2 VPD</p>
        <p>phase 2 = 1.2 - 1.6 VPD</p>
        </div>
        </div>
    )
}