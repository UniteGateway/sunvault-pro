import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Search } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { useNavigate } from "react-router-dom";
import { SatelliteMap } from "@/components/SatelliteMap";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const Satellite = () => {
  const navigate = useNavigate();
  const [searchAddress, setSearchAddress] = useState("");
  const [markedLocation, setMarkedLocation] = useState<google.maps.LatLngLiteral | null>(null);

  const handleMarkLocation = async (location: google.maps.LatLngLiteral) => {
    setMarkedLocation(location);
    toast.success("Location marked for analysis");
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error("Please login to save scan results");
        return;
      }

      const { data: scan, error } = await supabase
        .from("scans")
        .insert({
          user_id: user.id,
          address: searchAddress,
          latitude: location.lat,
          longitude: location.lng,
          total_roof_area: 2400,
          usable_solar_area: 1800,
          shaded_area: 300,
          estimated_capacity: 180
        })
        .select()
        .single();

      if (error) throw error;

      setTimeout(() => {
        navigate("/roof-area-result", { 
          state: { 
            location,
            address: searchAddress,
            scanId: scan.id
          } 
        });
      }, 1500);
    } catch (error) {
      console.error("Error saving scan:", error);
      toast.error("Failed to save scan results");
    }
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Satellite Roof Scan</h2>
          <p className="text-muted-foreground">
            Analyze roof space and solar potential using Google Maps satellite imagery
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              Enter Address
            </CardTitle>
            <CardDescription>
              Search for a location and click on the roof to analyze
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Enter address..."
                value={searchAddress}
                onChange={(e) => setSearchAddress(e.target.value)}
              />
              <Button>
                <Search className="mr-2 h-4 w-4" />
                Search
              </Button>
            </div>

            <SatelliteMap 
              address={searchAddress}
              onLocationSelect={handleMarkLocation}
            />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Satellite;
