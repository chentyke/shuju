"use client";

import dynamic from "next/dynamic";
import { Section } from "@/components/common/Section";
import type { EChartsOption } from "echarts";

const ReactECharts = dynamic(() => import("echarts-for-react"), { ssr: false }) as unknown as (props: { option: EChartsOption; style?: React.CSSProperties }) => import("react").ReactElement | null;

export function BestPractices() {
  return (
    <Section id="best-practices" title="他山之石" subtitle="先进城市的管理经验与启示">
      <div className="space-y-8">
        {/* 引言 */}
        <div className="rounded-xl border p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            面对多方掣肘、治理成效受限的现实，一些城市已率先探索出相对成熟的管理方案。它们的经验或许能为广州提供可借鉴的思路与路径。
          </p>
        </div>

        {/* 深圳模式 */}
        <div className="rounded-xl border p-6 bg-white/60 dark:bg-white/5">
          <div className="flex items-center mb-6">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold mr-3">1</div>
            <h3 className="text-xl font-bold text-blue-600">深圳：分类管理 蓝牌治企</h3>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-6">
            {/* 深圳蓝牌特点 */}
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                <h4 className="font-semibold mb-3 text-blue-700">特殊行业电动自行车号牌特点</h4>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                    <span className="text-sm">蓝底白字长期有效号牌</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-sm">内置电子标识芯片</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
                    <span className="text-sm">印有二维码标识</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
                    <span className="text-sm">实现人车关联</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/20">
                <h4 className="font-semibold mb-3 text-green-700">管理机制</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>申请主体</span>
                    <span className="font-bold text-blue-600">仅限企业</span>
                  </div>
                  <div className="flex justify-between">
                    <span>申请方式</span>
                    <span className="font-bold text-green-600">批量登记</span>
                  </div>
                  <div className="flex justify-between">
                    <span>责任主体</span>
                    <span className="font-bold text-purple-600">企业承担</span>
                  </div>
                  <div className="flex justify-between">
                    <span>个人申请</span>
                    <span className="font-bold text-red-600">不允许</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 深圳模式可视化 */}
            <div className="p-4 rounded-lg bg-white/80 dark:bg-white/10">
              <h4 className="font-semibold mb-3">深圳分类管理模式</h4>
              <ReactECharts option={shenzhenModelOption} style={{ height: 300 }} />
            </div>
          </div>
        </div>

        {/* 浙江模式 */}
        <div className="rounded-xl border p-6 bg-white/60 dark:bg-white/5">
          <div className="flex items-center mb-6">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold mr-3">2</div>
            <h3 className="text-xl font-bold text-green-600">浙江：数字化追溯 全链监管</h3>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-6">
            {/* 浙江e行在线特点 */}
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/20">
                <h4 className="font-semibold mb-3 text-green-700">&quot;浙江e行在线&quot;平台特点</h4>
                <div className="space-y-3">
                  <div className="p-2 bg-white/60 dark:bg-white/10 rounded">
                    <div className="font-medium text-sm">浙品码机制</div>
                    <div className="text-xs text-gray-600">二维码标注车辆&quot;身份&quot;</div>
                  </div>
                  <div className="p-2 bg-white/60 dark:bg-white/10 rounded">
                    <div className="font-medium text-sm">一码知全貌</div>
                    <div className="text-xs text-gray-600">扫码即可溯源全部信息</div>
                  </div>
                  <div className="p-2 bg-white/60 dark:bg-white/10 rounded">
                    <div className="font-medium text-sm">全链条覆盖</div>
                    <div className="text-xs text-gray-600">销售、维修、回收全环节</div>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                <h4 className="font-semibold mb-3 text-blue-700">可溯源信息</h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-white/60 dark:bg-white/10 p-2 rounded">产品合格证编号</div>
                  <div className="bg-white/60 dark:bg-white/10 p-2 rounded">车辆制造商</div>
                  <div className="bg-white/60 dark:bg-white/10 p-2 rounded">制造日期</div>
                  <div className="bg-white/60 dark:bg-white/10 p-2 rounded">蓄电池编号</div>
                </div>
              </div>
            </div>

            {/* 浙江数字化流程图 */}
            <div className="p-4 rounded-lg bg-white/80 dark:bg-white/10">
              <h4 className="font-semibold mb-3">数字化追溯流程</h4>
              <ReactECharts option={zhejiangFlowOption} style={{ height: 300 }} />
            </div>
          </div>
        </div>

        {/* 广州治理建议 */}
        <div className="rounded-xl border p-6 bg-white/60 dark:bg-white/5">
          <div className="flex items-center mb-6">
            <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold mr-3">💡</div>
            <h3 className="text-xl font-bold text-purple-600">广州治理体系建议</h3>
          </div>

          <div className="mb-6">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              借鉴深圳分类管理与浙江数字化追溯经验，广州可构建&quot;全链条监管+分类治理&quot;体系：
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* 治理建议详情 */}
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-purple-50 dark:bg-purple-900/20">
                <h4 className="font-semibold mb-3 text-purple-700 flex items-center">
                  <span className="w-6 h-6 bg-purple-500 text-white rounded-full text-xs flex items-center justify-center mr-2">1</span>
                  推行分类登记
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <div className="w-16 h-6 bg-blue-500 rounded text-white text-xs flex items-center justify-center mr-2">蓝牌</div>
                    <span>民生行业（外卖、快递）</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-16 h-6 bg-gray-400 rounded text-white text-xs flex items-center justify-center mr-2">白牌</div>
                    <span>个人用户</span>
                  </div>
                  <p className="text-gray-600 text-xs mt-2">企业统一申领并承担管理责任，实现&quot;人车关联&quot;</p>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/20">
                <h4 className="font-semibold mb-3 text-green-700 flex items-center">
                  <span className="w-6 h-6 bg-green-500 text-white rounded-full text-xs flex items-center justify-center mr-2">2</span>
                  建立数字化平台
                </h4>
                <div className="text-sm space-y-2">
                  <p>引入&quot;广品码&quot;机制，为每辆车及电池赋唯一身份码</p>
                  <div className="flex flex-wrap gap-1">
                    <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 rounded text-xs">生产</span>
                    <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 rounded text-xs">销售</span>
                    <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 rounded text-xs">维修</span>
                    <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 rounded text-xs">回收</span>
                  </div>
                  <p className="text-gray-600 text-xs">杜绝非法改装与二手电池流通</p>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-orange-50 dark:bg-orange-900/20">
                <h4 className="font-semibold mb-3 text-orange-700 flex items-center">
                  <span className="w-6 h-6 bg-orange-500 text-white rounded-full text-xs flex items-center justify-center mr-2">3</span>
                  强化科技执法
                </h4>
                <div className="text-sm space-y-2">
                  <p>扩展抓拍试点，结合RFID芯片与AI识别</p>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-orange-100 dark:bg-orange-900/30 p-2 rounded text-xs">精准查处闯红灯</div>
                    <div className="bg-orange-100 dark:bg-orange-900/30 p-2 rounded text-xs">识别逆行行为</div>
                    <div className="bg-orange-100 dark:bg-orange-900/30 p-2 rounded text-xs">发现套牌车辆</div>
                    <div className="bg-orange-100 dark:bg-orange-900/30 p-2 rounded text-xs">非现场执法</div>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-red-50 dark:bg-red-900/20">
                <h4 className="font-semibold mb-3 text-red-700 flex items-center">
                  <span className="w-6 h-6 bg-red-500 text-white rounded-full text-xs flex items-center justify-center mr-2">4</span>
                  压实主体责任
                </h4>
                <div className="text-sm space-y-2">
                  <p className="font-medium">要求外卖平台落实&quot;五个一律&quot;管理：</p>
                  <div className="grid grid-cols-1 gap-1">
                    <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded text-xs">统一车辆 → 统一培训 → 统一编码 → 统一考核 → 违法退出</div>
                  </div>
                  <p className="text-gray-600 text-xs">联合惩戒违规企业</p>
                </div>
              </div>
            </div>

            {/* 治理体系框架图 */}
            <div className="p-4 rounded-lg bg-white/80 dark:bg-white/10">
              <h4 className="font-semibold mb-3">广州治理体系框架</h4>
              <ReactECharts option={guangzhouFrameworkOption} style={{ height: 350 }} />
            </div>
          </div>

          {/* 治理目标 */}
          <div className="mt-6 p-4 rounded-lg bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30">
            <h4 className="font-semibold mb-3 text-center">治理目标</h4>
            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div className="p-3 bg-white/60 dark:bg-white/10 rounded-lg">
                <div className="font-bold text-purple-600">源头可控</div>
                <div className="text-xs text-gray-600 mt-1">生产销售环节全监管</div>
              </div>
              <div className="p-3 bg-white/60 dark:bg-white/10 rounded-lg">
                <div className="font-bold text-blue-600">行为可溯</div>
                <div className="text-xs text-gray-600 mt-1">违法行为精准定位</div>
              </div>
              <div className="p-3 bg-white/60 dark:bg-white/10 rounded-lg">
                <div className="font-bold text-green-600">责任可究</div>
                <div className="text-xs text-gray-600 mt-1">多方责任清晰明确</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

