"use client";

import dynamic from "next/dynamic";
import { incomeComparisonData } from "@/data/deliveryPressure";
import type { EChartsOption } from "echarts";

const ReactECharts = dynamic(() => import("echarts-for-react"), { ssr: false });

export function IncomeComparison() {
  const beforeAvg = (incomeComparisonData.beforeLimit.min + incomeComparisonData.beforeLimit.max) / 2;
  const afterAvg = (incomeComparisonData.afterLimit.min + incomeComparisonData.afterLimit.max) / 2;
  const decreaseAvg = (incomeComparisonData.decreasePercentage.min + incomeComparisonData.decreasePercentage.max) / 2;

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
          if (param.dataIndex === 0) {
            return `
              <div style="font-weight: bold; margin-bottom: 4px;">限速前收入</div>
              <div>月收入: ${incomeComparisonData.beforeLimit.min}-${incomeComparisonData.beforeLimit.max}元</div>
              <div style="color: #64748b; font-size: 11px; margin-top: 4px;">骑手收入相对稳定</div>
            `;
          } else {
            return `
              <div style="font-weight: bold; margin-bottom: 4px;">限速后收入</div>
              <div>月收入: ${incomeComparisonData.afterLimit.min}-${incomeComparisonData.afterLimit.max}元</div>
              <div style="color: #ef4444; font-size: 11px; margin-top: 4px;">下降${decreaseAvg}%</div>
            `;
          }
        }
        return '';
      }
    },
    grid: {
      left: '5%',
      right: '5%',
      bottom: '20%',
      top: '15%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: ['限速前', '限速后'],
      axisLine: {
        lineStyle: {
          color: '#e2e8f0'
        }
      },
      axisLabel: {
        color: '#64748b',
        fontSize: 14,
        fontWeight: 'bold'
      },
      axisTick: {
        show: false
      }
    },
    yAxis: {
      type: 'value',
      name: '月收入(元)',
      nameTextStyle: {
        color: '#64748b',
        fontSize: 11
      },
      min: 0,
      max: 14000,
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
        formatter: '{value}'
      }
    },
    series: [
      {
        name: '月收入',
        type: 'bar',
        data: [beforeAvg, afterAvg],
        barWidth: '50%',
        itemStyle: {
          color: function(params: any) {
            return params.dataIndex === 0 ? '#10b981' : '#ef4444';
          },
          borderRadius: [8, 8, 0, 0]
        },
        label: {
          show: true,
          position: 'top',
          color: function(params: any) {
            return params.dataIndex === 0 ? '#10b981' : '#ef4444';
          },
          fontSize: 16,
          fontWeight: 'bold',
          formatter: function(params: any) {
            if (params.dataIndex === 0) {
              return `${incomeComparisonData.beforeLimit.min}-${incomeComparisonData.beforeLimit.max}元`;
            } else {
              return `${incomeComparisonData.afterLimit.min}-${incomeComparisonData.afterLimit.max}元`;
            }
          }
        },
        // 添加误差线显示范围
        markArea: {
          silent: true,
          data: [
            [
              {
                name: '限速前范围',
                xAxis: -0.3,
                yAxis: incomeComparisonData.beforeLimit.min,
                itemStyle: {
                  color: 'rgba(16, 185, 129, 0.1)'
                }
              },
              {
                xAxis: 0.3,
                yAxis: incomeComparisonData.beforeLimit.max
              }
            ],
            [
              {
                name: '限速后范围',
                xAxis: 0.7,
                yAxis: incomeComparisonData.afterLimit.min,
                itemStyle: {
                  color: 'rgba(239, 68, 68, 0.1)'
                }
              },
              {
                xAxis: 1.3,
                yAxis: incomeComparisonData.afterLimit.max
              }
            ]
          ]
        }
      }
    ]
  };

  return (
    <div className="glass-card p-6">
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
        📊 收入对比双柱图
      </h3>
      <ReactECharts option={option} style={{ height: 320 }} />
      
      {/* 收入变化说明 */}
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="p-4 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg text-center">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">
            {incomeComparisonData.beforeLimit.min}-{incomeComparisonData.beforeLimit.max}元
          </div>
          <div className="text-sm text-slate-600 dark:text-slate-400">限速前月收入</div>
        </div>
        <div className="p-4 bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-lg text-center">
          <div className="text-2xl font-bold text-red-600 dark:text-red-400 mb-2">
            {incomeComparisonData.afterLimit.min}-{incomeComparisonData.afterLimit.max}元
          </div>
          <div className="text-sm text-slate-600 dark:text-slate-400">限速后月收入</div>
        </div>
      </div>
      
      {/* 下降幅度标注 */}
      <div className="mt-4 text-center p-3 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-lg">
        <span className="text-lg font-bold text-red-600 dark:text-red-400">
          ↓ 下降{incomeComparisonData.decreasePercentage.min}%-{incomeComparisonData.decreasePercentage.max}%
        </span>
        <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">
          收入受到重创，部分骑手月收入减半
        </div>
      </div>
    </div>
  );
}