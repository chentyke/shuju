"use client";

import { useEffect, useRef } from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { Section } from "@/components/common/Section";

export function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const { ref: metricsRef, inView: metricsInView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.style.opacity = "0";
      titleRef.current.style.transform = "translateY(30px)";
      
      // Trigger animation
      const timer = setTimeout(() => {
        if (titleRef.current) {
          titleRef.current.style.transition = "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)";
          titleRef.current.style.opacity = "1";
          titleRef.current.style.transform = "translateY(0)";
        }
      }, 200);

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <Section 
      id="hero" 
      className="bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 relative overflow-hidden" 
      fullScreen
    >

      <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
        <div className="space-y-6">
          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
            <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse" />
            数据新闻专题
          </div>
          
          <h1 
            ref={titleRef}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent"
            role="heading"
            aria-level={1}
          >
            早高峰的
            <br />
            <span className="text-emerald-600 dark:text-emerald-400">电动车洪流</span>
            <br />
            广州四年18倍增长
          </h1>
          
          <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-lg">
            早高峰的天河路口，非机动车道被各类电动自行车挤得满满当当。铃声与车轮声此起彼伏，构成了广州早高峰独有的背景音。这拥挤的背后，是一组令人瞠目的增长数字：
            <span className="font-semibold text-emerald-600 dark:text-emerald-400">四年间从32.5万辆飙升至576万辆</span>，
            增幅接近18倍。
          </p>
          
          <div ref={metricsRef} className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
            <Metric 
              label="2024年保有量" 
              end={576} 
              animate={metricsInView} 
              icon="🛵"
              suffix="万辆"
              highlight={true}
            />
            <Metric 
              label="日均出行量" 
              end={903} 
              animate={metricsInView}
              icon="🚴"
              suffix="万人次"
              description="首超地铁客流"
            />
            <Metric 
              label="增长倍数" 
              end={18} 
              animate={metricsInView}
              icon="📈"
              suffix="倍"
              description="四年爆发式增长"
            />
          </div>
        </div>
        
        <div className="relative">
          {/* 便签图风格的增长轨迹 */}
          <div className="p-4 sm:p-6 h-72 sm:h-80 relative overflow-visible">
            {/* 优化的标题区域 */}
            <div className="text-center mb-6 space-y-2">
              <h3 className="text-xl font-bold bg-gradient-to-r from-slate-800 to-emerald-600 bg-clip-text text-transparent dark:from-slate-200 dark:to-emerald-400">
                四年爆发式增长轨迹
              </h3>
              
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                广州电动自行车保有量变化趋势
              </p>
            </div>
            
            {/* 便签卡片布局 */}
            <div className="relative h-40 sm:h-52 lg:h-56 mb-4 sm:mb-6">
              <StickyNote 
                year="2021"
                value="32.5万"
                growth=""
                color="bg-slate-200"
                textColor="text-slate-700"
                position={{ top: '50%', left: '0%' }}
                rotation="-rotate-3"
                delay={0}
              />
              
              <StickyNote 
                year="2022"
                value="288万"
                growth="+786%"
                color="bg-red-200"
                textColor="text-red-800"
                position={{ top: '20%', left: '22%' }}
                rotation="rotate-2"
                delay={0.3}
                highlight
              />
              
              <StickyNote 
                year="2023"
                value="442万"
                growth="+53.5%"
                color="bg-emerald-200"
                textColor="text-emerald-800"
                position={{ top: '35%', left: '45%' }}
                rotation="-rotate-2"
                delay={0.6}
              />
              
              <StickyNote 
                year="2024"
                value="576万"
                growth="+30.3%"
                color="bg-emerald-300"
                textColor="text-emerald-900"
                position={{ top: '15%', left: '68%' }}
                rotation="rotate-3"
                delay={0.9}
                latest
              />
              
              {/* 连接箭头 */}
              <ConnectionArrows />
            </div>
            
            {/* 底部总结 */}
            <div className="text-center space-y-3">
              <div className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-800 dark:from-emerald-900/50 dark:to-teal-900/50 dark:text-emerald-300">
                📈 总增长17.7倍 · 2022年爆发式增长
              </div>
              
              {/* 数据来源 - 放在总结下方 */}
              <div className="text-xs text-slate-400 dark:text-slate-500">
                数据来源：2021-2024广州市交通发展年度报告
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </Section>
  );
}

