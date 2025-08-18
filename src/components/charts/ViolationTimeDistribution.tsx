"use client";

import { useEffect, useRef, useState } from "react";
import ReactECharts from "echarts-for-react";
import { useInView } from "react-intersection-observer";
import { hourlyViolationData, violationTypesByTime } from "@/data/spatioTemporalViolations";

export function ViolationTimeDistribution() {
  const _chartRef = useRef<any>(null);
  const [currentHour, setCurrentHour] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  // 自动播放时间轴
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && inView) {
      interval = setInterval(() => {
        setCurrentHour((prev) => (prev + 1) % 24);
      }, 800);
    }
    return () => clearInterval(interval);
  }, [isPlaying, inView]);

  // 获取24小时分布图表配置
  const getHourlyChartOption = (): any => {
    // const maxViolations = Math.max(...hourlyViolationData.map(d => d.violations));
    
    return {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderColor: '#e2e8f0',
        borderWidth: 1,
        textStyle: { color: '#334155', fontSize: 12 },
        extraCssText: 'box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12); backdrop-filter: blur(8px);',
        formatter: (params: any) => {
          const data = params[0];
          const hour = data.dataIndex;
          const violations = data.value;
          const isRush = hourlyViolationData[hour].isRushHour;
          return `
            <div style="padding: 8px;">
              <div style="font-weight: bold; margin-bottom: 4px; color: #1e293b;">${hour}:00 时段</div>
              <div style="color: #475569;">违法次数: <span style="color: #ef4444; font-weight: bold;">${violations} 起</span></div>
              <div style="color: #475569;">类型: ${isRush ? '<span style="color: #f59e0b; font-weight: bold;">高峰期</span>' : '<span style="color: #64748b;">平峰期</span>'}</div>
            </div>
          `;
        }
      },
      grid: {
        left: 60,
        right: 40,
        top: 60,
        bottom: 60
      },
      xAxis: {
        type: 'category' as const,
        data: Array.from({ length: 24 }, (_, i) => `${i}:00`),
        axisLabel: {
          color: '#64748b',
          fontSize: 11,
          interval: 2,
          margin: 12
        },
        axisLine: { lineStyle: { color: '#e2e8f0', width: 1 } },
        axisTick: { show: false }
      },
      yAxis: {
        type: 'value' as const,
        name: '违法次数',
        nameTextStyle: { 
          color: '#64748b', 
          fontSize: 11,
          padding: [0, 0, 0, -10]
        },
        axisLabel: { 
          color: '#64748b', 
          fontSize: 10,
          formatter: '{value}',
          margin: 8
        },
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: { lineStyle: { color: '#f1f5f9', type: 'dashed', width: 1 } }
      },
      series: [
        {
          name: '违法次数',
          type: 'bar',
          data: hourlyViolationData.map((item, index) => ({
            value: item.violations,
            itemStyle: {
              color: index === currentHour 
                ? '#dc2626' 
                : item.isRushHour 
                  ? '#f59e0b' 
                  : '#64748b',
              borderRadius: [4, 4, 0, 0]
            }
          })),
          barWidth: '60%',
          animationDuration: 1000,
          animationEasing: 'cubicOut',
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowColor: 'rgba(0, 0, 0, 0.3)'
            }
          }
        }
      ]
    };
  };

  // 获取违法类型饼图配置
  const getViolationTypeOption = (): any => {
    let data;
    let title;
    const hour = currentHour;
    
    if ((hour >= 8 && hour <= 9) || (hour >= 17 && hour <= 19)) {
      data = hour <= 9 ? violationTypesByTime.morningRush : violationTypesByTime.eveningRush;
      title = hour <= 9 ? '早高峰违法类型分布' : '晚高峰违法类型分布';
    } else {
      data = violationTypesByTime.offPeak;
      title = '平峰期违法类型分布';
    }

    const pieData = Object.entries(data).map(([name, value]) => ({ name, value }));
    const colors = ['#ef4444', '#f59e0b', '#3b82f6', '#10b981', '#8b5cf6'];
    
    // 检查是否为dark mode (SSR安全)
    const isDarkMode = typeof window !== 'undefined' && document.documentElement.classList.contains('dark');
    const titleColor = isDarkMode ? '#f1f5f9' : '#1e293b';
    const tooltipBg = isDarkMode ? 'rgba(30, 41, 59, 0.95)' : 'rgba(255, 255, 255, 0.95)';
    const tooltipBorder = isDarkMode ? '#475569' : '#e2e8f0';
    const tooltipTextColor = isDarkMode ? '#f1f5f9' : '#334155';

    return {
      backgroundColor: 'transparent',
      title: {
        text: title,
        left: 'center',
        top: '2px',
        textStyle: { fontSize: 16, fontWeight: 'bold' as const, color: titleColor }
      },
      tooltip: {
        trigger: 'item' as const,
        backgroundColor: tooltipBg,
        borderColor: tooltipBorder,
        borderWidth: 1,
        textStyle: { color: tooltipTextColor, fontSize: 12 },
        extraCssText: 'box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12); backdrop-filter: blur(8px);',
        formatter: (params: any) => `
          <div style="padding: 8px;">
            <div style="font-weight: bold; margin-bottom: 4px; color: ${titleColor};">违法类型分析</div>
            <div style="color: ${tooltipTextColor};">${params.name}: <span style="color: #ef4444; font-weight: bold;">${params.value} 起</span></div>
            <div style="color: ${tooltipTextColor};">占比: <span style="color: #f59e0b; font-weight: bold;">${params.percent}%</span></div>
          </div>
        `
      },
      series: [
        {
          name: '违法类型',
          type: 'pie',
          radius: ['45%', '85%'],
          center: ['50%', '52%'],
          data: pieData,
          itemStyle: {
            borderRadius: 6,
            borderColor: '#fff',
            borderWidth: 3
          },
          color: colors,
          label: {
            show: true,
            position: 'inside',
            formatter: function(params: any) {
              return `${params.name}\n${params.percent}%`;
            },
            fontSize: 12,
            color: '#fff',
            fontWeight: 'bold',
            textShadowColor: 'rgba(0, 0, 0, 0.8)',
            textShadowBlur: 3,
            textShadowOffsetX: 1,
            textShadowOffsetY: 1
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 15,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.3)',
              scale: true,
              scaleSize: 3
            },
            label: {
              show: true,
              fontSize: 14,
              fontWeight: 'bold'
            }
          },
          animationType: 'scale',
          animationEasing: 'elasticOut',
          animationDuration: 1000
        }
      ]
    };
  };

  return (
    <div ref={ref} className="w-full">
      {/* 控制面板 */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 ${
              isPlaying
                ? 'bg-red-500 text-white hover:bg-red-600 shadow-lg'
                : 'bg-blue-500 text-white hover:bg-blue-600 shadow-lg'
            }`}
          >
            <span className="text-sm">{isPlaying ? '⏸️' : '▶️'}</span>
            {isPlaying ? '暂停' : '播放'}
          </button>
          <div className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full">
            <span className="text-sm text-slate-600 dark:text-slate-400">当前时间:</span>
            <span className="text-lg font-bold text-slate-900 dark:text-white ml-2">
              {currentHour.toString().padStart(2, '0')}:00
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-amber-500 rounded"></div>
            <span className="text-slate-600 dark:text-slate-400">高峰期</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-slate-400 rounded"></div>
            <span className="text-slate-600 dark:text-slate-400">平峰期</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded"></div>
            <span className="text-slate-600 dark:text-slate-400">当前时段</span>
          </div>
        </div>
      </div>

      {/* 时间滑块 */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="range"
            min="0"
            max="23"
            value={currentHour}
            onChange={(e) => {
              setCurrentHour(parseInt(e.target.value));
              setIsPlaying(false);
            }}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, 
                #64748b 0%, #64748b 33%, 
                #f59e0b 33%, #f59e0b 40%, 
                #64748b 40%, #64748b 73%, 
                #f59e0b 73%, #f59e0b 79%, 
                #64748b 79%, #64748b 100%)`
            }}
          />
        </div>
        <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mt-2">
          <span>0:00</span>
          <span>6:00</span>
          <span>12:00</span>
          <span>18:00</span>
          <span>24:00</span>
        </div>
      </div>

      {/* 图表区域 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 24小时分布柱状图 */}
        <div className="glass-card p-6">
          <ReactECharts
            option={getHourlyChartOption()}
            style={{ height: '320px' }}
          />
        </div>

        {/* 违法类型饼图 */}
        <div className="glass-card p-6">
          <ReactECharts
            option={getViolationTypeOption()}
            style={{ height: '320px' }}
          />
        </div>
      </div>

      {/* 高峰期说明 */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card p-6 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/30 border-l-4 border-orange-500">
          <div className="flex items-center mb-3">
            <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900/50 rounded-full flex items-center justify-center mr-3">
              <svg className="w-4 h-4 text-orange-600 dark:text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
            </div>
            <h4 className="font-semibold text-orange-800 dark:text-orange-300">早高峰 (8:00-9:30)</h4>
          </div>
          <p className="text-sm text-orange-700 dark:text-orange-300">
            通勤压力大，违法行为集中爆发。主要违法类型：闯红灯、逆行、不按道行驶。
          </p>
        </div>
        <div className="glass-card p-6 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/30 dark:to-red-800/30 border-l-4 border-red-500">
          <div className="flex items-center mb-3">
            <div className="w-8 h-8 bg-red-100 dark:bg-red-900/50 rounded-full flex items-center justify-center mr-3">
              <svg className="w-4 h-4 text-red-600 dark:text-red-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <h4 className="font-semibold text-red-800 dark:text-red-300">晚高峰 (17:30-19:00)</h4>
          </div>
          <p className="text-sm text-red-700 dark:text-red-300">
            下班高峰期，外卖配送活跃，违法行为达到全天最高峰，执法重点时段。
          </p>
        </div>
      </div>
    </div>
  );
}