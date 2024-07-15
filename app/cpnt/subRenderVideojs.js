import React, { useEffect, useState } from 'react';

// This imports the functional component from the previous sample.
import VideoJS from './videoJsWrap';

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

    // You can handle player events here, for example:
    player.on('waiting', () => {
      videojs.log('player is waiting');
    });

    player.on('dispose', () => {
      videojs.log('player will dispose');
    });
  };

  useEffect(() => {
    try {
      setVideoJsOptionsState(sub.videoJsOptions)

    } catch (e) {
      console.error(e);
    }

  }, [sub])

  return (
    <>
     {videoJsOptionsState && <VideoJS options={videoJsOptionsState} onReady={handlePlayerReady} />}
    </>
  );
}


export default RenderVideoJs;
