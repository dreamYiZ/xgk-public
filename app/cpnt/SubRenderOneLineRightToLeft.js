import React, { memo, useState, useEffect, useRef } from 'react';
import { Box } from '@mui/material';

const SubRenderOneLineRightToLeft = memo(({ box, sub }) => {
  const [animationDuration, setAnimationDuration] = useState(0);
  const textRef = useRef(null);

  useEffect(() => {
    if (textRef.current) {
      // Calculate the width of the content
      const contentWidth = textRef.current.offsetWidth;
      // Calculate the animation duration based on the speed and content width
      const duration = contentWidth / (sub.speed * sub.fontSize);
      setAnimationDuration(duration);
    }
  }, [sub.content, sub.speed, sub.fontSize]);

  return (
    <Box
      sx={{
        overflow: 'hidden',
        width: `${box.width}px`,
        height: `${box.height}px`,
        position: 'relative',
        whiteSpace: 'nowrap',
      }}
    >
      <Box
        ref={textRef}
        sx={{
          display: 'inline-block',
          position: 'absolute',
          right: 0,
          animation: `move-SubRenderOneLineRightToLeft ${animationDuration}s linear infinite`,
          fontSize: `${sub.fontSize}px`,
          fontWeight: sub.fontWeight,
          color: sub.color,
        }}
      >
        {sub.content}
      </Box>
      <style>
        {`
          @keyframes move-SubRenderOneLineRightToLeft {
            0% {
              transform: translateX(100%);
            }
            100% {
              transform: translateX(-${sub.endSpace ?? 10}%);
            }
          }
        `}
      </style>
    </Box>
  );
});

export default SubRenderOneLineRightToLeft;
