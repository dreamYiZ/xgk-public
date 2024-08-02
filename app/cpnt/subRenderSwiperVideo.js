import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import VideoJS from './videoJsWrap'; // Assuming you have a VideoJS wrapper component

const SubRenderVideo = ({ box, sub }) => {
  const { fullscreen, videoSrcList } = sub;
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleVideoEnded = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % videoSrcList.length);
  };

  useEffect(() => {
    setCurrentIndex(0); // Reset index when videoSrcList changes
  }, [videoSrcList]);

  return (
    <div style={{ width: box.width, height: box.height }}>
      <>
        {videoSrcList.map((src, index) => {
          if (index === currentIndex) {
            return (
              <VideoJS
                key={index}
                options={{
                  responsive: true,
                  fluid: true,
                  autoplay: index === 0, // Autoplay only the first video
                  sources: [{
                    src: src, // Select video source cyclically
                    type: 'video/mp4',
                  }],
                }}
                onReady={(player) => {
                  player.on('ended', handleVideoEnded);
                }}
              />
            );
          } else {
            return null;
          }
        })}
      </>
    </div>
  );
};

export default SubRenderVideo;
