"use client";

import dynamic from "next/dynamic";
import { Section } from "@/components/common/Section";
import type { EChartsOption } from "echarts";

const ReactECharts = dynamic(() => import("echarts-for-react"), { ssr: false }) as unknown as (props: { option: EChartsOption; style?: React.CSSProperties }) => import("react").ReactElement | null;

export function CausalAnalysis() {
  return (
    <Section id="causal-analysis" title="探因溯源" subtitle="当繁荣遇见瓶颈" isMajorSection={true}>
      <div className="max-w-4xl mx-auto">
        <div className="prose prose-lg">
          <p className="article-lead">
            576万辆电动自行车的背后，是一个城市在快速发展中遭遇的成长烦恼。为什么广州的电动自行车治理如此困难？问题的根源究竟在哪里？通过深入调研和数据分析，我们发现这不是单一问题，而是一个复杂的系统性困境。
          </p>

          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
            基础设施的"历史欠债"
          </h3>

          <p className="article-text">
            走在广州的街头，你很容易发现一个现象：非机动车道要么狭窄得只能容纳一辆车通行，要么干脆被机动车占用。这不是偶然，而是历史遗留的"欠债"。
          </p>

          <p className="article-text">
            根据建设部门的统计，广州现有的非机动车道中，仅有<span className="data-inline">16%</span>达到国家标准的2.5米宽度。这意味着<span className="article-emphasis">84%的非机动车道都存在"先天不足"</span>。当576万辆电动自行车涌入这些狭窄的车道时，拥堵和违法几乎成为常态。
          </p>

          <div className="insight-marker">
            <p className="article-text">
              更严重的是路网覆盖不足。截至2024年，广州的非机动车道覆盖率为<span className="data-inline">72.3%</span>，这意味着仍有近三成的主次干路没有专门的非机动车道。骑手们要么占用机动车道，要么挤在人行道上，两者都存在安全隐患。
            </p>
          </div>

          <p className="article-text">
            一位交通规划专家坦言："广州在设计道路时，更多考虑的是机动车通行，非机动车道往往是'边角料'。现在要补课，成本和难度都很大。"
          </p>

          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
            执法的"力不从心"
          </h3>

          <p className="article-text">
            面对每天发生的数万起电动自行车违法行为，广州交警显得有些"力不从心"。数据显示，全市日均查处电动自行车违法行为<span className="data-inline">1.2万起</span>，但这个数字相对于庞大的违法总量，查处率仅有<span className="data-inline">0.05%</span>。
          </p>

          <p className="article-text">
            问题不只是人手不够。现有的执法手段也相对落后：智能信号灯覆盖率仅为<span className="data-inline">45%</span>，专用的电动自行车抓拍摄像头覆盖率更是只有<span className="data-inline">30%</span>。这种"看得见管不着"的状况，让违法行为屡禁不止。
          </p>

          <div className="quote-block">
            "有时候一个路口就有几十辆电动车闯红灯，我们根本拦不过来。罚了这个，那个已经跑远了。"一位基层交警这样描述执法中的无奈。
          </div>

          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
            产销环节的"监管真空"
          </h3>

          <p className="article-text">
            如果说道路是症状，那么车辆本身就是病根。调研发现，市面上<span className="data-inline">65%</span>的电动自行车实际行驶速度超过国标规定的25公里/小时，部分车型甚至能达到50公里/小时以上。
          </p>

          <p className="article-text">
            这种"超标车"的泛滥并非偶然。在电商平台上，<span className="article-emphasis">"可解锁限速"、"一键提速"</span>成为热销卖点。2023年，关于电动自行车的投诉量比上年增长了<span className="data-inline">120%</span>，其中<span className="data-inline">58%</span>涉及虚假宣传。
          </p>

          <div className="insight-marker">
            <p className="article-text">
              更令人担忧的是销售环节的乱象。据不完全统计，2024年广州市场上销售的"违规解码车"超过<span className="data-inline">10万辆</span>。这些车辆出厂时符合标准，但经过简单改装就能突破限速，成为道路上的"隐形炸弹"。
            </p>
          </div>

          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
            算法压迫下的"被迫违法"
          </h3>

          <p className="article-text">
            在所有违法原因中，最让人心酸的或许是外卖骑手的"被迫违法"。平台算法的无情计算，让时间成为骑手最大的敌人。
          </p>

          <p className="article-text">
            一名美团骑手告诉记者，高峰时段的配送时限通常被压缩到<span className="data-inline">30分钟以内</span>，而一旦超时就面临罚款。在这种压力下，<span className="data-inline">80%</span>的骑手承认自己"被迫冒险"——闯红灯、逆行、占用机动车道。
          </p>

          <p className="article-text">
            数据更加直观地反映了这种矛盾：<span className="article-emphasis">恶劣天气下，电动自行车违法率会增加40%</span>，但平台的配送时间却不会因此调整。雨天路滑、能见度低，骑手们却要在更短的时间内完成配送，违法几乎成为"生存必需"。
          </p>

          <div className="quote-block">
            我们的调研显示，66%的违法行为发生在配送高峰期，这说明大部分违法并非恶意，而是在系统性压力下的无奈选择。
          </div>

          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
            政策体系的"碎片化"
          </h3>

          <p className="article-text">
            治理困境的另一个重要原因是政策体系的不完善。长期以来，电动自行车管理存在"三不管"现象：国家法律缺乏具体实施细则，地方法规相互冲突，行业标准执行不力。
          </p>

          <p className="article-text">
            以号牌管理为例，<span className="article-emphasis">共享电单车、外卖专用车长期缺乏登记渠道</span>，处于法律灰色地带。直到《广州市电动自行车管理规定》2024年底才正式实施，but这已经是"亡羊补牢"了。
          </p>

          <div className="insight-marker">
            <p className="article-text">
              更严重的是执法标准不统一。在天河、越秀等中心城区严查无牌车辆，但在黄埔、番禺等外围区域，共享电单车无牌运营却相对普遍。这种"一区一策"的执法方式，不仅影响公平性，也降低了整体治理效果。
            </p>
          </div>

          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
            系统性困境需要系统性解决
          </h3>

          <p className="article-text">
            通过深入分析，我们发现广州电动自行车治理困境的根源是多方面的：<span className="article-emphasis">基础设施历史欠债、执法资源相对不足、产销监管存在漏洞、平台算法缺乏约束、政策体系亟待完善</span>。
          </p>

          <p className="article-text">
            这些问题相互交织、互为因果，形成了一个复杂的治理难题。单独解决任何一个问题都难以取得根本性效果，需要的是系统性的综合治理方案。
          </p>

          <div className="insight-marker">
            <p className="article-text">
              正如一位政策专家所说："电动自行车治理不是单纯的交通管理问题，它涉及城市规划、产业政策、社会治理等多个层面。只有多部门协同、多措并举，才能真正破解这道难题。"
            </p>
          </div>
        </div>

        {/* 关键数据可视化 */}
        <div className="mt-12 space-y-8">
          <div className="text-center">
            <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">
              基础设施建设与需求增长对比
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
              车辆增长速度远超基础设施建设步伐
            </p>
            <ReactECharts option={infrastructureGapOption} style={{ height: 350 }} />
          </div>

          <div className="text-center">
            <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">
              执法效能分析
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
              违法总量与查处能力的巨大落差
            </p>
            <ReactECharts option={enforcementGapOption} style={{ height: 300 }} />
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            数据来源：广州市交警支队、城乡建设委员会、市场监管局等部门统计数据
          </p>
        </div>
      </div>
    </Section>
  );
}

