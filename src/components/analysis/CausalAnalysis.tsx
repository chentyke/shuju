"use client";

import dynamic from "next/dynamic";
import { Section } from "@/components/common/Section";
import type { EChartsOption } from "echarts";

const ReactECharts = dynamic(() => import("echarts-for-react"), { ssr: false }) as unknown as (props: { option: EChartsOption; style?: React.CSSProperties }) => import("react").ReactElement | null;

export function CausalAnalysis() {
  return (
    <Section id="causal-analysis" title="探因溯源" subtitle="电动自行车治理困境的深层原因">
      <div className="space-y-8">
        {/* 城市治理的不足 */}
        <div className="rounded-xl border p-6 bg-white/60 dark:bg-white/5">
          <h3 className="text-xl font-bold mb-6 text-blue-600">一、城市治理的不足</h3>
          
          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            {/* 基础设施不足 */}
            <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20">
              <h4 className="font-semibold mb-3 text-blue-700">1. 基础设施不足</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span>标准车道达标率</span>
                  <span className="font-bold text-red-600">16%</span>
                </div>
                <div className="bg-gray-200 rounded-full h-2">
                  <div className="bg-red-500 h-2 rounded-full" style={{ width: '16%' }}></div>
                </div>
                <p className="text-gray-600">84%的非机动车道未达2.5米国标</p>
              </div>
              
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span>路网覆盖率（2024）</span>
                  <span className="font-bold text-orange-600">72.3%</span>
                </div>
                <div className="bg-gray-200 rounded-full h-2">
                  <div className="bg-orange-500 h-2 rounded-full" style={{ width: '72.3%' }}></div>
                </div>
                <p className="text-gray-600">仍有28%的主次干路缺乏非机动车道</p>
              </div>
            </div>

            {/* 基础设施建设趋势图 */}
            <div className="p-4 rounded-lg bg-white/80 dark:bg-white/10">
              <h4 className="font-semibold mb-3">非机动车道建设进度</h4>
              <ReactECharts option={infrastructureOption} style={{ height: 280 }} />
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* 执法效能低下 */}
            <div className="p-4 rounded-lg bg-red-50 dark:bg-red-900/20">
              <h4 className="font-semibold mb-3 text-red-700">2. 执法效能低下</h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center">
                  <span>日均查处量</span>
                  <span className="font-bold">1.2万起</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>查处率</span>
                  <span className="font-bold text-red-600">0.05%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>智能信号灯覆盖率</span>
                  <span className="font-bold text-orange-600">45%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>专用摄像头覆盖</span>
                  <span className="font-bold text-red-600">30%</span>
                </div>
              </div>
            </div>

            {/* 监管体系缺失 */}
            <div className="p-4 rounded-lg bg-yellow-50 dark:bg-yellow-900/20">
              <h4 className="font-semibold mb-3 text-yellow-700">3. 监管体系缺失</h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center">
                  <span>无强制保险制度</span>
                  <span className="font-bold text-red-600">60%事故纠纷</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>专用号牌推进</span>
                  <span className="font-bold text-orange-600">滞后</span>
                </div>
                <p className="text-gray-600">外卖、快递行业长期处于监管盲区</p>
              </div>
            </div>
          </div>
        </div>

        {/* 产销责任的逃避 */}
        <div className="rounded-xl border p-6 bg-white/60 dark:bg-white/5">
          <h3 className="text-xl font-bold mb-6 text-purple-600">二、产销责任的逃避</h3>
          
          <div className="grid lg:grid-cols-2 gap-6">
            {/* 车辆标准违规 - 车速仪表盘 */}
            <div className="p-4 rounded-lg bg-purple-50 dark:bg-purple-900/20">
              <h4 className="font-semibold mb-3 text-purple-700">1. 车辆标准违规</h4>
              <ReactECharts option={speedGaugeOption} style={{ height: 250 }} />
              <p className="text-sm text-gray-600 mt-2 text-center">
                65%电动车实际车速超国标（≥35km/h）
              </p>
            </div>

            {/* 销售环节乱象 */}
            <div className="p-4 rounded-lg bg-orange-50 dark:bg-orange-900/20">
              <h4 className="font-semibold mb-3 text-orange-700">2. 销售环节乱象</h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center">
                  <span>2023年投诉量增长</span>
                  <span className="font-bold text-red-600">+120%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>虚假宣传占比</span>
                  <span className="font-bold text-red-600">58%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>违规解码车销量</span>
                  <span className="font-bold text-orange-600">10万+辆</span>
                </div>
                <p className="text-gray-600 mt-2">电商平台公然销售"可解锁限速"车型</p>
              </div>
            </div>
          </div>
        </div>

        {/* 平台规则的压迫 */}
        <div className="rounded-xl border p-6 bg-white/60 dark:bg-white/5">
          <h3 className="text-xl font-bold mb-6 text-green-600">三、平台规则的压迫</h3>
          
          <div className="grid lg:grid-cols-2 gap-6">
            {/* 算法压迫 */}
            <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/20">
              <h4 className="font-semibold mb-3 text-green-700">1. 算法压迫骑手</h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center">
                  <span>日均配送量</span>
                  <span className="font-bold">35-50单</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>高峰配送时限</span>
                  <span className="font-bold text-red-600">≤30分钟</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>超时罚款比例</span>
                  <span className="font-bold text-red-600">50%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>"被迫冒险"骑手比例</span>
                  <span className="font-bold text-red-600">80%</span>
                </div>
              </div>
            </div>

            {/* 考核机制矛盾 */}
            <div className="p-4 rounded-lg bg-red-50 dark:bg-red-900/20">
              <h4 className="font-semibold mb-3 text-red-700">2. 考核机制矛盾</h4>
              <ReactECharts option={weatherViolationOption} style={{ height: 200 }} />
              <p className="text-sm text-gray-600 mt-2">
                恶劣天气下违法率增长40%，平台却压缩配送时间
              </p>
            </div>
          </div>
        </div>

        {/* 地方政策的缺位 */}
        <div className="rounded-xl border p-6 bg-white/60 dark:bg-white/5">
          <h3 className="text-xl font-bold mb-6 text-indigo-600">四、地方政策的缺位</h3>
          
          <div className="grid lg:grid-cols-2 gap-6">
            {/* 法规体系割裂 */}
            <div className="p-4 rounded-lg bg-indigo-50 dark:bg-indigo-900/20">
              <h4 className="font-semibold mb-3 text-indigo-700">1. 法规体系割裂</h4>
              <ul className="text-sm space-y-2">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                  <span>国家法未明确电动自行车上牌、保险细则</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                  <span>共享电单车、外卖车辆缺乏登记渠道</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                  <span>《广州市电动自行车管理规定》2024年底才实施</span>
                </li>
              </ul>
            </div>

            {/* 执法标准不一 */}
            <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-900/20">
              <h4 className="font-semibold mb-3 text-gray-700">2. 执法标准不一</h4>
              <div className="space-y-3 text-sm">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded">
                  <div className="font-medium">中心城区（天河、越秀）</div>
                  <div className="text-gray-600">严查无牌车</div>
                </div>
                <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded">
                  <div className="font-medium">外围区（黄埔、番禺）</div>
                  <div className="text-gray-600">共享电单车无牌运营普遍</div>
                </div>
                <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded">
                  <div className="font-medium">2025年查扣量</div>
                  <div className="text-gray-600">2.36万辆（短期化整治）</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 总结 */}
        <div className="rounded-xl border p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
          <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">系统性困境的根源</h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="p-3 bg-white/60 dark:bg-white/10 rounded-lg">
              <h4 className="font-semibold text-blue-600 mb-2">基础设施短板</h4>
              <p className="text-gray-600">车道不达标、路网不完善、建设滞后于需求增长</p>
            </div>
            <div className="p-3 bg-white/60 dark:bg-white/10 rounded-lg">
              <h4 className="font-semibold text-purple-600 mb-2">监管失效</h4>
              <p className="text-gray-600">生产销售失管、执法效能低下、技术手段落后</p>
            </div>
            <div className="p-3 bg-white/60 dark:bg-white/10 rounded-lg">
              <h4 className="font-semibold text-green-600 mb-2">责任转嫁</h4>
              <p className="text-gray-600">平台算法压迫、政策缺位、多方责任缺失</p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

