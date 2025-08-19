"use client";

import { useEffect, useRef } from "react";
import { Section } from "@/components/common/Section";

export function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.style.opacity = "0";
      titleRef.current.style.transform = "translateY(30px)";
      
      // Trigger animation
      const timer = setTimeout(() => {
        if (titleRef.current) {
          titleRef.current.style.transition = "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)";
          titleRef.current.style.opacity = "1";
          titleRef.current.style.transform = "translateY(0)";
        }
      }, 200);

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <Section 
      id="hero" 
      className="bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800" 
      fullScreen
    >
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-8">
          <div className="text-sm text-emerald-600 dark:text-emerald-400 font-medium mb-4">
            数据新闻专题
          </div>
          
          <h1 
            ref={titleRef}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight text-slate-900 dark:text-white mb-6"
            role="heading"
            aria-level={1}
          >
            疾驰的两轮
          </h1>
          <h2 className="text-2xl sm:text-3xl font-light text-slate-600 dark:text-slate-300 mb-8">
            广州非机动车的崛起与治理挑战
          </h2>
        </div>

        <div className="prose prose-lg mx-auto">
          <p className="article-lead">
            每天早上8点，天河路口的景象足以让任何初来广州的人震撼：非机动车道被各式各样的电动自行车挤得满满当当，外卖小哥、上班族、学生……不同身份的人们骑着同样的交通工具，汇成一道独特的城市洪流。
          </p>

          <p className="article-text">
            铃声与车轮声此起彼伏，构成了广州早高峰独有的背景音。这看似混乱却又有序的画面背后，隐藏着一组令人瞠目的增长数字：<span className="data-inline">2021年32.5万辆，2024年576万辆</span>，四年间增长近18倍。
          </p>

          <div className="insight-marker">
            <p className="article-text">
              如今，广州电动自行车的日均出行量已达<span className="data-inline">903万人次</span>，首次超过地铁客流，成为仅次于步行的第二大出行方式。这一数字的背后，既有城市发展的必然，也有治理的挑战。
            </p>
          </div>

          <p className="article-text">
            然而，快速增长也带来了前所未有的管理难题。违法行为频发、交通事故上升、管理政策滞后……这座以改革开放先行者自居的城市，正面临着如何平衡民生需求与城市秩序的新课题。
          </p>
          <div className="content-block text-center mt-12">
            <p className="article-text">
              <span className="data-inline">2022年</span>是关键转折点——这一年保有量从32.5万辆激增至288万辆，增幅高达<span className="data-inline">786%</span>。此后两年持续增长，最终达到576万辆的规模。
            </p>
            
            <div className="text-sm text-slate-500 dark:text-slate-400 mt-6">
              数据来源：2021-2024广州市交通发展年度报告
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}


