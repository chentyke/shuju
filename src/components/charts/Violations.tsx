"use client";

import dynamic from "next/dynamic";
import { Section } from "@/components/common/Section";
import { violationTotals, violationTypesShare } from "@/data/violations";
import { timeHeatMatrix } from "@/data/timeHeatmap";
import type { EChartsOption } from "echarts";

const ReactECharts = dynamic(() => import("echarts-for-react"), { ssr: false }) as unknown as (props: { option: EChartsOption; style?: React.CSSProperties }) => import("react").ReactElement | null;

export function Violations() {
  return (
    <Section 
      id="violations" 
      title="违法与事故分析" 
      subtitle="2021–2024"
      description="通过数据分析揭示非机动车违法行为的时空分布规律和主要类型。"
      className="bg-gradient-to-b from-slate-50/50 to-white dark:from-slate-800/50 dark:to-slate-900"
    >
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="glass-card p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              年度违法总量
            </h3>
            <div className="text-xs text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
              起
            </div>
          </div>
          <ReactECharts option={barOption} style={{ height: 320 }} />
        </div>
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              违法类型占比
            </h3>
            <div className="text-xs text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
              %
            </div>
          </div>
          <ReactECharts option={pieOption} style={{ height: 320 }} />
        </div>
        <div className="glass-card p-6 lg:col-span-3">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              违法行为时间热力图
            </h3>
            <div className="text-xs text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
              密度
            </div>
          </div>
          <ReactECharts option={heatOption} style={{ height: 360 }} />
        </div>
      </div>
      
      {/* Key insights */}
      <div className="mt-8 grid sm:grid-cols-3 gap-4">
        <div className="glass-card p-4 text-center">
          <div className="text-2xl font-bold text-red-600 dark:text-red-400 mb-1">
            23.4万
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400">
            2024年总违法数
          </div>
        </div>
        <div className="glass-card p-4 text-center">
          <div className="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-1">
            18:00
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400">
            违法高峰时段
          </div>
        </div>
        <div className="glass-card p-4 text-center">
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-1">
            35%
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400">
            闯红灯占比
          </div>
        </div>
      </div>
      
      <p className="mt-6 text-xs text-slate-400 dark:text-slate-500 text-center">
        数据来源：广州市公安交警年度报告（示例数据）
      </p>
    </Section>
  );
}

const barOption: EChartsOption = {
  backgroundColor: 'transparent',
  tooltip: { 
    trigger: "axis",
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderColor: '#e2e8f0',
    borderWidth: 1,
    textStyle: { color: '#334155' },
    extraCssText: 'box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12); backdrop-filter: blur(8px);'
  },
  grid: { left: 50, right: 30, top: 30, bottom: 50 },
  xAxis: { 
    type: "category", 
    data: violationTotals.map((d) => d.year),
    axisLine: { lineStyle: { color: '#e2e8f0' } },
    axisLabel: { color: '#64748b', fontSize: 11 }
  },
  yAxis: { 
    type: "value",
    axisLine: { lineStyle: { color: '#e2e8f0' } },
    splitLine: { lineStyle: { color: '#f1f5f9', type: 'dashed' } },
    axisLabel: { color: '#64748b', fontSize: 11 }
  },
  series: [{ 
    type: "bar", 
    data: violationTotals.map((d) => d.value), 
    itemStyle: { 
      color: '#ef4444',
      borderRadius: [4, 4, 0, 0]
    },
    emphasis: {
      itemStyle: { color: '#dc2626' }
    }
  }],
};

const pieOption: EChartsOption = {
  backgroundColor: 'transparent',
  tooltip: { 
    trigger: "item",
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderColor: '#e2e8f0',
    borderWidth: 1,
    textStyle: { color: '#334155' },
    extraCssText: 'box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12); backdrop-filter: blur(8px);'
  },
  series: [
    {
      type: "pie",
      radius: ["35%", "65%"],
      data: violationTypesShare,
      label: { 
        formatter: "{b}: {d}%",
        fontSize: 11,
        color: '#64748b'
      },
      itemStyle: {
        borderColor: '#ffffff',
        borderWidth: 2
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowColor: 'rgba(0, 0, 0, 0.3)'
        }
      }
    },
  ],
};

const heatOption: EChartsOption = {
  backgroundColor: 'transparent',
  tooltip: { 
    position: "top",
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderColor: '#e2e8f0',
    borderWidth: 1,
    textStyle: { color: '#334155' },
    extraCssText: 'box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12); backdrop-filter: blur(8px);'
  },
  grid: { height: "65%", top: "15%", left: 60, right: 30 },
  xAxis: { 
    type: "category", 
    data: Array.from({ length: 24 }, (_, h) => `${h}:00`),
    axisLine: { lineStyle: { color: '#e2e8f0' } },
    axisLabel: { color: '#64748b', fontSize: 10 }
  },
  yAxis: { 
    type: "category", 
    data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
    axisLine: { lineStyle: { color: '#e2e8f0' } },
    axisLabel: { color: '#64748b', fontSize: 11 }
  },
  visualMap: { 
    min: 0, 
    max: 120, 
    calculable: true, 
    orient: "horizontal", 
    left: "center", 
    bottom: 10,
    inRange: {
      color: ['#fef3c7', '#f59e0b', '#d97706', '#b45309']
    },
    textStyle: { color: '#64748b', fontSize: 10 }
  },
  series: [
    {
      name: "违法密度",
      type: "heatmap",
      data: flattenHeat(timeHeatMatrix),
      emphasis: { 
        itemStyle: { 
          shadowBlur: 10, 
          shadowColor: "rgba(0, 0, 0, 0.5)" 
        } 
      },
    },
  ],
};

function flattenHeat(mat: number[][]) {
  const data: [number, number, number][] = [];
  mat.forEach((row, day) => {
    row.forEach((val, hour) => {
      data.push([hour, day, val]);
    });
  });
  return data;
}


