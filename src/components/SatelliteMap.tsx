import { useState, useCallback, useEffect } from "react";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import { GOOGLE_MAPS_API_KEY, GOOGLE_MAPS_CONFIG } from "@/lib/googleMaps";
import { Button } from "@/components/ui/button";
import { Maximize2 } from "lucide-react";

interface SolarSite {
  id: string;
  type: string;
  lat: number;
  lng: number;
  name?: string;
  tags?: Record<string, string>;
}

interface SatelliteMapProps {
  address: string;
  searchTrigger?: number;
  onLocationSelect?: (location: { lat: number; lng: number; address: string }) => void;
  onSolarSites?: (sites: SolarSite[]) => void;
  radiusKm?: number;
}

const SatelliteMap = ({ address, searchTrigger = 0, onLocationSelect, onSolarSites, radiusKm = 5 }: SatelliteMapProps) => {
  const [center, setCenter] = useState(GOOGLE_MAPS_CONFIG.defaultCenter);
  const [zoom, setZoom] = useState(18);
  const [markerPosition, setMarkerPosition] = useState<{ lat: number; lng: number } | null>(null);
  const [solarMarkers, setSolarMarkers] = useState<SolarSite[]>([]);

  const fetchSolarSites = useCallback(async (c: { lat: number; lng: number }) => {
    try {
      const radius = Math.round(radiusKm * 1000);
      const query = `[out:json][timeout:25];
(
  node(around:${radius},${c.lat},${c.lng})["power"="generator"]["generator:source"="solar"];
  way(around:${radius},${c.lat},${c.lng})["power"="generator"]["generator:source"="solar"];
  relation(around:${radius},${c.lat},${c.lng})["power"="generator"]["generator:source"="solar"];
  node(around:${radius},${c.lat},${c.lng})["generator:method"="photovoltaic"];
  way(around:${radius},${c.lat},${c.lng})["generator:method"="photovoltaic"];
  node(around:${radius},${c.lat},${c.lng})["solar"="panel"];
  way(around:${radius},${c.lat},${c.lng})["solar"="panel"];
);
out center 30;`;
      const res = await fetch("https://overpass-api.de/api/interpreter", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8" },
        body: new URLSearchParams({ data: query }).toString(),
      });
      const data = await res.json();
      const sites: SolarSite[] = (data.elements || [])
        .map((el: any) => {
          const lat = el.lat ?? el.center?.lat;
          const lng = el.lon ?? el.center?.lon;
          if (!lat || !lng) return null;
          return {
            id: `${el.type}/${el.id}`,
            type: el.type,
            lat,
            lng,
            name: el.tags?.name,
            tags: el.tags,
          } as SolarSite;
        })
        .filter(Boolean) as SolarSite[];
      setSolarMarkers(sites);
      onSolarSites?.(sites);
    } catch (e) {
      console.error("Overpass fetch failed", e);
    }
  }, [onSolarSites, radiusKm]);

  const handleMapClick = useCallback((event: any) => {
    if (event.detail?.latLng) {
      const newPos = {
        lat: event.detail.latLng.lat,
        lng: event.detail.latLng.lng,
      };
      setMarkerPosition(newPos);
      onLocationSelect?.({ ...newPos, address });
      fetchSolarSites(newPos);
    }
  }, [address, onLocationSelect, fetchSolarSites]);

  // Geocode address to center using OSM Nominatim to avoid extra Google setup
  useEffect(() => {
    if (!address?.trim()) return;
    const controller = new AbortController();
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1&addressdetails=1`;
    fetch(url, {
      headers: {
        "Accept": "application/json",
        // Set a descriptive UA per Nominatim usage policy
        "User-Agent": "unite-solar-app/1.0 (+https://lovable.dev)",
      },
      signal: controller.signal,
    })
      .then((r) => r.json())
      .then((results) => {
        if (results?.[0]) {
          const lat = parseFloat(results[0].lat);
          const lng = parseFloat(results[0].lon);
          const c = { lat, lng };
          setCenter(c);
          setZoom(18);
          setMarkerPosition(c);
          onLocationSelect?.({ ...c, address });
          fetchSolarSites(c);
        }
      })
      .catch((err) => {
        if ((err as any)?.name !== "AbortError") {
          console.warn("Geocoding failed", err);
        }
      });
    return () => controller.abort();
  }, [address, searchTrigger, onLocationSelect, fetchSolarSites]);

  // Auto-center on user's location on first load if permitted
  useEffect(() => {
    if (!navigator.geolocation) return;
    if (address?.trim()) return; // if searching, don't override
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const c = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setCenter(c);
        setZoom(16);
        fetchSolarSites(c);
      },
      () => { /* ignore */ },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  }, []); // run once

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
          center={center}
          zoom={zoom}
        >
          {markerPosition && <Marker position={markerPosition} />}
          {solarMarkers.map((s) => (
            <Marker key={s.id} position={{ lat: s.lat, lng: s.lng }} />
          ))}
        </Map>
      </APIProvider>

      <div className="absolute top-4 right-4 bg-background/95 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-border space-y-2">
        <div className="flex items-center gap-2 text-sm">
          <Maximize2 className="h-4 w-4 text-primary" />
          <span className="font-medium">Click on the roof to mark location</span>
        </div>
        <Button
          size="sm"
          variant="secondary"
          onClick={() => fetchSolarSites(markerPosition ?? center)}
        >
          Scan 5 km for solar rooftops
        </Button>
      </div>
    </div>
  );
};

export default SatelliteMap;
