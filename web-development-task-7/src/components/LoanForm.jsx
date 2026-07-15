const formatCurrency = (value) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

function Field({
  label,
  helperText,
  value,
  displayValue,
  min,
  max,
  step,
  onChange,
  suffix = "",
  delay = 0,
}) {
  const safeMax = Math.max(max, min);
  const safeValue = Number.isFinite(value) ? value : min;
  const range = safeMax - min;
  const fill = range > 0 ? ((clamp(safeValue, min, safeMax) - min) / range) * 100 : 0;
  const handleChange = (event) => {
    const nextValue = Number(event.target.value);
    onChange(Number.isFinite(nextValue) ? nextValue : min);
  };

  return (
    <div className="loan-field" style={{ animationDelay: `${delay}ms` }}>
      <div className="loan-field__top">
        <div>
          <label className="loan-field__label">{label}</label>
          {helperText ? <p className="loan-field__helper">{helperText}</p> : null}
        </div>
        <span className="loan-field__value">
          {displayValue}
          {suffix}
        </span>
      </div>

      <div className="range-shell" style={{ "--fill": `${fill}%` }}>
        <div className="range-shell__track">
          <div className="range-shell__fill" />
          <div className="range-shell__dots" />
        </div>
        <input
          aria-label={label}
          type="range"
          min={min}
          max={safeMax}
          step={step}
          value={clamp(safeValue, min, safeMax)}
          onChange={handleChange}
          className="range-shell__input"
        />
      </div>

      <input
        aria-label={`${label} numeric input`}
        type="number"
        min={min}
        max={safeMax}
        step={step}
        value={clamp(safeValue, min, safeMax)}
        onChange={handleChange}
        className="loan-number"
      />
    </div>
  );
}

export default function LoanForm({
  purchasePrice,
  setPurchasePrice,
  downPayment,
  setDownPayment,
  interestRate,
  setInterestRate,
  loanTerm,
  setLoanTerm,
  amountFinanced,
}) {
  return (
    <section className="panel panel--form loan-form">

      <div className="loan-fields">
        <Field
          label="Purchase price"
          helperText="Before the down payment is applied."
          value={purchasePrice}
          displayValue={formatCurrency(purchasePrice)}
          min={50000}
          max={1500000}
          step={5000}
          onChange={setPurchasePrice}
          delay={0}
        />
        <Field
          label="Down payment"
          helperText="Reduces the amount you finance."
          value={downPayment}
          displayValue={formatCurrency(downPayment)}
          min={0}
          max={purchasePrice}
          step={2500}
          onChange={setDownPayment}
          delay={90}
        />
        <Field
          label="Interest rate"
          helperText="Annual percentage rate (APR)."
          value={interestRate}
          displayValue={interestRate.toFixed(2)}
          min={0}
          max={20}
          step={0.05}
          suffix="%"
          onChange={setInterestRate}
          delay={180}
        />
        <Field
          label="Loan term"
          helperText="Length of the loan in years."
          value={loanTerm}
          displayValue={loanTerm}
          min={1}
          max={30}
          step={1}
          suffix={loanTerm === 1 ? " year" : " years"}
          onChange={setLoanTerm}
          delay={270}
        />
      </div>

         </section>
  );
}