// 基础设施建设趋势图
const infrastructureOption: EChartsOption = {
  title: {
    text: '非机动车道建设进度',
    textStyle: { fontSize: 14 }
  },
  tooltip: { trigger: 'axis' },
  legend: {
    data: ['总里程(km)', '覆盖率(%)'],
    bottom: 0
  },
  xAxis: {
    type: 'category',
    data: ['2021', '2022', '2023', '2024']
  },
  yAxis: [
    {
      type: 'value',
      name: '里程(km)',
      min: 0,
      max: 1800
    },
    {
      type: 'value',
      name: '覆盖率(%)',
      min: 50,
      max: 85
    }
  ],
  series: [
    {
      name: '总里程(km)',
      type: 'bar',
      yAxisIndex: 0,
      data: [1023, 1570, 1071, 1428],
      itemStyle: { color: '#3b82f6' }
    },
    {
      name: '覆盖率(%)',
      type: 'line',
      yAxisIndex: 1,
      data: [58.5, 65.2, 70.8, 77.7],
      itemStyle: { color: '#ef4444' },
      lineStyle: { width: 3 }
    }
  ]
};

// 车速仪表盘
const speedGaugeOption: EChartsOption = {
  series: [
    {
      type: 'gauge',
      min: 0,
      max: 60,
      splitNumber: 6,
      axisLine: {
        lineStyle: {
          width: 8,
          color: [
            [0.583, '#10b981'], // 35km/h以下为绿色
            [0.833, '#f59e0b'], // 35-50km/h为黄色
            [1, '#ef4444']      // 50km/h以上为红色
          ]
        }
      },
      axisTick: { show: false },
      splitLine: {
        length: 15,
        lineStyle: { width: 2, color: '#999' }
      },
      axisLabel: {
        distance: 25,
        fontSize: 10
      },
      pointer: {
        width: 4,
        length: '70%',
        itemStyle: { color: '#333' }
      },
      detail: {
        valueAnimation: true,
        formatter: '{value} km/h',
        fontSize: 16,
        fontWeight: 'bold',
        offsetCenter: [0, '70%']
      },
      data: [{ value: 42, name: '市场均速' }],
      title: {
        show: true,
        offsetCenter: [0, '90%'],
        fontSize: 12,
        color: '#666'
      }
    }
  ]
};

// 恶劣天气违法率变化
const weatherViolationOption: EChartsOption = {
  title: {
    text: '恶劣天气违法率变化',
    textStyle: { fontSize: 12 }
  },
  tooltip: { 
    trigger: 'axis',
    formatter: '{b}: {c}%'
  },
  xAxis: {
    type: 'category',
    data: ['正常天气', '恶劣天气'],
    axisLabel: { fontSize: 10 }
  },
  yAxis: {
    type: 'value',
    name: '违法率(%)',
    axisLabel: { fontSize: 10 }
  },
  series: [
    {
      type: 'bar',
      data: [
        { value: 15, itemStyle: { color: '#10b981' } },
        { value: 21, itemStyle: { color: '#ef4444' } }
      ],
      label: {
        show: true,
        position: 'top',
        formatter: '{c}%'
      }
    }
  ]
};