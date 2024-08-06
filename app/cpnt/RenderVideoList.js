import React, { useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import VideoJS from './videoJsWrap'; // Assuming you have a VideoJS wrapper component

const RenderVideoList = React.memo(({ muted, videoSrcList, currentIndex, handleVideoEnded, fullscreen }) => {
  const videoRef = useRef([]);

  useEffect(() => {
    const handleMouseMove = () => {
      const videoElements = document.querySelectorAll('.video-swiper-box video');
      videoElements.forEach((videoElement) => {
        if (videoElement.paused) {
          videoElement.play();
        }
      });
    };

    // if (fullscreen) {
    window.addEventListener('mousemove', handleMouseMove);
    // }

    return () => {
      // if (fullscreen) {
      window.removeEventListener('mousemove', handleMouseMove);
      // }
    };
  }, []);

  return (
    <>
      {videoSrcList.map((src, index) => {
        if (index === currentIndex) {
          return (
            <Box className="video-swiper-box" key={index}>
              <VideoJS
                options={{
                  responsive: true,
                  fluid: true,
                  autoplay: true, // Autoplay only the first video
                  muted: muted,
                  sources: [{
                    src: src, // Select video source cyclically
                    type: 'video/mp4',
                  }],
                }}
                onReady={(player) => {
                  player.on('ended', handleVideoEnded);
                }}
                ref={(el) => (videoRef.current[index] = el)}
              />
            </Box>
          );
        } else {
          return null;
        }
      })}
    </>
  );
});

export default RenderVideoList;
