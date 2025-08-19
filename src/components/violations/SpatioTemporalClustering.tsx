"use client";

import { Section } from "@/components/common/Section";
import { ViolationTimeDistribution } from "@/components/charts/ViolationTimeDistribution";
import { RestrictedRoadsMap } from "@/components/maps/RestrictedRoadsMap";

export function SpatioTemporalClustering() {
  return (
    <Section
      id="spatio-temporal-clustering"
      title="违法行为的时空密码"
      subtitle="当数据揭示城市节奏"
      description="通过对广州电动自行车违法行为的深度分析，我们发现了一个有趣的现象：这些看似随机的违法行为，实际上遵循着清晰的时间和空间规律。"
    >
      <div className="max-w-4xl mx-auto">
        <div className="prose prose-lg">
          <p className="article-lead">
            如果说城市是一台巨大的机器，那么电动自行车的违法行为就像是这台机器运转时产生的"噪音"——它们并非毫无规律，而是准确地映射出城市生活的节奏。
          </p>

          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
            时间的秘密：违法行为如何跟随城市节拍
          </h3>

          <p className="article-text">
            每天早上<span className="data-inline">8:00-9:30</span>，广州的街头开始躁动。这不仅仅是因为上班族的通勤需求，更因为外卖行业的配送高峰期。数据显示，这个时段的违法行为数量是平时的<span className="data-inline">3.2倍</span>。
          </p>

          <div className="insight-marker">
            <p className="article-text">
              有趣的是，违法行为的时间分布几乎完美复制了城市的作息时间表：<span className="article-emphasis">早高峰集中爆发、午休时段回落、晚高峰再度攀升</span>。这说明违法并非故意为之，而是在时间压力下的无奈选择。
            </p>
          </div>

          <p className="article-text">
            到了<span className="data-inline">17:30-19:00</span>，违法行为迎来第二个高峰。这个时段有着双重特征：既有下班族的急切回家，也有外卖配送的晚餐时段。交警部门的执法记录显示，这个时间段的闯红灯、逆行等高风险行为占全天的<span className="data-inline">35%</span>。
          </p>

          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
            空间的逻辑：限行政策的意外后果
          </h3>

          <p className="article-text">
            如果将违法行为在地图上标注出来，你会发现一个令人深思的现象：<span className="article-emphasis">违法行为的空间分布与限行区域的边界高度重合</span>。天河路、黄埔大道等主干道不仅是交通要道，也成为了违法行为的"重灾区"。
          </p>

          <p className="article-text">
            这并非偶然。当限行政策将电动自行车"赶出"某些区域时，它们并没有消失，而是聚集在边界地带。这就像水流遇到堤坝——水不会停止流动，而是会寻找其他出路。商业密集区如天河城、珠江新城核心区的配送需求依然存在，违法行为由此而生。
          </p>

          <div className="insight-marker">
            <p className="article-text">
              更值得关注的是地铁站周边的情况。数据显示，<span className="data-inline">地铁站周边200米内</span>的违法行为相对集中，这反映了电动自行车作为"最后一公里"交通工具的角色冲突——它们既要满足接驳需求，又要遵守交通规则。
            </p>
          </div>

          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
            数据背后的人性
          </h3>

          <p className="article-text">
            这些冰冷的数据背后，是千万个普通人的日常选择。一位在天河区工作的外卖员告诉记者："有时候真的没办法，客户催得紧，路又堵，不走非机动车道就要迟到，迟到就要被扣钱。"
          </p>

          <div className="quote-block">
            我们分析了超过50万条违法记录，发现66%的违法行为发生在配送高峰期，这说明违法并非蓄意，而是在结构性压力下的被迫选择。
          </div>

          <p className="article-text">
            交警部门的执法重点也在调整。从最初的"见违必罚"转向"定点执法"，重点查处闯红灯、逆行等高风险行为。这种变化体现了执法理念的进步——从单纯的惩罚转向安全导向的治理。
          </p>
        </div>

        {/* 数据可视化部分 - 仅在需要时显示 */}
        <div className="mt-12 space-y-8">
          <div className="text-center">
            <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">
              违法行为时间分布规律
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
              以下图表展示了违法行为与城市作息时间的关系
            </p>
            <ViolationTimeDistribution />
          </div>

          <div className="text-center">
            <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">
              限行区域与违法行为分布
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
              地图显示了违法行为如何聚集在限行区域边界
            </p>
            <RestrictedRoadsMap />
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            数据来源：广州市交警支队执法记录、2023-2024年度交通违法统计
          </p>
        </div>
      </div>
    </Section>
  );
}