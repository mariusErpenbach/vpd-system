export function calculateHumidity(temperature, desiredVPD) {
    const es = 6.112 * Math.exp((17.67 * temperature) / (temperature + 243.5));
    const ea = es - (desiredVPD * 10);
    const relativeHumidity = (ea / es) * 100;
    return parseFloat(relativeHumidity.toFixed(1));
}

export function calculateVPD(temp, humid) {
    if (isNaN(temp) || isNaN(humid) || temp === null || humid === null) {
        console.error('Invalid temperature or humidity values:', temp, humid);
        return 'Invalid data';
    }
    const svp = 0.6108 * Math.exp((17.27 * temp) / (temp + 237.3));
    const avp = (humid / 100) * svp;
    const vpd = svp - avp;
    return vpd.toFixed(2);
}

export async function fetchSensorData() {
    const baseUrl = window.location.hostname === "localhost" 
        ? "http://192.168.178.23:5001/get-sensor-data"
        : "http://localhost:5001/get-sensor-data";

    try {
        const response = await fetch(baseUrl);
        if (!response.ok) {
            throw new Error("Network response was not ok " + response.statusText);
        }
        const data = await response.json();
        console.log("Fetched Data:", data);
        return data;
    } catch (error) {
        console.error("Fetch error:", error);
        throw error;
    }
}

// API-Aufruf zum Einschalten des Relais
export async function fetchRelayOn() {
    const baseUrl = "http://192.168.178.23:5001/on"
    try {
        const response = await fetch(baseUrl, { method: 'GET' });
        if (!response.ok) {
            throw new Error("Network response was not ok " + response.statusText);
        }
        console.log("Relay turned on");
    } catch (error) {
        console.error("Error turning relay on:", error);
    }
}

// API-Aufruf zum Ausschalten des Relais
export async function fetchRelayOff() {
    const baseUrl = window.location.hostname === "localhost" 
        ? "http://192.168.178.23:5001/off"
        : "http://localhost:5001/off";

    try {
        const response = await fetch(baseUrl, { method: 'GET' });
        if (!response.ok) {
            throw new Error("Network response was not ok " + response.statusText);
        }
        console.log("Relay turned off");
    } catch (error) {
        console.error("Error turning relay off:", error);
    }
}


