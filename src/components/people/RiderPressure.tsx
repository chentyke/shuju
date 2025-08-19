"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Section } from "@/components/common/Section";
import { riderViolationRatioData, violationTypeData, riderBasicData, incomeAndPenaltyData, socialMediaComments, emotionColors } from "@/data/riderViolations";
import type { EChartsOption } from "echarts";

const ReactECharts = dynamic(() => import("echarts-for-react"), { ssr: false }) as unknown as (props: { option: EChartsOption; style?: React.CSSProperties }) => import("react").ReactElement | null;

export function RiderPressure() {
  return (
    <Section 
      id="rider-pressure" 
      title="逐单争速" 
      subtitle="外卖骑手：低占有率 高违法率的高风险群体"
      description="在这些违法与事故数据背后，有一个群体的身影格外突出——外卖与快递骑手。他们虽然只占电动自行车总量的一小部分，却在交通违法和事故统计中长期高居前列。这一现象背后，又隐藏着怎样的行业压力与生存困境？"
      className="bg-gradient-to-b from-amber-50/50 to-red-50/50 dark:from-amber-900/20 dark:to-red-900/20"
      isMajorSection={true}
    >
      <div className="grid gap-8">
        {/* 核心统计数据 */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="glass-card p-6 text-center bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 border-l-4 border-blue-500">
            <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-3">
              {riderBasicData.totalActiveRiders}万
            </div>
            <div className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              活跃骑手
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              每日实际接单人数
            </div>
          </div>
          
          <div className="glass-card p-6 text-center bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/30 dark:to-amber-800/30 border-l-4 border-amber-500">
            <div className="text-4xl font-bold text-amber-600 dark:text-amber-400 mb-3">
              {riderBasicData.riderPercentage}%
            </div>
            <div className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              用户占比
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              占电动自行车用户比例
            </div>
          </div>
          
          <div className="glass-card p-6 text-center bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/30 dark:to-red-800/30 border-l-4 border-red-500">
            <div className="text-4xl font-bold text-red-600 dark:text-red-400 mb-3">
              20%
            </div>
            <div className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              违法占比
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              2024年预估违法占比
            </div>
          </div>
          
          <div className="glass-card p-6 text-center bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/30 border-l-4 border-orange-500">
            <div className="text-4xl font-bold text-orange-600 dark:text-orange-400 mb-3">
              40%
            </div>
            <div className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              收入下降
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              限速后平均收入减少
            </div>
          </div>
        </div>

        {/* 违法占比趋势图 */}
        <div className="glass-card p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              外卖快递骑手违法占比趋势（2021-2024）
            </h3>
            <div className="text-sm text-slate-500 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
              违法占比(%)
            </div>
          </div>
          <ReactECharts option={violationRatioChartOption} style={{ height: 400 }} />
        </div>

        {/* 违法类型分析 */}
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="glass-card p-8">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
              骑手违法类型分布（2021年基准）
            </h3>
            <ReactECharts option={violationTypeChartOption} style={{ height: 300 }} />
          </div>
          
          <div className="glass-card p-8">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
              配送压力指标
            </h3>
            <div className="space-y-6">
              <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 rounded-lg">
                <div>
                  <div className="font-semibold text-slate-900 dark:text-white">平均每日订单</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">高峰时段更高</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{riderBasicData.dailyOrdersNormal}-{riderBasicData.dailyOrdersPeak}</div>
                  <div className="text-sm text-slate-500">单/天</div>
                </div>
              </div>
              
              <div className="flex justify-between items-center p-4 bg-gradient-to-r from-amber-50 to-amber-100 dark:from-amber-900/30 dark:to-amber-800/30 rounded-lg">
                <div>
                  <div className="font-semibold text-slate-900 dark:text-white">配送时限要求</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">3公里内订单</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">{riderBasicData.timeLimit}</div>
                  <div className="text-sm text-slate-500">分钟</div>
                </div>
              </div>
              
              <div className="flex justify-between items-center p-4 bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/30 dark:to-red-800/30 rounded-lg">
                <div>
                  <div className="font-semibold text-slate-900 dark:text-white">实际配送时间</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">含等餐与等红灯</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-red-600 dark:text-red-400">{riderBasicData.actualDeliveryTime}</div>
                  <div className="text-sm text-slate-500">分钟</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 经济压力分析 */}
        <div className="glass-card p-8">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">限速政策对骑手收入的影响</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">限速前后收入对比</h4>
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 rounded-lg">
                  <div className="text-sm text-slate-600 dark:text-slate-400 mb-1">限速前月收入</div>
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {incomeAndPenaltyData.incomeBeforeLimit.min}-{incomeAndPenaltyData.incomeBeforeLimit.max}元
                  </div>
                </div>
                
                <div className="p-4 bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/30 dark:to-red-800/30 rounded-lg">
                  <div className="text-sm text-slate-600 dark:text-slate-400 mb-1">限速后月收入</div>
                  <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                    {incomeAndPenaltyData.incomeAfterLimit.min}-{incomeAndPenaltyData.incomeAfterLimit.max}元
                  </div>
                  <div className="text-xs text-red-500 mt-1">
                    ↓ 减少{incomeAndPenaltyData.incomeAfterLimit.decreasePercentage}%
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">罚款压力</h4>
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/30 rounded-lg">
                  <div className="text-sm text-slate-600 dark:text-slate-400 mb-1">超时罚款</div>
                  <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                    {incomeAndPenaltyData.penalties.overtime.min}-{incomeAndPenaltyData.penalties.overtime.max}元/单
                  </div>
                </div>
                
                <div className="p-4 bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 rounded-lg">
                  <div className="text-sm text-slate-600 dark:text-slate-400 mb-1">投诉差评罚款</div>
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {incomeAndPenaltyData.penalties.complaint.min}-{incomeAndPenaltyData.penalties.complaint.max}元/单
                  </div>
                  <div className="text-xs text-purple-500 mt-1">
                    相当于{incomeAndPenaltyData.penalties.equivalentOrders.min}-{incomeAndPenaltyData.penalties.equivalentOrders.max}单收入
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 违法行为调查 */}
        <div className="glass-card p-8">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">骑手违法行为调查</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/30 dark:to-red-800/30 rounded-lg text-center">
              <div className="text-5xl font-bold text-red-600 dark:text-red-400 mb-4">
                {incomeAndPenaltyData.violationStats.redLightViolators}%
              </div>
              <div className="text-lg font-semibold text-slate-900 dark:text-white mb-2">承认曾闯红灯</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                主要因&ldquo;系统倒计时&rdquo;带来的时间压迫
              </div>
            </div>
            
            <div className="p-6 bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/30 rounded-lg text-center">
              <div className="text-5xl font-bold text-orange-600 dark:text-orange-400 mb-4">
                {incomeAndPenaltyData.violationStats.wrongLaneUsers}%
              </div>
              <div className="text-lg font-semibold text-slate-900 dark:text-white mb-2">驶入机动车道</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                因非机动车道被违停车辆占用
              </div>
            </div>
          </div>
        </div>

        {/* 数据说明 */}
        <div className="glass-card p-6 bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-800/50 dark:to-gray-800/50">
          <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">数据说明</h4>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-slate-600 dark:text-slate-400">
            <div className="space-y-2">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  广州外卖、快递骑手虽然仅占全市电动自行车用户不足5%，却长期贡献着远高于占比的交通违法量
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  限速实施后，电动车解码器销量激增，反映出部分骑手通过技术手段解除限速以维持原有效率
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  目前全市约有12万名活跃骑手，平均每天需完成30-40单配送任务，午晚餐高峰时段甚至高达50单
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  平台要求3公里内订单30分钟送达，而15公里/小时的限速政策使得实际配送时间延长至20-25分钟
                </div>
              </div>
            </div>
          </div>
        </div>


      </div>
      
      <p className="mt-8 text-sm text-slate-500 dark:text-slate-400 text-center">
        数据来源：广州日报；南方都市报；羊城晚报
      </p>
    </Section>
  );
}

