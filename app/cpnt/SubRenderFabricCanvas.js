import React, { useCallback, useEffect, useRef, useState } from 'react';
import * as fabric from 'fabric'; // v6
import { useFabricContext } from '../context/FabricContext';
import { ppplog } from "../util/util";
import useGlobalStore from "../store/useGlobal";

const ANIMATION_INTERVAL = 100; // Adjust as needed, faster for smoother animation

export default function SubRenderFabricCanvas({ box, sub }) {
  const canvasEl = useRef(null);
  const { data } = sub;
  const { fabricCanvas, setFabricCanvas } = useFabricContext();
  const { mode, mainScale, getIsTestOrDisplay,
    isMainDragging, isSpacePress, isCanvasEditing
  } = useGlobalStore();

  const [_isTestOrDisplay, set_IsTestOrDisplay] = useState(false);

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
  }, [setFabricCanvas]);

  useEffect(() => {
    if (data && fabricCanvas) {
      fabricCanvas.loadFromJSON(data).then(function () {
        if (_isTestOrDisplay) {
          fabricCanvas.forEachObject(function (o) {
            o.selectable = false;
          });
        }
        fabricCanvas.renderAll();
      });
    }
  }, [fabricCanvas, data, box?.width, box?.height, _isTestOrDisplay]);

  useEffect(() => {
    if (getIsTestOrDisplay()) {
      set_IsTestOrDisplay(true);
    }
  }, [mode]);

  useEffect(() => {
    if (fabricCanvas) {
      fabricCanvas.setWidth(box.width);
      fabricCanvas.setHeight(box.height);
      fabricCanvas.renderAll();
    }
  }, [box.width, box.height, fabricCanvas]);

  return (
    <div
      style={{ width: box.width, height: box.height, overflow: 'hidden', position: 'relative' }}
    >
      <canvas
        width={box.width}
        height={box.height}
        ref={canvasEl}
        style={{ zIndex: 9999 }}
      />
    </div>
  );
}
