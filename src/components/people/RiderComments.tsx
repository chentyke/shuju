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

// 随机浮动评论展示系统
function BilibiliDanmakuContainer() {
  const [activeComments, setActiveComments] = useState<Array<{
    id: string;
    text: string;
    emotion: string;
    likes: number;
    x: number;
    y: number;
    scale: number;
    rotation: number;
  }>>([]);

  const [commentIndex, setCommentIndex] = useState(0);

  // 生成随机位置 - 确保完全在可显示范围内
  const getRandomPosition = () => {
    return {
      x: Math.random() * 62 + 8, // 8%-70% 确保固定宽度气泡不被截断
      y: Math.random() * 65 + 5, // 5%-70% 考虑气泡高度，确保完全可见
      scale: 0.85 + Math.random() * 0.3, // 0.85-1.15倍缩放，增加变化
      rotation: (Math.random() - 0.5) * 8 // -4度到4度旋转
    };
  };

  // 添加新评论气泡
  const addComment = useCallback(() => {
    const comment = socialMediaComments[commentIndex % socialMediaComments.length];
    const position = getRandomPosition();
    
    const newComment = {
      id: `comment-${Date.now()}-${Math.random()}`,
      text: comment.text,
      emotion: comment.emotion,
      likes: comment.likes,
      ...position
    };

    setActiveComments(prev => [...prev, newComment]);
    setCommentIndex(prev => prev + 1);

    // 8秒后移除这条评论
    setTimeout(() => {
      setActiveComments(prev => prev.filter(c => c.id !== newComment.id));
    }, 8000);
  }, [commentIndex]);

  // 定期添加评论 - 允许同时出现两条
  useEffect(() => {
    // 1秒后添加第一条
    const firstTimer = setTimeout(addComment, 1000);
    
    // 每3-5秒随机添加新评论，与8秒显示时间形成重叠
    const scheduleNext = () => {
      const delay = 3000 + Math.random() * 2000; // 3-5秒
      setTimeout(() => {
        addComment();
        scheduleNext();
      }, delay);
    };
    
    const initialDelay = setTimeout(scheduleNext, 4000);
    
    return () => {
      clearTimeout(firstTimer);
      clearTimeout(initialDelay);
    };
  }, [addComment]);

  return (
    <div className="relative w-full" style={{ height: '600px' }}>
      {/* 浮动评论容器 - 扩大显示区域 */}
      <div className="relative w-full h-full overflow-hidden">
        {activeComments.map((comment) => (
          <FloatingBubble 
            key={comment.id}
            comment={comment}
          />
        ))}
      </div>
    </div>
  );
}

// 优化的浮动气泡组件 - 独立动画
function FloatingBubble({ 
  comment 
}: { 
  comment: {
    id: string;
    text: string;
    emotion: string;
    likes: number;
    x: number;
    y: number;
    scale: number;
    rotation: number;
  };
}) {
  const color = emotionColors[comment.emotion as keyof typeof emotionColors] || "#6b7280";
  const [opacity, setOpacity] = useState(0);
  const [currentScale, setCurrentScale] = useState(0.8);
  const [isHovered, setIsHovered] = useState(false);
  const [floatOffset, setFloatOffset] = useState(0);

  // 浮动动画循环
  useEffect(() => {
    let animationFrame: number;
    const startTime = Date.now();
    
    const animate = () => {
      const elapsed = (Date.now() - startTime) / 1000;
      const newOffset = Math.sin(elapsed * 0.5) * 8 + Math.cos(elapsed * 0.3) * 4;
      setFloatOffset(newOffset);
      
      if (!isHovered) {
        animationFrame = requestAnimationFrame(animate);
      }
    };
    
    if (!isHovered) {
      animate();
    }
    
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isHovered]);

  // 进入和退出动画
  useEffect(() => {
    // 进入动画
    const enterTimer = setTimeout(() => {
      setOpacity(1);
      setCurrentScale(comment.scale);
    }, 200);

    // 退出动画
    const leaveTimer = setTimeout(() => {
      setOpacity(0);
      setCurrentScale(comment.scale * 0.8);
    }, 7000);

    return () => {
      clearTimeout(enterTimer);
      clearTimeout(leaveTimer);
    };
  }, [comment.scale]);

  const bubbleStyle: React.CSSProperties = {
    position: 'absolute',
    left: `${comment.x}%`,
    top: `${comment.y}%`,
    transform: `
      scale(${isHovered ? currentScale * 1.05 : currentScale}) 
      rotate(${comment.rotation}deg) 
      translateY(${floatOffset}px)
    `,
    transformOrigin: 'center',
    opacity,
    transition: 'opacity 0.6s ease-out, transform 0.3s ease-out',
    zIndex: isHovered ? 50 : 20
  };

  return (
    <div
      style={bubbleStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="w-72">
        {/* 简化的消息气泡 */}
        <div 
          className="relative bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-lg border border-white/50 dark:border-gray-600/50 hover:shadow-xl transition-shadow duration-300"
          style={{
            borderLeft: `4px solid ${color}`
          }}
        >
          {/* 情绪标签 */}
          <div className="flex items-center mb-2">
            <div 
              className="w-4 h-4 rounded-full mr-2 flex items-center justify-center text-xs font-bold text-white"
              style={{ backgroundColor: color }}
            >
              骑
            </div>
            <span 
              className="px-2 py-0.5 rounded text-xs font-medium"
              style={{ 
                backgroundColor: `${color}33`,
                color: color
              }}
            >
              {getEmotionLabel(comment.emotion)}
            </span>
          </div>
          
          {/* 消息内容 */}
          <p className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed mb-2">
            &ldquo;{comment.text}&rdquo;
          </p>
          
          {/* 底部信息 */}
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center">
              <span className="mr-1">❤️</span>
              <span>{comment.likes}</span>
            </div>
            <span className="opacity-60">刚刚</span>
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