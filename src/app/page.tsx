import { Hero } from "@/components/hero/Hero";

export default function Home() {
  return (
    <div className="font-sans">
      <Hero />
      
      {/* 测试页面内容 */}
      <section id="page-2" className="min-h-screen bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
        <div className="text-center space-y-6 p-8">
          <h2 className="text-4xl font-bold text-slate-800 dark:text-slate-200">
            第二页测试内容
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
            这是一个测试页面，用于验证全局进度条的功能。当你滚动页面时，顶部的进度条会显示当前的滚动进度。
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <div className="bg-white dark:bg-slate-700 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-200">进度条功能</h3>
              <ul className="text-left space-y-2 text-slate-600 dark:text-slate-400">
                <li>• 实时显示滚动进度</li>
                <li>• 点击进度条跳转到对应位置</li>
                <li>• 自行车图标随进度移动</li>
                <li>• 悬停显示百分比</li>
              </ul>
            </div>
            <div className="bg-white dark:bg-slate-700 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-200">交互特性</h3>
              <ul className="text-left space-y-2 text-slate-600 dark:text-slate-400">
                <li>• 滚动100px后显示</li>
                <li>• 悬停时进度条变粗</li>
                <li>• 平滑滚动到目标位置</li>
                <li>• 章节标记线显示</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      <section id="page-3" className="min-h-screen bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center">
        <div className="text-center space-y-6 p-8">
          <h2 className="text-4xl font-bold text-emerald-800 dark:text-emerald-200">
            第三页测试内容
          </h2>
          <p className="text-lg text-emerald-700 dark:text-emerald-300 max-w-2xl">
            继续滚动测试进度条的准确性和流畅性。进度条会根据整个页面的滚动位置实时更新。
          </p>
        </div>
      </section>
      
      <section id="page-4" className="min-h-screen bg-teal-50 dark:bg-teal-900/20 flex items-center justify-center">
        <div className="text-center space-y-6 p-8">
          <h2 className="text-4xl font-bold text-teal-800 dark:text-teal-200">
            第四页测试内容
          </h2>
          <p className="text-lg text-teal-700 dark:text-teal-300 max-w-2xl">
            这是最后一个测试页面。当滚动到页面底部时，进度条应该显示100%。
          </p>
        </div>
      </section>
    </div>
  );
}