// 基础设施建设与需求增长对比
const infrastructureGapOption: EChartsOption = {
  title: {
    text: '基础设施建设 vs 车辆增长',
    left: 'center',
    textStyle: {
      fontSize: 16,
      color: '#374151'
    }
  },
  tooltip: { 
    trigger: 'axis',
    axisPointer: {
      type: 'cross'
    }
  },
  legend: {
    bottom: 0,
    data: ['电动自行车保有量(万辆)', '非机动车道里程(km)']
  },
  xAxis: {
    type: 'category',
    data: ['2021', '2022', '2023', '2024']
  },
  yAxis: [
    {
      type: 'value',
      name: '保有量(万辆)',
      position: 'left',
      axisLine: {
        lineStyle: {
          color: '#ef4444'
        }
      },
      axisLabel: {
        formatter: '{value}'
      }
    },
    {
      type: 'value',
      name: '里程(km)',
      position: 'right',
      axisLine: {
        lineStyle: {
          color: '#3b82f6'
        }
      },
      axisLabel: {
        formatter: '{value}'
      }
    }
  ],
  series: [
    {
      name: '电动自行车保有量(万辆)',
      type: 'line',
      yAxisIndex: 0,
      data: [32.5, 288, 442, 576],
      lineStyle: {
        color: '#ef4444',
        width: 4
      },
      itemStyle: {
        color: '#ef4444'
      },
      symbol: 'circle',
      symbolSize: 8,
      label: {
        show: true,
        position: 'top',
        formatter: '{c}万辆'
      }
    },
    {
      name: '非机动车道里程(km)',
      type: 'bar',
      yAxisIndex: 1,
      data: [1023, 1245, 1356, 1428],
      itemStyle: {
        color: '#3b82f6',
        opacity: 0.7
      }
    }
  ]
};

// 执法效能分析
const enforcementGapOption: EChartsOption = {
  title: {
    text: '日均违法量 vs 查处量',
    left: 'center',
    textStyle: {
      fontSize: 16,
      color: '#374151'
    }
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a}: {c} ({d}%)'
  },
  series: [
    {
      name: '违法处理情况',
      type: 'pie',
      radius: ['40%', '70%'],
      center: ['50%', '60%'],
      data: [
        { 
          value: 1.2, 
          name: '查处量(万起)', 
          itemStyle: { color: '#10b981' },
          label: {
            formatter: '{b}\n{c}万起\n({d}%)',
            fontSize: 12
          }
        },
        { 
          value: 22.8, 
          name: '未查处(万起)', 
          itemStyle: { color: '#ef4444' },
          label: {
            formatter: '{b}\n{c}万起\n({d}%)',
            fontSize: 12
          }
        }
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
};