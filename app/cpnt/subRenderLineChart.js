import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { BASIC_PAYLOAD_LINE_CHART } from "../util/util";
import ChartMuiTheme from "./ChartMuiTheme";

export default function SubRenderLineChart({ box, sub }) {
  return (
    <ChartMuiTheme>

      <LineChart
        xAxis={sub?.xAxis || BASIC_PAYLOAD_LINE_CHART.xAxis}
        series={sub?.series || BASIC_PAYLOAD_LINE_CHART.series}
        width={sub?.width || BASIC_PAYLOAD_LINE_CHART.width}
        height={sub?.height || BASIC_PAYLOAD_LINE_CHART.height}
      />
    </ChartMuiTheme>

  );
}
