import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Eye } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface Scan {
  id: string;
  address: string;
  latitude: number;
  longitude: number;
  total_roof_area: number;
  usable_solar_area: number;
  estimated_capacity: number;
  created_at: string;
}

export function RecentScans() {
  const [scans, setScans] = useState<Scan[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchScans();
  }, []);

  const fetchScans = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("scans")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(5);

      if (error) throw error;

      setScans(data || []);
    } catch (error) {
      console.error("Error fetching scans:", error);
      toast.error("Failed to load scan history");
    } finally {
      setLoading(false);
    }
  };

  const viewScan = (scan: Scan) => {
    navigate("/roof-area-result", {
      state: {
        location: { lat: scan.latitude, lng: scan.longitude },
        address: scan.address,
        scanId: scan.id
      }
    });
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Satellite Scans</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (scans.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Satellite Scans</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-8">
            No scans yet. Start by scanning a location!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Satellite Scans</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {scans.map((scan) => (
            <div
              key={scan.id}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <p className="font-medium">{scan.address}</p>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>{scan.usable_solar_area} sq ft</span>
                  <span>{scan.estimated_capacity} kW</span>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(scan.created_at).toLocaleDateString()}
                  </div>
                </div>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => viewScan(scan)}
              >
                <Eye className="mr-2 h-4 w-4" />
                View
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
