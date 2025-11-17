export interface EMIOption {
  months: number;
  years: number;
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  interestRate: number;
}

export function calculateEMI(
  principal: number,
  annualInterestRate: number,
  months: number
): number {
  const monthlyRate = annualInterestRate / 12 / 100;
  
  if (monthlyRate === 0) {
    return principal / months;
  }
  
  const emi =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
    (Math.pow(1 + monthlyRate, months) - 1);
  
  return Math.round(emi);
}

export function generateEMIOptions(principal: number): EMIOption[] {
  const options: EMIOption[] = [];
  const interestRates = [8.5, 9.5, 10.5, 11.5, 12.5]; // Different rates for different tenures
  
  // Generate options from 6 months to 7 years
  const tenures = [
    { months: 6, rate: interestRates[0] },
    { months: 12, rate: interestRates[0] },
    { months: 24, rate: interestRates[1] },
    { months: 36, rate: interestRates[2] },
    { months: 48, rate: interestRates[2] },
    { months: 60, rate: interestRates[3] },
    { months: 72, rate: interestRates[4] },
    { months: 84, rate: interestRates[4] },
  ];
  
  tenures.forEach(({ months, rate }) => {
    const monthlyPayment = calculateEMI(principal, rate, months);
    const totalPayment = monthlyPayment * months;
    const totalInterest = totalPayment - principal;
    
    options.push({
      months,
      years: months / 12,
      monthlyPayment,
      totalPayment,
      totalInterest,
      interestRate: rate,
    });
  });
  
  return options;
}
