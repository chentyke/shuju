// 外卖快递骑手违法占比数据
export const riderViolationRatioData = [
  {
    year: 2021,
    totalViolations: 112, // 万宗
    riderViolations: 13, // 万宗
    ratio: 13.0, // 占比百分比
    note: "外卖骑手近13万宗"
  },
  {
    year: 2022,
    totalViolations: 140, // 万宗（估算）
    riderViolations: 23.8, // 万宗（估算）
    ratio: 17.0,
    note: "占比升至17%"
  },
  {
    year: 2023,
    totalViolations: 162, // 万宗（估算）
    riderViolations: 29.2, // 万宗（估算）
    ratio: 18.0, // 估算
    note: "事故激增63%，大量与骑手违章相关"
  },
  {
    year: 2024,
    totalViolations: 300, // 万宗（上半年预估全年）
    riderViolations: 60, // 万宗（上半年预估全年）
    ratio: 20.0, // 预估
    note: "截至7月已超12万宗，全年预估"
  }
];

// 违法类型分布数据（2021年基准）
export const violationTypeData = [
  { type: "闯红灯", percentage: 40, color: "#ef4444" },
  { type: "不按车道行驶", percentage: 36, color: "#f97316" }, 
  { type: "逆行", percentage: 16, color: "#eab308" },
  { type: "其他", percentage: 8, color: "#64748b" }
];

// 骑手群体基础数据
export const riderBasicData = {
  totalActiveRiders: 12, // 万人
  totalEBikeUsers: 45, // 万人（估算）
  riderPercentage: 5, // 骑手占电动自行车用户比例
  dailyOrdersNormal: 35, // 平均每天订单数
  dailyOrdersPeak: 50, // 高峰时段订单数
  speedLimit: 15, // km/h
  timeLimit: 30, // 分钟，3公里内订单要求
  actualDeliveryTime: 22.5 // 分钟，实际配送时间（含等餐等红灯）
};

// 收入与罚款数据
export const incomeAndPenaltyData = {
  incomeBeforeLimit: {
    min: 8000,
    max: 12000
  },
  incomeAfterLimit: {
    min: 5000,
    max: 6000,
    decreasePercentage: 40 // 平均减少40%
  },
  penalties: {
    overtime: { min: 3, max: 10 }, // 元/单
    complaint: { min: 50, max: 200 }, // 元/单
    equivalentOrders: { min: 5, max: 10 } // 相当于多少单收入
  },
  violationStats: {
    redLightViolators: 40, // 40%承认曾闯红灯
    wrongLaneUsers: 60 // 60%因道路被占用而驶入机动车道
  }
};

// 社交媒体骑手评论数据
export const socialMediaComments = [
  { id: 1, text: "今天送了48单，超时3单，罚了我40块，白干两个小时。", emotion: "frustrated", likes: 156 },
  { id: 2, text: "跑得比红灯快，还是赶不上系统倒计时。", emotion: "helpless", likes: 89 },
  { id: 3, text: "不想闯红灯，但不闯就超时，罚钱还扣分。", emotion: "conflicted", likes: 234 },
  { id: 4, text: "限速15公里，顾客催得跟火烧屁股一样。", emotion: "pressured", likes: 67 },
  { id: 5, text: "一单赚5块，超时罚10块，这活还能干？", emotion: "desperate", likes: 312 },
  { id: 6, text: "等餐等10分钟，路上还要等红灯，怎么不超时？", emotion: "frustrated", likes: 145 },
  { id: 7, text: "系统根本不管路堵不堵，一超时就罚。", emotion: "angry", likes: 298 },
  { id: 8, text: "夏天送外卖就是汗水+罚款套餐。", emotion: "bitter", likes: 178 },
  { id: 9, text: "电动车解码器比雨衣还重要。", emotion: "sarcastic", likes: 134 },
  { id: 10, text: "送餐路线不是我选的，是系统派的，还怪我慢。", emotion: "helpless", likes: 87 },
  { id: 11, text: "限速是好事，但不配套就是坏事。", emotion: "rational", likes: 203 },
  { id: 12, text: "被违停车堵在非机动车道上，时间一秒秒扣。", emotion: "frustrated", likes: 267 },
  { id: 13, text: "平台只看准时率，从不问路上发生了什么。", emotion: "disappointed", likes: 189 },
  { id: 14, text: "别说30分钟，给我40分钟都怕迟到。", emotion: "anxious", likes: 112 },
  { id: 15, text: "今天差评罚了我100块，就因为汤洒了点。", emotion: "frustrated", likes: 156 },
  { id: 16, text: "送外卖比打游戏难多了，地图全凭记忆跑。", emotion: "tired", likes: 95 },
  { id: 17, text: "单子越来越远，钱越来越少。", emotion: "disappointed", likes: 221 },
  { id: 18, text: "跑得快是为了活着，慢了就没饭吃。", emotion: "desperate", likes: 278 },
  { id: 19, text: "高峰期就是生死时速。", emotion: "intense", likes: 167 },
  { id: 20, text: "这个工作不是体力活，是赌命活。", emotion: "serious", likes: 334 },
  { id: 21, text: "暴雨天照样30分钟，不是逼人违规吗？", emotion: "angry", likes: 245 },
  { id: 22, text: "顾客一句'快点'，平台一句'扣分'，骑手就夹在中间。", emotion: "helpless", likes: 298 },
  { id: 23, text: "有时候路口红灯等两分多钟，系统完全不管。", emotion: "frustrated", likes: 143 },
  { id: 24, text: "路上摔了车，超时照样罚。", emotion: "bitter", likes: 187 },
  { id: 25, text: "单少的时候等单，单多的时候等餐。", emotion: "tired", likes: 76 },
  { id: 26, text: "骑手群每天都有人被罚得想退单。", emotion: "sad", likes: 198 },
  { id: 27, text: "外卖员是城市里最熟悉红灯秒数的人。", emotion: "sarcastic", likes: 234 },
  { id: 28, text: "顾客取消单了，跑的那段路算谁的？", emotion: "helpless", likes: 165 },
  { id: 29, text: "平台算法就是逼你飙车。", emotion: "angry", likes: 289 },
  { id: 30, text: "没违规送不快，送得快就违规。", emotion: "conflicted", likes: 267 }
];

// 情绪色彩映射
export const emotionColors = {
  frustrated: "#ef4444", // 红色 - 沮丧
  helpless: "#64748b", // 灰色 - 无助
  conflicted: "#f59e0b", // 橙色 - 矛盾
  pressured: "#dc2626", // 深红色 - 压力
  desperate: "#b91c1c", // 深红色 - 绝望
  angry: "#dc2626", // 深红色 - 愤怒
  bitter: "#7c2d12", // 棕色 - 痛苦
  sarcastic: "#6b7280", // 灰色 - 讽刺
  rational: "#059669", // 绿色 - 理性
  disappointed: "#374151", // 深灰 - 失望
  anxious: "#d97706", // 橙色 - 焦虑
  tired: "#6b7280", // 灰色 - 疲惫
  intense: "#dc2626", // 红色 - 紧张
  serious: "#1f2937", // 深灰 - 严肃
  sad: "#4b5563" // 灰色 - 悲伤
};