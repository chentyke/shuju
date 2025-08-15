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
          <div className="p-6 h-80 relative overflow-visible">
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
            <div className="relative h-48 mb-6">
              <StickyNote 
                year="2021"
                value="32.5万"
                growth=""
                color="bg-slate-200"
                textColor="text-slate-700"
                position={{ top: '55%', left: '2%' }}
                rotation="-rotate-3"
                delay={0}
              />
              
              <StickyNote 
                year="2022"
                value="288万"
                growth="+786%"
                color="bg-red-200"
                textColor="text-red-800"
                position={{ top: '25%', left: '26%' }}
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
                position={{ top: '10%', left: '52%' }}
                rotation="-rotate-1"
                delay={0.6}
              />
              
              <StickyNote 
                year="2024"
                value="576万"
                growth="+30.3%"
                color="bg-emerald-300"
                textColor="text-emerald-900"
                position={{ top: '0%', left: '76%' }}
                rotation="rotate-1"
                delay={0.9}
                latest
              />
              
              {/* 连接箭头 */}
              <ConnectionArrows />
            </div>
            
            {/* 底部总结和数据来源 */}
            <div className="text-center space-y-3">
              <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-800 dark:from-emerald-900/50 dark:to-teal-900/50 dark:text-emerald-300">
                📈 总增长17.7倍 · 2022年爆发式增长
              </div>
              
              <div className="text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 inline-block">
                <div className="flex items-center space-x-2">
                  <span className="text-slate-400">📊</span>
                  <span>数据来源：2021-2024广州市交通发展年度报告</span>
                </div>
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
      className={`absolute w-24 h-24 p-4 ${color} ${rotation} transform transition-all duration-700 ease-out cursor-pointer group hover:scale-110 hover:z-10 ${
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
        boxShadow: '0 6px 12px rgba(0,0,0,0.15), 0 3px 6px rgba(0,0,0,0.1)',
      }}
    >
      {/* 便签纸顶部的胶带效果 */}
      <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-10 h-2.5 bg-yellow-200/80 rounded-sm opacity-60" />
      
      <div className={`h-full flex flex-col justify-center items-center text-center ${textColor} space-y-1.5`}>
        {/* 年份 */}
        <div className="text-sm font-bold opacity-70">{year}</div>
        
        {/* 数值 */}
        <div className="text-base font-bold leading-tight">{value}</div>
        
        {/* 增长率 */}
        {growth && (
          <div className={`text-xs font-bold px-2 py-1 rounded ${
            highlight 
              ? 'bg-red-300 text-red-800 animate-pulse' 
              : 'bg-white/50 text-emerald-700'
          }`}>
            {growth}
          </div>
        )}
      </div>
      
      {/* Hover效果 */}
      <div className="absolute inset-0 bg-white/0 group-hover:bg-white/20 transition-all duration-200 rounded" />
      
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

function BikeProgressBar() {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  return (
    <div ref={ref} className="absolute bottom-4 left-0 right-0 pointer-events-none">
      <div className="relative w-full h-8">
        {/* 进度条轨道 */}
        <div className="absolute bottom-2 left-0 right-0 h-1 bg-slate-200/60 dark:bg-slate-600/60 rounded-full">
          {/* 进度条填充 */}
          <div 
            className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full transition-all duration-3000 ease-out"
            style={{
              width: inView ? '100%' : '0%',
              transitionDelay: '1s'
            }}
          />
        </div>
        
        {/* 自行车图标 */}
        <div 
          className="absolute bottom-0 transition-all duration-3000 ease-out transform"
          style={{
            left: inView ? 'calc(100% - 24px)' : '0%',
            transitionDelay: '1s',
            transform: 'scaleX(-1)' // 镜像翻转，让车头朝右
          }}
        >
          <img 
            src="/bike-icon.png" 
            alt="自行车图标" 
            className="w-6 h-6 opacity-80 drop-shadow-sm"
          />
        </div>
        
        {/* 里程标记点 */}
        <div className="absolute bottom-0 left-0 w-2 h-2 bg-slate-400 rounded-full" 
          style={{
            opacity: inView ? 1 : 0,
            transition: 'opacity 0.5s ease-out 1.5s'
          }}
        />
        <div className="absolute bottom-0 left-1/4 w-1.5 h-1.5 bg-emerald-400 rounded-full"
          style={{
            opacity: inView ? 1 : 0,
            transition: 'opacity 0.5s ease-out 2s'
          }}
        />
        <div className="absolute bottom-0 left-1/2 w-1.5 h-1.5 bg-emerald-500 rounded-full"
          style={{
            opacity: inView ? 1 : 0,
            transition: 'opacity 0.5s ease-out 2.5s'
          }}
        />
        <div className="absolute bottom-0 left-3/4 w-1.5 h-1.5 bg-emerald-600 rounded-full"
          style={{
            opacity: inView ? 1 : 0,
            transition: 'opacity 0.5s ease-out 3s'
          }}
        />
        <div className="absolute bottom-0 right-0 w-2 h-2 bg-emerald-700 rounded-full"
          style={{
            opacity: inView ? 1 : 0,
            transition: 'opacity 0.5s ease-out 3.5s'
          }}
        />
      </div>
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


