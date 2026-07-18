import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function PriceChart({ cryptoId }) {
  const [chartData, setChartData] = useState(null);
  const [period, setPeriod] = useState('7');
  const [loading, setLoading] = useState(true);

  const periods = [
    { label: '24H', value: '1' },
    { label: '7D', value: '7' },
    { label: '30D', value: '30' },
    { label: '90D', value: '90' },
    { label: '1Y', value: '365' },
  ];

  useEffect(() => {
    fetchChartData();
  }, [cryptoId, period]);

  const fetchChartData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${cryptoId}/market_chart?vs_currency=usd&days=${period}`
      );
      const data = await response.json();
      
      const prices = data.prices.map(price => ({
        x: new Date(price[0]).toLocaleDateString(),
        y: price[1],
      }));

      setChartData({
        labels: prices.map(p => p.x),
        datasets: [
          {
            label: 'Price (USD)',
            data: prices.map(p => p.y),
            borderColor: '#2563eb',
            backgroundColor: 'rgba(37, 99, 235, 0.1)',
            fill: true,
            tension: 0.4,
            pointRadius: 0,
            borderWidth: 2,
          },
        ],
      });
      setLoading(false);
    } catch (error) {
      console.error('Error fetching chart:', error);
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Period Selector */}
      <div className="flex gap-2 mb-6">
        {periods.map((p) => (
          <button
            key={p.value}
            onClick={() => setPeriod(p.value)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              period === p.value
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200'
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Chart */}
      <div className="relative h-64">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full"></div>
          </div>
        ) : chartData ? (
          <Line
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              interaction: {
                intersect: false,
                mode: 'index',
              },
              plugins: {
                legend: { display: false },
                tooltip: {
                  backgroundColor: '#1f2937',
                  padding: 12,
                  bodyFont: { size: 14 },
                },
              },
              scales: {
                x: {
                  grid: { display: false },
                  ticks: { maxTicksLimit: 8 },
                },
                y: {
                  grid: { color: '#e5e7eb' },
                  ticks: {
                    callback: (value) => '$' + value.toLocaleString(),
                  },
                },
              },
            }}
          />
        ) : null}
      </div>
    </div>
  );
}

export default PriceChart;