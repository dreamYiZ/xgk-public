import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { BASIC_PAYLOAD_BAR_CHART } from "../util/util";

export default function SubRenderBarChart({ box, ...sub }) {
  return (
    <BarChart
      xAxis={sub?.xAxis || BASIC_PAYLOAD_BAR_CHART.xAxis}
      series={sub?.series || BASIC_PAYLOAD_BAR_CHART.series}
      width={sub?.width || BASIC_PAYLOAD_BAR_CHART.width}
      height={sub?.height || BASIC_PAYLOAD_BAR_CHART.height}
    />
  );
}
