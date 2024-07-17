"use client"
import { useRef, useEffect, useMemo } from 'react';  // Import useMemo
import classes from "./box.module.sass";
import useBoxStore from '../store/useBo';
import ppplog from "ppplog";
import useGlobalStore, { MODE } from '../store/useGlobal';
import zIndex from '@mui/material/styles/zIndex';
import { stringToNumber, debounce } from "../util/util";

function Box({ boxid, width, height, position, opacity,
  children, groupid, x, y, scale, mainRef, ...other }) {
  const boxRef = useRef(null);
  const changeBoxById = useBoxStore((state) => state.changeById);
  const setActiveBoxId = useBoxStore((state) => state.setActiveBoxId);  // Access the 'setActiveBoxId' function
  const { mode } = useGlobalStore();

  const activeBoxId = useBoxStore((state) => state.activeBoxId);  // Access the 'activeBoxId' state


  const debounceMove = (fn) => debounce(() => { fn() }, 300)

  useEffect(() => {

    if (mode === MODE.EDIT) {
      return () => { }
    }

    const boxElement = boxRef.current;
    const mainElement = mainRef.current;
    let offsetX = 0;
    let offsetY = 0;

    const onMouseDown = (e) => {
      if (mode !== MODE.EDIT) return;
      setActiveBoxId(boxid);  // Set this box as the active box
      ppplog('boxElement.getBoundingClientRect()', boxElement.getBoundingClientRect(), scale)
      if (scale) {
        offsetX = e.clientX - boxElement.getBoundingClientRect().left;
        offsetY = e.clientY - boxElement.getBoundingClientRect().top;
      } else {
        offsetX = e.clientX - boxElement.getBoundingClientRect().left;
        offsetY = e.clientY - boxElement.getBoundingClientRect().top;
      }

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    };

    const onMouseMove = (e) => {
      let newX = e.clientX - offsetX - mainElement.getBoundingClientRect().left;
      let newY = e.clientY - offsetY - mainElement.getBoundingClientRect().top;


      if (scale) {
        newX = e.clientX - offsetX - mainElement.getBoundingClientRect().left + boxElement.getBoundingClientRect().width * (stringToNumber(scale) - 1) / 2;
        newY = e.clientY - offsetY - mainElement.getBoundingClientRect().top + boxElement.getBoundingClientRect().height * (stringToNumber(scale) - 1) / 2;
      }

      // 边界检查
      if (newX < 0) newX = 0;
      if (newY < 0) newY = 0;
      if (newX + boxElement.offsetWidth > mainElement.offsetWidth) newX = mainElement.offsetWidth - boxElement.offsetWidth;
      if (newY + boxElement.offsetHeight > mainElement.offsetHeight) newY = mainElement.offsetHeight - boxElement.offsetHeight;

      newX = `${newX}px`;
      newY = `${newY}px`;

      boxElement.style.left = newX;
      boxElement.style.top = newY;


      debounceMove(() => {
        changeBoxById(boxid, { x: newX, y: newY });
      })

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
  }, [boxid, changeBoxById, mode, scale]);

  const boxStyle = useMemo(() => ({
    width: width,
    height: height,
    position: position,
    opacity: opacity,
    left: x,
    top: y,
    zIndex: zIndex,
    outline: activeBoxId === boxid ? '2px dashed #7CB9E8' : 'none',  // Changed 'border' to 'outline'
    transform: `scale(${scale})`,
  }), [width, height, position, opacity, x, y, scale, zIndex, activeBoxId, boxid]);  // Add


  return <div id={boxid} ref={boxRef} style={boxStyle} className={`${classes.box} ${classes.disableSelection}`}>{children}</div>;

}

export default Box;
