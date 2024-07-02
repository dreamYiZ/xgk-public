import * as React from 'react';
import { Gauge } from '@mui/x-charts/Gauge';
import { BASIC_PAYLOAD_GAUGE_CHART } from "../util/util";
import ChartMuiTheme from "./ChartMuiTheme";

export default function SubRenderGaugeChart({ box, ...sub }) {
  return (
    <ChartMuiTheme>
      <Gauge
        width={sub?.width || BASIC_PAYLOAD_GAUGE_CHART.width}
        height={sub?.height || BASIC_PAYLOAD_GAUGE_CHART.height}
        value={sub?.value || BASIC_PAYLOAD_GAUGE_CHART.value}
      />
    </ChartMuiTheme>
  );
}
