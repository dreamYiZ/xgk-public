import React, { useEffect, useState, useRef } from 'react';
import Box from '@mui/material/Box';
import useBoxStore from '../store/useBo';
import useBeFactory from "../hooks/useBeFactory";
import VideoJS from './videoJsWrap'; // Assuming you have a VideoJS wrapper component
import { ANIMATE_TYPE_MARQUEE_IMAGE_VIDEO } from '../util/util'; // Your constants
import { ppplog } from "../util/util";
import MarqueeImageVideoGoLeft from "./MarqueeImageVideoGoLeft";

const ANIMATION_INTERVAL = 100; // Adjust as needed, faster for smoother animation

export default function MarqueeImageVideo({ box, sub }) {
  const [activeImageVideoItem, setActiveImageVideoItem] = useState(null);
  const [videoStyle, setVideoStyle] = useState(null);
  const imgVideoContainerRef = useRef(null);
  const playerRef = useRef(null);

  const { data } = sub;
  const { canClick } = useBeFactory(sub);
  const [videoJsOptionsState, setVideoJsOptionsState] = useState(null);

  const animationType = sub.animateType;

  useEffect(() => {
    if (!activeImageVideoItem || !imgVideoContainerRef.current) {
      return;
    }

    ppplog('activeImageVideoItem', activeImageVideoItem);

    const containerRect = imgVideoContainerRef.current.getBoundingClientRect();
    const videoWidth = sub.videoWidth || 400; // Example width of the video element
    const videoHeight = sub.videoHeight || 280; // Example height of the video element

    let top = containerRect.height / 2 - videoHeight / 2 + 12;
    let left = activeImageVideoItem.left;

    // Ensure the video doesn't overflow the container horizontally
    if (left + videoWidth > containerRect.width) {
      left = containerRect.width - videoWidth;
    } else if (left < 0) {
      left = 0;
    }

    setVideoStyle({
      top: `${top}px`,
      left: `${left}px`,
      width: `${videoWidth}px`,
      height: `${videoHeight}px`,
    });
  }, [activeImageVideoItem, sub.videoWidth, sub.videoHeight]);

  useEffect(() => {
    if (!activeImageVideoItem) {
      return;
    }

    setVideoJsOptionsState({
      autoplay: true,
      controls: true,
      responsive: true,
      fluid: true,
      sources: [{
        src: activeImageVideoItem.videoUrl,
        type: 'video/mp4'
      }]
    });
  }, [activeImageVideoItem]);

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    // Handle player events here
    player.on('waiting', () => {
      videojs.log('player is waiting');
    });

    player.on('dispose', () => {
      videojs.log('player will dispose');
    });
  };

  const handleContainerClick = (event) => {
    // Only set activeImageVideoItem to null if the click is outside the video
    if (event.target.closest('.video-container')) {
      return;
    }
    if (activeImageVideoItem) {
      setActiveImageVideoItem(null);
    }
  };

  return (
    <div style={{ width: box.width, height: box.height, overflow: 'hidden', position: 'relative' }} onClick={handleContainerClick}>
      <Box p={5} sx={{ width: "100%", height: "100%", position: "relative" }} ref={imgVideoContainerRef}>
        {animationType === ANIMATE_TYPE_MARQUEE_IMAGE_VIDEO.GO_LEFT && (
          <MarqueeImageVideoGoLeft sub={sub} box={box} setActiveImageVideoItem={setActiveImageVideoItem} />
        )}

        {activeImageVideoItem && videoStyle && (
          <Box sx={{ ...videoStyle, position: "absolute" }} className="video-container" onClick={(e) => e.stopPropagation()}>
            <VideoJS options={videoJsOptionsState} onReady={handlePlayerReady} />
          </Box>
        )}
      </Box>
    </div>
  );
}
