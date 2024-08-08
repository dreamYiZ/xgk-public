// videojs wrapper
import React, { useEffect, forwardRef, useImperativeHandle } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import { emptyUndefined, ppplog } from '../util/util';

export const VideoJS = forwardRef((props, ref) => {
  const videoRef = React.useRef(null);
  const playerRef = React.useRef(null);
  const [videoStyle, setVideoStyle] = React.useState(null);
  const { options, onReady, width, height } = props;


  useImperativeHandle(ref, () => {
    return {
      play() {
        const player = playerRef.current;
        player.play();
        // ppplog('player.play', player, player.play);
      }
      // focus() {
      //   inputRef.current.focus();
      // },
      // scrollIntoView() {
      //   inputRef.current.scrollIntoView();
      // },
    };
  }, []);


  useEffect(() => {
    setVideoStyle({
      width: `${width}`,
      height: `${height}`,
    })
  }, [width, height]);

  React.useEffect(() => {

    // Make sure Video.js player is only initialized once
    if (!playerRef.current) {
      // The Video.js player needs to be _inside_ the component el for React 18 Strict Mode.
      const videoElement = document.createElement("video-js");

      videoElement.classList.add('vjs-big-play-centered');
      videoRef.current.appendChild(videoElement);

      const player = playerRef.current = videojs(videoElement, options, () => {
        videojs.log('player is ready');
        onReady && onReady(player);
      });

      // You could update an existing player in the `else` block here
      // on prop change, for example:
    } else {
      const player = playerRef.current;

      player.autoplay(options.autoplay);
      player.src(options.sources);
    }
  }, [options, videoRef]);

  // Dispose the Video.js player when the functional component unmounts
  React.useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <div data-vjs-player {...emptyUndefined(videoStyle)}>
      <div ref={videoRef} />
    </div>
  );
})

export default VideoJS;
