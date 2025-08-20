"use client";

export function TitlePage() {
  return (
    <section 
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        backgroundImage: 'url(/cover.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* 背景遮罩层 */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* 主要内容 */}
      <div className="relative z-10 text-left px-8 lg:px-16 max-w-4xl">


        {/* 主标题 */}
        <h1 
          className="text-7xl md:text-8xl lg:text-9xl font-black mb-6 leading-tight text-white"
          style={{
            textShadow: '4px 4px 8px rgba(0, 0, 0, 0.8), 2px 2px 4px rgba(0, 0, 0, 0.6)'
          }}
        >
          疾驰广州
        </h1>

        {/* 副标题 */}
        <div className="mb-12">
          <h2 
            className="text-2xl md:text-3xl lg:text-4xl font-semibold text-slate-200 leading-relaxed"
            style={{
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.6), 1px 1px 2px rgba(0, 0, 0, 0.4)'
            }}
          >
            电动自行车跃居出行&ldquo;头牌&rdquo;背后的困局
          </h2>
        </div>



        {/* 底部提示 */}
        <div className="flex flex-col items-start space-y-4">
          <div className="text-slate-400 text-sm">
            向下滚动开始阅读
          </div>
          <div className="animate-bounce">
            <svg className="w-6 h-6 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>

      {/* 底部渐变遮罩 */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-900 to-transparent"></div>
    </section>
  );
}
