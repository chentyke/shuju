"use client";

import { useEffect, useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { useInView } from "react-intersection-observer";
import { restrictedRoads, getActiveRestrictionsAtTime } from "@/data/spatioTemporalViolations";

// 动态导入地图组件，避免SSR问题
const MapContainer = dynamic(() => import("react-leaflet").then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then(mod => mod.TileLayer), { ssr: false });
const Polyline = dynamic(() => import("react-leaflet").then(mod => mod.Polyline), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then(mod => mod.Popup), { ssr: false });
const Tooltip = dynamic(() => import("react-leaflet").then(mod => mod.Tooltip), { ssr: false });

export function RestrictedRoadsMap() {
  const [currentTime, setCurrentTime] = useState({ hour: 8, minute: 0 });
  const [isPlaying, setIsPlaying] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  // 在客户端加载地图
  useEffect(() => {
    setMapLoaded(true);
  }, []);

  // 自动播放时间轴
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && inView) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          let newMinute = prev.minute + 30;
          let newHour = prev.hour;
          if (newMinute >= 60) {
            newMinute = 0;
            newHour = (newHour + 1) % 24;
          }
          return { hour: newHour, minute: newMinute };
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, inView]);

  // 获取当前时间的活跃限行路段
  const activeRestrictions = useMemo(() => {
    return getActiveRestrictionsAtTime(currentTime.hour, currentTime.minute);
  }, [currentTime]);

  // 格式化时间显示
  const formatTime = (hour: number, minute: number) => {
    return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
  };

  // 获取路段颜色和样式
  const getRoadStyle = (road: any) => {
    const isActive = activeRestrictions.some(r => r.name === road.name);
    const baseStyle = {
      weight: isActive ? 8 : 5, // 增加线条粗细
      opacity: isActive ? 1 : 0.8, // 提高透明度
      dashArray: road.type === '高峰期限行' ? '15, 8' : undefined, // 更明显的虚线
    };

    if (road.type === '全天限行') {
      return {
        ...baseStyle,
        color: isActive ? '#dc2626' : '#ef4444', // 红色实线
      };
    } else {
      return {
        ...baseStyle,
        color: isActive ? '#ea580c' : '#f97316', // 橙色虚线
      };
    }
  };

  // 获取时间段描述
  const getTimeDescription = () => {
    const currentDecimal = currentTime.hour + currentTime.minute / 60;
    if ((currentDecimal >= 8 && currentDecimal <= 9.5)) {
      return "早高峰期间 - 上班通勤高峰";
    } else if (currentDecimal >= 17.5 && currentDecimal <= 19) {
      return "晚高峰期间 - 下班及外卖配送高峰";
    } else if (currentDecimal >= 8 && currentDecimal <= 19) {
      return "工作时间 - 部分路段限行";
    } else {
      return "非限行时间段";
    }
  };

  if (!mapLoaded) {
    return (
      <div ref={ref} className="w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center">
        <div className="text-gray-500">地图加载中...</div>
      </div>
    );
  }

  return (
    <div ref={ref} className="w-full">
      {/* 控制面板 */}
      <div className="glass-card p-6 mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 shadow-lg ${
                isPlaying
                  ? 'bg-red-500 text-white hover:bg-red-600'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              <span className="text-sm">{isPlaying ? '⏸️' : '▶️'}</span>
              {isPlaying ? '暂停' : '播放'}
            </button>
            <div className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full">
              <span className="text-sm text-slate-600 dark:text-slate-400">当前时间:</span>
              <span className="text-lg font-bold text-slate-900 dark:text-white ml-2">
                {formatTime(currentTime.hour, currentTime.minute)}
              </span>
            </div>
          </div>
          
          <div className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-sm text-slate-600 dark:text-slate-400">
            {getTimeDescription()}
          </div>
        </div>

        {/* 时间滑块 */}
        <div className="mb-4">
          <div className="relative">
            <input
              type="range"
              min="0"
              max="47"
              value={currentTime.hour * 2 + Math.floor(currentTime.minute / 30)}
              onChange={(e) => {
                const value = parseInt(e.target.value);
                const hour = Math.floor(value / 2);
                const minute = (value % 2) * 30;
                setCurrentTime({ hour, minute });
                setIsPlaying(false);
              }}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mt-2">
            <span>0:00</span>
            <span>6:00</span>
            <span>12:00</span>
            <span>18:00</span>
            <span>24:00</span>
          </div>
        </div>

        {/* 图例 */}
        <div className="flex flex-wrap items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-6 h-1 bg-red-500 rounded"></div>
            <span className="text-slate-600 dark:text-slate-400">全天限行 (8:00-19:00)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-1 border-t-2 border-dashed border-orange-500"></div>
            <span className="text-slate-600 dark:text-slate-400">高峰期限行 (8:00-9:30, 17:30-19:00)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-amber-400 rounded animate-pulse"></div>
            <span className="text-slate-600 dark:text-slate-400">当前活跃限行</span>
          </div>
        </div>
      </div>

      {/* 地图容器 */}
      <div className="glass-card p-0 overflow-hidden">
        <MapContainer
          center={[23.125, 113.28]} // 广州市中心
          zoom={12}
          style={{ height: '500px', width: '100%' }}
          zoomControl={true}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          
          {/* 渲染限行路段 */}
          {restrictedRoads.map((road, index) => {
            const style = getRoadStyle(road);
            const isActive = activeRestrictions.some(r => r.name === road.name);
            
            return (
              <Polyline
                key={`${road.name}-${index}`}
                positions={road.coordinates as any}
                pathOptions={style}
              >
                <Tooltip permanent={isActive} direction="center" className="road-tooltip">
                  <div className="text-xs font-medium">
                    {road.name}
                    {isActive && <div className="text-red-600">● 限行中</div>}
                  </div>
                </Tooltip>
                
                <Popup>
                  <div className="p-3 max-w-xs">
                    <h3 className="font-bold text-base mb-3 text-slate-900">{road.name}</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-slate-700">限行类型:</span> 
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          road.type === '全天限行' 
                            ? 'bg-red-100 text-red-700' 
                            : 'bg-orange-100 text-orange-700'
                        }`}>
                          {road.type}
                        </span>
                      </div>
                      <div>
                        <span className="font-medium text-slate-700">限行时间:</span> 
                        <span className="ml-2 text-slate-600">{road.restrictionTime}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-slate-700">当前状态:</span> 
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          isActive 
                            ? 'bg-red-100 text-red-700' 
                            : 'bg-green-100 text-green-700'
                        }`}>
                          {isActive ? '限行中' : '可通行'}
                        </span>
                      </div>
                      <div className="text-slate-600 mt-3 p-2 bg-slate-50 rounded">
                        {road.description}
                      </div>
                      {road.violationHotspot && (
                        <div className="bg-amber-50 border-l-3 border-amber-400 pl-3 py-2 mt-3">
                          <span className="text-amber-700 text-xs font-medium flex items-center">
                            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            违法行为热点区域
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </Popup>
              </Polyline>
            );
          })}
        </MapContainer>
      </div>

      {/* 统计信息 */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="glass-card p-6 text-center bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 border-l-4 border-blue-500">
          <div className="w-12 h-12 mx-auto mb-3 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
            {activeRestrictions.length}
          </div>
          <div className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            当前限行路段
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400">
            实时监控状态
          </div>
        </div>
        <div className="glass-card p-6 text-center bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/30 dark:to-red-800/30 border-l-4 border-red-500">
          <div className="w-12 h-12 mx-auto mb-3 bg-red-100 dark:bg-red-900/50 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="text-3xl font-bold text-red-600 dark:text-red-400 mb-2">
            {activeRestrictions.filter(r => r.type === '全天限行').length}
          </div>
          <div className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            全天限行
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400">
            8:00-19:00
          </div>
        </div>
        <div className="glass-card p-6 text-center bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/30 border-l-4 border-orange-500">
          <div className="w-12 h-12 mx-auto mb-3 bg-orange-100 dark:bg-orange-900/50 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-orange-600 dark:text-orange-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">
            {activeRestrictions.filter(r => r.type === '高峰期限行').length}
          </div>
          <div className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            高峰期限行
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400">
            早晚高峰时段
          </div>
        </div>
      </div>
    </div>
  );
}