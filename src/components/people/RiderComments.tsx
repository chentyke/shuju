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
          为了更直观地呈现骑手群体的生存状态，我们爬取了社交媒体上与"外卖骑手""送餐压力"等话题相关的评论。
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

      {/* 评论展示区域 */}
      <div className="relative z-20 h-96 w-full overflow-hidden">
        <FloatingComments />
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

// 简洁漂浮评论组件
function FloatingComments() {
  const [bubbles, setBubbles] = useState<Array<{
    id: string;
    comment: typeof socialMediaComments[0];
    x: number;
    y: number;
    scale: number;
    opacity: number;
    createdAt: number;
  }>>([]);

  const MAX_BUBBLES = 8; // 同时存在的最大气泡数
  const SPAWN_INTERVAL = 2500; // 生成间隔（2.5秒）

  // 创建新气泡
  const createNewBubble = useCallback(() => {
    const comment = socialMediaComments[Math.floor(Math.random() * socialMediaComments.length)];
    
    return {
      id: `bubble-${Date.now()}-${Math.random()}`,
      comment,
      x: Math.random() * 85 + 7.5, // 7.5-92.5% 横向随机位置，避免边缘
      y: Math.random() * 75 + 12.5, // 12.5-87.5% 纵向随机位置
      scale: 0.3, // 从很小开始
      opacity: 0, // 从透明开始
      createdAt: Date.now()
    };
  }, []);

  // 生成气泡系统
  useEffect(() => {
    // 初始生成几个气泡
    const initialBubbles = Array.from({ length: 3 }, () => createNewBubble());
    setBubbles(initialBubbles);

    // 定期生成新气泡
    const spawnTimer = setInterval(() => {
      setBubbles(prev => {
        if (prev.length < MAX_BUBBLES) {
          return [...prev, createNewBubble()];
        }
        return prev;
      });
    }, SPAWN_INTERVAL);

    return () => clearInterval(spawnTimer);
  }, [createNewBubble]);

  // 简洁动画更新系统
  useEffect(() => {
    const animationFrame = setInterval(() => {
      setBubbles(prev => {
        const now = Date.now();
        
        return prev
          .map(bubble => {
            const age = now - bubble.createdAt;
            const lifeProgress = age / 10000; // 10秒生命周期
            
            // 简单的大小变化（由小到大再变小）
            let newScale;
            if (lifeProgress < 0.1) {
              // 淡入阶段：从小变大
              newScale = 0.3 + (lifeProgress * 7); // 0.3 -> 1.0
            } else if (lifeProgress > 0.8) {
              // 淡出阶段：逐渐变小
              newScale = 1.0 - ((lifeProgress - 0.8) * 3.5); // 1.0 -> 0.3
            } else {
              // 稳定显示阶段
              newScale = 0.8 + (bubble.comment.likes / 500) * 0.3; // 基于点赞数调整大小
            }
            
            // 简单的透明度变化
            let newOpacity;
            if (lifeProgress < 0.1) {
              // 淡入阶段
              newOpacity = lifeProgress * 10;
            } else if (lifeProgress > 0.8) {
              // 淡出阶段
              newOpacity = (1 - lifeProgress) * 5;
            } else {
              // 稳定显示阶段
              newOpacity = 1;
            }
            
            return {
              ...bubble,
              scale: Math.max(0.3, Math.min(1.2, newScale)),
              opacity: Math.max(0, Math.min(1, newOpacity))
            };
          })
          .filter(bubble => {
            const age = now - bubble.createdAt;
            return age < 10000; // 10秒后移除
          });
      });
    }, 100); // 10fps 更新，减少计算量

    return () => clearInterval(animationFrame);
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full">
      {/* 评论流指示器 */}
      <div className="absolute top-4 right-4 z-30 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md px-4 py-2 rounded-full text-sm font-medium text-slate-700 dark:text-slate-300 border border-white/50 dark:border-slate-700/50 shadow-lg">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse"></div>
          <span>评论流</span>
          <span className="text-xs text-slate-500 dark:text-slate-400">·</span>
          <span className="text-xs text-slate-500 dark:text-slate-400">{bubbles.length}</span>
        </div>
      </div>
      
      {/* 简洁气泡渲染 */}
      {bubbles.map((bubble, index) => (
        <SimpleBubble
          key={bubble.id}
          comment={bubble.comment}
          x={bubble.x}
          y={bubble.y}
          scale={bubble.scale}
          opacity={bubble.opacity}
          index={index}
        />
      ))}
      

    </div>
  );
}

// 简洁气泡组件
function SimpleBubble({ 
  comment, 
  x, 
  y, 
  scale, 
  opacity,
  index 
}: {
  comment: typeof socialMediaComments[0];
  x: number;
  y: number;
  scale: number;
  opacity: number;
  index: number;
}) {
  const color = emotionColors[comment.emotion as keyof typeof emotionColors] || "#6b7280";
  
  return (
    <div
      className="absolute transition-all duration-500 ease-out"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: `translate(-50%, -50%) scale(${scale})`,
        opacity: opacity,
        zIndex: Math.floor(opacity * 100) + 10,
        pointerEvents: opacity > 0.8 ? 'auto' : 'none'
      }}
    >
      <div
        className="relative p-4 rounded-xl bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm max-w-sm cursor-pointer group hover:scale-102 transition-all duration-200 border shadow-lg hover:shadow-xl"
        style={{
          borderColor: `${color}40`,
          boxShadow: `0 4px 20px ${color}15, 0 2px 8px rgba(0,0,0,0.1)`
        }}
      >
        {/* 左侧情绪指示条 */}
        <div 
          className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl"
          style={{ backgroundColor: color }}
        />
        
        {/* 评论内容 */}
        <div className="relative">
          <p className="text-sm font-medium leading-relaxed mb-3 text-slate-800 dark:text-slate-100">
            "{comment.text}"
          </p>
          
          {/* 底部信息栏 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-400">
              <span className="text-sm">❤️</span>
              <span className="font-medium text-sm">{comment.likes}</span>
            </div>
            
            <div 
              className="px-2 py-1 rounded-md text-xs font-medium"
              style={{ 
                backgroundColor: `${color}20`,
                color: color
              }}
            >
              {getEmotionLabel(comment.emotion)}
            </div>
          </div>
        </div>
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
