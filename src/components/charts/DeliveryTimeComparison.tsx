"use client";

import dynamic from "next/dynamic";
import { deliveryTimeData } from "@/data/deliveryPressure";
import type { EChartsOption } from "echarts";

const ReactECharts = dynamic(() => import("echarts-for-react"), { ssr: false });

export function DeliveryTimeComparison() {
  const option: EChartsOption = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderColor: '#e2e8f0',
      borderWidth: 1,
      textStyle: { color: '#334155', fontSize: 12 },
      extraCssText: 'box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12); backdrop-filter: blur(8px);',
      formatter: function(params: any) {
        if (Array.isArray(params) && params.length > 0) {
          const param = params[0];
          if (param.seriesName === '平台要求') {
            return `
              <div style="font-weight: bold; margin-bottom: 4px;">${param.name}</div>
              <div>${param.seriesName}: ${param.value}分钟</div>
              <div style="color: #64748b; font-size: 11px; margin-top: 4px;">3公里内订单配送时限</div>
            `;
          } else {
            return `
              <div style="font-weight: bold; margin-bottom: 4px;">${param.name}</div>
              <div>${param.seriesName}: ${deliveryTimeData.realityTime.min}-${deliveryTimeData.realityTime.max}分钟</div>
              <div style="color: #64748b; font-size: 11px; margin-top: 4px;">含等餐、等红灯实际时间</div>
            `;
          }
        }
        return '';
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '20%',
      top: '10%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: ['平台要求', '限速现实'],
      axisLine: {
        lineStyle: {
          color: '#e2e8f0'
        }
      },
      axisLabel: {
        color: '#64748b',
        fontSize: 12
      },
      axisTick: {
        show: false
      }
    },
    yAxis: {
      type: 'value',
      name: '时间(分钟)',
      nameTextStyle: {
        color: '#64748b',
        fontSize: 11
      },
      axisLine: {
        show: false
      },
      splitLine: {
        lineStyle: {
          color: '#f1f5f9',
          type: 'dashed'
        }
      },
      axisLabel: {
        color: '#64748b',
        fontSize: 10
      }
    },
    series: [
      {
        name: '平台要求',
        type: 'bar',
        data: [deliveryTimeData.platformRequirement, 0],
        barWidth: '60%',
        itemStyle: {
          color: '#10b981',
          borderRadius: [4, 4, 0, 0]
        },
        label: {
          show: true,
          position: 'top',
          color: '#10b981',
          fontSize: 14,
          fontWeight: 'bold',
          formatter: function(params: any) {
            return params.value > 0 ? `${params.value}分钟` : '';
          }
        }
      },
      {
        name: '限速现实',
        type: 'bar',
        data: [0, (deliveryTimeData.realityTime.min + deliveryTimeData.realityTime.max) / 2],
        barWidth: '60%',
        itemStyle: {
          color: '#ef4444',
          borderRadius: [4, 4, 0, 0]
        },
        label: {
          show: true,
          position: 'top',
          color: '#ef4444',
          fontSize: 14,
          fontWeight: 'bold',
          formatter: `${deliveryTimeData.realityTime.min}-${deliveryTimeData.realityTime.max}分钟`
        }
      }
    ]
  };

  return (
    <div className="glass-card p-6">
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
        📊 平台要求 vs 限速现实
      </h3>
      <ReactECharts option={option} style={{ height: 300 }} />
      
      {/* 风险警告 */}
      <div className="mt-4 p-4 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-lg border-l-4 border-red-500">
        <div className="flex items-center space-x-2 text-red-700 dark:text-red-300">
          <span className="text-lg">⚠️</span>
          <span className="font-semibold">时间差 = 超时风险</span>
        </div>
        <div className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          平台要求 <span className="font-semibold text-green-600">{deliveryTimeData.platformRequirement}分钟</span> 送达，
          但在 <span className="font-semibold text-blue-600">{deliveryTimeData.speedLimit}公里/小时</span> 限速下，
          实际配送往往需要 <span className="font-semibold text-red-600">{deliveryTimeData.realityTime.min}-{deliveryTimeData.realityTime.max}分钟</span>，
          几乎没有容错空间。
        </div>
      </div>
    </div>
  );
}