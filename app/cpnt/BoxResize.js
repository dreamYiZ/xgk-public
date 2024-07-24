import React, { useRef, useState, useEffect, useCallback } from 'react';
import Box from '@mui/material/Box';
import classes from './BoxResize.module.sass';
import useBoxStore from '../store/useBo';
import { pxToNumber, ppplog } from "../util/util";
import { debounce } from "lodash";

const RESIZE_HANDLE_SIZE = 10;

export default function BoxResize({ outerBoxRef, children, boxid, mainRef, boxStyle, isResizingRef }) {
  const changeBoxById = useBoxStore((state) => state.changeById);
  const resizingRef = useRef(false);
  const resizeDirectionRef = useRef(null);
  const boxRef = useRef(null);
  const startPosRef = useRef({ x: 0, y: 0 });
  const startSizeRef = useRef({ width: 0, height: 0 });
  // const startPositionRef = useRef({ left: 0, top: 0 });

  const debounceResize = useCallback(
    debounce((width, height, left, top) => {
      if (width >= 30 && height >= 30) {
        changeBoxById(boxid, { width, height, x: left, y: top });
      }
    }, 300),
    [changeBoxById]
  );

  const handleMouseDown = (direction, e) => {
    ppplog('handleMouseDown');
    e.stopPropagation();
    resizingRef.current = true;
    resizeDirectionRef.current = direction;
    startPosRef.current = { x: e.clientX, y: e.clientY };
    const rect = boxRef.current.getBoundingClientRect();
    startSizeRef.current = { width: rect.width, height: rect.height };
    // startPositionRef.current = { left: e.clientX, top: parseFloat(boxRef.current.style.top) };
    ppplog('handleMouseDown 2', boxStyle, boxStyle.outerX, boxStyle.outerY);

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    isResizingRef.current = true;
  };

  const handleMouseMove = useCallback((e) => {
    isResizingRef.current = true;

    e.stopPropagation();  // Stop the event from propagating to parent elements
    ppplog('moveResize-0', resizingRef.current, resizeDirectionRef.current);

    if (!resizingRef.current || !resizeDirectionRef.current) return;

    const boxElement = boxRef.current;
    const outerBoxElement = outerBoxRef.current;
    const mainElement = mainRef.current;
    const mainRect = mainElement.getBoundingClientRect();
    // const outerBoxRefRect = outerBoxElement.getBoundingClientRect();
    let newWidth = startSizeRef.current.width;
    let newHeight = startSizeRef.current.height;
    let newLeft = pxToNumber(boxStyle.outerX);
    let newTop = pxToNumber(boxStyle.outerY);
    const deltaX = e.clientX - startPosRef.current.x;
    const deltaY = e.clientY - startPosRef.current.y;

    ppplog('newLeft-0', newLeft, newTop, deltaX, deltaY);
    // return;

    ppplog('moveResize-1');

    if (resizeDirectionRef.current === 'right') {
      newWidth += deltaX;
    } else if (resizeDirectionRef.current === 'left') {
      newWidth -= deltaX;
      newLeft += deltaX;
    }

    if (resizeDirectionRef.current === 'bottom') {
      newHeight += deltaY;
    } else if (resizeDirectionRef.current === 'top') {
      newHeight -= deltaY;
      newTop += deltaY;

    }

    if (newWidth > mainRect.width) newWidth = mainRect.width;
    if (newHeight > mainRect.height) newHeight = mainRect.height;

    boxElement.style.width = `${newWidth}px`;
    boxElement.style.height = `${newHeight}px`;
    outerBoxElement.style.width = `${newWidth}px`;
    outerBoxElement.style.height = `${newHeight}px`;

    // boxElement.style.left = `${newLeft}px`;
    // boxElement.style.top = `${newTop}px`;

    ppplog('newLeft', newLeft, newTop);

    outerBoxElement.style.left = `${newLeft}px`;
    outerBoxElement.style.top = `${newTop}px`;


    // debounceResize(newWidth, newHeight);
    debounceResize(newWidth, newHeight, newLeft, newTop);

  }, [changeBoxById, boxid, debounceResize, boxStyle]);

  const handleMouseUp = () => {
    resizingRef.current = false;
    resizeDirectionRef.current = null;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
    isResizingRef.current = false;
  };

  return (
    <Box ref={boxRef} className={classes.resizableBox} style={boxStyle}>
      {children}
      <div className={classes.handle} style={{ top: "-10px", left: '10%', width: '80%', height: '10px', cursor: 'ns-resize' }} onMouseDown={(e) => handleMouseDown('top', e)}></div>
      <div className={classes.handle} style={{ bottom: "-10px", left: '10%', width: '80%', height: '10px', cursor: 'ns-resize' }} onMouseDown={(e) => handleMouseDown('bottom', e)}></div>
      <div className={classes.handle} style={{ top: '10%', left: "-10px", height: '80%', width: '10px', cursor: 'ew-resize' }} onMouseDown={(e) => handleMouseDown('left', e)}></div>
      <div className={classes.handle} style={{ top: '10%', right: "-10px", height: '80%', width: '10px', cursor: 'ew-resize' }} onMouseDown={(e) => handleMouseDown('right', e)}></div>
    </Box>
  );
}
