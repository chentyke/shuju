"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export function GlobalProgressBar() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      
      setScrollProgress(Math.min(Math.max(scrollPercent, 0), 100));
      
      // 滚动一定距离后显示进度条
      const shouldShow = scrollTop > 100;
      
      if (shouldShow && !shouldRender) {
        setShouldRender(true);
        setTimeout(() => setIsVisible(true), 10);
      } else if (!shouldShow && isVisible) {
        setIsVisible(false);
        setTimeout(() => setShouldRender(false), 500);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // 初始化

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isVisible, shouldRender]);

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = (clickX / rect.width) * 100;
    
    // 根据点击位置判断应该跳转到哪个页面
    let targetId = '';
    if (percentage < 10) {
      // 点击前10%跳转到Hero页面顶部（起始旗子区域）
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    } else if (percentage < 40) {
      targetId = 'daily-trips';
    } else if (percentage < 75) {
      targetId = 'page-3';
    } else {
      // 点击75%以后跳转到最后一页（终点旗子区域）
      targetId = 'page-4';
    }
    
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  if (!shouldRender) return null;

  return (
    <div 
      className={`fixed bottom-8 left-8 right-8 transition-all duration-700 ease-out ${
        isVisible 
          ? 'translate-y-0 opacity-100 scale-100' 
          : 'translate-y-8 opacity-0 scale-95'
      }`}
      style={{ 
        zIndex: 9999,
        transform: isVisible 
          ? 'translateY(0) scale(1)' 
          : 'translateY(2rem) scale(0.95)',
        opacity: isVisible ? 1 : 0,
        transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
    >
      {/* 路面背景容器 */}
      <div className="relative bg-gradient-to-b from-slate-600 to-slate-700 dark:from-slate-700 dark:to-slate-800 rounded-full p-3 shadow-xl backdrop-blur-sm border border-slate-500/30">
        
        {/* 路面纹理 */}
        <div className="absolute inset-3 rounded-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-500/20 via-slate-400/30 to-slate-500/20"></div>
          {/* 路面标线 */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/60 transform -translate-y-1/2">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-50"></div>
          </div>
          {/* 虚线标记 */}
          <div className="absolute top-1/2 left-0 right-0 h-px transform -translate-y-1/2 flex space-x-3">
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i} className="w-3 h-px bg-yellow-300/70"></div>
            ))}
          </div>
        </div>
        
        {/* 进度条轨道 */}
        <div 
          className="relative h-4 bg-slate-400/30 dark:bg-slate-600/30 rounded-full cursor-pointer group"
          onClick={handleProgressClick}
        >
          {/* 进度条填充 - 路面效果 */}
          <div 
            className="h-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-full transition-all duration-200 ease-out relative overflow-hidden"
            style={{ width: `${scrollProgress}%` }}
          >
            {/* 路面高光效果 */}
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-600/50 to-emerald-300/30 rounded-full"></div>
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-full"></div>
          </div>
          
          {/* 电动自行车 */}
          <div 
            className="absolute top-1/2 transform -translate-y-1/2 transition-all duration-200 ease-out"
            style={{ 
              left: `calc(${Math.max(scrollProgress, 3)}% - 20px)`,
            }}
          >
            {/* 自行车阴影 */}
            <div 
              className="absolute top-6 left-2 w-8 h-2 bg-black/20 rounded-full blur-sm"
              style={{
                transform: 'scaleX(-1)',
              }}
            ></div>
            
            {/* 自行车主体 */}
            <div 
              className="relative"
              style={{
                transform: 'scaleX(-1)',
              }}
            >
              <Image 
                src="/bike-icon.png" 
                alt="电动自行车" 
                width={40}
                height={40}
                className="drop-shadow-lg transition-transform duration-200 group-hover:scale-110"
                style={{
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
                }}
              />
              
            </div>
          </div>
          
          {/* 章节标记 */}
          <div className="absolute inset-0">
            {/* 起始旗子 */}
            <div
              className={`absolute top-1/2 transform -translate-y-1/2 transition-all duration-500 cursor-pointer ${
                scrollProgress > 5 
                  ? 'opacity-80 hover:opacity-100 animate-[flagWave_2s_ease-in-out_infinite,flagAppear_0.5s_ease-out]' 
                  : 'opacity-0 animate-[flagDisappear_0.3s_ease-in]'
              }`}
              style={{ left: '0%' }}
              onClick={(e) => {
                e.stopPropagation();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <div className="relative -mx-3 -my-3 px-3 py-3">
                {/* 起始旗子 */}
                <div className="relative transform -translate-x-1/2 -translate-y-6">
                  {/* 旗杆 */}
                  <div className="w-0.5 h-6 bg-green-600 absolute left-1/2 top-0 transform -translate-x-1/2 shadow-sm"></div>
                  {/* 旗面 */}
                  <div className="w-4 h-3 bg-gradient-to-r from-green-500 to-emerald-500 absolute left-0.5 top-0 shadow-md animate-[flagFlutter_1.5s_ease-in-out_infinite] rounded-r-sm">
                    <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent rounded-r-sm"></div>
                  </div>
                  {/* 旗子阴影 */}
                  <div className="absolute top-6 left-0 w-4 h-1 bg-black/10 rounded-full blur-sm"></div>
                </div>
                
                {/* 标签 */}
                <div className="absolute top-full mt-2 transform -translate-x-1/2 opacity-0 hover:opacity-100 transition-opacity duration-150 pointer-events-none">
                  <div className="bg-slate-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap shadow-md">
                    起点
                  </div>
                </div>
              </div>
            </div>

            {/* 中间章节点 */}
            {[
              { position: 33, label: "出行量趋势", id: "daily-trips" },
              { position: 67, label: "第三页测试", id: "page-3" }
            ].map((section, index) => (
              <div
                key={index}
                className="absolute top-1/2 transform -translate-y-1/2 opacity-80 hover:opacity-100 transition-all duration-200 cursor-pointer"
                style={{ left: `${section.position}%` }}
                onClick={(e) => {
                  e.stopPropagation();
                  const targetElement = document.getElementById(section.id);
                  if (targetElement) {
                    targetElement.scrollIntoView({
                      behavior: 'smooth',
                      block: 'start'
                    });
                  }
                }}
              >
                <div className="relative -mx-3 -my-3 px-3 py-3">
                  <div className="w-3 h-3 bg-white/90 rounded-full transform -translate-x-1/2 hover:bg-white hover:scale-125 transition-all duration-150 shadow-sm"></div>
                  
                  <div className="absolute top-full mt-2 transform -translate-x-1/2 opacity-0 hover:opacity-100 transition-opacity duration-150 pointer-events-none">
                    <div className="bg-slate-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap shadow-md">
                      {section.label}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* 终点旗子 */}
            <div
              className="absolute top-1/2 transform -translate-y-1/2 opacity-80 hover:opacity-100 hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer animate-[flagWave_2s_ease-in-out_infinite_0.5s] group"
              style={{ left: '100%' }}
              onClick={(e) => {
                e.stopPropagation();
                const targetElement = document.getElementById('page-4');
                if (targetElement) {
                  targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                  });
                }
              }}
            >
              <div className="relative -mx-3 -my-3 px-3 py-3">
                {/* 终点旗子 */}
                <div className="relative transform -translate-x-full -translate-y-6">
                  {/* 旗杆 */}
                  <div className="w-0.5 h-6 bg-red-600 absolute right-0 top-0 shadow-sm"></div>
                  {/* 旗面 */}
                  <div className="w-4 h-3 bg-gradient-to-r from-red-500 to-rose-500 absolute right-0.5 top-0 shadow-md animate-[flagFlutter_1.5s_ease-in-out_infinite_0.3s] rounded-l-sm group-hover:shadow-lg group-hover:shadow-red-500/30 group-active:shadow-xl group-active:shadow-red-500/50 transition-shadow duration-300">
                    <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent rounded-l-sm group-hover:from-white/40 transition-all duration-300"></div>
                    {/* 悬浮时的光晕效果 */}
                    <div className="absolute inset-0 bg-red-400/0 group-hover:bg-red-400/20 rounded-l-sm transition-all duration-300"></div>
                  </div>
                  {/* 旗子阴影 */}
                  <div className="absolute top-6 right-0 w-4 h-1 bg-black/10 rounded-full blur-sm"></div>
                </div>
                
                {/* 标签 */}
                <div className="absolute top-full mt-2 transform -translate-x-1/2 opacity-0 hover:opacity-100 transition-opacity duration-150 pointer-events-none">
                  <div className="bg-slate-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap shadow-md">
                    终点
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* 进度百分比提示 */}
          <div 
            className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none"
            style={{ 
              left: `calc(${Math.max(scrollProgress, 10)}% - 20px)`,
              top: '-32px'
            }}
          >
            <div className="bg-slate-800 text-white text-xs px-2 py-1 rounded shadow-md whitespace-nowrap">
              {Math.round(scrollProgress)}%
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}