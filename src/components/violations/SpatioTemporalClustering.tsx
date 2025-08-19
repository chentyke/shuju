"use client";

import { Section } from "@/components/common/Section";
import { ViolationTimeDistribution } from "@/components/charts/ViolationTimeDistribution";
import { RestrictedRoadsMap } from "@/components/maps/RestrictedRoadsMap";

export function SpatioTemporalClustering() {
  return (
    <Section
      id="spatio-temporal-clustering"
    >
      {/* 标签和描述 */}
      <div className="max-w-4xl mx-auto mb-12 text-center">
        <div className="inline-flex items-center px-6 py-3 rounded-full text-base font-semibold bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border border-blue-200 dark:border-blue-800 mb-6">
          <span className="w-3 h-3 bg-blue-500 rounded-full mr-3 animate-pulse" />
          违法行为集中分布 时空特征突出
        </div>
        <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
          广州电动自行车违法行为在时间和空间分布上高度集中。
        </p>
      </div>
      
      <div className="max-w-4xl mx-auto">
        <div className="prose prose-lg">
          <p className="article-lead">
            如果说城市是一台巨大的机器，那么电动自行车的违法行为就像是这台机器运转时产生的"噪音"——它们并非毫无规律，而是准确地映射出城市生活的节奏。
          </p>

          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
            时间分布：工作日早晚高峰集中爆发
          </h3>

          <p className="article-text">
            从时间分布看，工作日早高峰（<span className="data-inline">8:00–9:30</span>）和晚高峰（<span className="data-inline">17:30–19:00</span>）是违法行为的集中爆发期。交警在这两个时段设立定点执法岗，重点查处闯红灯、逆行、不按道行驶等高风险违法行为。
          </p>

          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
            空间分布：与交通限行政策高度重合
          </h3>

          <p className="article-text">
            空间分布则与交通限行政策高度重合。根据官方与媒体报道，广州部分核心路段在高峰期或全天限行电动自行车，违者多集中在这些区域：
          </p>

          <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border-l-4 border-orange-400 p-6 my-6">
            <h4 className="font-semibold text-slate-900 dark:text-white mb-4">限行路段分布</h4>
            <div className="space-y-3 text-sm">
              <div>
                <span className="inline-block w-3 h-3 bg-orange-400 rounded-full mr-2"></span>
                <strong>早晚高峰限行路段</strong>（8:00–9:30，17:30–19:00）：天河东路、猎德大道（花城大道以北）
              </div>
              <div>
                <span className="inline-block w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                <strong>全天限行路段</strong>（8:00–19:00）：黄埔大道西（石牌东路以西）、东风东路、东风中路、东风西路（西场立交以东）
              </div>
            </div>
          </div>

        </div>

        {/* 限行地图可视化 */}
        <div className="mt-12 space-y-8">
          <div className="text-center">
            <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">
              广州电动自行车限行路段动态地图
            </h4>
            <div className="text-sm text-slate-600 dark:text-slate-400 mb-6 space-y-2">
              <p>• 底图：广州中心城区真实地图</p>
              <p>• 路段标注：全天限行（8:00–19:00）→ <span className="text-red-600">红色实线</span>；高峰期限行（8:00–9:30，17:30–19:00）→ <span className="text-orange-500">橙色虚线</span></p>
              <p>• 动态效果：时间轴从早到晚播放，高峰期限行路段在对应时段高亮或闪烁</p>
            </div>
            <RestrictedRoadsMap />
          </div>
          
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed text-center">
              违法行为的聚集性反映了骑行需求和执法力量的集中方向。这些限行路段多位于商务密集区、交通枢纽周边，早晚高峰通勤压力大、外卖快递骑手活跃，进一步加剧了违法风险。
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            数据来源：广州市人民政府
          </p>
        </div>
      </div>
    </Section>
  );
}