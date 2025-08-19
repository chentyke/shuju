"use client";

import { Section } from "@/components/common/Section";

export function Hero() {
  return (
    <Section 
      id="hero" 
      className="bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800"
      fullScreen={false}
      animated={false}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* 左侧文字内容 */}
        <div className="space-y-4">
          <p className="text-lg leading-relaxed text-slate-800 dark:text-slate-200">
            每天早上8点，天河路口的景象足以让任何初来广州的人震撼：非机动车道被各式各样的电动自行车挤得满满当当，外卖小哥、上班族、学生……不同身份的人们骑着同样的交通工具，汇成一道独特的城市洪流。
          </p>

          <p className="text-lg leading-relaxed text-slate-800 dark:text-slate-200">
            铃声与车轮声此起彼伏，构成了广州早高峰独有的背景音。
          </p>
        </div>

        {/* 右侧视频 */}
        <div className="lg:pl-8">
          <div className="relative max-w-lg mx-auto">
            {/* TV框容器 */}
            <div className="relative">
              {/* 视频 */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <video 
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{
                    transform: 'scale(0.6) translateX(-8%) translateY(12%)',
                    transformOrigin: 'center center'
                  }}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                >
                  <source src="/dffdb887f8decb27f8301830927019b2.mp4" type="video/mp4" />
                  您的浏览器不支持视频播放。
                </video>
              </div>
              
              {/* TV框覆盖层 - 调整大小以匹配视频 */}
              <div className="absolute inset-0 pointer-events-none">
                <img 
                  src="/TV.png" 
                  alt="TV Frame"
                  className="w-full h-full object-contain"
                  style={{ 
                    filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.5))',
                    transform: 'scale(1.35)',
                    transformOrigin: 'center center'
                  }}
                />
              </div>
            </div>
            
            {/* 视频标题 - 确保在缩放容器外部 */}
            <div className="mt-6 text-center">
              <p className="text-lg font-medium text-slate-700 dark:text-slate-300">
                广州电动自行车交通现状
              </p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}


