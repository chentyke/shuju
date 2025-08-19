"use client";

export function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* 项目团队信息 */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">项目团队</h3>
            
            {/* 指导老师 */}
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-700 dark:text-gray-300">指导老师</h4>
              <p className="text-gray-600 dark:text-gray-400">王怡霖</p>
            </div>

            {/* 作者 */}
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-700 dark:text-gray-300">作者</h4>
              <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 dark:text-gray-400">
                <div>陈正洋</div>
                <div>刘怡婷</div>
                <div>唐婧韬</div>
                <div>陆静祎</div>
              </div>
            </div>
          </div>

          {/* 学校信息 */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">学校信息</h3>
            <div className="space-y-2">
              <p className="text-gray-600 dark:text-gray-400">
                北京师范大学-香港浸会大学联合国际学院
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500">
                Beijing Normal University-Hong Kong Baptist University United International College
              </p>
            </div>
          </div>
        </div>

        {/* 分割线 */}
        <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              © 2025 广州电动自行车治理困境分析
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              数据新闻大赛作品
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}