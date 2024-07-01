import * as React from 'react';
import { SparkLineChart } from '@mui/x-charts/SparkLineChart';
import { BASIC_PAYLOAD_SPARKLINE_CHART } from "../util/util";

export default function SubRenderSparkLineChart({ box, ...sub }) {
  return (
    <SparkLineChart
      data={sub?.data || BASIC_PAYLOAD_SPARKLINE_CHART.data}
      height={sub?.height || BASIC_PAYLOAD_SPARKLINE_CHART.height}
    />
  );
}
