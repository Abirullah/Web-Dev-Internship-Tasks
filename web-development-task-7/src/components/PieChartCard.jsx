import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

export default function PieChartCard({ principal, interest }) {
  const total = principal + interest;

  const data = {
    labels: ["Amount financed", "Interest"],
    datasets: [
      {
        data: [principal, interest],
        // Neutral charcoal for the "base" amount, red reserved for interest —
        // the one number worth drawing the eye to, since it's the true cost
        // of borrowing rather than money going toward the purchase itself.
        backgroundColor: ["#2B2B30", "#C1352B"],
        borderColor: "#FFFFFF",
        borderWidth: 4,
        hoverOffset: 14,
        borderRadius: 10,
        spacing: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 900,
      easing: "easeOutQuart",
    },
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#6E6E76",
          font: { family: "Inter", size: 13 },
          padding: 18,
          usePointStyle: true,
          pointStyle: "circle",
          boxWidth: 10,
        },
      },
      tooltip: {
        backgroundColor: "#FFFFFF",
        borderColor: "#EAE7E3",
        borderWidth: 1,
        titleColor: "#17181A",
        bodyColor: "#17181A",
        padding: 12,
        boxPadding: 4,
        callbacks: {
          label: (ctx) => {
            const pct = total > 0 ? ((ctx.parsed / total) * 100).toFixed(1) : "0.0";
            return ` ${ctx.label}: ${formatCurrency(ctx.parsed)} (${pct}%)`;
          },
        },
      },
    },
  };

  return (
    <section className="panel panel--chart chart-card">
      <div className="chart-card__header">
        <div>
          <p className="section-kicker">Payment breakdown</p>
        </div>
        <div className="chart-card__badge">{formatCurrency(total)} total</div>
      </div>

      <div className="chart-card__viewport">
        {total > 0 ? (
          <Pie data={data} options={options} />
        ) : (
          <p className="chart-card__empty">
            Set a purchase price and down payment to see the breakdown.
          </p>
        )}
      </div>
    </section>
  );
}