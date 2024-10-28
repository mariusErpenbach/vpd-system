export function calculateHumidity(temperature, desiredVPD) {
    // Berechnung des Sättigungsdampfdrucks (es) in hPa
    const es = 6.112 * Math.exp((17.67 * temperature) / (temperature + 243.5));

    // Berechnung des Dampfdrucks (ea) aus VPD, Umrechnung von kPa zu hPa
    const ea = es - (desiredVPD * 10);

    // Berechnung der relativen Luftfeuchtigkeit (RH)
    const relativeHumidity = (ea / es) * 100;

    return relativeHumidity;
}

export async function fetchSensorData() {
    const baseUrl = window.location.hostname === "localhost" 
        ? "http://192.168.178.23:5000/get-sensor-data"
        : "http://localhost:5000/get-sensor-data";

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
        throw error; // Fehler weitergeben, falls benötigt
    }
}