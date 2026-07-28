"use client";

import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";

const locations = [
  {
    name: "Akuko Comic Book Store",
    address: "2C Adedeji Adekola, Lekki, Lagos, Nigeria, 105102",
    coordinates: [6.4698, 3.5852] as [number, number],
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=2C+Adedeji+Adekola,+Lekki,+Lagos,+Nigeria",
  },
  {
    name: "Didi Museum",
    address: "175 Akin Adesola Street, Victoria Island, Lagos",
    coordinates: [6.4281, 3.4219] as [number, number],
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=175+Akin+Adesola+Street,+Victoria+Island,+Lagos",
  },
  {
    name: "BookNook",
    address:
      "Block 31 Plot, Gateview Plaza, Lekki 1, 11 Admiralty Way, Eti-Osa, Lagos",
    coordinates: [6.4398, 3.4696] as [number, number],
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Gateview+Plaza,+11+Admiralty+Way,+Lekki,+Lagos",
  },
];

export default function LocationsMap() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<any>(null);

  useEffect(() => {
    // Import Leaflet only in the browser
    import("leaflet").then((L) => {
      if (!mapContainer.current || map.current) return;

      const markerIcon = L.divIcon({
        className: "custom-map-marker",
        html: `
          <div style="
            width: 28px;
            height: 28px;
            background: #c8103e;
            border: 3px solid white;
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            box-shadow: 0 2px 6px rgba(0,0,0,0.3);
            position: relative;
          ">
            <div style="
              width: 8px;
              height: 8px;
              background: white;
              border-radius: 50%;
              position: absolute;
              top: 7px;
              left: 7px;
            "></div>
          </div>
        `,
        iconSize: [28, 28],
        iconAnchor: [14, 28],
        popupAnchor: [0, -28],
      });

      map.current = L.map(mapContainer.current, {
        center: [6.445, 3.48],
        zoom: 11.5,
        zoomControl: true,
      });

      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
        {
          attribution:
            '&copy; OpenStreetMap contributors &copy; CARTO',
          maxZoom: 20,
        }
      ).addTo(map.current);

      locations.forEach((location) => {
        const popupContent = `
          <div style="
            padding: 6px;
            font-family: Arial, sans-serif;
            min-width: 220px;
          ">
            <h3 style="
              margin: 0 0 8px;
              font-size: 16px;
              font-weight: 700;
              color: #111;
            ">
              ${location.name}
            </h3>

            <p style="
              margin: 0 0 14px;
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
                padding: 9px 12px;
                background: #c8103e;
                color: white;
                text-decoration: none;
                font-size: 10px;
                font-weight: 700;
                letter-spacing: 1px;
                text-transform: uppercase;
              "
            >
              Open in Google Maps
            </a>
          </div>
        `;

        L.marker(location.coordinates, {
          icon: markerIcon,
        })
          .addTo(map.current)
          .bindPopup(popupContent);
      });

      setTimeout(() => {
        map.current?.invalidateSize();
      }, 100);
    });

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={mapContainer}
      className="w-full h-[450px] md:h-[550px] rounded-[28px] overflow-hidden"
    />
  );
}