"use client";
import { useEffect, useState } from 'react';

export default function EquipmentPlanner () {
    const [fanStatus,setFanStatus] = useState("Off");
    const [humidifierStatus, setHumidifierStatus] = useState("Off")  
  

    return (
        <div id="equipmentPlanner">
                <h1>Equipment Status</h1>
                <p>Fan Status : {fanStatus}</p>
                <p>Humdifier Status: {humidifierStatus}</p>
        </div>
    )
}