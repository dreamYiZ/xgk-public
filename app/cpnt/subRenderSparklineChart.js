import * as React from 'react';
import { SparkLineChart } from '@mui/x-charts/SparkLineChart';
import { BASIC_PAYLOAD_SPARKLINE_CHART } from "../util/util";
import ChartMuiTheme from "./ChartMuiTheme";

export default function SubRenderSparkLineChart({ box, sub }) {

  const shape = {};
  if (sub.area) {
    shape.area = sub.area

  }
  if (sub.curve) {
    shape.curve = sub.curve

  }
  if (sub.plotType) {
    shape.plotType = sub.plotType
  }
  return (
    <ChartMuiTheme>
      <SparkLineChart

        {...shape}
        data={sub?.data || BASIC_PAYLOAD_SPARKLINE_CHART.data}
        height={sub?.height || BASIC_PAYLOAD_SPARKLINE_CHART.height}
        showHighlight={true}
        showTooltip={true}
      />
    </ChartMuiTheme>
  );
}
