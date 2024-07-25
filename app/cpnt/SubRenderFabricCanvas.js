// src/components/SubRenderFabricCanvas.js

import React, { useEffect, useRef } from 'react';
import * as fabric from 'fabric'; // v6
import { useFabricContext } from '../context/FabricContext';

const ANIMATION_INTERVAL = 100; // Adjust as needed, faster for smoother animation

export default function SubRenderFabricCanvas({ box, sub }) {
  const canvasEl = useRef(null);
  const { fabricCanvas, setFabricCanvas } = useFabricContext();

  useEffect(() => {
    if (canvasEl.current && !fabricCanvas) {
      const options = {};
      const canvas = new fabric.Canvas(canvasEl.current, options);
      setFabricCanvas(canvas);

      return () => {
        canvas.dispose();
        setFabricCanvas(null);
      };
    }
  }, [ setFabricCanvas]);

  return (
    <div style={{ width: box.width, height: box.height, overflow: 'hidden', position: 'relative' }}>
      <canvas width={box.width} height={box.height} ref={canvasEl} />
    </div>
  );
}
