"use client";

import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* 主要内容区域 */}
        <div className="relative grid md:grid-cols-3 gap-12 items-start">
          {/* 项目团队信息 */}
          <div className="md:col-span-2 space-y-4">
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">项目团队</h3>
            
            <div className="grid grid-cols-2 gap-8">
              {/* 指导老师 */}
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-800 dark:text-gray-200 text-base">指导老师</h4>
                <p className="text-gray-700 dark:text-gray-300 font-medium">王怡霖</p>
              </div>

              {/* 作者 */}
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-800 dark:text-gray-200 text-base">作者</h4>
                <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-gray-700 dark:text-gray-300">
                  <div className="font-medium">陈正洋</div>
                  <div className="font-medium">刘依婷</div>
                  <div className="font-medium">唐婧韬</div>
                  <div className="font-medium">陆静祎</div>
                </div>
              </div>
            </div>
          </div>

          {/* 中间分隔线 */}
          <div className="hidden md:block absolute left-2/3 top-1/2 transform -translate-x-1/2 -translate-y-1/2 h-20 w-px bg-gray-300 dark:bg-gray-600"></div>

          {/* 学校Logo */}
          <div className="flex items-center justify-center md:justify-end">
            <a href="https://uic.edu.cn" target="_blank" rel="noopener noreferrer">
              <Image
                src="/bnbu-logo.png"
                alt="Beijing Normal University-Hong Kong Baptist University United International College"
                width={300}
                height={120}
                className="object-contain hover:opacity-80 transition-opacity mt-4"
                priority
              />
            </a>
          </div>
        </div>

        {/* 保留空间但移除内容 */}
        <div className="mt-10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-600 dark:text-gray-400 font-medium">
              {/* 版权信息已移除 */}
            </div>
            <div className="flex items-center space-x-2">
              {/* 数据新闻大赛标识已移除 */}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}