export type YearValue = { year: number; value: number };

export const violationTotals: YearValue[] = [
  { year: 2021, value: 110 },
  { year: 2022, value: 140 },
  { year: 2023, value: 162 },
  { year: 2024, value: 445 },
];

export const violationYearlyData = [
  { 
    year: 2021, 
    violations: 110, 
    unit: '万宗',
    hasData: true,
    annotation: '',
    growth: 0
  },
  { 
    year: 2022, 
    violations: 140, 
    unit: '万宗',
    hasData: true,
    annotation: '较上年增长27.3%',
    growth: 27.3
  },
  { 
    year: 2023, 
    violations: 162, 
    unit: '万宗',
    hasData: false,
    annotation: '数据未公布，事故+63%',
    growth: 15.7
  },
  { 
    year: 2024, 
    violations: 445, 
    unit: '万宗',
    hasData: true,
    annotation: '违法同比+174.5%',
    growth: 174.5
  }
];

export const violationTypesShare = [
  { name: "闯红灯", value: 35 },
  { name: "逆行", value: 28 },
  { name: "超速", value: 18 },
  { name: "占道", value: 19 },
];










