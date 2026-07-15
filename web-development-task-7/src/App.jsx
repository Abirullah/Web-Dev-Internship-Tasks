import { useEffect, useMemo, useState } from "react";
import LoanForm from "./components/LoanForm";
import SummaryCards from "./components/SummaryCards";
import PieChartCard from "./components/PieChartCard";
import "./App.css";

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

export default function App() {
  const [purchasePrice, setPurchasePrice] = useState(360000);
  const [downPayment, setDownPayment] = useState(72000);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTerm, setLoanTerm] = useState(15);

  useEffect(() => {
    setDownPayment((current) => clamp(current, 0, purchasePrice));
  }, [purchasePrice]);

  const amountFinanced = Math.max(purchasePrice - downPayment, 0);

  const results = useMemo(() => {
    const totalLoanMonths = loanTerm * 12;
    const monthlyRate = interestRate / 100 / 12;

    let monthlyPayment = 0;

    if (amountFinanced > 0 && totalLoanMonths > 0) {
      if (monthlyRate === 0) {
        monthlyPayment = amountFinanced / totalLoanMonths;
      } else {
        const growth = Math.pow(1 + monthlyRate, totalLoanMonths);
        monthlyPayment = (amountFinanced * monthlyRate * growth) / (growth - 1);
      }
    }

    const totalPayment = monthlyPayment * totalLoanMonths;
    const totalInterestGenerated = Math.max(totalPayment - amountFinanced, 0);

    return {
      totalLoanMonths,
      monthlyPayment,
      totalInterestGenerated,
      totalPayment,
    };
  }, [amountFinanced, interestRate, loanTerm]);

  return (
    <div className="loan-app">

      <div className="loan-app__shell">

        <main className="dashboard-grid">
          <LoanForm
            purchasePrice={purchasePrice}
            setPurchasePrice={setPurchasePrice}
            downPayment={downPayment}
            setDownPayment={setDownPayment}
            interestRate={interestRate}
            setInterestRate={setInterestRate}
            loanTerm={loanTerm}
            setLoanTerm={setLoanTerm}
            amountFinanced={amountFinanced}
          />

          <div className="dashboard-stack">
            <PieChartCard
              principal={amountFinanced}
              interest={results.totalInterestGenerated}
            />
            <SummaryCards
              purchasePrice={purchasePrice}
              downPayment={downPayment}
              amountFinanced={amountFinanced}
              results={results}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