// 漂浮评论组件
function FloatingComments() { // eslint-disable-line @typescript-eslint/no-unused-vars
  const [visibleComments, setVisibleComments] = useState<Array<{
    comment: typeof socialMediaComments[0];
    x: number;
    y: number;
    rotation: number;
    scale: number;
    animationDelay: number;
  }>>([]);

  useEffect(() => {
    // 初始化可见评论，随机选择12条
    const shuffled = [...socialMediaComments].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 12).map((comment, index) => ({
      comment,
      x: Math.random() * 85, // 0-85% 避免气泡超出边界
      y: Math.random() * 85,
      rotation: Math.random() * 360,
      scale: Math.min(Math.max(comment.likes / 200, 0.6), 1.2), // 根据点赞数调整大小
      animationDelay: index * 0.2
    }));
    setVisibleComments(selected);
  }, []);

  return (
    <div className="absolute inset-0">
      {visibleComments.map((item) => (
        <FloatingBubble
          key={item.comment.id}
          comment={item.comment}
          x={item.x}
          y={item.y}
          rotation={item.rotation}
          scale={item.scale}
          delay={item.animationDelay}
        />
      ))}
    </div>
  );
}

// 单个漂浮气泡组件
function FloatingBubble({ 
  comment, 
  x, 
  y, 
  rotation, 
  scale, 
  delay
}: {
  comment: typeof socialMediaComments[0];
  x: number;
  y: number;
  rotation: number;
  scale: number;
  delay: number;
}) {
  const color = emotionColors[comment.emotion as keyof typeof emotionColors] || "#6b7280";
  
  return (
    <div
      className={`absolute transition-all duration-1000 ease-out opacity-0 animate-float-in animate-gentle-bob animate-gentle-sway animate-subtle-rotate`}
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: `translate(-50%, -50%) rotate(${rotation}deg) scale(${scale})`,
        animationDelay: `${delay}s, ${delay + 1}s, ${delay + 2}s, ${delay + 3}s`
      }}
    >
      <div
        className="relative p-3 rounded-2xl shadow-lg backdrop-blur-sm max-w-xs cursor-pointer group hover:scale-110 transition-transform duration-300"
        style={{
          backgroundColor: `${color}15`, // 15% 透明度
          borderColor: `${color}40`,
          borderWidth: '2px',
          borderStyle: 'solid'
        }}
      >
        {/* 气泡箭头 */}
        <div
          className="absolute w-3 h-3 transform rotate-45"
          style={{
            backgroundColor: `${color}15`,
            borderRight: `2px solid ${color}40`,
            borderBottom: `2px solid ${color}40`,
            bottom: '-7px',
            left: '20px'
          }}
        />
        
        {/* 评论内容 */}
        <div className="relative">
          <p 
            className="text-sm font-medium leading-tight mb-2"
            style={{ color: color }}
          >
