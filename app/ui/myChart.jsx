import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';

const MyChart = (props) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    // Zeitanzeige formatieren
    const formattedTimeLabels = props.timeLabels.map(timestamp => {
      const date = new Date(timestamp);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    });

    // Falls bereits ein Chart existiert, diesen zerstören
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    // CSS-Variablen für Farben und Layout holen
    const textColor = getComputedStyle(document.documentElement).getPropertyValue('--chart-text-color').trim();
    const gridColor = getComputedStyle(document.documentElement).getPropertyValue('--chart-grid-color').trim();

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
            tension: 0.4,
            pointBackgroundColor: 'rgba(0, 123, 255, 1)', // Punktfarbe
            pointBorderColor: 'rgba(0, 0, 0, 1)', // Rahmenfarbe der Punkte
            pointBorderWidth: 2,
            pointRadius: 5,
            pointHoverRadius: 7
          },
          {
            label: 'Temperature (°C)',
            data: props.temperatureData,
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            fill: true,
            tension: 0.4,
            pointBackgroundColor: 'rgba(255, 165, 0, 1)', // Punktfarbe
            pointBorderColor: 'rgba(0, 0, 0, 1)', // Rahmenfarbe der Punkte
            pointBorderWidth: 2,
            pointRadius: 5,
            pointHoverRadius: 7
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
              font: { size: 12 },
              color: '#333'
            },
            ticks: { font: { size: 10 }, color: 'white' }
          },
          y: {
            beginAtZero: false,
            title: {
              display: true,
              text: 'Value',
              font: { size: 12 },
              color: '#333'
            },
            ticks: { font: { size: 10 }, color: 'white' }
          }
        },
        plugins: {
          legend: {
            display: true,
            labels: { font: { size: 14 }, color: '#333' }
          }
        }
      }
    });
    
    // Chart zerstören beim Unmounten der Komponente
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [props]);

  return (
    <div className="chart-container">
      <canvas ref={chartRef} id="myChart"></canvas>
    </div>
  );
};

export default MyChart;
