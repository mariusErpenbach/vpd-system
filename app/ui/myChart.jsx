import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';

const MyChart = (props) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    // Zerstört den bestehenden Chart, bevor ein neuer erstellt wird
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    chartInstanceRef.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: props.timeLabels,
        datasets: [{
          label: 'Humidity (%)',
          data: props.humidData,
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          fill: true,
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false, // Ermöglicht flexiblere Höhe und Breite
        layout: {
          padding: { top: 10, bottom: 10, left: 10, right: 10 }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Time',
              font: { size: 12 } // Schriftgröße für die X-Achse
            },
            ticks: { font: { size: 10 } }
          },
          y: {
            beginAtZero: false,
            title: {
              display: true,
              text: 'Temperature (°C)',
              font: { size: 12 } // Schriftgröße für die Y-Achse
            },
            ticks: { font: { size: 10 } }
          }
        },
        plugins: {
          legend: {
            display: true,
            labels: { font: { size: 10 } } // Schriftgröße für die Legende
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
