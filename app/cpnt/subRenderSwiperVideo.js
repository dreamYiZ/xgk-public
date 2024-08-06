import React, { useState, useEffect, useCallback } from 'react';
import { Box } from '@mui/material';
import RenderVideoList from './RenderVideoList'; // Import the RenderVideoList component
import useGlobalStore from '../store/useGlobal';

const SubRenderVideo = ({ box, sub }) => {
  const { fullscreen, videoSrcList } = sub;
  const [currentIndex, setCurrentIndex] = useState(0);

  const { mainScale, getIsTestOrDisplay, mode, screenWidth, screenHeight } = useGlobalStore();

  const {muted} = sub;

  const handleVideoEnded = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % videoSrcList.length);
  }, [videoSrcList.length]);

  useEffect(() => {
    setCurrentIndex(0); // Reset index when videoSrcList changes
  }, [videoSrcList]);

  // Define containerStyle outside of the effect
  const containerStyle = fullscreen
    ? {
        width: getIsTestOrDisplay() ? `${100 }vw` : `${screenWidth}px`,
        height: getIsTestOrDisplay() ? `${100 }vh` : `${screenHeight}px`,
        backgroundColor: '#000000',
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        padding: 0,
      }
    : { width: box.width, height: box.height };

  return (
    <Box p={3} sx={{ overflow: 'hidden', ...containerStyle }}>
      <RenderVideoList
        videoSrcList={videoSrcList}
        currentIndex={currentIndex}
        handleVideoEnded={handleVideoEnded}
        fullscreen={fullscreen}
        muted={muted}
      />
    </Box>
  );
};

export default SubRenderVideo;
