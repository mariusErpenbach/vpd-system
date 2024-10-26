import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';

const MyChart = (props) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    // Erstelle und speichere die Line Chart-Instanz
    chartInstanceRef.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM'], // Zeitachsen-Daten
        datasets: [{
          label: 'Temperature (°C)',
          data: [22, 23, 24, 23, 22, 21,55], // Temperaturdaten
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          fill: true, // Bereich unter der Linie füllen
          tension: 0.4 // für eine geglättete Kurve
        }]
      },
      options: {
        responsive: true,
        scales: {
          x: { 
            title: {
              display: true,
              text: 'Time'
            }
          },
          y: {
            beginAtZero: false,
            title: {
              display: true,
              text: 'Temperature (°C)'
            }
          }
        }
      }
    });

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, []);

  return (
    <div>
      <canvas ref={chartRef} id="myChart"></canvas>
    </div>
  );
};

export default MyChart;