&ldquo;{comment.text}&rdquo;
          </p>
          
          {/* 点赞数 */}
          <div className="flex items-center justify-between text-xs">
            <div 
              className="flex items-center space-x-1 opacity-70"
              style={{ color: color }}
            >
              <span>❤️</span>
              <span>{comment.likes}</span>
            </div>
            <div 
              className="px-2 py-1 rounded-full text-xs font-medium"
              style={{ 
                backgroundColor: `${color}20`,
                color: color
              }}
            >
              {getEmotionLabel(comment.emotion)}
            </div>
          </div>
        </div>
        
        {/* 鼠标悬停时的放大效果 */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"
          style={{ backgroundColor: color }}
        />
      </div>
    </div>
  );
}

// 情绪标签映射
function getEmotionLabel(emotion: string): string {
  const labels: { [key: string]: string } = {
    frustrated: "沮丧",
    helpless: "无助",
    conflicted: "矛盾",
    pressured: "压力",
    desperate: "绝望",
    angry: "愤怒",
    bitter: "痛苦",
    sarcastic: "讽刺",
    rational: "理性",
    disappointed: "失望",
    anxious: "焦虑",
    tired: "疲惫",
    intense: "紧张",
    serious: "严肃",
    sad: "悲伤"
  };
  return labels[emotion] || "其他";
}

