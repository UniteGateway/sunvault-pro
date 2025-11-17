import { useState, useCallback } from "react";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import { GOOGLE_MAPS_API_KEY, GOOGLE_MAPS_CONFIG } from "@/lib/googleMaps";
import { Button } from "@/components/ui/button";
import { Maximize2 } from "lucide-react";

interface SatelliteMapProps {
  address: string;
  onLocationSelect?: (location: { lat: number; lng: number; address: string }) => void;
}

const SatelliteMap = ({ address, onLocationSelect }: SatelliteMapProps) => {
  const [center, setCenter] = useState(GOOGLE_MAPS_CONFIG.defaultCenter);
  const [zoom, setZoom] = useState(18);
  const [markerPosition, setMarkerPosition] = useState<{ lat: number; lng: number } | null>(null);

  const handleMapClick = useCallback((event: any) => {
    if (event.detail?.latLng) {
      const newPos = {
        lat: event.detail.latLng.lat,
        lng: event.detail.latLng.lng,
      };
      setMarkerPosition(newPos);
      if (onLocationSelect) {
        onLocationSelect({
          ...newPos,
          address,
        });
      }
    }
  }, [address, onLocationSelect]);

  return (
    <div className="relative w-full h-[500px] rounded-lg overflow-hidden border border-border">
      <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
        <Map
          defaultCenter={center}
          defaultZoom={zoom}
          mapTypeId="satellite"
          onClick={handleMapClick}
          gestureHandling="greedy"
          disableDefaultUI={false}
          mapId={GOOGLE_MAPS_CONFIG.mapId}
        >
          {markerPosition && <Marker position={markerPosition} />}
        </Map>
      </APIProvider>
      
      <div className="absolute top-4 right-4 bg-background/95 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-border">
        <div className="flex items-center gap-2 text-sm">
          <Maximize2 className="h-4 w-4 text-primary" />
          <span className="font-medium">Click on the roof to mark location</span>
        </div>
      </div>
    </div>
  );
};

export default SatelliteMap;
