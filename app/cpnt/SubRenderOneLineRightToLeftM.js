import React, { useState, useEffect, useRef } from 'react';
import { Box } from '@mui/material';

const SubRenderOneLineRightToLeftMultiple = ({ box, sub }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animationDuration, setAnimationDuration] = useState(0);
  const [resetAnimation, setResetAnimation] = useState(false);
  const textRef = useRef(null);

  useEffect(() => {
    if (textRef.current) {
      // Calculate the width of the content
      const contentWidth = textRef.current.offsetWidth;
      // Calculate the animation duration based on the speed and content width
      const duration = contentWidth / (sub.speed * sub.fontSize);
      setAnimationDuration(duration);
    }
  }, [sub.content, sub.speed, sub.fontSize, currentIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      setResetAnimation(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % sub.content.length);
        setResetAnimation(false);
      }, 50); // Small delay to reset the animation
    }, animationDuration * 1000);

    return () => clearInterval(interval);
  }, [animationDuration, sub.content.length]);

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
          animation: resetAnimation ? 'none' : `move-SubRenderOneLineRightToLeft ${animationDuration}s linear infinite`,
          fontSize: `${sub.fontSize}px`,
          fontWeight: sub.fontWeight,
          color: sub.color,
        }}
      >
        {resetAnimation ? '' : sub.content[currentIndex]}
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
};

export default SubRenderOneLineRightToLeftMultiple;
