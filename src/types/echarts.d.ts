declare module "echarts-for-react" {
  import type { CSSProperties, ReactElement } from "react";
  import type { EChartsOption } from "echarts";
  const ReactECharts: (props: { option: EChartsOption; style?: CSSProperties }) => ReactElement | null;
  export default ReactECharts;
}


