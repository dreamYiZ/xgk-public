import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
// This imports the functional component from the previous sample.
import VideoJS from './videoJsWrap';
import { ppplog } from "../util/util";


const RenderVideoJs = ({ sub }) => {
  const playerRef = React.useRef(null);

  // const videoJsOptions = {
  //   autoplay: true,
  //   controls: true,
  //   responsive: true,
  //   fluid: true,
  //   sources: [{
  //     src: '/path/to/video.mp4',
  //     type: 'video/mp4'
  //   }]
  // };


  const [videoJsOptionsState, setVideoJsOptionsState] = useState(null);


  const handlePlayerReady = (player) => {
    playerRef.current = player;

    // playerRef.current?.play();

    // You can handle player events here, for example:
    player.on('waiting', () => {
      ppplog('player is waiting');
    });

    player.on('dispose', () => {
      ppplog('player will dispose');
    });
  };

  useEffect(() => {
    try {
      setVideoJsOptionsState(sub.videoJsOptions)

    } catch (e) {
      console.error(e);
    }

  }, [sub])


  useEffect(() => {
    const handleMouseMove = () => {
      const videoElements = document.querySelectorAll('.video-single-auto video');
      videoElements.forEach((videoElement) => {
        // ppplog('videoElement.muted', videoElement.muted)
        if (videoElement.paused) {
          videoElement.play();
        }
        if (videoElement.muted) {
          videoElement.muted = false;
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);


  return (
    <>
      <Box className="video-single-auto">
        {videoJsOptionsState && <VideoJS id="videojs" options={videoJsOptionsState} onReady={handlePlayerReady} />}
      </Box>
    </>
  );
}


export default RenderVideoJs;
