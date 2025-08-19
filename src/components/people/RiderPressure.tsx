"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Section } from "@/components/common/Section";
import { riderViolationRatioData, violationTypeData, riderBasicData, incomeAndPenaltyData, socialMediaComments, emotionColors } from "@/data/riderViolations";
import { RiderScale } from "@/components/charts/RiderScale";
import { DeliveryTimeComparison } from "@/components/charts/DeliveryTimeComparison";
import { IncomeComparison } from "@/components/charts/IncomeComparison";
import { ViolationBehavior } from "@/components/charts/ViolationBehavior";
import { 
  riderScaleData, 
  deliveryTimeData, 
  incomeComparisonData, 
  penaltyData, 
  violationBehaviorData 
} from "@/data/deliveryPressure";
import type { EChartsOption } from "echarts";

const ReactECharts = dynamic(() => import("echarts-for-react"), { ssr: false }) as unknown as (props: { option: EChartsOption; style?: React.CSSProperties }) => import("react").ReactElement | null;

export function RiderPressure() {
  return (
    <Section 
      id="rider-pressure" 
      title="逐单争速"
      description="在这些违法与事故数据背后，有一个群体的身影格外突出——外卖与快递骑手。他们虽然只占电动自行车总量的一小部分，却在交通违法和事故统计中长期高居前列。"
      className="bg-gradient-to-b from-amber-50/50 to-red-50/50 dark:from-amber-900/20 dark:to-red-900/20"
      isMajorSection={true}
    >
      {/* 核心统计数据 */}
      <div className="grid grid-cols-3 gap-6 mb-8">
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
      </div>

      {/* 违法占比趋势图 */}
      <div className="glass-card p-8 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            外卖快递骑手违法占比趋势（2021-2024）
          </h3>
          <div className="text-sm text-slate-500 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
            违法占比(%)
          </div>
        </div>
        <ReactECharts option={violationRatioChartOption} style={{ height: 400 }} />
        <div className="text-sm text-slate-500 dark:text-slate-400 text-center mt-4">
          数据来源：广州日报、广州人大、南方都市报
        </div>
      </div>

      {/* 违法类型分析 */}
      <div className="glass-card p-8 mb-8">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
          骑手违法类型分布（2021年基准）
        </h3>
        <ReactECharts option={violationTypeChartOption} style={{ height: 300 }} />
        <div className="text-sm text-slate-500 dark:text-slate-400 text-center mt-4">
          数据来源：广州日报
        </div>
      </div>

      <div className="text-center mb-8">
        <p className="text-lg text-slate-700 dark:text-slate-300">
          这一现象背后，又隐藏着怎样的行业压力与生存困境？
        </p>
      </div>
      
      {/* 数据来源 - 图表部分 */}
      <div className="text-sm text-slate-500 dark:text-slate-400 text-center mb-8">
        数据来源：广州日报；羊城晚报
      </div>

      <div className="grid gap-1 mt-24">
        
        {/* ① 骑手规模与任务量 */}
        <div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
            ① 骑手规模与任务量
          </h3>
          <RiderScale />
        </div>

        {/* ② 平台要求 vs 限速现实 */}
        <div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
            ② 平台要求 vs 限速现实
          </h3>
          <div className="mb-4 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg">
            <p className="text-slate-700 dark:text-slate-300">
              平台要求 3公里内订单<span className="font-semibold text-blue-600">{deliveryTimeData.platformRequirement}分钟</span>送达，
              但在 <span className="font-semibold text-red-600">{deliveryTimeData.speedLimit}公里/小时</span>限速下，
              实际配送（含等餐、等红灯）往往需要 
              <span className="font-semibold text-orange-600"> {deliveryTimeData.realityTime.min}–{deliveryTimeData.realityTime.max}分钟</span>。
            </p>
            <p className="mt-2 text-red-600 font-semibold">
              👉 几乎没有容错空间，超时风险大增。
            </p>
          </div>
        </div>

        {/* ③ 收入与罚款 */}
        <div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
            ③ 收入与罚款
          </h3>
          <div className="mb-6 p-6 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-lg">
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              骑手不仅要"拼时间"，还要承受高额罚款：
            </p>
            
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="p-4 bg-white/60 dark:bg-slate-800/60 rounded-lg">
                <div className="text-lg font-bold text-orange-600 dark:text-orange-400">
                  超时罚款
                </div>
                <div className="text-2xl font-bold text-slate-900 dark:text-white">
                  {penaltyData.overtime.min}–{penaltyData.overtime.max}元/单
                </div>
              </div>
              
              <div className="p-4 bg-white/60 dark:bg-slate-800/60 rounded-lg">
                <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
                  差评处罚
                </div>
                <div className="text-2xl font-bold text-slate-900 dark:text-white">
                  最高 {penaltyData.badReview.amount}元
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  相当于 {penaltyData.badReview.equivalentOrders}单收入
                </div>
              </div>
              
              <div className="p-4 bg-white/60 dark:bg-slate-800/60 rounded-lg">
                <div className="text-lg font-bold text-red-600 dark:text-red-400">
                  严重超时
                </div>
                <div className="text-lg font-bold text-slate-900 dark:text-white">
                  降权处罚
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  派单减少
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-gradient-to-r from-red-100 to-red-200 dark:from-red-900/40 dark:to-red-800/40 rounded-lg">
              <div className="font-bold text-red-700 dark:text-red-300 mb-2">
                收入受到重创：
              </div>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-semibold">限速前：</span>
                  <span className="text-green-600 font-bold">
                    {incomeComparisonData.beforeLimit.min}–{incomeComparisonData.beforeLimit.max}元/月
                  </span>
                </div>
                <div>
                  <span className="font-semibold">限速后：</span>
                  <span className="text-red-600 font-bold">
                    下降 {incomeComparisonData.decreasePercentage.min}%–{incomeComparisonData.decreasePercentage.max}%，
                    部分仅 {incomeComparisonData.afterLimit.min}–{incomeComparisonData.afterLimit.max}元
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ④ 违规与无奈 */}
        <div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
            ④ 违规与无奈
          </h3>
          <div className="mb-6 p-6 bg-gradient-to-r from-amber-50 to-red-50 dark:from-amber-900/20 dark:to-red-900/20 rounded-lg">            
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              <span className="font-semibold text-slate-900 dark:text-white">压力之下的违法行为：</span>在收入下降和罚款压力下，违规几乎成了"生存手段"。
            </p>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-white/60 dark:bg-slate-800/60 rounded-lg">
                <div className="flex items-center space-x-3 mb-2">
                  <span className="text-3xl">🚦</span>
                  <div>
                    <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                      {violationBehaviorData.redLightViolation.percentage}% 闯红灯
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      原因：{violationBehaviorData.redLightViolation.reason}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-white/60 dark:bg-slate-800/60 rounded-lg">
                <div className="flex items-center space-x-3 mb-2">
                  <span className="text-3xl">🚗</span>
                  <div>
                    <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                      {violationBehaviorData.wrongLane.percentage}% 驶入机动车道
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      原因：{violationBehaviorData.wrongLane.reason}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ⑤ 衍生现象 */}
        <div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
            ⑤ 衍生现象
          </h3>
          <div className="p-6 bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-800/50 dark:to-gray-800/50 rounded-lg border-l-4 border-amber-500">
            <div className="flex items-start space-x-4">
              <span className="text-4xl">⚡</span>
              <div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  电动车解码器市场兴起
                </h4>
                <p className="text-slate-700 dark:text-slate-300">
                  这股压力催生了一个灰色市场：<span className="font-semibold text-amber-600">电动车解码器销量激增</span>。
                  许多骑手选择解除限速，以恢复原有效率。这一现象反映了政策执行与现实需求之间的巨大落差，
                  也揭示了在生存压力面前，规则与安全往往让位于经济需要的残酷现实。
                </p>
              </div>
            </div>
          </div>
        </div>





      </div>
      
      <p className="mt-8 text-sm text-slate-500 dark:text-slate-400 text-center">
        数据来源：光明网、人民政协网
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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        formatter: function(params: any) {
          const data = riderViolationRatioData[params.dataIndex];
          if (data.year === 2023 || data.year === 2024) {
            return `${params.value}%\n(预估)`;
          }
          return `${params.value}%`;
        },
        color: '#ef4444',
        fontSize: 11,
        fontWeight: 'bold',
        lineHeight: 14
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