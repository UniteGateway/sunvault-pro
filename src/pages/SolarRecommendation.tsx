import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Zap, DollarSign, TrendingUp, Battery, ArrowRight, CheckCircle2 } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { useNavigate } from "react-router-dom";

const SolarRecommendation = () => {
  const navigate = useNavigate();

  const recommendation = {
    systemSize: 25,
    panelCount: 62,
    panelType: "Monocrystalline 540W",
    inverterType: "String Inverter 25kW",
    estimatedGeneration: 35000,
    monthlySavings: 28000,
    paybackPeriod: 3.5,
    totalCost: 1450000,
    subsidyAmount: 580000,
    netCost: 870000,
    co2Offset: 28,
    features: [
      "Net Metering Support",
      "25 Year Panel Warranty",
      "5 Year Inverter Warranty",
      "Remote Monitoring System",
      "Surge Protection",
      "Bird Protection System",
    ],
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Button variant="ghost" onClick={() => navigate("/shading-analysis")} className="mb-4">
            <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
            Back to Shading Analysis
          </Button>
          <h2 className="text-3xl font-bold mb-2">Solar System Recommendation</h2>
          <p className="text-muted-foreground">Customized solar solution based on your roof analysis</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Zap className="h-5 w-5 text-primary" />
                System Size
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{recommendation.systemSize} kW</div>
              <p className="text-sm text-muted-foreground mt-1">{recommendation.panelCount} solar panels</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Battery className="h-5 w-5 text-accent" />
                Annual Generation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-accent">{(recommendation.estimatedGeneration / 1000).toFixed(0)}k</div>
              <p className="text-sm text-muted-foreground mt-1">kWh per year</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <DollarSign className="h-5 w-5 text-secondary" />
                Monthly Savings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-secondary">₹{(recommendation.monthlySavings / 1000).toFixed(0)}k</div>
              <p className="text-sm text-muted-foreground mt-1">on electricity bills</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <TrendingUp className="h-5 w-5 text-primary" />
                Payback Period
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{recommendation.paybackPeriod}</div>
              <p className="text-sm text-muted-foreground mt-1">years</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>System Specifications</CardTitle>
              <CardDescription>Recommended equipment and configuration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">Solar Panels</p>
                  <p className="text-sm text-muted-foreground">{recommendation.panelType}</p>
                </div>
                <Badge>Premium</Badge>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">Inverter</p>
                  <p className="text-sm text-muted-foreground">{recommendation.inverterType}</p>
                </div>
                <Badge>Efficient</Badge>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">Panel Count</p>
                  <p className="text-sm text-muted-foreground">{recommendation.panelCount} units</p>
                </div>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">CO₂ Offset</p>
                  <p className="text-sm text-muted-foreground">{recommendation.co2Offset} tons per year</p>
                </div>
                <Badge variant="secondary">Eco-Friendly</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Cost Breakdown</CardTitle>
              <CardDescription>Investment details and savings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Total System Cost</span>
                <span className="font-semibold">₹{(recommendation.totalCost / 100000).toFixed(2)}L</span>
              </div>
              <div className="flex justify-between items-center text-accent">
                <span>Government Subsidy (40%)</span>
                <span className="font-semibold">- ₹{(recommendation.subsidyAmount / 100000).toFixed(2)}L</span>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between items-center text-lg">
                  <span className="font-medium">Net Investment</span>
                  <span className="font-bold text-primary">₹{(recommendation.netCost / 100000).toFixed(2)}L</span>
                </div>
              </div>
              <div className="bg-muted p-3 rounded-lg mt-4">
                <p className="text-sm text-center">
                  <span className="font-semibold">ROI:</span> {((recommendation.monthlySavings * 12 * 100) / recommendation.netCost).toFixed(1)}% per annum
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Included Features</CardTitle>
            <CardDescription>Everything you get with this solar installation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-3">
              {recommendation.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button onClick={() => navigate("/proposals")} className="flex-1">
            Generate Detailed Proposal
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SolarRecommendation;
