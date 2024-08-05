"use client"
import { useState, useRef, useEffect, useMemo, useCallback } from 'react';  // Import useMemo
import classes from "./box.module.sass";
import useBoxStore from '../store/useBo';
import ppplog from "ppplog";
import useGlobalStore, { MODE } from '../store/useGlobal';

import { pxToNumber, ifNumberToPx, stringToNumber, debounce } from "../util/util";
// import { debounce } from 'lodash';
import BoxResize from "./BoxResize";

function Box({ boxid, width, height, position, opacity, zIndex, hidden,
  children, groupid, x, y, scale, mainRef, disableMove, ...other }) {
  const boxRef = useRef(null);
  const changeBoxById = useBoxStore((state) => state.changeById);
  const setActiveBoxId = useBoxStore((state) => state.setActiveBoxId);  // Access the 'setActiveBoxId' function
  const { mode, mainScale, getIsTestOrDisplay,
    isMainDragging, isSpacePress, isCanvasEditing
  } = useGlobalStore();
  const isResizingRef = useRef(false);

  const activeBoxId = useBoxStore((state) => state.activeBoxId);  // Access the 'activeBoxId' state
  const activeBox = useMemo(() => useBoxStore.getState().boxArr.find(box => box.boxid === boxid), [boxid]);  // 获取当前Box数据

  const startPosRef = useRef(null);

  const [showResize, setShowResize] = useState(false);
  const [isTestOrDisplay, setTestOrDisplay] = useState(true);

  useEffect(() => {
    setShowResize(activeBoxId === boxid);
  }, [activeBoxId, boxid])

  const debounceMove = useCallback(
    debounce(({
      newX, newY
    }) => { changeBoxById(boxid, { x: newX, y: newY }) }, 300)
    , [changeBoxById]);

  useEffect(() => {
    setTestOrDisplay(getIsTestOrDisplay());

    return () => { }
  }, [mode])

  useEffect(() => {
    ppplog('disableMove', disableMove)
    if (mode !== MODE.EDIT) {
      return () => { }
    }

    if (isCanvasEditing) {
      return () => { }
    }

    const boxElement = boxRef.current;

    if (!boxElement) {
      return () => { }
    }

    const mainElement = mainRef.current;
    let offsetX = 0;
    let offsetY = 0;

    const onMouseDown = (e) => {
      if (mode !== MODE.EDIT) return;
      setActiveBoxId(boxid);  // Set this box as the active box
      offsetX = e.clientX - boxElement.getBoundingClientRect().left;
      offsetY = e.clientY - boxElement.getBoundingClientRect().top;

      startPosRef.current = {
        x: e.clientX,
        y: e.clientY,
      }
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    };

    const onMouseMove = (e) => {
      if (isResizingRef.current) {
        return
      }

      if (isMainDragging) {
        return
      }

      if (disableMove) {
        return
      }

      const deltaX = (e.clientX - startPosRef.current.x) / mainScale;
      const deltaY = (e.clientY - startPosRef.current.y) / mainScale;

      let newX = pxToNumber(boxElement.style.left || 0) + deltaX;
      let newY = pxToNumber(boxElement.style.top || 0) + deltaY;

      // 边界检查
      if (newX < 0) newX = 0;
      if (newY < 0) newY = 0;
      if (newX + boxElement.offsetWidth > mainElement.offsetWidth) newX = mainElement.offsetWidth - boxElement.offsetWidth;
      if (newY + boxElement.offsetHeight > mainElement.offsetHeight) newY = mainElement.offsetHeight - boxElement.offsetHeight;

      newX = `${newX}px`;
      newY = `${newY}px`;

      boxElement.style.left = newX;
      boxElement.style.top = newY;

      debounceMove({
        newX: newX,
        newY: newY
      });

      startPosRef.current = {
        x: e.clientX,
        y: e.clientY,
      }
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    if (mode === MODE.EDIT) {
      boxElement.addEventListener('mousedown', onMouseDown);
    }

    return () => {
      boxElement.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, [boxid, changeBoxById, mode, scale, mainScale, isMainDragging, isCanvasEditing, disableMove]);

  const boxStyle = useMemo(() => ({
    width: ifNumberToPx(width),
    height: ifNumberToPx(height),
    position: position,
    opacity: opacity,
    left: ifNumberToPx(x),
    top: ifNumberToPx(y),
    zIndex: zIndex,
    outline: activeBoxId === boxid ? '2px dashed #7CB9E8' : 'none',  // Changed 'border' to 'outline'
    transform: `scale(${scale})`,
  }), [width, height, position, opacity, x, y, scale, zIndex, activeBoxId, boxid]);  // Add

  const animateCssClass = useMemo(() => activeBox?.animateCssClass || '', [activeBox]);

  if (hidden) {
    return null;
  }

  return (
    <div
      id={boxid}
      ref={boxRef}
      style={boxStyle}
      className={`${classes.box} ${classes.disableSelection} ${animateCssClass} animate__animated`}
    >
      {children}
      {!isTestOrDisplay && <BoxResize mainRef={mainRef} boxid={boxid} boxStyle={{ outerX: x, outerY: y, width, height }}
        show={showResize}
        isResizingRef={isResizingRef}
        outerBoxRef={boxRef}
      />}
    </div>
  );
}

export default Box;
