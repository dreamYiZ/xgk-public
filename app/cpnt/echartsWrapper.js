import { useRef, useEffect } from "react";
import * as echarts from "echarts";
import classes from "./echartsWrapper.module.sass";
import { pxToNumber } from "../util/util";

export default function ({ option, width = "600px", height = "300px" }) {
  const pieRef = useRef(null);
  const pieRefInstance = useRef(null);

  if (typeof width === 'number') {
    width = `${width}px`;
  }

  if (typeof height === 'number') {
    height = `${height}px`;
  }

  useEffect(() => {
    let intervalId;
    if (pieRef && pieRef.current) {
      let el = pieRef.current;
      var myChart = echarts.init(el);
      pieRefInstance.current = myChart;
      myChart.setOption(option);

      intervalId = setInterval(() => {
        myChart.clear();
        myChart.setOption(option);
      }, 20 * 1000)
    }
    return () => {
      clearInterval(intervalId)

      pieRefInstance?.current?.dispose();
    }
  }, [pieRef, option]);


  useEffect(() => {
    if (pieRefInstance?.current) {

      pieRefInstance?.current?.resize({
        width: pxToNumber(width),
        height: pxToNumber(height)
      });
    }

  }, [width, height]);

  return (
    <div className={classes.echartWrapper}>
      <div style={{ width, height }} ref={pieRef}></div>
    </div>
  );
}
