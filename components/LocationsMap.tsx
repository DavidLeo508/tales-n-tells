"use client";

import { useEffect, useRef } from "react";

interface Location {
  name: string;
  address: string;
  position: {
    lat: number;
    lng: number;
  };
  mapsUrl: string;
}

interface GoogleMapsWindow extends Window {
  google?: any;
}

const locations: Location[] = [
  {
    name: "Akuko Comic Book Store",
    address: "2C Adedeji Adekola, Lekki, Lagos, Nigeria, 105102",
    position: {
      lat: 6.4698,
      lng: 3.5852,
    },
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=2C+Adedeji+Adekola,+Lekki,+Lagos,+Nigeria",
  },
  {
    name: "Didi Museum",
    address: "175 Akin Adesola Street, Victoria Island, Lagos",
    position: {
      lat: 6.4281,
      lng: 3.4219,
    },
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=175+Akin+Adesola+Street,+Victoria+Island,+Lagos",
  },
  {
    name: "BookNook",
    address:
      "Block 31 Plot, Gateview Plaza, Lekki 1, 11 Admiralty Way, Eti-Osa, Lagos",
    position: {
      lat: 6.4398,
      lng: 3.4696,
    },
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Gateview+Plaza,+11+Admiralty+Way,+Lekki,+Lagos",
  },
];

export default function LocationsMap() {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    if (!apiKey) {
      console.error(
        "Google Maps API key is missing. Check your .env.local file."
      );
      return;
    }

    let cancelled = false;

    async function loadMap() {
      const win = window as GoogleMapsWindow;

      // Load Google Maps script if it hasn't already been loaded
      if (!win.google?.maps) {
        await new Promise<void>((resolve, reject) => {
          const existingScript = document.querySelector(
            'script[data-google-maps="true"]'
          );

          if (existingScript) {
            existingScript.addEventListener("load", () => resolve());
            existingScript.addEventListener("error", () =>
              reject(new Error("Google Maps failed to load."))
            );
            return;
          }

          const script = document.createElement("script");

          script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=weekly`;
          script.async = true;
          script.defer = true;
          script.dataset.googleMaps = "true";

          script.onload = () => resolve();

          script.onerror = () =>
            reject(new Error("Google Maps failed to load."));

          document.head.appendChild(script);
        });
      }

      if (cancelled || !mapRef.current) return;

      const googleMaps = (window as GoogleMapsWindow).google?.maps;

      if (!googleMaps) {
        throw new Error("Google Maps API was not available.");
      }

      // Load the Advanced Marker library
      const markerLibrary = await googleMaps.importLibrary("marker");

      const AdvancedMarkerElement =
        markerLibrary.AdvancedMarkerElement;

      // Create the map
      const map = new googleMaps.Map(mapRef.current, {
        center: {
          lat: 6.445,
          lng: 3.48,
        },
        zoom: 12,
        mapId: "DEMO_MAP_ID",
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: true,
        zoomControl: true,
      });

      const bounds = new googleMaps.LatLngBounds();

      // Add all three locations
      locations.forEach((location) => {
        const marker = new AdvancedMarkerElement({
          map,
          position: location.position,
          title: location.name,
        });

        const infoWindow = new googleMaps.InfoWindow({
          content: `
            <div style="
              padding: 8px;
              max-width: 220px;
              font-family: Arial, sans-serif;
            ">
              <h3 style="
                margin: 0 0 8px;
                font-size: 16px;
                color: #111;
              ">
                ${location.name}
              </h3>

              <p style="
                margin: 0 0 12px;
                font-size: 13px;
                line-height: 1.5;
                color: #555;
              ">
                ${location.address}
              </p>

              <a
                href="${location.mapsUrl}"
                target="_blank"
                rel="noopener noreferrer"
                style="
                  display: inline-block;
                  padding: 8px 12px;
                  background: #c8103e;
                  color: white;
                  text-decoration: none;
                  font-size: 11px;
                  font-weight: bold;
                  letter-spacing: 1px;
                  text-transform: uppercase;
                "
              >
                Open in Google Maps
              </a>
            </div>
          `,
        });

        marker.addListener("click", () => {
          infoWindow.open({
            map,
            anchor: marker,
          });
        });

        bounds.extend(location.position);
      });

      // Fit the map around all three locations
      map.fitBounds(bounds);

      // Prevent the map from zooming in too closely
      googleMaps.event.addListenerOnce(
        map,
        "bounds_changed",
        () => {
          const currentZoom = map.getZoom();

          if (currentZoom !== undefined && currentZoom > 13) {
            map.setZoom(13);
          }
        }
      );
    }

    loadMap().catch((error) => {
      console.error("Google Maps error:", error);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div
      ref={mapRef}
      className="w-full h-[450px] md:h-[550px] rounded-[28px] overflow-hidden"
    />
  );
}