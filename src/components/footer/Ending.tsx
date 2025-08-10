"use client";

import { useState } from "react";
import { Section } from "@/components/common/Section";

export function Ending() {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [votes, setVotes] = useState({
    "完善非机动车道网络": 342,
    "平台-交警数据互通": 256,
    "限速与智能识别预警": 189,
    "加强骑手培训与保障": 298,
  });

  const options = [
    { id: "infrastructure", label: "完善非机动车道网络", icon: "🛣️" },
    { id: "data", label: "平台-交警数据互通", icon: "🔗" },
    { id: "tech", label: "限速与智能识别预警", icon: "⚡" },
    { id: "training", label: "加强骑手培训与保障", icon: "👷" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedOption) {
      setVotes(prev => ({
        ...prev,
        [selectedOption]: prev[selectedOption as keyof typeof prev] + 1
      }));
      setIsSubmitted(true);
    }
  };

  const totalVotes = Object.values(votes).reduce((sum, count) => sum + count, 0);

  return (
    <Section 
      id="ending" 
      title="参与讨论，共建未来" 
      subtitle="结语与互动"
      description="您的观点对改善广州非机动车治理具有重要意义，让我们一起探索最佳解决方案。"
      className="bg-gradient-to-b from-slate-50 to-emerald-50/30 dark:from-slate-900 dark:to-emerald-900/10"
    >
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Video section */}
        <div className="glass-card p-6">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
            对比视角
          </h3>
          <div className="aspect-video rounded-xl bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/20 dark:to-teal-900/20 flex items-center justify-center relative overflow-hidden group">
            <div className="text-center space-y-3 z-10">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-white text-2xl group-hover:scale-110 transition-transform">
                🎬
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                文明骑行 vs 违规快节奏
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-500">
                （可替换为视频组件）
              </p>
            </div>
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/5 to-teal-500/5 pointer-events-none" />
          </div>
        </div>

        {/* Voting section */}
        <div className="glass-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              投票：最有效的治理方案
            </h3>
            <div className="text-xs bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 px-2 py-1 rounded-full">
              {totalVotes} 票
            </div>
          </div>
          
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              {options.map((option) => {
                const percentage = totalVotes > 0 ? (votes[option.label as keyof typeof votes] / totalVotes * 100).toFixed(1) : "0.0";
                return (
                  <label 
                    key={option.id} 
                    className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all hover:shadow-sm ${
                      selectedOption === option.label 
                        ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20" 
                        : "border-slate-200 dark:border-slate-600 hover:border-slate-300 dark:hover:border-slate-500"
                    }`}
                  >
                    <input 
                      type="radio" 
                      name="vote" 
                      value={option.label}
                      checked={selectedOption === option.label}
                      onChange={(e) => setSelectedOption(e.target.value)}
                      className="accent-emerald-500" 
                    />
                    <span className="text-lg">{option.icon}</span>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-slate-900 dark:text-white">
                        {option.label}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        当前 {percentage}% ({votes[option.label as keyof typeof votes]} 票)
                      </div>
                    </div>
                  </label>
                );
              })}
              
              <div className="flex gap-3 pt-2">
                <button 
                  type="submit"
                  disabled={!selectedOption}
                  className="flex-1 px-4 py-2 rounded-lg bg-emerald-500 text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-emerald-600 transition-colors"
                >
                  提交投票
                </button>
                <button
                  type="button"
                  onClick={() => window.open('#', '_blank')}
                  className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-sm"
                >
                  📄 下载报告
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 mx-auto bg-emerald-500 rounded-full flex items-center justify-center text-white text-2xl mb-4">
                ✅
              </div>
              <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                感谢您的参与！
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                您选择了：<span className="font-medium text-emerald-600 dark:text-emerald-400">{selectedOption}</span>
              </p>
              <div className="space-y-2 text-xs">
                {options.map((option) => {
                  const percentage = (votes[option.label as keyof typeof votes] / totalVotes * 100);
                  return (
                    <div key={option.id} className="flex items-center justify-between">
                      <span className="text-slate-600 dark:text-slate-400">{option.icon} {option.label}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-emerald-500 transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className="w-12 text-right text-slate-500">{percentage.toFixed(1)}%</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Call to action */}
      <div className="mt-12 text-center">
        <div className="glass-card p-8 max-w-2xl mx-auto">
          <h4 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
            共同建设更美好的出行环境
          </h4>
          <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
            非机动车治理需要政府、企业、市民的共同努力。通过科学规划、技术创新和社会协同，
            我们可以在保障出行效率的同时，维护城市交通秩序与安全。
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button className="px-6 py-3 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600 transition-colors">
              分享报告
            </button>
            <button className="px-6 py-3 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
              关注后续研究
            </button>
          </div>
        </div>
      </div>
    </Section>
  );
}


