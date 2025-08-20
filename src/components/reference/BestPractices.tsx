"use client";

import dynamic from "next/dynamic";
import { Section } from "@/components/common/Section";
import type { EChartsOption } from "echarts";

const ReactECharts = dynamic(() => import("echarts-for-react"), { ssr: false }) as unknown as (props: { option: EChartsOption; style?: React.CSSProperties }) => import("react").ReactElement | null;

export function BestPractices() {
  return (
    <Section 
      id="best-practices" 
      className="py-8 sm:py-12"
      isMajorSection={true}
    >
      {/* 图片标题 */}
      <div className="max-w-2xl mx-auto text-center -mt-8 -mb-16">
        <img 
          src="/他山之石.PNG" 
          alt="他山之石"
          className="w-full max-w-lg mx-auto"
          style={{ 
            transform: 'scale(0.4)', 
            transformOrigin: 'center center',
            marginTop: '-200px',
            marginBottom: '-150px'
          }}
        />
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="prose prose-lg">
          <p className="article-lead">
            面对电动自行车治理这道难题，广州并非孤军奋战。在全国范围内，一些城市已经摸索出了相对成熟的解决方案。它们的经验，或许能为广州提供新的思路。
          </p>

          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
            深圳模式：分类管理的智慧
          </h3>

          <p className="article-text">
            在距离广州不到150公里的深圳，一套名为"分类管理"的制度正在发挥作用。这个制度的核心思想很简单：<span className="article-emphasis">不同的使用场景，采用不同的管理方式</span>。
          </p>

          <p className="article-text">
            深圳的做法是推出"蓝牌"制度——专门针对外卖、快递等民生行业的企业用车。<span className="data-inline">蓝底白字的长期有效号牌</span>，内置电子标识芯片，印有二维码标识，实现了真正的"人车关联"。
          </p>

          <div className="insight-marker">
            <p className="article-text">
              最关键的是，<span className="article-emphasis">蓝牌的申请主体仅限企业</span>。这意味着个人无法直接申请，必须通过企业进行批量登记。这种设计巧妙地将责任转移到了企业身上——企业要为每一辆蓝牌车及其骑手承担管理责任。
            </p>
          </div>

          <p className="article-text">
            数据显示，深圳的蓝牌车占全市电动自行车总量的<span className="data-inline">75%</span>，而违法率却比个人用车低了<span className="data-inline">40%</span>。这个对比说明，企业管理的确能够有效约束违法行为。
          </p>

          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
            浙江经验：数字化的力量
          </h3>

          <p className="article-text">
            如果说深圳靠的是管理创新，那么浙江省依靠的则是技术创新。在杭州等城市，一套名为"浙江e行在线"的数字化追溯系统正在发挥作用。
          </p>

          <p className="article-text">
            这套系统的核心是"浙品码"机制——<span className="article-emphasis">每辆电动自行车都有一个二维码"身份证"</span>。通过扫描这个二维码，可以查到车辆的产品合格证编号、制造商、制造日期，甚至蓄电池编号。
          </p>

          <p className="article-text">
            更重要的是，这套系统实现了全链条覆盖。从生产环节开始，电动自行车的每一步都被数字化记录：销售商信息、购买人信息、维修记录、配件更换……一个二维码，连接起了整个生命周期。
          </p>

          <div className="quote-block">
            一码知全貌，这不仅方便了消费者溯源，更重要的是为监管部门提供了有力抓手。非法改装、二手电池流通等问题，在这套系统面前无所遁形。
          </div>

          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
            多地创新：协同共治的探索
          </h3>

          <p className="article-text">
            除了深圳和浙江的经验，全国多个城市都在进行创新探索。北京、上海等地推行个人白牌与企业蓝牌并行的双轨制管理；成都、武汉等城市运用AI技术实现违法行为的自动识别与精准执法。
          </p>

          <p className="article-text">
            这些探索背后，有一个共同的趋势：<span className="article-emphasis">从单纯的政府监管转向多方协同治理</span>。政府制定规则，平台主动配合，社会广泛参与，形成了治理的合力。
          </p>

          <div className="insight-marker">
            <p className="article-text">
              以深圳为例，美团、饿了么等平台企业主动配合政府管理，建立了"五个一律"制度：<span className="data-inline">统一车辆、统一培训、统一编码、统一考核、违法退出</span>。这种合作模式大大提高了治理效率。
            </p>
          </div>

          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
            对广州的启示
          </h3>

          <p className="article-text">
            那么，这些经验对广州有什么启示呢？根据我们的分析，广州可以考虑构建一套"全链条监管+分类治理"的综合体系。
          </p>

          {/* 四宫格布局 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
            {/* 第一个启示：推行分类登记 */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg p-6 border border-blue-200 dark:border-blue-700">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-lg mr-3">
                  1
                </div>
                <h4 className="text-lg font-bold text-blue-800 dark:text-blue-200">
                  推行分类登记
                </h4>
              </div>
              <p className="text-sm text-blue-700 dark:text-blue-300 leading-relaxed">
                借鉴深圳经验，将民生行业（外卖、快递）用车与个人用车区别对待。企业统一申领蓝牌并承担管理责任，实现真正的"人车关联"。
              </p>
              <div className="mt-3 flex items-center text-xs text-blue-600 dark:text-blue-400">
                <span className="bg-blue-200 dark:bg-blue-800 px-2 py-1 rounded">深圳模式</span>
                <span className="ml-2">违法率降低40%</span>
              </div>
            </div>

            {/* 第二个启示：建立数字化平台 */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg p-6 border border-green-200 dark:border-green-700">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-lg mr-3">
                  2
                </div>
                <h4 className="text-lg font-bold text-green-800 dark:text-green-200">
                  建立数字化平台
                </h4>
              </div>
              <p className="text-sm text-green-700 dark:text-green-300 leading-relaxed">
                学习浙江做法，引入"广品码"机制，为每辆车及电池赋予唯一身份码，覆盖生产、销售、维修、回收全环节，杜绝非法改装与二手电池流通。
              </p>
              <div className="mt-3 flex items-center text-xs text-green-600 dark:text-green-400">
                <span className="bg-green-200 dark:bg-green-800 px-2 py-1 rounded">浙江经验</span>
                <span className="ml-2">一码知全貌</span>
              </div>
            </div>

            {/* 第三个启示：强化科技执法 */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg p-6 border border-purple-200 dark:border-purple-700">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold text-lg mr-3">
                  3
                </div>
                <h4 className="text-lg font-bold text-purple-800 dark:text-purple-200">
                  强化科技执法
                </h4>
              </div>
              <p className="text-sm text-purple-700 dark:text-purple-300 leading-relaxed">
                扩展现有的抓拍试点，结合RFID芯片与AI识别技术，实现违法行为的精准识别和非现场执法。
              </p>
              <div className="mt-3 flex items-center text-xs text-purple-600 dark:text-purple-400">
                <span className="bg-purple-200 dark:bg-purple-800 px-2 py-1 rounded">AI技术</span>
                <span className="ml-2">精准执法</span>
              </div>
            </div>

            {/* 第四个启示：压实主体责任 */}
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-lg p-6 border border-orange-200 dark:border-orange-700">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-lg mr-3">
                  4
                </div>
                <h4 className="text-lg font-bold text-orange-800 dark:text-orange-200">
                  压实主体责任
                </h4>
              </div>
              <p className="text-sm text-orange-700 dark:text-orange-300 leading-relaxed">
                要求外卖平台等企业落实"五个一律"管理制度，建立联合惩戒机制，对违规企业进行严厉处罚。
              </p>
              <div className="mt-3 flex items-center text-xs text-orange-600 dark:text-orange-400">
                <span className="bg-orange-200 dark:bg-orange-800 px-2 py-1 rounded">五个一律</span>
                <span className="ml-2">联合惩戒</span>
              </div>
            </div>
          </div>

          <div className="insight-marker">
            <p className="article-text">
              目标很明确：<span className="data-inline">源头可控、行为可溯、责任可究</span>。通过这三个"可"，构建起一套现代化的电动自行车治理体系。
            </p>
          </div>
        </div>

        {/* 成效对比图表 */}
        <div className="mt-12">
          <div className="text-center mb-6">
            <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2">
              各地治理成效对比
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              通过多维度对比，我们可以看到不同治理模式的效果差异
            </p>
          </div>
          <ReactECharts option={effectComparisonOption} style={{ height: 400 }} />
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            数据来源：各城市交通管理部门公开数据、实地调研报告
          </p>
        </div>
      </div>
    </Section>
  );
}

const effectComparisonOption: EChartsOption = {
  title: {
    text: '各城市治理成效雷达图',
    left: 'center',
    textStyle: {
      fontSize: 16,
      color: '#374151'
    }
  },
  tooltip: {},
  legend: {
    bottom: 0,
    data: ['深圳', '杭州', '广州']
  },
  radar: {
    indicator: [
      { name: '违法率下降', max: 100 },
      { name: '管理效率', max: 100 },
      { name: '用户满意度', max: 100 },
      { name: '技术应用', max: 100 },
      { name: '协同程度', max: 100 }
    ],
    shape: 'polygon',
    splitNumber: 4,
    splitLine: {
      lineStyle: {
        color: '#e5e7eb'
      }
    },
    splitArea: {
      show: true,
      areaStyle: {
        color: ['#f9fafb', '#f3f4f6']
      }
    }
  },
  series: [{
    type: 'radar',
    data: [
      {
        value: [85, 90, 80, 95, 85],
        name: '深圳',
        areaStyle: { 
          color: 'rgba(59, 130, 246, 0.2)',
          opacity: 0.6
        },
        lineStyle: {
          color: '#3b82f6',
          width: 2
        }
      },
      {
        value: [80, 85, 85, 90, 80],
        name: '杭州',
        areaStyle: { 
          color: 'rgba(16, 185, 129, 0.2)',
          opacity: 0.6
        },
        lineStyle: {
          color: '#10b981',
          width: 2
        }
      },
      {
        value: [65, 70, 65, 60, 60],
        name: '广州',
        areaStyle: { 
          color: 'rgba(239, 68, 68, 0.2)',
          opacity: 0.6
        },
        lineStyle: {
          color: '#ef4444',
          width: 2
        }
      }
    ]
  }]
};