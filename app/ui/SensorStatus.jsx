"use client";

export default function SensorStatus(props) {
    
  return (
    <div id="sensorStatus">
     <main>
      <p><i class="fa-solid fa-temperature-low"></i>: {props.currentTemp !== null ? `${props.currentTemp}°C` : 'Loading...'}</p>
      <p><i class="fa-solid fa-droplet"></i>: {props.currentHumid !== null ? `${props.currentHumid}%` : 'Loading...'}</p>
     <p>VPD: {props.currentVpd !== null ? `${props.currentVpd}`:`Loading...`}</p>
      </main>
    </div>
  );
}
