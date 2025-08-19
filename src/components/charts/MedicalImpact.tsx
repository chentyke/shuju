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
      className="bg-gradient-to-b from-rose-50/50 to-pink-50/50 dark:from-rose-900/20 dark:to-pink-900/20"
    >
      {/* 标签和描述 */}
      <div className="max-w-4xl mx-auto mb-12 text-center">
        <div className="inline-flex items-center px-6 py-3 rounded-full text-base font-semibold bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300 border border-rose-200 dark:border-rose-800 mb-6">
          <span className="w-3 h-3 bg-rose-500 rounded-full mr-3 animate-pulse" />
          事故频发且伤害严重 医疗资源承压
        </div>
        <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
          电动自行车激增与伤情加重相伴而生。广州主要医疗机构数据显示：电动自行车相关交通意外伤普遍占创伤骨科收治的60%–80%。
        </p>
      </div>
      
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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        formatter: function(params: any) {
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