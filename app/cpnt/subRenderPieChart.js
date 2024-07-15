import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { BASIC_SERIES_PIE_CHART } from "../util/util";
import ChartMuiTheme from "./ChartMuiTheme";

export default function SubRenderPieChart({ box, sub }) {

  return (
    <ChartMuiTheme>
      <PieChart
        series={sub?.series || BASIC_SERIES_PIE_CHART}
        colors={sub?.color}
        width={sub?.width}
        height={sub?.height}
      />
    </ChartMuiTheme>
  );
}
