import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { BASIC_PAYLOAD_BAR_CHART } from "../util/util";
import ChartMuiTheme from "./ChartMuiTheme";

export default function SubRenderBarChart({ box, ...sub }) {
  return (
    <ChartMuiTheme>

      <BarChart
        sx={{
          "& .MuiChartsAxis-tickLabel tspan": {
            fontSize: "1.4em"
          }
        }}
        xAxis={sub?.xAxis || BASIC_PAYLOAD_BAR_CHART.xAxis}
        series={sub?.series || BASIC_PAYLOAD_BAR_CHART.series}
        width={sub?.width || BASIC_PAYLOAD_BAR_CHART.width}
        height={sub?.height || BASIC_PAYLOAD_BAR_CHART.height}
      />
    </ChartMuiTheme>

  );
}