function StickyNote({
  year,
  value,
  growth,
  color,
  textColor,
  position,
  rotation,
  delay,
  highlight = false,
  latest = false
}: {
  year: string;
  value: string;
  growth: string;
  color: string;
  textColor: string;
  position: { top: string; left: string };
  rotation: string;
  delay: number;
  highlight?: boolean;
  latest?: boolean;
}) {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  return (
    <div
      ref={ref}
      className={`absolute w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 p-3 sm:p-4 lg:p-5 ${rotation} transform transition-all duration-700 ease-out cursor-pointer group hover:scale-110 hover:z-10 ${
        latest ? 'ring-2 ring-emerald-500' : ''
      }`}
      style={{
        top: position.top,
        left: position.left,
        opacity: inView ? 1 : 0,
        transform: inView 
          ? `${rotation.replace('rotate', 'rotate')} scale(1)` 
          : `${rotation.replace('rotate', 'rotate')} scale(0.8) translateY(20px)`,
        transitionDelay: `${delay}s`,
        boxShadow: '0 8px 20px rgba(0,0,0,0.12), 0 4px 8px rgba(0,0,0,0.08)',
        borderRadius: '3px',
        background: (() => {
          if (color.includes('slate')) return 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)';
          if (color.includes('red')) return 'linear-gradient(135deg, #fef2f2 0%, #fecaca 100%)';
          if (color.includes('emerald-200')) return 'linear-gradient(135deg, #ecfdf5 0%, #bbf7d0 100%)';
          if (color.includes('emerald-300')) return 'linear-gradient(135deg, #d1fae5 0%, #86efac 100%)';
          return 'linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%)';
        })(),
        border: '1px solid rgba(255,255,255,0.3)',
      }}
    >
      {/* 便签纸纹理背景 */}
      <div className="absolute inset-0 opacity-30 pointer-events-none" style={{
        backgroundImage: `
          radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 1px, transparent 1px),
          radial-gradient(circle at 80% 20%, rgba(255,255,255,0.2) 1px, transparent 1px),
          radial-gradient(circle at 40% 80%, rgba(255,255,255,0.2) 1px, transparent 1px)
        `,
        backgroundSize: '100% 100%'
      }} />
      
      {/* 便签纸顶部的胶带效果 */}
      <div className="absolute -top-1.5 left-1/2 transform -translate-x-1/2 w-10 sm:w-12 lg:w-14 h-3 sm:h-3.5 lg:h-4 rounded-sm opacity-80"
        style={{
          background: 'linear-gradient(45deg, #fbbf24 0%, #f59e0b 50%, #fbbf24 100%)',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }}
      >
        {/* 胶带高光 */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent rounded-sm" />
        {/* 胶带边缘撕裂效果 */}
        <div className="absolute -left-0.5 top-0 w-1 h-full bg-amber-300/60 rounded-l-sm" />
        <div className="absolute -right-0.5 top-0 w-1 h-full bg-amber-600/40 rounded-r-sm" />
      </div>
      
      <div className={`h-full flex flex-col justify-center items-center text-center ${textColor} space-y-1 sm:space-y-1.5 lg:space-y-2`}>
        {/* 年份 */}
        <div className="text-sm sm:text-base lg:text-lg font-bold opacity-70">{year}</div>
        
        {/* 数值 */}
        <div className="text-base sm:text-lg lg:text-xl font-bold leading-tight">{value}</div>
        
        {/* 增长率 */}
        {growth && (
          <div className={`text-xs sm:text-sm lg:text-base font-bold px-2 py-1 rounded ${
            highlight 
              ? 'bg-red-300 text-red-800 animate-pulse' 
              : 'bg-white/50 text-emerald-700'
          }`}>
            {growth}
          </div>
        )}
      </div>
      
      {/* 便签纸边缘卷曲阴影 */}
      <div className="absolute inset-0 rounded-sm" style={{
        background: `
          linear-gradient(45deg, transparent 0%, rgba(0,0,0,0.05) 2%, transparent 3%),
          linear-gradient(-45deg, transparent 97%, rgba(0,0,0,0.05) 98%, transparent 100%)
        `
      }} />
      
      {/* 便签纸折痕 */}
      <div className="absolute top-2 right-2 w-6 h-0.5 bg-black/10 rotate-12 rounded-full opacity-40" />
      <div className="absolute bottom-3 left-3 w-4 h-0.5 bg-black/10 -rotate-6 rounded-full opacity-30" />
      
      {/* Hover效果 */}
      <div className="absolute inset-0 bg-white/0 group-hover:bg-white/20 transition-all duration-200 rounded-sm" />
      
      {/* 特殊标记 */}
      {highlight && (
        <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
          <span className="text-white text-xs">!</span>
        </div>
      )}
      
      {latest && (
        <div className="absolute -top-2 -right-2 w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center">
          <span className="text-white text-xs">★</span>
        </div>
      )}
    </div>
  );
}

