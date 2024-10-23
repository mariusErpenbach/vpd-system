import { useState, useEffect, useRef } from 'react';
import { fetchSensorReadingsFromDB } from '../scripts/fetchSensorData';
import { createSensorChart} from "../util/createSensorChart";

export default function SensorDataGraph() {
    const [sensorData, setSensorData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const chartRef = useRef(null); // Referenz für das Canvas

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchSensorReadingsFromDB();
                setSensorData(data);
            } catch (error) {
                console.error('Error fetching sensor readings:', error);
                setError('Failed to fetch sensor readings.');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (sensorData.length > 0) {
            const ctx = chartRef.current.getContext('2d');
            createSensorChart(ctx, sensorData); // Chart erstellen
        }
    }, [sensorData]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div id="sensorDataGraph">
            <h1>Sensor Data Graph</h1>
            <canvas ref={chartRef}></canvas> {/* Canvas für Chart.js */}
        </div>
    );
};
