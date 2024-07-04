import { useRef, useEffect } from "react";
import * as echarts from "echarts";
import classes from "./echartsWrapper.module.sass";

export default function ({ option, width = "600px", height = "300px" }) {
  const pieRef = useRef(null);

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
      myChart.setOption(option);

      intervalId = setInterval(() => {
        myChart.clear();
        myChart.setOption(option);
      }, 20 * 1000)
    }
    return () => {
      clearInterval(intervalId)
    }
  }, [pieRef, option]);

  return (
    <div className={classes.echartWrapper}>
      <div style={{ width, height }} ref={pieRef}></div>
    </div>
  );
}