// 深圳分类管理模式图
const shenzhenModelOption: EChartsOption = {
  title: {
    text: '深圳分类管理模式',
    textStyle: { fontSize: 14 }
  },
  tooltip: { trigger: 'item' },
  series: [
    {
      type: 'pie',
      radius: ['40%', '70%'],
      center: ['50%', '60%'],
      data: [
        { value: 75, name: '企业蓝牌', itemStyle: { color: '#3b82f6' } },
        { value: 25, name: '个人白牌', itemStyle: { color: '#9ca3af' } }
      ],
      label: {
        show: true,
        position: 'outside',
        formatter: '{b}\n{c}%'
      },
      labelLine: { show: true }
    }
  ]
};

// 浙江数字化追溯流程图
const zhejiangFlowOption: EChartsOption = {
  title: {
    text: '浙江数字化追溯流程',
    textStyle: { fontSize: 14 }
  },
  tooltip: { trigger: 'item' },
  series: [
    {
      type: 'sankey',
      emphasis: { focus: 'adjacency' },
      data: [
        { name: '生产环节' },
        { name: '销售环节' },
        { name: '维修环节' },
        { name: '回收环节' },
        { name: '浙品码' },
        { name: '消费者扫码' },
        { name: '信息溯源' }
      ],
      links: [
        { source: '生产环节', target: '浙品码', value: 1 },
        { source: '销售环节', target: '浙品码', value: 1 },
        { source: '维修环节', target: '浙品码', value: 1 },
        { source: '回收环节', target: '浙品码', value: 1 },
        { source: '浙品码', target: '消费者扫码', value: 4 },
        { source: '消费者扫码', target: '信息溯源', value: 4 }
      ],
      lineStyle: {
        color: 'gradient',
        curveness: 0.5
      }
    }
  ]
};

