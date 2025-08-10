"use client";

import dynamic from "next/dynamic";
import { Section } from "@/components/common/Section";
import { riderProfile } from "@/data/riderProfile";
import { elderlyAccidents } from "@/data/elderlyAccidents";
import type { EChartsOption } from "echarts";

const ReactECharts = dynamic(() => import("echarts-for-react"), { ssr: false }) as unknown as (props: { option: EChartsOption; style?: React.CSSProperties }) => import("react").ReactElement | null;

export function RiderAndSenior() {
  const profile = riderProfile;
  const option: EChartsOption = {
    backgroundColor: 'transparent',
    tooltip: { 
      trigger: "axis",
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderColor: '#e2e8f0',
      borderWidth: 1,
      textStyle: { color: '#334155' },
      extraCssText: 'box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12); backdrop-filter: blur(8px);'
    },
    grid: { left: 60, right: 30, top: 30, bottom: 50 },
    xAxis: { 
      type: "category", 
      data: elderlyAccidents.map((d) => d.ageGroup),
      axisLine: { lineStyle: { color: '#e2e8f0' } },
      axisLabel: { color: '#64748b', fontSize: 11 }
    },
    yAxis: { 
      type: "value", 
      name: "事故率(‰)",
      nameTextStyle: { color: '#64748b', fontSize: 11 },
      axisLine: { lineStyle: { color: '#e2e8f0' } },
      splitLine: { lineStyle: { color: '#f1f5f9', type: 'dashed' } },
      axisLabel: { color: '#64748b', fontSize: 11 }
    },
    series: [{ 
      type: "bar", 
      data: elderlyAccidents.map((d) => d.rate), 
      itemStyle: { 
        color: '#f59e0b',
        borderRadius: [4, 4, 0, 0]
      },
      emphasis: {
        itemStyle: { color: '#d97706' }
      }
    }],
  };

  return (
    <Section 
      id="people" 
      title="人群专题分析" 
      subtitle="骑手与老年人"
      description="深入分析不同人群的出行特征、行为模式和安全风险，为精准治理提供依据。"
      className="bg-gradient-to-b from-white to-blue-50/30 dark:from-slate-900 dark:to-blue-900/10"
    >
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="glass-card p-6 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-lg">
              👨‍💼
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">骑手画像</h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
            <Info label="平均年龄" value={`${profile.averageAge} 岁`} />
            <Info label="日均送单" value={`${profile.ordersPerDay} 单`} />
            <Info label="平均速度" value={`${profile.averageSpeedKmh} km/h`} />
            <Info label="月度罚单率" value={`${Math.round(profile.ticketRatePerMonth * 100)}%`} />
          </div>
          <div className="aspect-video rounded-xl bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/20 dark:to-cyan-900/20 flex items-center justify-center text-xs relative overflow-hidden group">
            <div className="text-center space-y-3 z-10">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-2xl group-hover:scale-110 transition-transform">
                🚚
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                骑手视角实录
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-500">
                （可替换为视频组件）
              </p>
            </div>
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 to-cyan-500/5 pointer-events-none" />
          </div>
        </div>
        <div className="glass-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white text-lg">
              👴
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">老年人事故率</h3>
          </div>
          <ReactECharts option={option} style={{ height: 320 }} />
        </div>
      </div>
      
      {/* Key insights */}
      <div className="mt-8 grid sm:grid-cols-4 gap-4">
        <div className="glass-card p-4 text-center">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
            26岁
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400">
            骑手平均年龄
          </div>
        </div>
        <div className="glass-card p-4 text-center">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">
            42单
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400">
            日均送单量
          </div>
        </div>
        <div className="glass-card p-4 text-center">
          <div className="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-1">
            65+岁
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400">
            高风险年龄段
          </div>
        </div>
        <div className="glass-card p-4 text-center">
          <div className="text-2xl font-bold text-red-600 dark:text-red-400 mb-1">
            3.2‰
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400">
            老年人事故率
          </div>
        </div>
      </div>
      
      <p className="mt-6 text-xs text-slate-400 dark:text-slate-500 text-center">
        数据来源：平台报告与统计调查（示例数据）
      </p>
    </Section>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="glass-card p-3 hover:scale-105 transition-transform duration-200">
      <div className="text-slate-500 dark:text-slate-400 text-xs font-medium mb-1">{label}</div>
      <div className="text-base font-bold text-slate-900 dark:text-white">{value}</div>
    </div>
  );
}


