import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Search } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { useNavigate } from "react-router-dom";
import SatelliteMap from "@/components/SatelliteMap";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const Satellite = () => {
  const navigate = useNavigate();
  const [searchAddress, setSearchAddress] = useState("");
  const [searchTrigger, setSearchTrigger] = useState(0);
  const [markedLocation, setMarkedLocation] = useState<google.maps.LatLngLiteral | null>(null);
  const [solarSites, setSolarSites] = useState<Array<{id:string; type:string; lat:number; lng:number; name?:string}>>([]);
  const handleMarkLocation = async (location: { lat: number; lng: number; address?: string }) => {
    setMarkedLocation({ lat: location.lat, lng: location.lng });
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
          address: searchAddress || location.address || "",
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
            location: { lat: location.lat, lng: location.lng },
            address: searchAddress || location.address || "",
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
            <form
              className="flex gap-2"
              onSubmit={(e) => { 
                e.preventDefault(); 
                console.log("Search submitted:", searchAddress);
                if (!searchAddress.trim()) {
                  toast.error("Please enter an address");
                  return;
                }
                setSearchTrigger((t) => t + 1); 
              }}
            >
              <Input
                placeholder="Enter address..."
                value={searchAddress}
                onChange={(e) => setSearchAddress(e.target.value)}
              />
              <Button type="submit" disabled={!searchAddress.trim()}>
                <Search className="mr-2 h-4 w-4" />
                Search
              </Button>
            </form>

            <SatelliteMap 
              address={searchAddress}
              searchTrigger={searchTrigger}
              onLocationSelect={handleMarkLocation}
              onSolarSites={setSolarSites}
            />
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Solar installations within 5 km</CardTitle>
            <CardDescription>Detected via open geospatial data; may be incomplete</CardDescription>
          </CardHeader>
          <CardContent>
            {solarSites.length === 0 ? (
              <p className="text-muted-foreground text-sm">No solar sites found yet. Search an address or click the map to scan.</p>
            ) : (
              <ul className="space-y-2">
                {solarSites.map((s) => (
                  <li key={s.id} className="text-sm">
                    <span className="font-medium">{s.name || "Unnamed site"}</span>
                    <span className="text-muted-foreground"> — {s.lat.toFixed(5)}, {s.lng.toFixed(5)}</span>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Satellite;
