export interface RiderScaleData {
  activeRiders: number; // 万人
  dailyOrders: {
    normal: number;
    peak: number;
  };
  averageOrdersPerRider: number;
}

export interface DeliveryTimeData {
  platformRequirement: number; // 分钟
  realityTime: {
    min: number;
    max: number;
  };
  speedLimit: number; // km/h
  riskLevel: 'high' | 'medium' | 'low';
}

export interface IncomeComparisonData {
  beforeLimit: {
    min: number;
    max: number;
  };
  afterLimit: {
    min: number;
    max: number;
  };
  decreasePercentage: {
    min: number;
    max: number;
  };
}

export interface PenaltyData {
  overtime: {
    min: number;
    max: number;
  };
  badReview: {
    amount: number;
    equivalentOrders: number;
  };
  powerReduction: boolean;
}

export interface ViolationBehaviorData {
  redLightViolation: {
    percentage: number;
    reason: string;
  };
  wrongLane: {
    percentage: number;
    reason: string;
  };
}

// 骑手规模数据
export const riderScaleData: RiderScaleData = {
  activeRiders: 12,
  dailyOrders: {
    normal: 35,
    peak: 50
  },
  averageOrdersPerRider: 40
};

// 配送时间对比数据
export const deliveryTimeData: DeliveryTimeData = {
  platformRequirement: 30,
  realityTime: {
    min: 20,
    max: 25
  },
  speedLimit: 15,
  riskLevel: 'high'
};

// 收入对比数据
export const incomeComparisonData: IncomeComparisonData = {
  beforeLimit: {
    min: 8000,
    max: 12000
  },
  afterLimit: {
    min: 5000,
    max: 6000
  },
  decreasePercentage: {
    min: 30,
    max: 50
  }
};

// 罚款数据
export const penaltyData: PenaltyData = {
  overtime: {
    min: 3,
    max: 10
  },
  badReview: {
    amount: 200,
    equivalentOrders: 10
  },
  powerReduction: true
};

// 违规行为数据
export const violationBehaviorData: ViolationBehaviorData = {
  redLightViolation: {
    percentage: 40,
    reason: "系统倒计时压迫"
  },
  wrongLane: {
    percentage: 60,
    reason: "车道被占"
  }
};

// 图表颜色配置
export const chartColors = {
  primary: '#3b82f6',
  success: '#10b981',
  warning: '#f59e0b',
  danger: '#ef4444',
  info: '#06b6d4',
  purple: '#8b5cf6'
};