// 违法占比趋势图配置
const violationRatioChartOption: EChartsOption = {
  backgroundColor: 'transparent',
  tooltip: { 
    trigger: "axis",
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderColor: '#e2e8f0',
    borderWidth: 1,
    textStyle: { color: '#334155', fontSize: 12 },
    extraCssText: 'box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12); backdrop-filter: blur(8px);',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    formatter: function(params: any) {
      if (Array.isArray(params) && params.length > 0 && params[0]) {
        const data = riderViolationRatioData[params[0].dataIndex];
        return `
          <div style="font-weight: bold; margin-bottom: 8px;">${data.year}年</div>
          <div style="margin-bottom: 4px;">
            <span style="display: inline-block; width: 10px; height: 10px; background-color: #ef4444; margin-right: 8px;"></span>
            违法占比: ${data.ratio}%
          </div>
          <div style="margin-bottom: 4px;">
            <span style="display: inline-block; width: 10px; height: 10px; background-color: #f97316; margin-right: 8px;"></span>
            骑手违法: ${data.riderViolations}万宗
          </div>
          <div style="color: #64748b; font-size: 11px; margin-top: 8px;">
            ${data.note}
          </div>
        `;
      }
      return '';
    }
  },
  grid: { 
    left: 60, 
    right: 60, 
    top: 40, 
    bottom: 60 
  },
  xAxis: {
    type: "category", 
    data: riderViolationRatioData.map(d => d.year),
    axisLine: { lineStyle: { color: '#e2e8f0', width: 1 } },
    axisLabel: { 
      color: '#64748b', 
      fontSize: 12,
      formatter: '{value}年'
    },
    axisTick: { show: false }
  },
  yAxis: {
    type: "value",
    name: '违法占比(%)',
    nameTextStyle: {
      color: '#64748b',
      fontSize: 11
    },
    min: 0,
    max: 25,
    interval: 5,
    axisLine: { show: false },
    splitLine: { lineStyle: { color: '#f1f5f9', type: 'dashed', width: 1 } },
    axisLabel: { 
      color: '#64748b', 
      fontSize: 10,
      formatter: '{value}%'
    }
  },
  series: [
    {
      name: '违法占比',
      type: "line",
      data: riderViolationRatioData.map(d => d.ratio),
      lineStyle: {
        color: '#ef4444',
        width: 4
      },
      symbol: 'circle',
      symbolSize: 12,
      itemStyle: {
        color: '#ef4444',
        borderColor: '#fff',
        borderWidth: 3
      },
      label: {
        show: true,
        position: 'top',
        formatter: '{c}%',
        color: '#ef4444',
        fontSize: 12,
        fontWeight: 'bold'
      },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
            offset: 0, color: 'rgba(239, 68, 68, 0.3)'
          }, {
            offset: 1, color: 'rgba(239, 68, 68, 0.05)'
          }]
        }
      }
    }
  ]
};

// 违法类型饼图配置
const violationTypeChartOption: EChartsOption = {
  backgroundColor: 'transparent',
  tooltip: {
    trigger: 'item',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderColor: '#e2e8f0',
    borderWidth: 1,
    textStyle: { color: '#334155', fontSize: 12 },
    extraCssText: 'box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12); backdrop-filter: blur(8px);',
    formatter: '{b}: {c}% ({d}%)'
  },
  legend: {
    orient: 'vertical',
    left: '60%',
    top: 'center',
    textStyle: { color: '#64748b', fontSize: 12 }
  },
  series: [
    {
      type: 'pie',
      radius: ['40%', '70%'],
      center: ['30%', '50%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 8,
        borderColor: '#fff',
        borderWidth: 2
      },
      label: {
        show: false
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 14,
          fontWeight: 'bold'
        },
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.3)'
        }
      },
      data: violationTypeData.map(item => ({
        value: item.percentage,
        name: item.type,
        itemStyle: { color: item.color }
      }))
    }
  ]
};