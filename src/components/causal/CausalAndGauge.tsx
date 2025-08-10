"use client";

import dynamic from "next/dynamic";
import { Section } from "@/components/common/Section";
import type { EChartsOption } from "echarts";

const ReactECharts = dynamic(() => import("echarts-for-react"), { ssr: false }) as unknown as (props: { option: EChartsOption; style?: React.CSSProperties }) => import("react").ReactElement | null;

export function CausalAndGauge() {
  return (
    <Section id="causal" title="原因剖析" subtitle="机制链与限速对比">
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="rounded-xl border p-5 bg-white/60 dark:bg-white/5">
          <h3 className="text-lg font-semibold mb-3">因果关系图（示例）</h3>
          <ul className="list-disc pl-6 text-sm space-y-2">
            <li>道路资源不足（断头路、混行） → 冲突与违法概率上升</li>
            <li>平台计时与罚款机制 → 时间压力 → 违规决策</li>
            <li>监管碎片化（城管/交警/平台） → 执法波动与信息孤岛</li>
          </ul>
        </div>
        <div className="rounded-xl border p-5 bg-white/60 dark:bg-white/5">
          <h3 className="text-lg font-semibold mb-3">国标限速 vs 实测车速</h3>
          <ReactECharts option={gaugeOption} style={{ height: 300 }} />
        </div>
      </div>
    </Section>
  );
}

const gaugeOption: EChartsOption = {
  series: [
    {
      type: "gauge",
      min: 0,
      max: 40,
      progress: { show: true, width: 10 },
      axisLine: { lineStyle: { width: 10 } },
      axisTick: { show: false },
      splitLine: { length: 12, lineStyle: { width: 2 } },
      pointer: { width: 4 },
      detail: {
        formatter: (val: number) => `${val.toFixed(0)} km/h`,
        valueAnimation: true,
      },
      data: [{ value: 22, name: "实测均速" }],
      title: { offsetCenter: ["0%", "80%"] },
    },
  ],
};


