import React, { useRef, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import classes from './RenderSlowUp.module.sass';

export default function ({ children, animationTime, rowHeight }) {
  const box1Ref = useRef(null);
  const [containerHeight, setContainerHeight] = useState(0);

  const boxStyle = {
    '--animation-time': `${animationTime}s`,
  };

  useEffect(() => {
    if (box1Ref.current) {
      const box1ScrollHeight = box1Ref.current.scrollHeight;
      setContainerHeight(box1ScrollHeight * 2);
    }
  }, [children, animationTime, rowHeight]);

  return (
    <Box className={classes.boxContainer} style={{ height: containerHeight / 2 }}>
      <Box className={classes.boxMiddleContainer} style={{ height: containerHeight }}>
        <Box ref={box1Ref} className={`${classes.box} ${classes.box1}`} style={boxStyle}>
          {children}
        </Box>
        <Box className={`${classes.box} ${classes.box2}`} style={boxStyle}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}
