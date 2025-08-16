export interface MedicalData {
  category: string;
  total: number;
  electricBike: number;
  percentage: number;
  description: string;
}

export interface HospitalStatistics {
  name: string;
  period: string;
  emergencyTotal: number;
  emergencyElectricBike: number;
  emergencyPercentage: number;
  severeCasesTotal: number;
  severeCasesElectricBike: number;
  severeCasesPercentage: number;
  deaths: number;
}

// 广州主要医疗机构数据
export const medicalImpactData: MedicalData[] = [
  {
    category: "创伤骨科收治",
    total: 100,
    electricBike: 70,
    percentage: 70,
    description: "电动自行车相关交通意外伤普遍占创伤骨科收治的60%-80%"
  },
  {
    category: "急诊严重车祸伤",
    total: 100,
    electricBike: 65,
    percentage: 65,
    description: "在急诊体系里，严重车祸伤约65%与电动自行车相关"
  },
  {
    category: "交通意外死亡事件",
    total: 100,
    electricBike: 75,
    percentage: 75,
    description: "约75%的交通意外死亡事件由电动自行车相关"
  }
];

// 珠江医院具体数据（2024年1-6月）
export const zhujJiangHospitalData: HospitalStatistics = {
  name: "珠江医院",
  period: "2024年1-6月",
  emergencyTotal: 406,
  emergencyElectricBike: 325,
  emergencyPercentage: 80,
  severeCasesTotal: 82,
  severeCasesElectricBike: 53,
  severeCasesPercentage: 65,
  deaths: 4
};

// 用于图表展示的详细分组数据
export const detailedMedicalData = [
  {
    category: "外科急诊",
    subcategory: "交通事故损伤",
    total: zhujJiangHospitalData.emergencyTotal,
    electricBike: zhujJiangHospitalData.emergencyElectricBike,
    other: zhujJiangHospitalData.emergencyTotal - zhujJiangHospitalData.emergencyElectricBike,
    percentage: zhujJiangHospitalData.emergencyPercentage,
    unit: "例"
  },
  {
    category: "重症急救",
    subcategory: "严重车祸伤",
    total: zhujJiangHospitalData.severeCasesTotal,
    electricBike: zhujJiangHospitalData.severeCasesElectricBike,
    other: zhujJiangHospitalData.severeCasesTotal - zhujJiangHospitalData.severeCasesElectricBike,
    percentage: zhujJiangHospitalData.severeCasesPercentage,
    unit: "例"
  },
  {
    category: "死亡病例",
    subcategory: "交通事故",
    total: zhujJiangHospitalData.deaths,
    electricBike: zhujJiangHospitalData.deaths,
    other: 0,
    percentage: 100,
    unit: "例"
  }
];

// 医疗资源承压指标
export const medicalPressureIndicators = [
  {
    name: "创伤骨科负荷",
    value: 75,
    unit: "%",
    trend: "上升",
    description: "电动车事故占比持续增长"
  },
  {
    name: "急诊资源占用",
    value: 80,
    unit: "%", 
    trend: "上升",
    description: "外科急诊中电动车相关占比"
  },
  {
    name: "重症救治压力",
    value: 65,
    unit: "%",
    trend: "严峻",
    description: "严重车祸伤电动车相关比例"
  },
  {
    name: "死亡率影响",
    value: 75,
    unit: "%",
    trend: "严重",
    description: "交通意外死亡事件电动车占比"
  }
];

export const keyInsights = [
  "电动自行车激增与伤情加重相伴而生",
  "医疗资源承压明显，急诊科负荷加重", 
  "伤亡严重程度与电动自行车事故高度相关",
  "死亡率数据显示电动自行车安全形势严峻"
];