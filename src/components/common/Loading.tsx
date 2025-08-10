"use client";

import { useEffect, useState } from "react";

interface LoadingProps {
  message?: string;
  className?: string;
}

export function Loading({ message = "加载中...", className = "" }: LoadingProps) {
  return (
    <div className={`flex flex-col items-center justify-center p-8 ${className}`}>
      <div className="relative">
        {/* Animated loading rings */}
        <div className="w-12 h-12 border-4 border-emerald-200 dark:border-emerald-800 rounded-full animate-pulse"></div>
        <div className="absolute inset-0 w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
      <p className="mt-4 text-sm text-slate-600 dark:text-slate-300 font-medium">
        {message}
      </p>
    </div>
  );
}

interface ChartLoadingProps {
  height?: number;
  title?: string;
}

export function ChartLoading({ height = 400, title }: ChartLoadingProps) {
  const [dots, setDots] = useState(".");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? "." : prev + ".");
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass-card p-6 animate-pulse" style={{ height }}>
      <div className="flex items-center justify-between mb-4">
        {title && (
          <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded w-32"></div>
        )}
        <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded w-12"></div>
      </div>
      
      <div className="flex items-center justify-center h-full">
        <div className="text-center space-y-3">
          <div className="w-16 h-16 mx-auto bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-white text-2xl animate-bounce">
            📊
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
            图表加载中{dots}
          </p>
        </div>
      </div>
    </div>
  );
}

export function MapLoading({ height = 420 }: { height?: number }) {
  return (
    <div className="glass-card overflow-hidden" style={{ height }}>
      <div className="w-full h-full bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 flex items-center justify-center relative">
        {/* Animated map placeholder */}
        <div className="absolute inset-4 border-2 border-dashed border-emerald-300 dark:border-emerald-700 rounded-lg animate-pulse"></div>
        
        <div className="text-center space-y-3 z-10">
          <div className="w-16 h-16 mx-auto bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-white text-2xl animate-pulse">
            🗺️
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
            地图加载中...
          </p>
        </div>
        
        {/* Animated dots representing map data loading */}
        <div className="absolute top-8 left-8 w-2 h-2 bg-emerald-400 rounded-full animate-ping"></div>
        <div className="absolute top-16 right-12 w-2 h-2 bg-teal-400 rounded-full animate-ping" style={{ animationDelay: "0.5s" }}></div>
        <div className="absolute bottom-12 left-16 w-2 h-2 bg-cyan-400 rounded-full animate-ping" style={{ animationDelay: "1s" }}></div>
      </div>
    </div>
  );
}