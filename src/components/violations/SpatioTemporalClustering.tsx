"use client";

import { useInView } from "react-intersection-observer";
import { Section } from "@/components/common/Section";
import { ViolationTimeDistribution } from "@/components/charts/ViolationTimeDistribution";
import { RestrictedRoadsMap } from "@/components/maps/RestrictedRoadsMap";

export function SpatioTemporalClustering() {
  const { ref: titleRef, inView: titleInView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  return (
    <Section
      id="spatio-temporal-clustering"
      title="聚集特征明显"
      subtitle="违法行为呈现明显的时空聚集性"
      description="广州电动自行车违法行为在时间和空间分布上高度集中。从时间分布看，工作日早晚高峰是违法行为的集中爆发期；空间分布则与交通限行政策高度重合。"
      className="bg-gradient-to-b from-red-50/50 to-orange-50/50 dark:from-red-900/20 dark:to-orange-900/20"
    >
      <div className="grid gap-8">
        {/* 核心洞察 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-card p-6 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/30 border-l-4 border-orange-500">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/50 rounded-full flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-orange-600 dark:text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-orange-800 dark:text-orange-300">时间聚集性</h3>
            </div>
            <ul className="text-sm text-orange-700 dark:text-orange-300 space-y-2">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span><strong>早高峰 8:00-9:30</strong>：通勤压力大，违法行为集中爆发</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span><strong>晚高峰 17:30-19:00</strong>：下班+外卖配送双重叠加</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span>交警定点执法重点查处闯红灯、逆行等高风险行为</span>
              </li>
            </ul>
          </div>
          
          <div className="glass-card p-6 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/30 dark:to-red-800/30 border-l-4 border-red-500">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-red-100 dark:bg-red-900/50 rounded-full flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-red-600 dark:text-red-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-red-800 dark:text-red-300">空间聚集性</h3>
            </div>
            <ul className="text-sm text-red-700 dark:text-red-300 space-y-2">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span><strong>限行路段</strong>：违法行为与限行区域高度重合</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span><strong>商务密集区</strong>：天河CBD、珠江新城等核心区域</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span><strong>交通枢纽</strong>：地铁站、公交站周边违法频发</span>
              </li>
            </ul>
          </div>
        </div>

        {/* 时间分布分析 */}
        <div className="glass-card p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                24小时违法行为时间分布
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                高峰期违法次数是平峰期的3-4倍
              </p>
            </div>
            <div className="text-sm text-slate-500 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
              次数
            </div>
          </div>
          
          <ViolationTimeDistribution />
        </div>

        {/* 空间分布分析 */}
        <div className="glass-card p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                广州电动自行车限行路段动态地图
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                实时展示限行状态变化
              </p>
            </div>
            <div className="text-sm text-slate-500 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
              路段
            </div>
          </div>
          
          <RestrictedRoadsMap />
        </div>

        {/* 关键数据洞察 */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="glass-card p-6 text-center bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/30 dark:to-red-800/30 border-l-4 border-red-500">
            <div className="w-16 h-16 mx-auto mb-4 bg-red-100 dark:bg-red-900/50 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="text-4xl font-bold text-red-600 dark:text-red-400 mb-3">68%</div>
            <div className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              高峰期集中度
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              工作日违法行为发生在高峰期
            </div>
          </div>
          
          <div className="glass-card p-6 text-center bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/30 border-l-4 border-orange-500">
            <div className="w-16 h-16 mx-auto mb-4 bg-orange-100 dark:bg-orange-900/50 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-orange-600 dark:text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="text-4xl font-bold text-orange-600 dark:text-orange-400 mb-3">6条</div>
            <div className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              核心限行路段
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              违法行为高发区域
            </div>
          </div>
          
          <div className="glass-card p-6 text-center bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/30 dark:to-amber-800/30 border-l-4 border-amber-500">
            <div className="w-16 h-16 mx-auto mb-4 bg-amber-100 dark:bg-amber-900/50 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-amber-600 dark:text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="text-4xl font-bold text-amber-600 dark:text-amber-400 mb-3">3.9倍</div>
            <div className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              违法率差异
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              高峰期vs平峰期
            </div>
          </div>
        </div>

        {/* 政策建议 */}
        <div className="glass-card p-6 bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-800/50 dark:to-gray-800/50">
          <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center">
            <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center mr-3">
              <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            基于时空聚集性的治理建议
          </h4>
          
          <div className="grid md:grid-cols-2 gap-6 text-sm text-slate-600 dark:text-slate-400">
            <div>
              <h5 className="font-medium text-slate-800 dark:text-slate-200 mb-3">精准执法策略</h5>
              <div className="space-y-2">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>在早晚高峰期加强重点路段执法力量投入</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>设立固定执法岗位，形成常态化震慑</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>利用智能监控系统实现24小时覆盖</span>
                </div>
              </div>
            </div>
            
            <div>
              <h5 className="font-medium text-slate-800 dark:text-slate-200 mb-3">疏导配套措施</h5>
              <div className="space-y-2">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>在限行路段周边设置电动车临时停放点</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>优化公共交通接驳，减少违法通行需求</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>加强外卖配送企业管理和教育培训</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <p className="mt-8 text-sm text-slate-500 dark:text-slate-400 text-center">
        数据来源：广州市人民政府、广州市公安局交通警察支队
      </p>
    </Section>
  );
}