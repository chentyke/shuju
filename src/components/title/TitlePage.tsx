"use client";

export function TitlePage() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 overflow-hidden">
      {/* 背景动画元素 */}
      <div className="absolute inset-0">
        {/* 动态网格背景 */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
        
        {/* 浮动光点 */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-purple-500/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '4s' }} />
      </div>

      {/* 主要内容 */}
      <div className="relative z-10 text-center px-8 max-w-6xl mx-auto">
        {/* 顶部标识 */}
        <div className="mb-8">
          <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-blue-300 text-sm font-medium border border-white/20">
            <span className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse"></span>
            数据新闻大赛作品
          </div>
        </div>

        {/* 主标题 */}
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
          <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
            疾驰广州
          </span>
        </h1>

        {/* 副标题 */}
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium text-blue-200 mb-4 leading-relaxed">
            电动自行车跃居出行&ldquo;头牌&rdquo;
          </h2>
          <h3 className="text-xl md:text-2xl lg:text-3xl font-light text-slate-300 leading-relaxed">
            背后的困局
          </h3>
        </div>

        {/* 描述文字 */}
        <p className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-4xl mx-auto mb-12">
          探索广州电动自行车飞速发展背后的数据故事，从交通违法、骑手压力到管理挑战，
          一份基于真实数据的深度调查报告
        </p>

        {/* 底部提示 */}
        <div className="flex flex-col items-center space-y-4">
          <div className="text-slate-500 text-sm">
            向下滚动开始阅读
          </div>
          <div className="animate-bounce">
            <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
