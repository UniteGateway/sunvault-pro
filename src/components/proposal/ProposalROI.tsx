import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { generateEMIOptions, EMIOption } from "@/utils/emiCalculator";
import { IndianRupee, TrendingUp, Calendar } from "lucide-react";

interface ProposalROIProps {
  data: any;
  onChange: (data: any) => void;
}

export function ProposalROI({ data, onChange }: ProposalROIProps) {
  const [emiOptions, setEmiOptions] = useState<EMIOption[]>([]);
  const totalCost = parseFloat(data.totalCost || 45000000);

  useEffect(() => {
    if (totalCost > 0) {
      const options = generateEMIOptions(totalCost);
      setEmiOptions(options);
    }
  }, [totalCost]);

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <Label htmlFor="totalCost">Total Investment (₹)</Label>
          <Input
            id="totalCost"
            type="number"
            value={data.totalCost || ""}
            onChange={(e) => {
              const value = e.target.value;
              onChange({ ...data, totalCost: value });
            }}
            placeholder="45000000"
          />
        </div>

        <div>
          <Label htmlFor="annualSavings">Annual Savings (₹)</Label>
          <Input
            id="annualSavings"
            type="number"
            value={data.annualSavings || ""}
            onChange={(e) => onChange({ ...data, annualSavings: e.target.value })}
            placeholder="7500000"
          />
        </div>

        <div>
          <Label htmlFor="paybackPeriod">Payback Period (Years)</Label>
          <Input
            id="paybackPeriod"
            type="number"
            value={data.paybackPeriod || ""}
            onChange={(e) => onChange({ ...data, paybackPeriod: e.target.value })}
            placeholder="6"
          />
        </div>

        <div>
          <Label htmlFor="roi">Return on Investment (%)</Label>
          <Input
            id="roi"
            type="number"
            value={data.roi || ""}
            onChange={(e) => onChange({ ...data, roi: e.target.value })}
            placeholder="16.7"
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          EMI Options (6 Months to 7 Years)
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          {emiOptions.map((option, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center justify-between">
                  <span>{option.months} Months ({option.years} {option.years === 1 ? 'Year' : 'Years'})</span>
                  <span className="text-sm text-muted-foreground">{option.interestRate}% p.a.</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Monthly EMI:</span>
                  <span className="font-semibold text-primary flex items-center gap-1">
                    <IndianRupee className="h-4 w-4" />
                    {option.monthlyPayment.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Total Payment:</span>
                  <span>₹{option.totalPayment.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Total Interest:</span>
                  <span className="text-orange-600">₹{option.totalInterest.toLocaleString("en-IN")}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <TrendingUp className="h-6 w-6 text-primary mt-1" />
            <div>
              <h4 className="font-semibold mb-2">25-Year Savings Projection</h4>
              <p className="text-sm text-muted-foreground">
                With an estimated annual savings of ₹{(data.annualSavings || 7500000).toLocaleString("en-IN")}, 
                your total savings over 25 years could reach ₹{((data.annualSavings || 7500000) * 25).toLocaleString("en-IN")}.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