// 广州治理体系框架图
const guangzhouFrameworkOption: EChartsOption = {
  tooltip: { trigger: 'item' },
  series: [
    {
      type: 'graph',
      layout: 'none',
      symbolSize: 60,
      roam: false,
      draggable: false,
      label: {
        show: true,
        position: 'inside',
        fontSize: 12,
        fontWeight: 'bold',
        color: '#fff'
      },
      edgeSymbol: ['circle', 'arrow'],
      edgeSymbolSize: [4, 8],
      data: [
        {
          name: '分类登记',
          x: 150,
          y: 50,
          symbolSize: 60,
          itemStyle: { color: '#8b5cf6' }
        },
        {
          name: '数字化平台',
          x: 350,
          y: 50,
          symbolSize: 60,
          itemStyle: { color: '#10b981' }
        },
        {
          name: '科技执法',
          x: 150,
          y: 200,
          symbolSize: 60,
          itemStyle: { color: '#f59e0b' }
        },
        {
          name: '主体责任',
          x: 350,
          y: 200,
          symbolSize: 60,
          itemStyle: { color: '#ef4444' }
        },
        {
          name: '闭环治理',
          x: 250,
          y: 125,
          symbolSize: 80,
          itemStyle: { color: '#3b82f6' }
        }
      ],
      links: [
        { source: '分类登记', target: '闭环治理', lineStyle: { width: 2 } },
        { source: '数字化平台', target: '闭环治理', lineStyle: { width: 2 } },
        { source: '科技执法', target: '闭环治理', lineStyle: { width: 2 } },
        { source: '主体责任', target: '闭环治理', lineStyle: { width: 2 } }
      ]
    }
  ]
};