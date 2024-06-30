import { useRef, useEffect } from 'react';
import classes from "./box.module.sass";
import useBoxStore from '../store/useBo';
import ppplog from "ppplog";
import useGlobalStore, { MODE } from '../store/useGlobal';
import zIndex from '@mui/material/styles/zIndex';

function Box({ boxid, width, height, position, opacity, children, groupid, x, y, mainRef, ...other }) {
  const boxRef = useRef(null);
  const changeBoxById = useBoxStore((state) => state.changeById);
  const { mode } = useGlobalStore();

  const activeBoxId = useBoxStore((state) => state.activeBoxId);  // Access the 'activeBoxId' state

  ppplog('boxid', boxid);
  useEffect(() => {
    const boxElement = boxRef.current;
    const mainElement = mainRef.current;
    let offsetX = 0;
    let offsetY = 0;

    const onMouseDown = (e) => {
      if (mode !== MODE.EDIT) return;
      ppplog('mouseDown');
      offsetX = e.clientX - boxElement.getBoundingClientRect().left;
      offsetY = e.clientY - boxElement.getBoundingClientRect().top;
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    };

    const onMouseMove = (e) => {
      ppplog('mouseMove');
      let newX = e.clientX - offsetX - mainElement.getBoundingClientRect().left;
      let newY = e.clientY - offsetY - mainElement.getBoundingClientRect().top;

      // 边界检查
      if (newX < 0) newX = 0;
      if (newY < 0) newY = 0;
      if (newX + boxElement.offsetWidth > mainElement.offsetWidth) newX = mainElement.offsetWidth - boxElement.offsetWidth;
      if (newY + boxElement.offsetHeight > mainElement.offsetHeight) newY = mainElement.offsetHeight - boxElement.offsetHeight;

      newX = `${newX}px`;
      newY = `${newY}px`;

      boxElement.style.left = newX;
      boxElement.style.top = newY;
      changeBoxById(boxid, { x: newX, y: newY });
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    boxElement.addEventListener('mousedown', onMouseDown);

    return () => {
      boxElement.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, [boxid, changeBoxById, mode]);

  const boxStyle = {
    width: width,
    height: height,
    position: position,
    opacity: opacity,
    left: x,
    top: y,
    zIndex: zIndex,
    border: activeBoxId === boxid ? '2px dashed #7CB9E8' : 'none',  // Add this line
  };

  return <div ref={boxRef} style={boxStyle} className={classes.box}>{children}</div>;

}

export default Box;
