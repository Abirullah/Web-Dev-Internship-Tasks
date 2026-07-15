const formatCurrency = (value) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

function StatCard({ label, value, accent }) {
  return (
    <div className="stat-card">
      <p className="stat-card__label">{label}</p>
      <p className="stat-card__value" style={{ color: accent }}>
        {value}
      </p>
    </div>
  );
}

export default function SummaryCards({
  purchasePrice,
  downPayment,
  amountFinanced,
  results,
}) {
  const { monthlyPayment, totalInterestGenerated, totalPayment, totalLoanMonths } =
    results;

  return (
    <section className="panel summary-panel">
      <div className="summary-panel__header">
        <div>
          <p className="section-kicker">Output summary</p>
        </div>
        <p className="summary-panel__chip">{totalLoanMonths} monthly payments</p>
      </div>

      <div className="summary-grid">
        {/* Ink — the figure people check every month, kept neutral so it
            doesn't compete with the cost callouts below. */}
        <StatCard label="Monthly payment" value={formatCurrency(monthlyPayment)} accent="#17181A" />
        {/* Muted — this is "your money going toward the thing you bought",
            not a cost to flag. */}
        <StatCard label="Amount financed" value={formatCurrency(amountFinanced)} accent="#6E6E76" />
        {/* Red — the cost of borrowing. This is the number worth noticing. */}
        <StatCard label="Total interest" value={formatCurrency(totalInterestGenerated)} accent="#C1352B" />
        {/* Deeper red — the full true cost, given the strongest visual
            weight since it's the number most useful for comparing loans. */}
        <StatCard label="Total repayment" value={formatCurrency(totalPayment)} accent="#8F241C" />
      </div>
    </section>
  );
}