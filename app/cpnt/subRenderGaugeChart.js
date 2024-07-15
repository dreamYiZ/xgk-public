import * as React from 'react';
import { BASIC_PAYLOAD_GAUGE_CHART } from "../util/util";
import ChartMuiTheme from "./ChartMuiTheme";
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';

export default function SubRenderGaugeChart({ box, sub }) {
  return (
    <ChartMuiTheme>
      <Gauge
        width={sub?.width || BASIC_PAYLOAD_GAUGE_CHART.width}
        height={sub?.height || BASIC_PAYLOAD_GAUGE_CHART.height}
        value={sub?.value || BASIC_PAYLOAD_GAUGE_CHART.value}
        sx={(theme) => ({
          [`& .${gaugeClasses.valueText}`]: {
            fontSize: sub.fontSize || '40px',
          },
          [`& .${gaugeClasses.valueArc}`]: {
            fill: sub.color || '#52b202',
          },
          [`& .${gaugeClasses.referenceArc}`]: {
            fill: theme.palette.text.disabled,
          },
        })}
      />
    </ChartMuiTheme>
  );
}
