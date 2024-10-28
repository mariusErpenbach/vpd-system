"use client";
import { useEffect, useState } from 'react';
import SensorStatus from '../ui/SensorStatus';
import EquipmentPlanner from '../ui/EquipmentPlanner';
import SensorDataGraph from '../ui/SensorDataGraph';
import { fetchSensorData } from '../ui/actions'; // Importiere fetchSensorData
import { calculateVPD } from '../ui/actions';
export default function Page () {
    const [currentHumid, setCurrentHumid] = useState(null);
    const [currentTemp, setCurrentTemp] = useState(null);
    const [currentVpd, setCurrentVpd] = useState(null);
    const [sensorDataArray, setSensorDataArray] = useState([]); 
    const [timeLabels, setTimeLabels] = useState([]);
    const [temperatureData, setTemperatureData] = useState([]);
    const [humidData, setHumidData] = useState([]);

    
    
    useEffect(() => {
        const intervalId = setInterval(async () => {
            try {
                const data = await fetchSensorData(); // Nur Daten abrufen
                setSensorDataArray(prevData => [...prevData, data]);
                setTimeLabels(prevLabels => [...prevLabels, data.timestamp]);
                setTemperatureData(prevTemps => [...prevTemps, data.temperature]);
                setHumidData(prevHumidData => [...prevHumidData, data.humidity]);
                setCurrentVpd(calculateVPD(data.temperature, data.humidity));
                setCurrentHumid(data.humidity);
                setCurrentTemp(data.temperature);
            } catch (error) {
                console.error("Error updating data:", error);
            }
        }, 10000); // alle 10 Sekunden

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div id="dashboardPage">
            <SensorDataGraph humidData={humidData} timeLabels={timeLabels} temperatureData={temperatureData} sensorDataArray={sensorDataArray}></SensorDataGraph> 
            <SensorStatus currentVpd={currentVpd} currentHumid={currentHumid} currentTemp={currentTemp}></SensorStatus>
            <EquipmentPlanner currentHumid={currentHumid} currentTemp={currentTemp}></EquipmentPlanner>
            <div>
                <p>phase 0 = 0.4 - 0.8 VPD</p>
                <p>phase 1 = 0.8 - 1.2 VPD</p>
                <p>phase 2 = 1.2 - 1.6 VPD</p>
            </div>
        </div>
    );
}
