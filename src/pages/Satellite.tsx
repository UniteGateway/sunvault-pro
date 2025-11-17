import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, Satellite as SatelliteIcon } from "lucide-react";
import { toast } from "sonner";
import DashboardLayout from "@/components/DashboardLayout";

const Satellite = () => {
  const [address, setAddress] = useState("");
  const [isScanning, setIsScanning] = useState(false);

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsScanning(true);
    
    // Placeholder for satellite scan functionality
    setTimeout(() => {
      setIsScanning(false);
      toast.success("Satellite scan completed! Results will be available shortly.");
    }, 2000);
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">Satellite Roof Scan</h2>
            <p className="text-muted-foreground">
              Analyze roof space and solar potential using satellite imagery
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <SatelliteIcon className="h-5 w-5 text-primary" />
                Enter Property Address
              </CardTitle>
              <CardDescription>
                We'll analyze the roof area and calculate solar installation potential
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleScan} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="address">Property Address</Label>
                  <div className="flex gap-2">
                    <Input
                      id="address"
                      placeholder="Enter complete address with pincode"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={isScanning}>
                  <Search className="mr-2 h-4 w-4" />
                  {isScanning ? "Scanning..." : "Start Satellite Scan"}
                </Button>
              </form>

              <div className="mt-6 p-4 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">What we analyze:</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Roof area and orientation</li>
                  <li>• Shading analysis throughout the day</li>
                  <li>• Optimal panel placement</li>
                  <li>• Estimated energy generation</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Satellite;
