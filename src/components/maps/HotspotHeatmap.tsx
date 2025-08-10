"use client";

import dynamic from "next/dynamic";
import { Section } from "@/components/common/Section";
import { violationHotspots } from "@/data/hotspots";
import { useMemo } from "react";
import type * as L from "leaflet";
// Do not import leaflet.heat at module scope to avoid window usage during SSR

import type { MapContainerProps, TileLayerProps } from "react-leaflet";
import type { ReactElement } from "react";
const MapContainer = dynamic(() => import("react-leaflet").then((m) => m.MapContainer), { ssr: false }) as unknown as (p: MapContainerProps & { whenCreated?: (map: L.Map) => void }) => ReactElement | null;
const TileLayer = dynamic(() => import("react-leaflet").then((m) => m.TileLayer), { ssr: false }) as unknown as (p: TileLayerProps) => ReactElement | null;

export function HotspotHeatmap() {
  const points = useMemo(() => violationHotspots.map((h) => [h.lat, h.lng, h.intensity] as [number, number, number]), []);
  return (
    <Section id="hotspots" title="违法与事故高发路段" subtitle="热力分布（示例）">
      <div className="rounded-xl overflow-hidden border">
        <div className="w-full h-[420px]">
          <MapContainer
            center={[23.129, 113.334]}
            zoom={12}
            scrollWheelZoom={false}
            style={{ height: "100%", width: "100%" }}
            whenCreated={async (map: L.Map) => {
              const LmodImport = await import("leaflet");
              await import("leaflet.heat");
              const Lmod = (LmodImport as unknown as { default?: typeof L }).default ?? (LmodImport as unknown as typeof L);
              type HeatLayerFactory = (
                pts: [number, number, number][],
                opts: { radius: number; blur: number }
              ) => L.Layer;
              (Lmod as unknown as { heatLayer: HeatLayerFactory })
                .heatLayer(points, { radius: 25, blur: 15 })
                .addTo(map);
            }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          </MapContainer>
        </div>
      </div>
    </Section>
  );
}


