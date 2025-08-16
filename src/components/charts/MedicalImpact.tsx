"use client";

import dynamic from "next/dynamic";
import { Section } from "@/components/common/Section";
import { zhujJiangHospitalData } from "@/data/medical";
import type { EChartsOption } from "echarts";

const ReactECharts = dynamic(() => import("echarts-for-react"), { ssr: false }) as unknown as (props: { option: EChartsOption; style?: React.CSSProperties }) => import("react").ReactElement | null;

export function MedicalImpact() {
  return (
    <Section 
      id="medical-impact" 
      title="事故频发且伤害严重" 
      subtitle="医疗资源承压"
      description="电动自行车激增与伤情加重相伴而生。广州主要医疗机构数据显示：电动自行车相关交通意外伤普遍占创伤骨科收治的60%–80%。"
      className="bg-gradient-to-b from-rose-50/50 to-pink-50/50 dark:from-rose-900/20 dark:to-pink-900/20"
    >
      <div className="grid gap-8">
        {/* 主要医疗数据图表 */}
        <div className="glass-card p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                珠江医院急诊 & 重症分层对比
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {zhujJiangHospitalData.period} 数据统计
              </p>
            </div>
            <div className="text-sm text-slate-500 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
              例
            </div>
          </div>
          <ReactECharts option={groupedBarChartOption} style={{ height: 420 }} />
        </div>

        {/* 珠江医院关键数据 */}
        <div className="glass-card p-8 bg-gradient-to-br from-red-50/50 to-orange-50/50 dark:from-red-900/10 dark:to-orange-900/10">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">珠江医院（2024年1-6月）</h3>
            <p className="text-slate-600 dark:text-slate-400">电动自行车事故医疗数据统计</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-rose-100 dark:bg-rose-900/30 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-rose-600 dark:text-rose-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="text-4xl font-bold text-rose-600 dark:text-rose-400 mb-2">80%</div>
              <div className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">外科急诊交通事故</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">325/406 例电动车相关</div>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-orange-600 dark:text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="text-4xl font-bold text-orange-600 dark:text-orange-400 mb-2">65%</div>
              <div className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">严重车祸伤占比</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">53/82 例需抢救</div>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-red-600 dark:text-red-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="text-4xl font-bold text-red-600 dark:text-red-400 mb-2">4例</div>
              <div className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">死亡病例</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">全部电动车相关</div>
            </div>
          </div>
        </div>

        {/* 总体影响概述 */}
        <div className="prose prose-slate max-w-none dark:prose-invert">
          <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300">
            广州主要医疗机构数据显示，电动自行车相关交通意外伤普遍占创伤骨科收治的60%–80%，约75%的交通意外死亡事件由此而来。随着电动自行车保有量持续增长，医疗系统面临更大挑战。
          </p>
        </div>
      </div>
      
      <p className="mt-8 text-sm text-slate-500 dark:text-slate-400 text-center">
        数据来源：南方都市报
      </p>
    </Section>
  );
}

const groupedBarChartOption: EChartsOption = {
  backgroundColor: 'transparent',
  tooltip: { 
    trigger: "axis",
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderColor: '#e2e8f0',
    borderWidth: 1,
    textStyle: { color: '#334155' },
    extraCssText: 'box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12); backdrop-filter: blur(8px);',
    axisPointer: {
      type: 'shadow'
    }
  },
  legend: {
    data: ['总数', '电动车相关'],
    top: 10,
    textStyle: { color: '#64748b' }
  },
  grid: { 
    left: 60, 
    right: 40, 
    top: 60, 
    bottom: 60 
  },
  xAxis: {
    type: "category", 
    data: ['外科急诊交通事故', '严重车祸伤', '死亡'],
    axisLine: { lineStyle: { color: '#e2e8f0' } },
    axisLabel: { 
      color: '#64748b', 
      fontSize: 12,
      interval: 0,
      rotate: 0
    },
    axisTick: {
      show: false
    }
  },
  yAxis: {
    type: "value",
    axisLine: { lineStyle: { color: '#e2e8f0' } },
    splitLine: { lineStyle: { color: '#f1f5f9', type: 'dashed' } },
    axisLabel: { 
      color: '#64748b', 
      fontSize: 11,
      formatter: '{value}例'
    }
  },
  series: [
    {
      name: '总数',
      type: "bar", 
      data: [
        zhujJiangHospitalData.emergencyTotal,
        zhujJiangHospitalData.severeCasesTotal,
        zhujJiangHospitalData.deaths
      ],
      itemStyle: { 
        color: '#e2e8f0',
        borderRadius: [4, 4, 0, 0]
      },
      emphasis: {
        itemStyle: { 
          color: '#cbd5e1'
        }
      },
      label: {
        show: true,
        position: 'top',
        formatter: '{c}例',
        color: '#64748b',
        fontSize: 11
      },
      barWidth: '40%',
      barGap: '20%'
    },
    {
      name: '电动车相关',
      type: "bar", 
      data: [
        zhujJiangHospitalData.emergencyElectricBike,
        zhujJiangHospitalData.severeCasesElectricBike,
        zhujJiangHospitalData.deaths
      ],
      itemStyle: { 
        color: '#ef4444',
        borderRadius: [4, 4, 0, 0]
      },
      emphasis: {
        itemStyle: { 
          color: '#dc2626',
          shadowBlur: 10,
          shadowColor: 'rgba(0, 0, 0, 0.3)'
        }
      },
      label: {
        show: true,
        position: 'top',
        formatter: function(params: { dataIndex: number; value: number }) {
          const percentage = [80, 65, 100][params.dataIndex];
          return `${params.value}例\n(${percentage}%)`;
        },
        color: '#ef4444',
        fontSize: 11,
        fontWeight: 'bold'
      },
      barWidth: '40%'
    }
  ]
};