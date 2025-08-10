"use client";

import dynamic from "next/dynamic";
import { Section } from "@/components/common/Section";
import { MapLoading } from "@/components/common/Loading";
import { useAppStore } from "@/lib/store";
import { coverageGeo } from "@/data/coverageGeo";
import { useEffect, useState } from "react";
import type { Feature, FeatureCollection, Geometry } from "geojson";
import type * as L from "leaflet";

import type { MapContainerProps, TileLayerProps, GeoJSONProps } from "react-leaflet";
import type { ReactElement } from "react";
const MapContainer = dynamic(() => import("react-leaflet").then(m => m.MapContainer), { 
  ssr: false,
  loading: () => <MapLoading />
}) as unknown as (p: MapContainerProps) => ReactElement | null;
const TileLayer = dynamic(() => import("react-leaflet").then(m => m.TileLayer), { ssr: false }) as unknown as (p: TileLayerProps) => ReactElement | null;
const GeoJSON = dynamic(() => import("react-leaflet").then(m => m.GeoJSON), { ssr: false }) as unknown as (p: GeoJSONProps) => ReactElement | null;

export function CoverageMap() {
  const year = useAppStore((s) => s.selectedYear);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, [year]);

  return (
    <Section 
      id="coverage" 
      title="基础设施覆盖分析" 
      subtitle="道路资源与承载力"
      description="非机动车道覆盖率的时空分布变化，展现城市交通基础设施建设成果。"
      className="bg-gradient-to-b from-white to-slate-50/50 dark:from-slate-900 dark:to-slate-800/50"
    >
      <div className="glass-card overflow-hidden">
        {isLoading ? (
          <MapLoading />
        ) : (
          <>
            <div className="w-full h-[480px] relative">
              <MapContainer 
                center={[23.129, 113.264]} 
                zoom={12} 
                scrollWheelZoom={false} 
                style={{ height: "100%", width: "100%" }}
                className="rounded-t-2xl"
              >
                <TileLayer 
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='© OpenStreetMap contributors'
                />
                <GeoJSON
                  key={year} // Force re-render when year changes
                  data={coverageGeo as unknown as FeatureCollection<Geometry, { name: string; coverage2020: number; coverage2024: number }>}
                  style={(feature?: Feature<Geometry, { name: string; coverage2020: number; coverage2024: number }>) => {
                    const cov = feature && year >= 2024 ? feature.properties.coverage2024 : feature?.properties.coverage2020 ?? 0;
                    const intensity = Math.round(cov * 255);
                    return { 
                      color: `rgb(16, ${100 + intensity * 0.6}, 129)`, 
                      weight: 2, 
                      fillColor: `rgba(16, 185, 129, ${0.2 + cov * 0.6})`, 
                      fillOpacity: 0.8,
                      dashArray: cov < 0.3 ? "5,5" : undefined
                    };
                  }}
                  onEachFeature={(feature: Feature<Geometry, { name: string; coverage2020: number; coverage2024: number }>, layer: L.Path) => {
                    const cov = year >= 2024 ? feature.properties.coverage2024 : feature.properties.coverage2020;
                    const coverage = Math.round(cov * 100);
                    (layer as unknown as { bindTooltip: (label: string) => void }).bindTooltip(
                      `${feature.properties.name} 覆盖率：${coverage}% (${year}年)`
                    );
                  }}
                />
              </MapContainer>
              
              {/* Coverage legend */}
              <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-lg p-3 text-xs border shadow-lg">
                <div className="font-semibold mb-2 text-slate-900 dark:text-white">覆盖率</div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-3 bg-emerald-500/80 rounded-sm"></div>
                    <span className="text-slate-600 dark:text-slate-300">高 (70%+)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-3 bg-emerald-400/60 rounded-sm"></div>
                    <span className="text-slate-600 dark:text-slate-300">中 (40-70%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-3 bg-emerald-300/40 border border-emerald-400 border-dashed rounded-sm"></div>
                    <span className="text-slate-600 dark:text-slate-300">低 (&lt;40%)</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-6 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-700">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-4">
                  <YearToggle />
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    选择年份查看覆盖率变化
                  </div>
                </div>
                
                {/* Quick stats */}
                <div className="flex gap-4 text-xs">
                  <div className="text-center">
                    <div className="font-semibold text-emerald-600 dark:text-emerald-400">
                      {year >= 2024 ? "68%" : "45%"}
                    </div>
                    <div className="text-slate-500 dark:text-slate-400">平均覆盖率</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-blue-600 dark:text-blue-400">
                      {year >= 2024 ? "856" : "643"}
                    </div>
                    <div className="text-slate-500 dark:text-slate-400">公里</div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 text-xs text-slate-400 dark:text-slate-500">
                数据来源：广州市交通运输局、规划部门（示例数据）
              </div>
            </div>
          </>
        )}
      </div>
    </Section>
  );
}

function YearToggle() {
  const year = useAppStore((s) => s.selectedYear);
  const setYear = useAppStore((s) => s.setYear);
  
  return (
    <div className="inline-flex items-center rounded-lg border border-slate-200 dark:border-slate-600 overflow-hidden text-sm bg-white dark:bg-slate-800 shadow-sm">
      {[2020, 2024].map((y) => (
        <button
          key={y}
          onClick={() => setYear(y)}
          className={`px-4 py-2 font-medium transition-all duration-200 ${
            y === year 
              ? "bg-emerald-500 text-white shadow-sm" 
              : "bg-transparent text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
          }`}
        >
          {y}
        </button>
      ))}
    </div>
  );
}


