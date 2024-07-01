import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import {BASIC_SERIES_PIE_CHART} from "../util/util";

export default function SubRenderPieChart({ box, ...sub }) {

  return (
    <PieChart
      series={sub?.series||BASIC_SERIES_PIE_CHART}
      width={sub?.width}
      height={sub?.height}
    />
  );
}
