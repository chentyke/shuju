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
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-32 w-96 h-96 bg-gradient-to-br from-emerald-200/30 to-teal-200/30 rounded-full blur-3xl dark:from-emerald-900/20 dark:to-teal-900/20" />
        <div className="absolute -bottom-40 -left-32 w-96 h-96 bg-gradient-to-tr from-cyan-200/30 to-blue-200/30 rounded-full blur-3xl dark:from-cyan-900/20 dark:to-blue-900/20" />
      </div>

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
            疾驰的两轮
            <br />
            <span className="text-emerald-600 dark:text-emerald-400">广州非机动车</span>
            <br />
            的崛起与治理挑战
          </h1>
          
          <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-lg">
            <span className="font-semibold text-emerald-600 dark:text-emerald-400">3 年时间</span>，
            从 204 万到 903 万——它改变了广州的出行方式，也带来了新的治理挑战。
          </p>
          
          <div ref={metricsRef} className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            <Metric 
              label="保有量(万辆)" 
              end={903} 
              animate={metricsInView} 
              icon="🛵"
            />
            <Metric 
              label="日均出行(百万人次)" 
              end={6.9} 
              decimals={1} 
              animate={metricsInView}
              icon="🚴"
            />
            <Metric 
              label="年度事故率(‰)" 
              end={2.4} 
              decimals={1} 
              animate={metricsInView}
              icon="⚠️"
            />
          </div>
        </div>
        
        <div className="relative">
          <div 
            className="glass-card p-8 h-80 flex items-center justify-center relative overflow-hidden"
            role="img"
            aria-label="广州街头非机动车实况视频预览区域"
          >
            {/* Placeholder for video */}
            <div className="text-center space-y-3">
              <div 
                className="w-16 h-16 mx-auto bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-white text-2xl"
                role="img"
                aria-label="视频播放图标"
              >
                🎥
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                广州街头实况视频
              </p>
              <p className="text-xs text-slate-400 dark:text-slate-500">
                （可替换为视频组件）
              </p>
            </div>
            
            {/* Decorative gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/5 to-teal-500/5 pointer-events-none" />
          </div>
          
          {/* Floating elements */}
          <div 
            className="absolute -top-4 -left-4 w-8 h-8 bg-emerald-500 rounded-full opacity-20 animate-pulse" 
            aria-hidden="true"
          />
          <div 
            className="absolute -bottom-4 -right-4 w-6 h-6 bg-teal-500 rounded-full opacity-30 animate-pulse" 
            style={{ animationDelay: "1s" }}
            aria-hidden="true"
          />
        </div>
      </div>
    </Section>
  );
}

function Metric({ 
  label, 
  end, 
  decimals = 0, 
  animate = false, 
  icon 
}: { 
  label: string; 
  end: number; 
  decimals?: number; 
  animate?: boolean;
  icon?: string;
}) {
  return (
    <div className="glass-card p-5 group hover:scale-105 transition-all duration-300 hover:shadow-lg">
      <div className="flex items-start justify-between mb-2">
        <div className="text-3xl font-bold text-slate-900 dark:text-white">
          {animate ? (
            <CountUp end={end} duration={2.5} decimals={decimals} />
          ) : (
            "0"
          )}
        </div>
        {icon && (
          <span className="text-lg opacity-60 group-hover:opacity-100 transition-opacity">
            {icon}
          </span>
        )}
      </div>
      <div className="text-sm text-slate-500 dark:text-slate-400 font-medium">
        {label}
      </div>
    </div>
  );
}


