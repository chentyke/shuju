"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export function GlobalProgressBar() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  // 点击外部关闭菜单
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMenuOpen) {
        const target = event.target as HTMLElement;
        if (!target.closest('[data-progress-bar]')) {
          setIsMenuOpen(false);
        }
      }
    };

    if (isMenuOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isMenuOpen]);

  const handleProgressClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuItemClick = (targetId: string) => {
    if (targetId === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (targetId === 'bottom') {
      window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
    } else {
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
    setIsMenuOpen(false);
  };

  if (!shouldRender) return null;

  return (
    <div 
      data-progress-bar
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

      {/* 目录菜单 */}
      {isMenuOpen && (
        <div className="absolute bottom-full mb-4 left-0 right-0 bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm rounded-lg shadow-xl border border-slate-200/50 dark:border-slate-600/50 overflow-hidden animate-in slide-in-from-bottom-2 duration-300">
          <div className="py-2">
            <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2 px-3 uppercase tracking-wide">
              快速导航
            </div>
            <div className="space-y-0">
              {[
                { id: 'daily-trips', label: '🚀 疾驰之势' },
                { id: 'violation-trends', label: '⚠️ 隐患在途' },
                { id: 'rider-pressure', label: '🚴 逐单争速' },
                { id: 'causal-analysis', label: '🔍 探因溯源' },
                { id: 'best-practices', label: '🌟 他山之石' }
              ].map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleMenuItemClick(item.id)}
                  className="w-full text-left px-3 py-2.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100/70 dark:hover:bg-slate-700/70 transition-all duration-200 hover:translate-x-1 border-l-2 border-transparent hover:border-blue-400"
                >
                  <span className="flex items-center space-x-3">
                    <span className="text-base leading-none">{item.label.split(' ')[0]}</span>
                    <span className="font-medium">{item.label.split(' ').slice(1).join(' ')}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}