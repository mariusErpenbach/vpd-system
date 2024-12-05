    "use client";
    import { fetchRelayOn,fetchRelayOff,calculateHumidity } from './actions';
    import { useEffect, useLayoutEffect, useState } from 'react';

    export default function EquipmentPlanner (props) {
        const [fanStatus,setFanStatus] = useState("Off");
        const [humidifierStatus, setHumidifierStatus] = useState("Off")  
        const [neededHumid, setNeededHumid] = useState(0)
        const [targetVPD, setTargetVPD] = useState(1)


        useEffect(() => {
            setNeededHumid(calculateHumidity(props.currentTemp,targetVPD))        
        }, [props,targetVPD]);


        const handleVPDChange = (e) => {
            setTargetVPD(e.target.value);
        };
        return (
<div id="equipmentPlanner">
         
            <label htmlFor="vpdGoal">VPD-Goal: </label>
            <input
                type="float"
                id="vpdGoal"
                value={targetVPD}
                onChange={handleVPDChange}
            />
            <br /> <br /> <i className="fa-solid fa-arrow-down"></i> 
            <p>Humidity needed: {neededHumid}</p>
            <p><i className="fa-solid fa-fan"></i> : {fanStatus}</p>


        </div>
        )
    }