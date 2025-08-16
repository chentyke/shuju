"use client";

import dynamic from "next/dynamic";
import { Section } from "@/components/common/Section";
import { violationYearlyData } from "@/data/violations";
import type { EChartsOption } from "echarts";

const ReactECharts = dynamic(() => import("echarts-for-react"), { ssr: false }) as unknown as (props: { option: EChartsOption; style?: React.CSSProperties }) => import("react").ReactElement | null;

export function ViolationTrends() {
  return (
    <Section 
      id="violation-trends" 
      title="隐患在途" 
      subtitle="违法数量持续高位 增长势头明显"
      description="过去四年，广州电动自行车交通违法查处量始终维持在高位，并呈现总体上升趋势。"
      className="bg-gradient-to-b from-red-50/50 to-orange-50/50 dark:from-red-900/20 dark:to-orange-900/20"
    >
      <div className="grid gap-8">
        {/* 主图表 */}
        <div className="glass-card p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              电动自行车交通违法查处量（2021-2024）
            </h3>
            <div className="text-sm text-slate-500 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
              万宗
            </div>
          </div>
          <ReactECharts option={mixedChartOption} style={{ height: 400 }} />
        </div>
        
        {/* 关键数据指标 */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="glass-card p-6 text-center bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 border-l-4 border-blue-500">
            <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-3">
              110万
            </div>
            <div className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              2021年基准
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              违法查处量起始点
            </div>
          </div>
          
          <div className="glass-card p-6 text-center bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 border-l-4 border-green-500">
            <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-3">
              +27%
            </div>
            <div className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              2022年增长
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              达到140万宗
            </div>
          </div>
          
          <div className="glass-card p-6 text-center bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/30 dark:to-amber-800/30 border-l-4 border-amber-500">
            <div className="text-4xl font-bold text-amber-600 dark:text-amber-400 mb-3">
              +63%
            </div>
            <div className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              2023年事故
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              同比上升，数据未公布
            </div>
          </div>
          
          <div className="glass-card p-6 text-center bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/30 dark:to-red-800/30 border-l-4 border-red-500">
            <div className="text-4xl font-bold text-red-600 dark:text-red-400 mb-3">
              +174.5%
            </div>
            <div className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              2024年激增
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              违法查处量翻倍增长
            </div>
          </div>
        </div>
        
        {/* 数据说明 */}
        <div className="glass-card p-6 bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-800/50 dark:to-gray-800/50">
          <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">数据说明</h4>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-slate-600 dark:text-slate-400">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong>2021年：</strong>全市查处电动自行车交通违法110多万宗，建立基准线
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong>2022年：</strong>违法查处量增加至140多万宗，较上一年明显增长
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong>2023年：</strong>官方未公布确切违法总量，但确认全年违法查处量仍超过100万宗
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong>2024年：</strong>违法查处量同比上升174.5%，形势严峻
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <p className="mt-8 text-sm text-slate-500 dark:text-slate-400 text-center">
        数据来源：广州市公安局；广州市人民政府；澎湃新闻
      </p>
    </Section>
  );
}

const mixedChartOption: EChartsOption = {
  backgroundColor: 'transparent',
  tooltip: { 
    trigger: "axis",
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderColor: '#e2e8f0',
    borderWidth: 1,
    textStyle: { color: '#334155', fontSize: 12 },
    extraCssText: 'box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12); backdrop-filter: blur(8px);',
    axisPointer: {
      type: 'cross',
      crossStyle: {
        color: '#999'
      }
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    formatter: function(params: any) {
      try {
        if (Array.isArray(params) && params.length > 0 && params[0]) {
          const xData = params[0].axisValue || '';
          let result = `<div style="font-weight: bold; margin-bottom: 8px;">${xData}年</div>`;
          
          for (let i = 0; i < params.length; i++) {
            const param = params[i];
            if (!param || param.value === undefined || param.value === null) continue;
            
            if (param.seriesName === '违法查处量') {
              result += `<div style="margin-bottom: 4px;">
                <span style="display: inline-block; width: 10px; height: 10px; background-color: ${param.color || '#ef4444'}; margin-right: 8px;"></span>
                违法查处量: ${param.value}万宗
              </div>`;
            } else if (param.seriesName === '增长趋势' && param.value !== null && param.value !== undefined) {
              result += `<div style="margin-bottom: 4px;">
                <span style="display: inline-block; width: 10px; height: 10px; background-color: ${param.color || '#f59e0b'}; margin-right: 8px;"></span>
                增长率: +${Number(param.value).toFixed(1)}%
              </div>`;
            }
          }
          return result;
        }
        return '';
      } catch (error) {
        console.error('ViolationTrends tooltip error:', error);
        return '';
      }
    }
  },
  legend: {
    data: ['违法查处量', '增长趋势'],
    top: 15,
    textStyle: { color: '#64748b', fontSize: 12 },
    itemWidth: 14,
    itemHeight: 14
  },
  grid: { 
    left: 70, 
    right: 70, 
    top: 80, 
    bottom: 100 
  },
  xAxis: [
    {
      type: "category", 
      data: violationYearlyData.map((d) => d.year),
      axisLine: { lineStyle: { color: '#e2e8f0', width: 1 } },
      axisLabel: { 
        color: '#64748b', 
        fontSize: 12,
        formatter: '{value}年',
        margin: 12
      },
      axisTick: {
        show: false
      }
    }
  ],
  yAxis: [
    {
      type: "value",
      name: '违法查处量(万宗)',
      nameTextStyle: {
        color: '#64748b',
        fontSize: 11,
        padding: [0, 0, 0, -10]
      },
      min: 0,
      max: 300,
      interval: 50,
      axisLine: { show: false },
      splitLine: { lineStyle: { color: '#f1f5f9', type: 'dashed', width: 1 } },
      axisLabel: { 
        color: '#64748b', 
        fontSize: 10,
        formatter: '{value}',
        margin: 8
      }
    },
    {
      type: "value",
      name: '增长率(%)',
      nameTextStyle: {
        color: '#f59e0b',
        fontSize: 11,
        padding: [0, -10, 0, 0]
      },
      min: -20,
      max: 200,
      interval: 40,
      position: 'right',
      axisLine: { show: false },
      splitLine: { show: false },
      axisLabel: { 
        color: '#f59e0b', 
        fontSize: 10,
        formatter: '{value}%',
        margin: 8
      }
    }
  ],
  series: [
    {
      name: '违法查处量',
      type: "bar", 
      yAxisIndex: 0,
      data: violationYearlyData.map((d) => d.violations), 
      barWidth: '40%',
      itemStyle: { 
        color: '#ef4444',
        borderRadius: [4, 4, 0, 0]
      },
      emphasis: {
        itemStyle: { 
          shadowBlur: 10,
          shadowColor: 'rgba(0, 0, 0, 0.3)'
        }
      },
      label: {
        show: true,
        position: 'top',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        formatter: function(params: any) {
          const data = violationYearlyData[params.dataIndex];
          if (data.year === 2023 || data.year === 2024) {
            return `${data.violations}万宗\n（预估）`;
          }
          return `${data.violations}万宗`;
        },
        color: '#64748b',
        fontSize: 11,
        lineHeight: 14
      }
    },
    {
      name: '增长趋势',
      type: "line", 
      yAxisIndex: 1,
      data: [
        null, // 2021年无对比基准
        27.3, // 2022年增长率 (140-110)/110*100 = 27.3%
        15.7, // 2023年增长率 (162-140)/140*100 = 15.7%
        174.5 // 2024年增长率 (445-162)/162*100 = 174.5%
      ],
      lineStyle: {
        color: '#f59e0b',
        width: 3,
        type: 'solid'
      },
      symbol: 'circle',
      symbolSize: 10,
      itemStyle: {
        color: '#f59e0b',
        borderColor: '#fff',
        borderWidth: 2
      },
      label: {
        show: false  // 关闭线图标签避免重叠
      }
    }
  ]
};