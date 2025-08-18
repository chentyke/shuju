// 违法行为时空聚集性数据

export interface TimeViolationData {
  hour: number;
  violations: number;
  isRushHour: boolean;
}

export interface RestrictedRoad {
  name: string;
  type: '全天限行' | '高峰期限行';
  restrictionTime: string;
  coordinates: [number, number][];
  violationHotspot: boolean;
  description: string;
}

// 24小时违法行为分布数据
export const hourlyViolationData: TimeViolationData[] = [
  { hour: 0, violations: 12, isRushHour: false },
  { hour: 1, violations: 8, isRushHour: false },
  { hour: 2, violations: 5, isRushHour: false },
  { hour: 3, violations: 4, isRushHour: false },
  { hour: 4, violations: 7, isRushHour: false },
  { hour: 5, violations: 15, isRushHour: false },
  { hour: 6, violations: 32, isRushHour: false },
  { hour: 7, violations: 68, isRushHour: false },
  { hour: 8, violations: 156, isRushHour: true }, // 早高峰开始
  { hour: 9, violations: 142, isRushHour: true }, // 早高峰结束9:30
  { hour: 10, violations: 45, isRushHour: false },
  { hour: 11, violations: 52, isRushHour: false },
  { hour: 12, violations: 78, isRushHour: false }, // 午餐时间外卖高峰
  { hour: 13, violations: 65, isRushHour: false },
  { hour: 14, violations: 48, isRushHour: false },
  { hour: 15, violations: 56, isRushHour: false },
  { hour: 16, violations: 72, isRushHour: false },
  { hour: 17, violations: 125, isRushHour: true }, // 晚高峰开始17:30
  { hour: 18, violations: 168, isRushHour: true }, // 晚高峰最高峰
  { hour: 19, violations: 89, isRushHour: false }, // 晚高峰结束
  { hour: 20, violations: 67, isRushHour: false },
  { hour: 21, violations: 45, isRushHour: false },
  { hour: 22, violations: 28, isRushHour: false },
  { hour: 23, violations: 18, isRushHour: false }
];

// 限行路段数据
export const restrictedRoads: RestrictedRoad[] = [
  {
    name: '天河东路',
    type: '高峰期限行',
    restrictionTime: '8:00-9:30, 17:30-19:00',
    coordinates: [
      [113.358, 23.118],
      [113.365, 23.115],
      [113.372, 23.112],
      [113.378, 23.110]
    ],
    violationHotspot: true,
    description: '天河CBD核心区域，通勤压力大'
  },
  {
    name: '猎德大道（花城大道以北）',
    type: '高峰期限行',
    restrictionTime: '8:00-9:30, 17:30-19:00',
    coordinates: [
      [113.380, 23.114],
      [113.385, 23.116],
      [113.390, 23.118],
      [113.395, 23.120]
    ],
    violationHotspot: true,
    description: '连接珠江新城与天河区，外卖配送频繁'
  },
  {
    name: '黄埔大道西（石牌东路以西）',
    type: '全天限行',
    restrictionTime: '8:00-19:00',
    coordinates: [
      [113.320, 23.140],
      [113.335, 23.138],
      [113.350, 23.136],
      [113.365, 23.134]
    ],
    violationHotspot: true,
    description: '主要交通干道，违法行为集中'
  },
  {
    name: '东风东路',
    type: '全天限行',
    restrictionTime: '8:00-19:00',
    coordinates: [
      [113.250, 23.128],
      [113.265, 23.129],
      [113.280, 23.130],
      [113.295, 23.131]
    ],
    violationHotspot: true,
    description: '老城区主干道，商业密集'
  },
  {
    name: '东风中路',
    type: '全天限行',
    restrictionTime: '8:00-19:00',
    coordinates: [
      [113.240, 23.127],
      [113.250, 23.128],
      [113.265, 23.129],
      [113.275, 23.130]
    ],
    violationHotspot: true,
    description: '市中心商务区，执法重点区域'
  },
  {
    name: '东风西路（西场立交以东）',
    type: '全天限行',
    restrictionTime: '8:00-19:00',
    coordinates: [
      [113.220, 23.125],
      [113.230, 23.126],
      [113.240, 23.127],
      [113.250, 23.128]
    ],
    violationHotspot: false,
    description: '城市西部主干道'
  },
  {
    name: '珠江新城CBD核心区',
    type: '全天限行',
    restrictionTime: '8:00-19:00',
    coordinates: [
      [113.385, 23.120],
      [113.390, 23.115],
      [113.395, 23.110],
      [113.400, 23.105]
    ],
    violationHotspot: true,
    description: '金融商务区，车流密集'
  },
  {
    name: '体育西路',
    type: '高峰期限行',
    restrictionTime: '8:00-9:30, 17:30-19:00',
    coordinates: [
      [113.315, 23.135],
      [113.320, 23.130],
      [113.325, 23.125],
      [113.330, 23.120]
    ],
    violationHotspot: true,
    description: '地铁枢纽站点，人流车流交汇'
  }
];

// 工作日vs周末违法对比数据
export const weekdayVsWeekendData = {
  workday: {
    total: 1245,
    rushHourRatio: 0.68, // 高峰期占比
    peakHours: [8, 18] // 主要违法高峰时段
  },
  weekend: {
    total: 423,
    rushHourRatio: 0.23,
    peakHours: [12, 19] // 周末主要违法时段
  }
};

// 违法类型分布（按时段）
export const violationTypesByTime = {
  morningRush: {
    '闯红灯': 42,
    '逆行': 35,
    '不按道行驶': 28,
    '违法载人': 15,
    '其他': 10
  },
  eveningRush: {
    '闯红灯': 48,
    '逆行': 41,
    '不按道行驶': 35,
    '违法载人': 22,
    '其他': 14
  },
  offPeak: {
    '闯红灯': 25,
    '逆行': 18,
    '不按道行驶': 15,
    '违法载人': 8,
    '其他': 6
  }
};

// 获取指定时间的限行路段
export const getActiveRestrictionsAtTime = (hour: number, minute: number = 0): RestrictedRoad[] => {
  const currentTime = hour + minute / 60;
  
  return restrictedRoads.filter(road => {
    if (road.type === '全天限行') {
      return currentTime >= 8 && currentTime <= 19;
    } else {
      // 高峰期限行: 8:00-9:30, 17:30-19:00
      return (currentTime >= 8 && currentTime <= 9.5) || 
             (currentTime >= 17.5 && currentTime <= 19);
    }
  });
};