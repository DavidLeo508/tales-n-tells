"use client";

import { useEffect, useRef } from "react";
import * as maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const locations = [
  {
    name: "Akuko Comic Book Store",
    address: "2C Adedeji Adekola, Lekki, Lagos, Nigeria, 105102",
    coordinates: [3.5852, 6.4698] as [number, number],
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=2C+Adedeji+Adekola,+Lekki,+Lagos,+Nigeria",
  },
  {
    name: "Didi Museum",
    address: "175 Akin Adesola Street, Victoria Island, Lagos",
    coordinates: [3.4219, 6.4281] as [number, number],
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=175+Akin+Adesola+Street,+Victoria+Island,+Lagos",
  },
  {
    name: "BookNook",
    address:
      "Block 31 Plot, Gateview Plaza, Lekki 1, 11 Admiralty Way, Eti-Osa, Lagos",
    coordinates: [3.4696, 6.4398] as [number, number],
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Gateview+Plaza,+11+Admiralty+Way,+Lekki,+Lagos",
  },
];

export default function LocationsMap() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,

      // Light, clean map style
style: `https://api.maptiler.com/maps/streets-v2-light/style.json?key=${process.env.NEXT_PUBLIC_MAPTILER_KEY}`,

      center: [3.48, 6.445],
      zoom: 11.5,
    });

    map.current.on("error", (e) => {
  console.error("MapLibre error:", e);
});


    map.current.addControl(
      new maplibregl.NavigationControl(),
      "top-right"
    );

    locations.forEach((location) => {
      const popup = new maplibregl.Popup({
        offset: 25,
        maxWidth: "280px",
      }).setHTML(`
        <div style="
          padding: 6px;
          font-family: Arial, sans-serif;
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
      `);

      new maplibregl.Marker({ color: "#c8103e" })
        .setLngLat(location.coordinates)
        .setPopup(popup)
        .addTo(map.current!);
    });

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, []);

  return (
    <div
      ref={mapContainer}
      className="w-full h-[450px] md:h-[550px] rounded-[28px] overflow-hidden"
    />
  );
}