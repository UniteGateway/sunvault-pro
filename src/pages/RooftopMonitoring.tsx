import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Search, Scan, Loader2, CheckCircle2, XCircle } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import SatelliteMap from "@/components/SatelliteMap";
import { toast } from "sonner";
import { detectSolarPanels, analyzeSatelliteImage, calculateSolarStats } from "@/lib/roboflow";
import { GOOGLE_MAPS_API_KEY } from "@/lib/googleMaps";
import { supabase } from "@/integrations/supabase/client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";

interface AnalysisResult {
  hasSolarPanels: boolean;
  panelCount: number;
  coveragePercentage: number;
  averageConfidence: number;
  imageUrl: string;
  location: {
    lat: number;
    lng: number;
  };
}

const RooftopMonitoring = () => {
  const [searchAddress, setSearchAddress] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<{lat: number; lng: number} | null>(null);

  const handleLocationSelect = (location: { lat: number; lng: number; address: string }) => {
    setSelectedLocation(location);
    setSearchAddress(location.address);
    toast.success("Location selected. Click 'Analyze Rooftop' to detect solar panels.");
  };

  const analyzeRooftop = async () => {
    if (!selectedLocation) {
      toast.error("Please select a location on the map first");
      return;
    }

    setIsAnalyzing(true);
    setAnalysisResult(null);

    try {
      // Step 1: Get satellite imagery
      toast.info("Fetching satellite imagery...");
      const satelliteImageUrl = await analyzeSatelliteImage(
        selectedLocation.lat,
        selectedLocation.lng,
        GOOGLE_MAPS_API_KEY,
        20
      );

      // Step 2: Convert image to base64 for Roboflow
      toast.info("Analyzing rooftop for solar panels...");
      const imageResponse = await fetch(satelliteImageUrl);
      const blob = await imageResponse.blob();

      // Convert blob to base64
      const base64Image = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(blob);
      });

      // Step 3: Detect solar panels using Roboflow
      const detectionResult = await detectSolarPanels(base64Image);

      // Step 4: Calculate statistics
      const stats = calculateSolarStats(
        detectionResult.predictions,
        detectionResult.image.width,
        detectionResult.image.height
      );

      const result: AnalysisResult = {
        hasSolarPanels: stats.hasSolarPanels,
        panelCount: stats.panelCount,
        coveragePercentage: stats.coveragePercentage,
        averageConfidence: stats.averageConfidence,
        imageUrl: satelliteImageUrl,
        location: selectedLocation,
      };

      setAnalysisResult(result);

      // Step 5: Save to database
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase.from("rooftop_scans").insert({
          user_id: user.id,
          address: searchAddress,
          latitude: selectedLocation.lat,
          longitude: selectedLocation.lng,
          has_solar_panels: result.hasSolarPanels,
          panel_count: result.panelCount,
          coverage_percentage: result.coveragePercentage,
          confidence_score: result.averageConfidence,
          scan_date: new Date().toISOString(),
        });
      }

      if (stats.hasSolarPanels) {
        toast.success(`Solar panels detected! Found ${stats.panelCount} panel(s)`);
      } else {
        toast.info("No solar panels detected on this rooftop");
      }
    } catch (error) {
      console.error("Analysis error:", error);
      toast.error("Failed to analyze rooftop. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Rooftop Solar Panel Monitoring</h2>
          <p className="text-muted-foreground">
            Analyze rooftops to detect existing solar panel installations using AI
          </p>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                Select Location
              </CardTitle>
              <CardDescription>
                Search for an address and click on a rooftop to analyze
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Enter address..."
                  value={searchAddress}
                  onChange={(e) => setSearchAddress(e.target.value)}
                />
                <Button variant="outline">
                  <Search className="mr-2 h-4 w-4" />
                  Search
                </Button>
              </div>

              <SatelliteMap
                address={searchAddress}
                onLocationSelect={handleLocationSelect}
              />

              <Button
                onClick={analyzeRooftop}
                disabled={!selectedLocation || isAnalyzing}
                className="w-full"
                size="lg"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Scan className="mr-2 h-4 w-4" />
                    Analyze Rooftop for Solar Panels
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {analysisResult && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {analysisResult.hasSolarPanels ? (
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  ) : (
                    <XCircle className="h-5 w-5 text-orange-500" />
                  )}
                  Analysis Results
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <Alert variant={analysisResult.hasSolarPanels ? "default" : "destructive"}>
                  <AlertTitle className="text-lg font-semibold">
                    {analysisResult.hasSolarPanels
                      ? "Solar Panels Detected"
                      : "No Solar Panels Detected"}
                  </AlertTitle>
                  <AlertDescription>
                    {analysisResult.hasSolarPanels
                      ? `Found ${analysisResult.panelCount} solar panel(s) on this rooftop`
                      : "This rooftop does not appear to have solar panels installed"}
                  </AlertDescription>
                </Alert>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        Panel Count
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">{analysisResult.panelCount}</div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        Coverage
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">
                        {analysisResult.coveragePercentage}%
                      </div>
                      <Progress
                        value={analysisResult.coveragePercentage}
                        className="mt-2"
                      />
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        Confidence
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">
                        {analysisResult.averageConfidence}%
                      </div>
                      <Progress
                        value={analysisResult.averageConfidence}
                        className="mt-2"
                      />
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">
                    Analyzed Image
                  </h3>
                  <img
                    src={analysisResult.imageUrl}
                    alt="Analyzed rooftop"
                    className="w-full rounded-lg border"
                  />
                </div>

                <div className="text-xs text-muted-foreground">
                  Location: {analysisResult.location.lat.toFixed(6)}, {analysisResult.location.lng.toFixed(6)}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default RooftopMonitoring;
