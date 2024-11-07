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
            borderColor: getComputedStyle(document.documentElement).getPropertyValue('--chart-line-color-humidity').trim(),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: true,
            tension: 0.4
          },
          {
            label: 'Temperature (°C)',
            data: props.temperatureData,
            borderColor: getComputedStyle(document.documentElement).getPropertyValue('--chart-line-color-temp').trim(),
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
          padding: { top: 20, bottom: 20, left: 10, right: 10 }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Time',
              color: textColor,
              font: { size: 14 }
            },
            ticks: { color: textColor, font: { size: 12 } },
            grid: { color: gridColor }
          },
          y: {
            beginAtZero: false,
            title: {
              display: true,
              text: 'Value',
              color: textColor,
              font: { size: 14 }
            },
            ticks: { color: textColor, font: { size: 12 } },
            grid: { color: gridColor }
          }
        },
        plugins: {
          legend: {
            display: true,
            labels: { color: textColor, font: { size: 12 } }
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
