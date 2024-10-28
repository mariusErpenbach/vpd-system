"use client";
import { useEffect, useLayoutEffect, useState } from 'react';
import {calculateHumidity} from "./actions"
export default function EquipmentPlanner (props) {
    const [fanStatus,setFanStatus] = useState("Off");
    const [humidifierStatus, setHumidifierStatus] = useState("Off")  
    const [neededHumid, setNeededHumid] = useState(0)

    useEffect(() => {
        setNeededHumid(calculateHumidity(27,1))        
    }, [props]);

    return (
        <div id="equipmentPlanner">
                <h1>Equipment Status</h1>
                <p>Fan Status : {fanStatus}</p>
                <p>Humdifier Status: {humidifierStatus}</p>
                {props.currentTemp}
                <p>needed humidity: {neededHumid} for vpd 1</p>
        </div>
    )
}