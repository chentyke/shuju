"use client";

import dynamic from "next/dynamic";
import { useInView } from "react-intersection-observer";
import type { EChartsOption } from "echarts";

const ReactECharts = dynamic(() => import("echarts-for-react"), { ssr: false }) as unknown as (props: { option: EChartsOption; style?: React.CSSProperties }) => import("react").ReactElement | null;

export function Speedometer() {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const speedometerOption: EChartsOption = {
    backgroundColor: 'transparent',
    series: [
      {
        type: 'gauge',
        startAngle: 180,
        endAngle: 0,
        min: 0,
        max: 60,
        splitNumber: 12,
        itemStyle: {
          color: '#58D9F9',
          shadowColor: 'rgba(0,138,255,0.45)',
          shadowBlur: 12,
          shadowOffsetX: 2,
          shadowOffsetY: 2
        },
        progress: {
          show: true,
          roundCap: true,
          width: 18,
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: '#ff6b6b' },
                { offset: 0.5, color: '#ffa726' },
                { offset: 1, color: '#66bb6a' }
              ]
            }
          }
        },
        pointer: {
          icon: 'path://M2090.36389,615.30999 L2090.36389,615.30999 C2091.48372,615.30999 2092.40383,616.194028 2092.44859,617.312956 L2096.90698,728.755929 C2097.05155,732.369577 2094.2393,735.416212 2090.62566,735.56078 C2090.53845,735.564269 2090.45117,735.566014 2090.36389,735.566014 L2090.36389,735.566014 C2086.74736,735.566014 2083.81556,732.63423 2083.81556,729.017692 C2083.81556,728.930412 2083.81732,728.84314 2083.82084,728.755929 L2088.27922,617.312956 C2088.32398,616.194028 2089.2441,615.30999 2090.36389,615.30999 Z',
          length: '75%',
          width: 16,
          offsetCenter: [0, '5%']
        },
        axisLine: {
          roundCap: true,
          lineStyle: {
            width: 18
          }
        },
        axisTick: {
          splitNumber: 2,
          lineStyle: {
            width: 2,
            color: '#999'
          }
        },
        splitLine: {
          length: 30,
          lineStyle: {
            width: 4,
            color: '#999'
          }
        },
        axisLabel: {
          distance: 60,
          color: '#999',
          fontSize: 12
        },
        title: {
          offsetCenter: [0, '60%'],
          fontSize: 20,
          color: '#333'
        },
        detail: {
          fontSize: 24,
          offsetCenter: [0, '35%'],
          valueAnimation: true,
          formatter: function (value: number) {
            return Math.round(value) + ' km/h';
          },
          color: 'auto'
        },
        data: [
          {
            value: inView ? 50 : 0,
            name: '最高时速'
          }
        ]
      }
    ]
  };

  return (
    <div ref={ref} className="glass-card p-4 w-full">
      <ReactECharts option={speedometerOption} style={{ height: 300, width: '100%' }} />
    </div>
  );
}
