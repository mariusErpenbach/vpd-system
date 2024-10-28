import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';

const MyChart = (props) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    // Formatierung der Zeitstempel, um nur die Uhrzeit anzuzeigen
    const formattedTimeLabels = props.timeLabels.map(timestamp => {
      const date = new Date(timestamp);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    });

    // Zerstört den bestehenden Chart, bevor ein neuer erstellt wird
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    chartInstanceRef.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: formattedTimeLabels,
        datasets: [
          {
            label: 'Humidity (%)',
            data: props.humidData,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: true,
            tension: 0.4
          },
          {
            label: 'Temperature (°C)',
            data: props.temperatureData,
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            fill: true,
            tension: 0.4
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
          padding: { top: 10, bottom: 10, left: 10, right: 10 }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Time',
              font: { size: 12 }
            },
            ticks: { font: { size: 10 } }
          },
          y: {
            beginAtZero: false,
            title: {
              display: true,
              text: 'Value',
              font: { size: 12 }
            },
            ticks: { font: { size: 10 } }
          }
        },
        plugins: {
          legend: {
            display: true,
            labels: { font: { size: 10 } }
          }
        }
      }
    });

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [props]);

  return (
    <div style={{ maxWidth: '500px', maxHeight: '300px', margin: '0 auto' }}>
      <canvas ref={chartRef} id="myChart"></canvas>
    </div>
  );
};

export default MyChart;
