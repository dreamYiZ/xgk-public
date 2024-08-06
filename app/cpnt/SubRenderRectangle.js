
import React from 'react';
import { Box } from '@mui/material';

const SubRenderRectangle = ({ box, sub }) => {
  return (
    <Box
      sx={{
        width: `${box.width}px`,
        height: `${box.height}px`,
        backgroundColor: sub.backgroundColor,
      }}
    />
  );
};

export default SubRenderRectangle;
