// Hours 0-23, days Mon-Sun (0-6)
export const timeHeatMatrix: number[][] = Array.from({ length: 7 }, (_, day) =>
  Array.from({ length: 24 }, (_, hour) => {
    const morningPeak = hour >= 7 && hour <= 9 ? 80 : 0;
    const eveningPeak = hour >= 17 && hour <= 19 ? 95 : 0;
    const base = 10 + (day === 5 || day === 6 ? -4 : 0); // lighter on weekend
    return base + morningPeak + eveningPeak;
  })
);




