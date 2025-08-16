import { Hero } from "@/components/hero/Hero";
import { DailyTripsSection } from "@/components/trips/DailyTripsSection";

export default function Home() {
  return (
    <div className="font-sans">
      <Hero />
      <DailyTripsSection />
      
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
