import { Chart, TimeScale, LineController, LineElement, PointElement, LinearScale, Title, Tooltip, Legend, Filler } from 'chart.js';
import 'chartjs-adapter-date-fns';

// Registriere die Chart-Komponenten
Chart.register(
    TimeScale,
    LineController,
    LineElement,
    PointElement,
    LinearScale,
    Title,
    Tooltip,
    Legend,
    Filler
);

export function createSensorChart(ctx, sensorData) {
    return new Chart(ctx, {
        type: 'line',
        data: {
            labels: sensorData.map((reading) => reading.timestamp), // X-Achse
            datasets: [{
                label: 'Temperature',  // Beispiel-Dataset für Temperatur
                data: sensorData.map((reading) => reading.temperature), // Y-Achse
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
        },
        options: {
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'minute'
                    }
                }
            }
        }
    });
}
