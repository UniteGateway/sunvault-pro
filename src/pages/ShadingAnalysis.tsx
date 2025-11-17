import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Cloud, Sun, CloudRain, ArrowRight, Calendar } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { useNavigate } from "react-router-dom";

const ShadingAnalysis = () => {
  const navigate = useNavigate();

  const shadingData = {
    overallShading: "Low",
    shadingPercentage: 12,
    peakSunHours: 5.2,
    monthlyShading: [
      { month: "Jan", shading: 15, sunHours: 5.0 },
      { month: "Feb", shading: 14, sunHours: 5.3 },
      { month: "Mar", shading: 12, sunHours: 5.5 },
      { month: "Apr", shading: 10, sunHours: 5.8 },
      { month: "May", shading: 8, sunHours: 6.0 },
      { month: "Jun", shading: 7, sunHours: 5.9 },
      { month: "Jul", shading: 10, sunHours: 5.4 },
      { month: "Aug", shading: 11, sunHours: 5.5 },
      { month: "Sep", shading: 12, sunHours: 5.6 },
      { month: "Oct", shading: 13, sunHours: 5.4 },
      { month: "Nov", shading: 14, sunHours: 5.1 },
      { month: "Dec", shading: 16, sunHours: 4.9 },
    ],
    obstacleAnalysis: [
      { type: "Trees", impact: "Medium", location: "North-East", shadingTime: "Morning (6-9 AM)" },
      { type: "Building", impact: "Low", location: "West", shadingTime: "Evening (5-7 PM)" },
      { type: "Water Tank", impact: "Low", location: "Center", shadingTime: "Noon (12-2 PM)" },
    ],
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Button variant="ghost" onClick={() => navigate("/roof-area-result")} className="mb-4">
            <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
            Back to Roof Analysis
          </Button>
          <h2 className="text-3xl font-bold mb-2">Shading Analysis</h2>
          <p className="text-muted-foreground">Understanding shadow patterns and their impact on solar generation</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cloud className="h-5 w-5 text-muted-foreground" />
                Overall Shading
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2">{shadingData.overallShading}</div>
              <Badge variant={shadingData.shadingPercentage < 15 ? "default" : "secondary"}>
                {shadingData.shadingPercentage}% shaded
              </Badge>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sun className="h-5 w-5 text-primary" />
                Peak Sun Hours
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary mb-2">{shadingData.peakSunHours}</div>
              <p className="text-sm text-muted-foreground">hours per day (average)</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CloudRain className="h-5 w-5 text-accent" />
                Solar Efficiency
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-accent mb-2">88%</div>
              <p className="text-sm text-muted-foreground">After shading losses</p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Monthly Shading Pattern
            </CardTitle>
            <CardDescription>Seasonal variation in shading and sun exposure</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {shadingData.monthlyShading.map((month) => (
                <div key={month.month} className="flex items-center gap-4">
                  <div className="w-12 font-medium text-sm">{month.month}</div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Shading: {month.shading}%</span>
                      <span>Sun Hours: {month.sunHours}h</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-accent"
                        style={{ width: `${100 - month.shading}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Obstacle Analysis</CardTitle>
            <CardDescription>Identified objects causing shading on your roof</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {shadingData.obstacleAnalysis.map((obstacle, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold">{obstacle.type}</h4>
                    <Badge variant={obstacle.impact === "Low" ? "default" : "secondary"}>
                      {obstacle.impact} Impact
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Location:</span>
                      <span className="ml-2 font-medium">{obstacle.location}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Shading Time:</span>
                      <span className="ml-2 font-medium">{obstacle.shadingTime}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 flex gap-4">
          <Button onClick={() => navigate("/solar-recommendation")} className="flex-1">
            View Solar Recommendations
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ShadingAnalysis;
