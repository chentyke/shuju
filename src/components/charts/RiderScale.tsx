"use client";

import dynamic from "next/dynamic";
import { riderScaleData } from "@/data/deliveryPressure";

const ReactECharts = dynamic(() => import("echarts-for-react"), { ssr: false });

export function RiderScale() {
  const option = {
    backgroundColor: 'transparent',
    tooltip: {
      show: false
    },
    graphic: [
      // 人形图标区域
      {
        type: 'group',
        left: '10%',
        top: '20%',
        children: [
          {
            type: 'text',
            style: {
              text: '👥',
              fontSize: 50,
              fill: '#3b82f6'
            },
            left: 0,
            top: 0
          },
          {
            type: 'text',
            style: {
              text: `${riderScaleData.activeRiders}万`,
              fontSize: 24,
              fontWeight: 'bold',
              fill: '#1e293b'
            },
            left: 60,
            top: 5
          },
          {
            type: 'text',
            style: {
              text: '活跃骑手',
              fontSize: 12,
              fill: '#64748b'
            },
            left: 60,
            top: 35
          }
        ]
      },
      // 餐盒图标区域 
      {
        type: 'group',
        left: '40%',
        top: '20%',
        children: [
          {
            type: 'text',
            style: {
              text: '🍱',
              fontSize: 50,
              fill: '#f59e0b'
            },
            left: 0,
            top: 0
          },
          {
            type: 'text',
            style: {
              text: `${riderScaleData.dailyOrders.normal}单/日`,
              fontSize: 18,
              fontWeight: 'bold',
              fill: '#1e293b'
            },
            left: 60,
            top: 5
          },
          {
            type: 'text',
            style: {
              text: '平均订单量',
              fontSize: 12,
              fill: '#64748b'
            },
            left: 60,
            top: 32
          }
        ]
      },
      // 高峰箭头区域
      {
        type: 'group',
        left: '70%',
        top: '20%',
        children: [
          {
            type: 'text',
            style: {
              text: '📈',
              fontSize: 50,
              fill: '#ef4444'
            },
            left: 0,
            top: 0
          },
          {
            type: 'text',
            style: {
              text: `${riderScaleData.dailyOrders.peak}单/日`,
              fontSize: 18,
              fontWeight: 'bold',
              fill: '#1e293b'
            },
            left: 60,
            top: 5
          },
          {
            type: 'text',
            style: {
              text: '高峰时段',
              fontSize: 12,
              fill: '#64748b'
            },
            left: 60,
            top: 32
          }
        ]
      }
    ]
  };

  return (
    <div className="glass-card p-6">
      <div className="mb-4 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg">
        <p className="text-slate-700 dark:text-slate-300">
          广州有 12万 活跃骑手，平均每天完成 35 单，高峰时段可达 50 单。
        </p>
      </div>
      <ReactECharts option={option} style={{ height: 120 }} />
    </div>
  );
}