"use client";

import { useState, useEffect, useCallback } from "react";
import { socialMediaComments, emotionColors } from "@/data/riderViolations";

export function RiderComments() {
  return (
    <section 
      id="rider-pressure" 
      className="relative w-full bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 overflow-hidden"
      style={{ minHeight: '80vh' }}
    >
      {/* 3D空间背景 */}
      <div className="absolute inset-0">
        {/* 远景 */}
        <div className="absolute inset-0 opacity-20 dark:opacity-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-radial from-blue-200 to-transparent rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-radial from-purple-200 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
        
        {/* 中景 */}
        <div className="absolute inset-0 opacity-30 dark:opacity-15">
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-radial from-emerald-200 to-transparent rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        
        {/* 近景 */}
        <div className="absolute inset-0 opacity-40 dark:opacity-20">
          <div className="absolute top-3/4 left-1/3 w-32 h-32 bg-gradient-radial from-amber-200 to-transparent rounded-full blur-xl animate-pulse" style={{ animationDelay: '3s' }}></div>
        </div>
      </div>

      {/* 标题区域 */}
      <div className="relative z-10 text-center pt-24 pb-20 px-8">
        <div className="inline-flex items-center px-4 py-2 mb-6 rounded-full text-sm font-medium bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
          <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse" />
          实时社交媒体评论流
        </div>
        
        <h2 className="text-5xl font-bold bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 dark:from-white dark:via-slate-300 dark:to-white bg-clip-text text-transparent mb-8">
          现实声音：骑手生存状态调查
        </h2>
        
        <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-6xl mx-auto mb-4">
          为了更直观地呈现骑手群体的生存状态，我们爬取了社交媒体上与&ldquo;外卖骑手&rdquo;&ldquo;送餐压力&rdquo;等话题相关的评论。
          这些冰冷数字背后，是骑手们每天的现实感受。
        </p>
        
        <div className="flex items-center justify-center space-x-4 text-sm text-slate-500 dark:text-slate-400">
          <div className="flex items-center space-x-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span>实时评论动态</span>
          </div>
          <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
          <div className="flex items-center space-x-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span>基于真实数据</span>
          </div>
        </div>
      </div>

      {/* 弹幕展示区域 */}
      <div className="relative z-20 h-96 w-full overflow-hidden">
        <BilibiliDanmakuContainer />
      </div>

      {/* 底部描述 */}
      <div className="relative z-10 text-center pt-20 pb-24 px-8">
        <div className="max-w-5xl mx-auto">
          <p className="text-xl text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">
            这一系列现象既揭示了骑手群体的生存困境，也折射出现行管理政策与行业实际需求之间的深层矛盾。
          </p>
          
          <div className="flex items-center justify-center space-x-4 text-sm text-slate-500 dark:text-slate-400">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
              <span>数据来源：光明网</span>
            </div>
            <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full"></div>
              <span>人民政协网</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// B站式弹幕容器组件
function BilibiliDanmakuContainer() {
  const [danmakuData, setDanmakuData] = useState<Array<{
    id: string;
    comment: typeof socialMediaComments[0];
    animationDelay: number;
    duration: number;
    track: number;
    isExpanded: boolean;
    pausedAt?: number; // 暂停时的动画进度
  }>>([]);

  const CONTAINER_HEIGHT = 384; // 96 * 4 (h-96)
  const TRACK_HEIGHT = 55;
  const TRACK_COUNT = Math.floor(CONTAINER_HEIGHT / TRACK_HEIGHT);
  const MAX_DANMAKUS = 16; // 减少弹幕数量防止重叠

  // 创建弹幕数据，优化分布和防止重叠
  const generateDanmakuData = useCallback(() => {
    const danmakus: typeof danmakuData = [];
    
    // 随机选取评论子集
    const shuffled = [...socialMediaComments]
      .sort(() => 0.5 - Math.random())
      .slice(0, MAX_DANMAKUS); // 限制数量
    
    // 轨道使用情况跟踪，防止重叠
    const trackUsage = new Array(TRACK_COUNT).fill(0);
    
    shuffled.forEach((comment, index) => {
      // 找到使用最少的轨道
      const minUsage = Math.min(...trackUsage);
      const availableTracks = trackUsage
        .map((usage, trackIndex) => ({ usage, trackIndex }))
        .filter(t => t.usage === minUsage)
        .map(t => t.trackIndex);
      
      const selectedTrack = availableTracks[Math.floor(Math.random() * availableTracks.length)];
      trackUsage[selectedTrack]++;
      
      // 随机化延迟和持续时间，避免过于整齐
      const randomDelay = Math.random() * 8 + index * 3 + Math.random() * 2;
      const randomDuration = 15 + Math.random() * 10; // 15-25秒
      
      danmakus.push({
        id: `danmaku-${index}-${Date.now()}-${Math.random()}`,
        comment,
        animationDelay: randomDelay,
        duration: randomDuration,
        track: selectedTrack,
        isExpanded: false,
        pausedAt: undefined
      });
    });
    
    return danmakus;
  }, [TRACK_COUNT, MAX_DANMAKUS]);

  // 切换展开状态，保存/恢复动画进度
  const toggleExpanded = useCallback((danmakuId: string) => {
    setDanmakuData(prev => 
      prev.map(danmaku => {
        if (danmaku.id === danmakuId) {
          if (danmaku.isExpanded) {
            // 收起时：恢复动画，从暂停位置继续
            return { 
              ...danmaku, 
              isExpanded: false,
              pausedAt: undefined // 清除暂停状态，让动画继续
            };
          } else {
            // 展开时：暂停动画并记录当前进度
            const currentTime = Date.now();
            const elapsed = (currentTime - (danmaku.pausedAt || currentTime - danmaku.animationDelay * 1000)) / 1000;
            return { 
              ...danmaku, 
              isExpanded: true,
              pausedAt: elapsed // 记录当前动画进度
            };
          }
        }
        return danmaku;
      })
    );
  }, []);

  // 初始化弹幕
  useEffect(() => {
    setDanmakuData(generateDanmakuData());
    
    // 定期更新弹幕数据实现循环
    const resetTimer = setInterval(() => {
      setDanmakuData(generateDanmakuData());
    }, 150000); // 2.5分钟更新一次
    
    return () => clearInterval(resetTimer);
  }, [generateDanmakuData]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* 弹幕渲染 */}
      {danmakuData.map((danmaku) => (
        <BilibiliDanmaku
          key={danmaku.id}
          danmaku={danmaku}
          trackHeight={TRACK_HEIGHT}
          onToggleExpand={toggleExpanded}
        />
      ))}
    </div>
  );
}

// B站式单个弹幕组件 - 使用纯CSS动画，支持点击展开
function BilibiliDanmaku({ 
  danmaku, 
  trackHeight,
  onToggleExpand
}: {
  danmaku: {
    id: string;
    comment: typeof socialMediaComments[0];
    animationDelay: number;
    duration: number;
    track: number;
    isExpanded: boolean;
    pausedAt?: number;
  };
  trackHeight: number;
  onToggleExpand: (id: string) => void;
}) {
  const color = emotionColors[danmaku.comment.emotion as keyof typeof emotionColors] || "#6b7280";
  
  // 计算展开时的最佳位置，避免被截断
  const getExpandedPosition = () => {
    const CONTAINER_HEIGHT = 384;
    const EXPANDED_HEIGHT = 200; // 展开卡片预计高度
    const currentTop = danmaku.track * trackHeight + 8;
    
    // 如果展开后会超出容器底部，则向上调整
    if (currentTop + EXPANDED_HEIGHT > CONTAINER_HEIGHT) {
      return Math.max(8, CONTAINER_HEIGHT - EXPANDED_HEIGHT - 16);
    }
    
    return currentTop;
  };
  
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // 只有在收起状态下才允许点击展开
    if (!danmaku.isExpanded) {
      onToggleExpand(danmaku.id);
    }
  };
  
  return (
    <div
      className={`absolute select-none transition-all duration-300 ${
        danmaku.isExpanded ? 'whitespace-normal' : 'whitespace-nowrap cursor-pointer'
      }`}
      style={{
        top: danmaku.isExpanded ? `${getExpandedPosition()}px` : `${danmaku.track * trackHeight + 8}px`,
        left: '100%',
        animationName: danmaku.isExpanded ? 'none' : 'danmaku-move',
        animationDuration: `${danmaku.duration}s`,
        animationTimingFunction: 'linear',
        animationIterationCount: 'infinite',
        animationDelay: `${danmaku.animationDelay}s`,
        animationPlayState: danmaku.isExpanded ? 'paused' : 'running',
        zIndex: danmaku.isExpanded ? 1000 : 10,
        transform: danmaku.isExpanded ? 'translateX(-40vw)' : 'none',
        transition: danmaku.isExpanded 
          ? 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1), top 0.5s cubic-bezier(0.4, 0, 0.2, 1)' 
          : 'none',
      }}
      onMouseEnter={(e) => {
        if (!danmaku.isExpanded) {
          e.currentTarget.style.animationPlayState = 'paused';
          e.currentTarget.style.transform = 'scale(1.05)';
          e.currentTarget.style.zIndex = '100';
        }
      }}
      onMouseLeave={(e) => {
        if (!danmaku.isExpanded) {
          e.currentTarget.style.animationPlayState = 'running';
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.zIndex = '10';
        }
      }}
      onClick={handleClick}
    >
      <div
        className={`relative overflow-hidden transition-all duration-500 ease-out ${
          danmaku.isExpanded 
            ? 'bg-white/98 dark:bg-slate-800/98 backdrop-blur-lg shadow-2xl rounded-2xl border border-white/20 dark:border-slate-600/20' 
            : 'bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm shadow-md rounded-full border hover:shadow-lg'
        }`}
        style={{
          borderLeftColor: color,
          borderLeftWidth: danmaku.isExpanded ? '4px' : '3px',
          borderLeftStyle: 'solid',
          width: danmaku.isExpanded ? '500px' : 'auto',
          maxWidth: danmaku.isExpanded ? '500px' : '320px',
          minWidth: danmaku.isExpanded ? '400px' : 'auto',
          padding: danmaku.isExpanded ? '24px' : '6px 12px',
          boxShadow: danmaku.isExpanded 
            ? `0 25px 50px -12px ${color}15, 0 25px 25px -12px ${color}10, 0 0 0 1px ${color}05`
            : `0 4px 20px ${color}10, 0 2px 8px rgba(0,0,0,0.1)`
        }}
      >
        {danmaku.isExpanded ? (
          // 展开状态 - 美化布局
          <div className="space-y-4 animate-in fade-in duration-300">
            {/* 头部区域 */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 dark:border-slate-600/50">
              <div className="flex items-center space-x-3">
                <div 
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: color }}
                />
                <span 
                  className="px-3 py-1.5 rounded-full text-sm font-medium"
                  style={{ 
                    backgroundColor: `${color}15`,
                    color: color
                  }}
                >
                  {getEmotionLabel(danmaku.comment.emotion)}
                </span>
              </div>
              <button 
                className="group px-4 py-2 rounded-full text-sm font-medium bg-slate-200 hover:bg-slate-300 dark:bg-slate-600 dark:hover:bg-slate-500 text-slate-700 hover:text-slate-900 dark:text-slate-200 dark:hover:text-white transition-all duration-200 shadow-sm hover:shadow-md"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleExpand(danmaku.id);
                }}
              >
                <span className="flex items-center space-x-1">
                  <svg className="w-3 h-3 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span>收起</span>
                </span>
              </button>
            </div>
            
            {/* 主要内容 */}
            <div className="space-y-3">
              <blockquote className="text-base font-medium text-slate-900 dark:text-slate-100 leading-relaxed italic border-l-4 border-slate-200 dark:border-slate-600 pl-4">
                &ldquo;{danmaku.comment.text}&rdquo;
              </blockquote>
            </div>
            
            {/* 底部统计 */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-200/80 dark:border-slate-600/50">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-slate-500 dark:text-slate-400">
                  <span className="text-sm">❤️</span>
                  <span className="text-sm font-medium">{danmaku.comment.likes.toLocaleString()}</span>
                  <span className="text-xs">点赞</span>
                </div>
              </div>
              <div className="text-xs text-slate-400 opacity-60">
                使用上方按钮收起
              </div>
            </div>
          </div>
        ) : (
          // 收缩状态 - 简洁显示
          <div className="flex items-center space-x-2 text-sm py-1">
            <span 
              className="px-2 py-0.5 rounded-md text-xs font-medium flex-shrink-0"
              style={{ 
                backgroundColor: `${color}20`,
                color: color
              }}
            >
              {getEmotionLabel(danmaku.comment.emotion)}
            </span>
            
            <span className="text-slate-800 dark:text-slate-100 truncate font-medium flex-1">
              &ldquo;{danmaku.comment.text}&rdquo;
            </span>
            
            <div className="flex items-center space-x-1 text-slate-500 dark:text-slate-400 flex-shrink-0">
              <span className="text-xs">❤️</span>
              <span className="text-xs font-medium">{danmaku.comment.likes}</span>
            </div>
          </div>
        )}
        
        {/* 展开提示动画 */}
        {!danmaku.isExpanded && (
          <div className="absolute inset-0 pointer-events-none">
            <div 
              className="absolute inset-0 opacity-0 hover:opacity-10 transition-opacity duration-200 rounded-full"
              style={{ backgroundColor: color }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

// 情绪标签映射
function getEmotionLabel(emotion: string): string {
  const labels: { [key: string]: string } = {
    frustrated: "沮丧",
    helpless: "无助",
    conflicted: "矛盾",
    pressured: "压力",
    desperate: "绝望",
    angry: "愤怒",
    bitter: "痛苦",
    sarcastic: "讽刺",
    rational: "理性",
    disappointed: "失望",
    anxious: "焦虑",
    tired: "疲惫",
    intense: "紧张",
    serious: "严肃",
    sad: "悲伤"
  };
  return labels[emotion] || "其他";
}