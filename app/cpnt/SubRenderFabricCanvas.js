// src/components/SubRenderFabricCanvas.js

import React, { useCallback, useEffect, useRef } from 'react';
import * as fabric from 'fabric'; // v6
import { useFabricContext } from '../context/FabricContext';
import { ppplog } from "../util/util";

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
  }, [setFabricCanvas]);

  const dragOverHandler = useCallback((event) => {
    console.log("File(s) in drop zone");
    // Prevent default behavior (Prevent file from being opened)
    event.preventDefault();
  }, [])

  const ondropHandler = useCallback(
    (event) => {
      ppplog('ondropHandler');
      console.log("File(s) dropped");
      // Prevent default behavior (Prevent file from being opened)
      event.preventDefault();

      if (event.dataTransfer.items) {
        // Use DataTransferItemList interface to access the file(s)
        [...event.dataTransfer.items].forEach((item, i) => {
          // If dropped items aren't files, reject them
          if (item.kind === "file") {
            const file = item.getAsFile();
            console.log(`… file[${i}].name = ${file.name}`);

            if (file.type.startsWith("image/")) {
              const reader = new FileReader();
              reader.onload = function (e) {
                const data = e.target.result;
                console.log(`FileReader result: ${data}`);
                fabric.Image.fromURL(data, (img) => {
                  console.log('Image added to canvas');
                  fabricCanvas.add(img);
                  fabricCanvas.renderAll();
                });
              };
              reader.readAsDataURL(file);
            }
          }
        });
      } else {
        // Use DataTransfer interface to access the file(s)
        [...event.dataTransfer.files].forEach((file, i) => {
          console.log(`… file[${i}].name = ${file.name}`);

          if (file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onload = function (e) {
              const data = e.target.result;
              console.log(`FileReader result: ${data}`);
              fabric.Image.fromURL(data, (img) => {
                console.log('Image added to canvas');
                fabricCanvas.add(img);
                fabricCanvas.renderAll();
              });
            };
            reader.readAsDataURL(file);
          }
        });
      }
    }, []
  )

  return (
    <div style={{ width: box.width, height: box.height, overflow: 'hidden', position: 'relative' }} >
      <canvas width={box.width} height={box.height} ref={canvasEl} onDrop={ondropHandler} onDragover={dragOverHandler} />
    </div>
  );
}