function ConnectionArrows() {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  return (
    <div ref={ref} className="absolute inset-0 pointer-events-none">
      <svg className="w-full h-full" style={{ zIndex: 1 }}>
        <defs>
          <marker
            id="arrowhead"
            markerWidth="8"
            markerHeight="6"
            refX="7"
            refY="3"
            orient="auto"
          >
            <polygon
              points="0 0, 8 3, 0 6"
              fill="#10b981"
              fillOpacity="0.7"
            />
          </marker>
          
          {/* 便签连接线样式 */}
          <marker
            id="stringhead"
            markerWidth="4"
            markerHeight="4"
            refX="2"
            refY="2"
          >
            <circle cx="2" cy="2" r="1.5" fill="#64748b" fillOpacity="0.6" />
          </marker>
        </defs>
        
        {/* 主连接线 - 模拟便签串起来的效果 */}
        <path
          d="M 15% 70% Q 35% 50% 50% 35% Q 65% 25% 85% 15%"
          fill="none"
          stroke="#64748b"
          strokeWidth="1.5"
          strokeOpacity="0.4"
          strokeDasharray="3,3"
          markerStart="url(#stringhead)"
          markerEnd="url(#stringhead)"
          style={{
            strokeDasharray: inView ? '3,3' : '0,1000',
            transition: 'stroke-dasharray 2s ease-out 1s'
          }}
        />
        
        {/* 增长箭头 2021 → 2022 */}
        <path
          d="M 25% 75% Q 30% 60% 35% 45%"
          fill="none"
          stroke="#10b981"
          strokeWidth="2"
          strokeOpacity="0.7"
          markerEnd="url(#arrowhead)"
          style={{
            strokeDasharray: inView ? '100' : '0',
            strokeDashoffset: inView ? '0' : '100',
            transition: 'stroke-dashoffset 0.8s ease-out 1.2s'
          }}
        />
        
        {/* 增长箭头 2022 → 2023 */}
        <path
          d="M 45% 45% Q 50% 35% 60% 30%"
          fill="none"
          stroke="#10b981"
          strokeWidth="2"
          strokeOpacity="0.7"
          markerEnd="url(#arrowhead)"
          style={{
            strokeDasharray: inView ? '100' : '0',
            strokeDashoffset: inView ? '0' : '100',
            transition: 'stroke-dashoffset 0.8s ease-out 1.5s'
          }}
        />
        
        {/* 增长箭头 2023 → 2024 */}
        <path
          d="M 70% 30% Q 75% 25% 80% 20%"
          fill="none"
          stroke="#10b981"
          strokeWidth="2"
          strokeOpacity="0.7"
          markerEnd="url(#arrowhead)"
          style={{
            strokeDasharray: inView ? '100' : '0',
            strokeDashoffset: inView ? '0' : '100',
            transition: 'stroke-dashoffset 0.8s ease-out 1.8s'
          }}
        />
        
        {/* 便签节点 */}
        <circle cx="15%" cy="70%" r="2" fill="#64748b" fillOpacity="0.6" 
          style={{
            opacity: inView ? 1 : 0,
            transition: 'opacity 0.3s ease-out 1.3s'
          }}
        />
        <circle cx="35%" cy="50%" r="2" fill="#64748b" fillOpacity="0.6"
          style={{
            opacity: inView ? 1 : 0,
            transition: 'opacity 0.3s ease-out 1.6s'
          }}
        />
        <circle cx="60%" cy="35%" r="2" fill="#64748b" fillOpacity="0.6"
          style={{
            opacity: inView ? 1 : 0,
            transition: 'opacity 0.3s ease-out 1.9s'
          }}
        />
        <circle cx="85%" cy="15%" r="2" fill="#64748b" fillOpacity="0.6"
          style={{
            opacity: inView ? 1 : 0,
            transition: 'opacity 0.3s ease-out 2.2s'
          }}
        />
      </svg>
    </div>
  );
}


function Metric({ 
  label, 
  end, 
  decimals = 0, 
  animate = false, 
  icon,
  suffix,
  description,
  highlight = false
}: { 
  label: string; 
  end: number; 
  decimals?: number; 
  animate?: boolean;
  icon?: string;
  suffix?: string;
  description?: string;
  highlight?: boolean;
}) {
  return (
    <div className={`glass-card p-5 group hover:scale-105 transition-all duration-300 hover:shadow-lg ${
      highlight ? 'ring-2 ring-emerald-200 dark:ring-emerald-800 bg-emerald-50/50 dark:bg-emerald-900/10' : ''
    }`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-baseline space-x-1">
          <div className={`text-3xl font-bold ${
            highlight ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-900 dark:text-white'
          }`}>
            {animate ? (
              <CountUp end={end} duration={2.5} decimals={decimals} />
            ) : (
              "0"
            )}
          </div>
          {suffix && (
            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
              {suffix}
            </span>
          )}
        </div>
        {icon && (
          <span className="text-2xl opacity-60 group-hover:opacity-100 transition-opacity group-hover:scale-110 transform duration-200">
            {icon}
          </span>
        )}
      </div>
      <div className="space-y-1">
        <div className="text-sm text-slate-500 dark:text-slate-400 font-medium">
          {label}
        </div>
        {description && (
          <div className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
            {description}
          </div>
        )}
      </div>
    </div>
  );
}


