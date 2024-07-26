import React, { useState, useEffect, useRef } from 'react';
import { Box } from '@mui/system';  // 引入 Box 组件
import Chart from 'chart.js/auto';

export default function ({ box, sub }) {
  const chartjsRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    if (sub?.payload && chartjsRef.current) {
      // Destroy the previous chart instance if it exists
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      // Create a new chart instance
      chartInstanceRef.current = new Chart(chartjsRef.current, sub?.payload);
    }

    // Cleanup function to destroy the chart when the component unmounts
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [sub?.payload]);

  return (
    <div style={{ width: box.width, height: box.height }}>
      <canvas ref={chartjsRef}></canvas>
    </div>
  );
}
