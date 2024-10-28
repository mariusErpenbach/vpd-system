import { useState, useEffect } from 'react';
import MyChart from "./myChart";

export default function SensorDataGraph(props) {
    useEffect(() => {
     console.log(props)
    }, [props]);

    return (
        <div id="sensorDataGraph"> 
            <h1>Sensor Data Graph (realtime)</h1>
            <MyChart 
                timeLabels={props.timeLabels}
                data={props.temperatureData}
                temperatureData={props.temperatureData}
                humidData={props.humidData}
            />
            
        </div>
    );
}
