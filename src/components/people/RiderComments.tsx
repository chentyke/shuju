"use client";

import { useState, useEffect, useCallback, useRef } from "react";
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

// 超简单弹幕系统 - 无复杂状态管理
function BilibiliDanmakuContainer() {
  const [comments] = useState(() => 
    socialMediaComments.slice(0, 8).map((comment, index) => ({
      id: index,
      text: comment.text,
      emotion: comment.emotion,
      likes: comment.likes,
      track: index % 6,
      delay: index * 4 // 每4秒一条
    }))
  );

  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="relative w-full h-96 overflow-hidden">
      {comments.map((comment) => (
        <FixedBarrageItem 
          key={comment.id}
          comment={comment}
          expanded={expandedId === comment.id}
          onToggle={() => toggleExpand(comment.id)}
        />
      ))}
    </div>
  );
}

// 修复版弹幕组件 - 安全的CSS样式
function FixedBarrageItem({ 
  comment,
  expanded,
  onToggle 
}: { 
  comment: {
    id: number;
    text: string;
    emotion: string;
    likes: number;
    track: number;
    delay: number;
  };
  expanded: boolean;
  onToggle: () => void;
}) {
  const color = emotionColors[comment.emotion as keyof typeof emotionColors] || "#6b7280";
  
  // 安全的颜色处理
  const backgroundColor = `${color}33`; // 使用固定透明度
  const borderColor = color;

  const itemStyle: React.CSSProperties = {
    position: 'absolute',
    top: comment.track * 65 + 20,
    left: '100%',
    zIndex: expanded ? 50 : 10,
    transform: expanded ? 'translateX(-300px)' : undefined,
    transition: 'transform 0.3s ease'
  };

  const animationStyle: React.CSSProperties = expanded ? {} : {
    animation: `fixed-slide 20s linear infinite`,
    animationDelay: `${comment.delay}s`
  };

  const contentStyle: React.CSSProperties = {
    borderLeft: `4px solid ${borderColor}`
  };

  const tagStyle: React.CSSProperties = {
    backgroundColor,
    color: borderColor
  };

  return (
    <div
      style={{...itemStyle, ...animationStyle}}
      onClick={onToggle}
    >
      <div
        className={`
          ${expanded ? 'w-80 p-4 rounded-lg' : 'px-3 py-2 rounded-full cursor-pointer hover:scale-105'}
          bg-white dark:bg-gray-800 shadow-md transition-all duration-300
        `}
        style={contentStyle}
      >
        {expanded ? (
          // 展开状态
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span 
                className="px-2 py-1 rounded text-xs font-medium"
                style={tagStyle}
              >
                {getEmotionLabel(comment.emotion)}
              </span>
              <button 
                className="text-xs bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggle();
                }}
              >
                收起
              </button>
            </div>
            <p className="text-sm text-gray-800 dark:text-gray-200">
              "{comment.text}"
            </p>
            <div className="flex items-center space-x-2 text-xs text-gray-500">
              <span>❤️ {comment.likes}</span>
            </div>
          </div>
        ) : (
          // 收缩状态
          <div className="flex items-center space-x-2 whitespace-nowrap">
            <span 
              className="px-2 py-0.5 rounded text-xs font-medium"
              style={tagStyle}
            >
              {getEmotionLabel(comment.emotion)}
            </span>
            <span className="text-sm text-gray-800 dark:text-gray-200 max-w-48 truncate">
              "{comment.text}"
            </span>
            <span className="text-xs text-gray-500">❤️{comment.likes}</span>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fixed-slide {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(calc(-100vw - 400px));
          }
        }
      `}</style>
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