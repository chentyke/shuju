"use client";

import { Section } from "@/components/common/Section";
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

export function DeliverySpeedPressure() {
  return (
    <Section 
      id="delivery-speed-pressure" 
      description="广州有12万活跃骑手，在平台算法和时间压力的双重驱动下，他们每天都在与时间赛跑。然而，限速政策的实施让这场竞速变得更加激烈和危险。"
      className="bg-gradient-to-b from-blue-50/50 to-amber-50/50 dark:from-blue-900/20 dark:to-amber-900/20 py-8 sm:py-12"
      isMajorSection={true}
    >
      {/* 图片标题 */}
      <div className="max-w-2xl mx-auto text-center -mt-8 -mb-16">
        <img 
          src="/逐单竞速.png" 
          alt="逐单竞速"
          className="w-full max-w-lg mx-auto"
          style={{ 
            transform: 'scale(0.4)', 
            transformOrigin: 'center center',
            marginTop: '-200px',
            marginBottom: '-150px'
          }}
        />
      </div>

      <div className="space-y-8">
        {/* ① 骑手规模与任务量 */}
        <div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
            ① 骑手规模（图）
          </h3>
          <RiderScale />
        </div>

        {/* ② 平台要求 vs 限速现实 */}
        <div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
            ② 平台要求 vs 限速现实（图）
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
          <DeliveryTimeComparison />
        </div>

        {/* ③ 收入与罚款 */}
        <div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
            ③ 收入与罚款（文字+图）
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
          
          <IncomeComparison />
        </div>

        {/* ④ 违规与无奈 */}
        <div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
            ④ 违规与无奈（图）
          </h3>
          <div className="mb-6 p-6 bg-gradient-to-r from-amber-50 to-red-50 dark:from-amber-900/20 dark:to-red-900/20 rounded-lg">
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              在收入下降和罚款压力下，违规几乎成了"生存手段"：
            </p>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-white/60 dark:bg-slate-800/60 rounded-lg">
                <div className="flex items-center space-x-3 mb-2">
                  <span className="text-3xl">🚦</span>
                  <div>
                    <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                      {violationBehaviorData.redLightViolation.percentage}%
                    </div>
                    <div className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                      骑手承认闯红灯
                    </div>
                  </div>
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  （因{violationBehaviorData.redLightViolation.reason}）
                </div>
              </div>
              
              <div className="p-4 bg-white/60 dark:bg-slate-800/60 rounded-lg">
                <div className="flex items-center space-x-3 mb-2">
                  <span className="text-3xl">🚗</span>
                  <div>
                    <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                      {violationBehaviorData.wrongLane.percentage}%
                    </div>
                    <div className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                      骑手因车道被占
                    </div>
                  </div>
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  不得不驶入机动车道
                </div>
              </div>
            </div>
          </div>
          
          <ViolationBehavior />
        </div>

        {/* ⑤ 衍生现象 */}
        <div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
            ⑤ 衍生现象（文字）
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

        {/* 数据来源 */}
        <div className="glass-card p-6 bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-800/50 dark:to-gray-800/50">
          <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">数据说明</h4>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-slate-600 dark:text-slate-400">
            <div className="space-y-2">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  目前全市约有{riderScaleData.activeRiders}万名活跃骑手，平均每天需完成{riderScaleData.dailyOrders.normal}单配送任务，高峰时段甚至高达{riderScaleData.dailyOrders.peak}单
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  平台要求3公里内订单{deliveryTimeData.platformRequirement}分钟送达，而{deliveryTimeData.speedLimit}公里/小时的限速政策使得实际配送时间延长至{deliveryTimeData.realityTime.min}-{deliveryTimeData.realityTime.max}分钟
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  限速实施后，骑手月收入下降{incomeComparisonData.decreasePercentage.min}%-{incomeComparisonData.decreasePercentage.max}%，同时面临超时罚款{penaltyData.overtime.min}-{penaltyData.overtime.max}元/单的经济压力
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  调查显示，{violationBehaviorData.redLightViolation.percentage}%骑手承认闯红灯，{violationBehaviorData.wrongLane.percentage}%因车道被占驶入机动车道，电动车解码器销量激增反映出部分骑手通过技术手段解除限速
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <p className="mt-8 text-sm text-slate-500 dark:text-slate-400 text-center">
        数据来源：广州日报；南方都市报；羊城晚报；骑手调研数据
      </p>
    </Section>
  );
}