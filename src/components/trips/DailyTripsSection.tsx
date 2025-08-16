"use client";

import dynamic from "next/dynamic";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import { Section } from "@/components/common/Section";
import { dailyTripsData } from "@/data/dailyTrips";
import type { EChartsOption } from "echarts";

const ReactECharts = dynamic(() => import("echarts-for-react"), { ssr: false }) as unknown as (props: { option: EChartsOption; style?: React.CSSProperties }) => import("react").ReactElement | null;

export function DailyTripsSection() {
  const { ref: heroRef, inView: heroInView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const chartOption: EChartsOption = {
    backgroundColor: 'transparent',
    tooltip: { 
      trigger: "axis",
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderColor: '#e2e8f0',
      borderWidth: 1,
      textStyle: { color: '#334155' },
      extraCssText: 'box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12); backdrop-filter: blur(8px);',
      formatter: function(params: any) {
        let result = `<div style="font-weight: bold; margin-bottom: 8px;">${params[0].axisValue}年</div>`;
        params.forEach((param: any) => {
          result += `<div style="display: flex; align-items: center; margin-bottom: 4px;">
            <div style="width: 10px; height: 10px; background: ${param.color}; border-radius: 50%; margin-right: 8px;"></div>
            ${param.seriesName}: <span style="font-weight: bold; margin-left: 4px;">${param.value}万人次</span>
          </div>`;
        });
        return result;
      }
    },
    legend: { 
      data: ["电动自行车", "地铁", "常规公交"], 
      top: 20,
      textStyle: { color: '#64748b', fontSize: 12 },
      itemGap: 20
    },
    grid: { left: 60, right: 40, top: 70, bottom: 60 },
    xAxis: { 
      type: "category", 
      data: dailyTripsData.map(d => d.year),
      axisLine: { lineStyle: { color: '#e2e8f0' } },
      axisTick: { lineStyle: { color: '#e2e8f0' } },
      axisLabel: { color: '#64748b', fontSize: 11 }
    },
    yAxis: { 
      type: "value", 
      name: "万人次/日",
      nameTextStyle: { color: '#64748b', fontSize: 11 },
      axisLine: { lineStyle: { color: '#e2e8f0' } },
      splitLine: { 
        lineStyle: { color: '#f1f5f9', type: 'dashed' }
      },
      axisLabel: { color: '#64748b', fontSize: 11 }
    },
    series: [
      { 
        name: "电动自行车", 
        type: "line", 
        smooth: true, 
        data: dailyTripsData.map(d => d.ebike),
        lineStyle: { width: 4, color: '#10b981' },
        itemStyle: { 
          color: '#10b981',
          borderWidth: 3,
          borderColor: '#ffffff'
        },
        areaStyle: { color: 'rgba(16, 185, 129, 0.1)' },
        emphasis: { lineStyle: { width: 5 } }
      },
      { 
        name: "地铁", 
        type: "line", 
        smooth: true, 
        data: dailyTripsData.map(d => d.metro),
        lineStyle: { width: 3, color: '#0ea5e9' },
        itemStyle: { color: '#0ea5e9', borderWidth: 0 },
        areaStyle: { color: 'rgba(14, 165, 233, 0.08)' }
      },
      { 
        name: "常规公交", 
        type: "line", 
        smooth: true, 
        data: dailyTripsData.map(d => d.bus),
        lineStyle: { width: 3, color: '#f59e0b' },
        itemStyle: { color: '#f59e0b', borderWidth: 0 },
        areaStyle: { color: 'rgba(245, 158, 11, 0.08)' }
      },
    ],
  };

  return (
    <Section 
      id="daily-trips"
      className="bg-gradient-to-b from-white via-slate-50/50 to-emerald-50/30 dark:from-slate-900 dark:via-slate-800/50 dark:to-slate-900"
      fullScreen
    >
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* 左侧：内容介绍 */}
        <div ref={heroRef} className="space-y-8">
          <div className="space-y-6">
            <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
              <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse" />
              出行方式变革
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-slate-900 dark:text-white">
              地位跃升
              <br />
              <span className="text-emerald-600 dark:text-emerald-400">首超地铁客流</span>
            </h2>
            
            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              保有量激增的同时，电动自行车在出行方式中的地位也迅速跃升。
            </p>
          </div>

          {/* 核心数据展示 */}
          <div className="glass-card p-8 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border-emerald-200/30">
            <div className="text-center space-y-4">
              <div className="text-6xl sm:text-7xl font-bold text-emerald-600 dark:text-emerald-400">
                {heroInView ? (
                  <CountUp end={903} duration={3} separator="," />
                ) : (
                  "0"
                )}
              </div>
              <div className="text-xl font-semibold text-slate-700 dark:text-slate-300">
                万人次/日
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                这是 2024 年广州电动自行车的日均出行量
                <br />
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">首次超过地铁的 888 万人次</span>
              </div>
            </div>
          </div>

          {/* 关键数据对比 */}
          <div className="grid grid-cols-2 gap-4">
            <div className="glass-card p-4 text-center">
              <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mb-1">
                42.8%
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                2024年市场份额
              </div>
            </div>
            <div className="glass-card p-4 text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                3倍
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                份额增长倍数
              </div>
            </div>
          </div>
        </div>

        {/* 右侧：趋势图表 */}
        <div className="space-y-6">
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                日均客运量趋势
              </h3>
              <div className="text-xs text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                万人次/日
              </div>
            </div>
            <ReactECharts option={chartOption} style={{ height: 400 }} />
          </div>

          {/* 数据来源 */}
          <p className="text-xs text-slate-400 dark:text-slate-500 text-center">
            数据来源：2021-2024广州市交通发展年度报告
          </p>
        </div>
      </div>

      {/* 底部分析 */}
      <div className="mt-16 max-w-4xl mx-auto">
        <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed text-center">
          从比例来看，电动自行车在三大出行方式中的占比从 2021 年的 <span className="font-semibold text-emerald-600">15.8%</span> 提升至 2024 年的 <span className="font-semibold text-emerald-600">42.8%</span>，
          市场份额几乎翻了三倍。这不仅意味着市民出行偏好的显著转变，也预示着广州在道路容量、交通管理和安全保障方面将面临全新的挑战。
        </p>
      </div>
    </Section>
  );
}