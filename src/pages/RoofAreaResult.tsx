import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { MapPin, Ruler, Sun, ArrowRight, Home } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { useNavigate } from "react-router-dom";

const RoofAreaResult = () => {
  const navigate = useNavigate();

  const results = {
    location: "Bangalore, Karnataka",
    totalRoofArea: 2400,
    usableSolarArea: 1800,
    shadedArea: 300,
    obstructedArea: 300,
    roofType: "Flat Concrete",
    orientation: "South-facing",
    tilt: 15,
  };

  const usablePercentage = (results.usableSolarArea / results.totalRoofArea) * 100;

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Button variant="ghost" onClick={() => navigate("/satellite")} className="mb-4">
            <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
            Back to Scan
          </Button>
          <h2 className="text-3xl font-bold mb-2">Roof Area Analysis Results</h2>
          <p className="text-muted-foreground">Detailed breakdown of your roof's solar potential</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Home className="h-5 w-5 text-primary" />
                Total Roof Area
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{results.totalRoofArea} sq ft</div>
              <p className="text-sm text-muted-foreground mt-1">Complete roof coverage</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sun className="h-5 w-5 text-accent" />
                Usable Solar Area
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-accent">{results.usableSolarArea} sq ft</div>
              <p className="text-sm text-muted-foreground mt-1">Available for solar panels</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Ruler className="h-5 w-5 text-secondary" />
                Efficiency
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-secondary">{usablePercentage.toFixed(0)}%</div>
              <p className="text-sm text-muted-foreground mt-1">Roof utilization rate</p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Area Breakdown</CardTitle>
            <CardDescription>Visual representation of roof area distribution</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Usable Solar Area</span>
                <span className="text-sm text-muted-foreground">{results.usableSolarArea} sq ft</span>
              </div>
              <Progress value={usablePercentage} className="h-3" />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Shaded Area</span>
                <span className="text-sm text-muted-foreground">{results.shadedArea} sq ft</span>
              </div>
              <Progress value={(results.shadedArea / results.totalRoofArea) * 100} className="h-3" />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Obstructed Area</span>
                <span className="text-sm text-muted-foreground">{results.obstructedArea} sq ft</span>
              </div>
              <Progress value={(results.obstructedArea / results.totalRoofArea) * 100} className="h-3" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Roof Specifications</CardTitle>
            <CardDescription>Technical details of your roof structure</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">Location</p>
                  <p className="text-sm text-muted-foreground">{results.location}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Home className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">Roof Type</p>
                  <p className="text-sm text-muted-foreground">{results.roofType}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Sun className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">Orientation</p>
                  <p className="text-sm text-muted-foreground">{results.orientation}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Ruler className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">Roof Tilt</p>
                  <p className="text-sm text-muted-foreground">{results.tilt}°</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 flex gap-4">
          <Button onClick={() => navigate("/shading-analysis")} className="flex-1">
            Continue to Shading Analysis
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default RoofAreaResult;
