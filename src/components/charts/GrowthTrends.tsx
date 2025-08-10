"use client";

import dynamic from "next/dynamic";
import { Section } from "@/components/common/Section";
import { chinaEbikeStock, guangdongEbikeStock, guangzhouEbikeStock } from "@/data/growth";
import type { EChartsOption } from "echarts";

const ReactECharts = dynamic(() => import("echarts-for-react"), { ssr: false }) as unknown as (props: { option: EChartsOption; style?: React.CSSProperties }) => import("react").ReactElement | null;

export function GrowthTrends() {
  const years = guangzhouEbikeStock.map((d) => d.year);
  const option: EChartsOption = {
    backgroundColor: 'transparent',
    tooltip: { 
      trigger: "axis",
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderColor: '#e2e8f0',
      borderWidth: 1,
      textStyle: {
        color: '#334155'
      },
      extraCssText: 'box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12); backdrop-filter: blur(8px);'
    },
    legend: { 
      data: ["全国", "广东", "广州"], 
      top: 10,
      textStyle: {
        color: '#64748b',
        fontSize: 12
      }
    },
    grid: { left: 60, right: 30, top: 50, bottom: 60 },
    xAxis: { 
      type: "category", 
      data: years,
      axisLine: {
        lineStyle: { color: '#e2e8f0' }
      },
      axisTick: {
        lineStyle: { color: '#e2e8f0' }
      },
      axisLabel: {
        color: '#64748b',
        fontSize: 11
      }
    },
    yAxis: { 
      type: "value", 
      name: "万辆",
      nameTextStyle: {
        color: '#64748b',
        fontSize: 11
      },
      axisLine: {
        lineStyle: { color: '#e2e8f0' }
      },
      splitLine: {
        lineStyle: { 
          color: '#f1f5f9',
          type: 'dashed'
        }
      },
      axisLabel: {
        color: '#64748b',
        fontSize: 11
      }
    },
    series: [
      { 
        name: "全国", 
        type: "line", 
        smooth: true, 
        data: chinaEbikeStock.filter(d=>years.includes(d.year)).map((d) => d.value),
        lineStyle: {
          width: 3,
          color: '#94a3b8'
        },
        itemStyle: {
          color: '#94a3b8',
          borderWidth: 0
        },
        areaStyle: {
          color: 'rgba(148, 163, 184, 0.1)'
        }
      },
      { 
        name: "广东", 
        type: "line", 
        smooth: true, 
        data: guangdongEbikeStock.filter(d=>years.includes(d.year)).map((d) => d.value),
        lineStyle: {
          width: 3,
          color: '#0ea5e9'
        },
        itemStyle: {
          color: '#0ea5e9',
          borderWidth: 0
        },
        areaStyle: {
          color: 'rgba(14, 165, 233, 0.1)'
        }
      },
      { 
        name: "广州", 
        type: "line", 
        smooth: true, 
        data: guangzhouEbikeStock.map((d) => d.value),
        lineStyle: {
          width: 4,
          color: '#10b981'
        },
        itemStyle: {
          color: '#10b981',
          borderWidth: 3,
          borderColor: '#ffffff'
        },
        areaStyle: {
          color: 'rgba(16, 185, 129, 0.15)'
        },
        emphasis: {
          lineStyle: {
            width: 5
          }
        }
      },
    ],
  };

  return (
    <Section 
      id="macro" 
      title="增长趋势分析" 
      subtitle="2010–2024"
      description="从全国到广东再到广州，非机动车保有量呈现持续增长态势，广州市场增速尤为显著。"
      className="bg-gradient-to-b from-slate-50/50 to-white dark:from-slate-800/50 dark:to-slate-900"
    >
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              保有量对比
            </h3>
            <div className="text-xs text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
              万辆
            </div>
          </div>
          <ReactECharts option={option} style={{ height: 400 }} />
        </div>
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              出行方式占比
            </h3>
            <div className="text-xs text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
              百分比
            </div>
          </div>
          <ModeShareStacked />
        </div>
      </div>
      
      {/* Key insights */}
      <div className="mt-8 grid sm:grid-cols-3 gap-4">
        <div className="glass-card p-4 text-center">
          <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mb-1">
            342%
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400">
            广州3年增长率
          </div>
        </div>
        <div className="glass-card p-4 text-center">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
            18.5%
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400">
            非机动车出行占比
          </div>
        </div>
        <div className="glass-card p-4 text-center">
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-1">
            #2
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400">
            全国城市排名
          </div>
        </div>
      </div>
      
      <p className="mt-6 text-xs text-slate-400 dark:text-slate-500 text-center">
        数据来源：公安部交管局、广州市交通发展年度报告（示例数据）
      </p>
    </Section>
  );
}

import { modeShareGuangzhou } from "@/data/modeShare";

function ModeShareStacked() {
  const years = modeShareGuangzhou.map((d) => d.year);
  const option: EChartsOption = {
    backgroundColor: 'transparent',
    tooltip: { 
      trigger: "axis", 
      axisPointer: { type: "shadow" },
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderColor: '#e2e8f0',
      borderWidth: 1,
      textStyle: {
        color: '#334155'
      },
      extraCssText: 'box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12); backdrop-filter: blur(8px);'
    },
    legend: { 
      top: 10,
      textStyle: {
        color: '#64748b',
        fontSize: 12
      }
    },
    grid: { left: 50, right: 30, top: 50, bottom: 60 },
    xAxis: { 
      type: "category", 
      data: years,
      axisLine: {
        lineStyle: { color: '#e2e8f0' }
      },
      axisTick: {
        lineStyle: { color: '#e2e8f0' }
      },
      axisLabel: {
        color: '#64748b',
        fontSize: 11
      }
    },
    yAxis: { 
      type: "value", 
      name: "%",
      nameTextStyle: {
        color: '#64748b',
        fontSize: 11
      },
      axisLine: {
        lineStyle: { color: '#e2e8f0' }
      },
      splitLine: {
        lineStyle: { 
          color: '#f1f5f9',
          type: 'dashed'
        }
      },
      axisLabel: {
        color: '#64748b',
        fontSize: 11
      }
    },
    series: [
      { 
        name: "步行", 
        type: "bar", 
        stack: "total", 
        data: modeShareGuangzhou.map((d) => d.walking),
        itemStyle: {
          color: '#94a3b8'
        }
      },
      { 
        name: "公交", 
        type: "bar", 
        stack: "total", 
        data: modeShareGuangzhou.map((d) => d.bus),
        itemStyle: {
          color: '#f59e0b'
        }
      },
      { 
        name: "地铁", 
        type: "bar", 
        stack: "total", 
        data: modeShareGuangzhou.map((d) => d.metro),
        itemStyle: {
          color: '#0ea5e9'
        }
      },
      { 
        name: "非机动车", 
        type: "bar", 
        stack: "total", 
        data: modeShareGuangzhou.map((d) => d.nonMotor),
        itemStyle: {
          color: '#10b981'
        },
        emphasis: {
          itemStyle: {
            color: '#059669'
          }
        }
      },
    ],
  };

  return <ReactECharts option={option} style={{ height: 400 }} />;
}


