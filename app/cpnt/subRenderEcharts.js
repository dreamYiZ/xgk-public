import * as React from 'react';
import { SparkLineChart } from '@mui/x-charts/SparkLineChart';
import { BASIC_PAYLOAD_SPARKLINE_CHART } from "../util/util";
import ChartMuiTheme from "./ChartMuiTheme";
import ChartsWrapper from "./echartsWrapper";
import ppplog from "ppplog";

export default function ({ box, sub }) {

  if(!sub?.option){
    return `Not Options`;
  }
  return (
    <ChartsWrapper
      option={sub?.option}
      width={sub?.width}
      height={sub?.height}
      reInit={sub?.reInit}
    />
  );
}
