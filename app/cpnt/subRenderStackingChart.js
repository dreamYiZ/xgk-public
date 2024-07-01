import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { BASIC_PAYLOAD_STACKING_CHART } from "../util/util";

export default function SubRenderStackingChart({ box, ...sub }) {
  return (
    <BarChart
      width={sub?.width || BASIC_PAYLOAD_STACKING_CHART.width}
      height={sub?.height || BASIC_PAYLOAD_STACKING_CHART.height}
      series={sub?.series || BASIC_PAYLOAD_STACKING_CHART.series}
    />
  );
}
