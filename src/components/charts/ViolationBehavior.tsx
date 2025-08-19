"use client";

import dynamic from "next/dynamic";
import { violationBehaviorData } from "@/data/deliveryPressure";
import type { EChartsOption } from "echarts";

const ReactECharts = dynamic(() => import("echarts-for-react"), { ssr: false });

export function ViolationBehavior() {
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
      formatter: function(params: unknown) {
        const typedParams = params as any;
        if (Array.isArray(typedParams) && typedParams.length > 0) {
          const param = typedParams[0];
          if (param.dataIndex === 0) {
            return `
              <div style="font-weight: bold; margin-bottom: 4px;">闯红灯行为</div>
              <div>违法占比: ${violationBehaviorData.redLightViolation.percentage}%</div>
              <div style="color: #64748b; font-size: 11px; margin-top: 4px;">
                主要原因：${violationBehaviorData.redLightViolation.reason}
              </div>
            `;
          } else {
            return `
              <div style="font-weight: bold; margin-bottom: 4px;">驶入机动车道</div>
              <div>违法占比: ${violationBehaviorData.wrongLane.percentage}%</div>
              <div style="color: #64748b; font-size: 11px; margin-top: 4px;">
                主要原因：${violationBehaviorData.wrongLane.reason}
              </div>
            `;
          }
        }
        return '';
      }
    },
    grid: {
      left: '5%',
      right: '5%',
      bottom: '25%',
      top: '15%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: ['闯红灯', '驶入机动车道'],
      axisLine: {
        lineStyle: {
          color: '#e2e8f0'
        }
      },
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
      type: 'value',
      name: '违法占比(%)',
      nameTextStyle: {
        color: '#64748b',
        fontSize: 11
      },
      min: 0,
      max: 70,
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
        fontSize: 10,
        formatter: '{value}%'
      }
    },
    series: [
      {
        name: '违法占比',
        type: 'bar',
        data: [
          violationBehaviorData.redLightViolation.percentage,
          violationBehaviorData.wrongLane.percentage
        ],
        barWidth: '50%',
        itemStyle: {
          color: function(params: unknown) {
            const typedParams = params as any;
            return typedParams.dataIndex === 0 ? '#ef4444' : '#f97316';
          },
          borderRadius: [8, 8, 0, 0]
        },
        label: {
          show: true,
          position: 'top',
          color: function(params: unknown) {
            const typedParams = params as any;
            return typedParams.dataIndex === 0 ? '#ef4444' : '#f97316';
          },
          fontSize: 18,
          fontWeight: 'bold',
          formatter: '{c}%'
        } as any
      }
    ]
  };

  return (
    <div className="glass-card p-6">
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
        📊 违规行为分组条形图
      </h3>
      <ReactECharts option={option} style={{ height: 300 }} />
      
      {/* 违规原因说明 */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-lg border-l-4 border-red-500">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-2xl">🚦</span>
            <div>
              <div className="font-bold text-red-700 dark:text-red-300">
                {violationBehaviorData.redLightViolation.percentage}% 闯红灯
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                原因：{violationBehaviorData.redLightViolation.reason}
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-4 bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-lg border-l-4 border-orange-500">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-2xl">🚗</span>
            <div>
              <div className="font-bold text-orange-700 dark:text-orange-300">
                {violationBehaviorData.wrongLane.percentage}% 驶入机动车道
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                原因：{violationBehaviorData.wrongLane.reason}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* 总结说明 */}
      <div className="mt-4 p-4 bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-800/50 dark:to-gray-800/50 rounded-lg">
        <div className="text-sm text-slate-600 dark:text-slate-400">
          <span className="font-semibold text-slate-900 dark:text-white">压力之下的违法行为：</span>
          在收入下降和罚款压力下，违规几乎成了"生存手段"。
          {violationBehaviorData.redLightViolation.percentage}% 的骑手承认因系统倒计时压迫而闯红灯，
          {violationBehaviorData.wrongLane.percentage}% 的骑手因非机动车道被占用而不得不驶入机动车道。
        </div>
      </div>
    </div>
  );
}