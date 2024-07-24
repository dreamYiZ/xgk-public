import React from 'react';
import Box from '@mui/material/Box';
import classes from './RenderSlowUp.module.sass';

export default function ({ children, animationTime }) {
  const boxStyle = {
    '--animation-time': animationTime
  };

  return (
    <Box className={classes.boxContainer}>
      <Box className={`${classes.box} ${classes.box1}`} style={boxStyle}>
        {children}
      </Box>
      <Box className={`${classes.box} ${classes.box2}`} style={boxStyle}>
        {children}
      </Box>
    </Box>
  );
}
