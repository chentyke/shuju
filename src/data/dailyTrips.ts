export type DailyTripData = {
  year: number;
  ebike: number;    // 电动自行车
  metro: number;    // 地铁
  bus: number;      // 常规公交
};

export const dailyTripsData: DailyTripData[] = [
  { year: 2021, ebike: 204, metro: 776, bus: 372 },
  { year: 2022, ebike: 600, metro: 646, bus: 350 },
  { year: 2023, ebike: 685, metro: 857, bus: 310 },
  { year: 2024, ebike: 903, metro: 888, bus: 289 },
];

// 计算出行方式占比
export const getTripShareData = (year: number) => {
  const data = dailyTripsData.find(d => d.year === year);
  if (!data) return null;
  
  const total = data.ebike + data.metro + data.bus;
  return {
    year,
    ebikeShare: Math.round((data.ebike / total) * 100 * 10) / 10,
    metroShare: Math.round((data.metro / total) * 100 * 10) / 10,
    busShare: Math.round((data.bus / total) * 100 * 10) / 10,
  };
};

export const tripShareEvolution = [2021, 2022, 2023, 2024].map(getTripShareData).filter(Boolean);