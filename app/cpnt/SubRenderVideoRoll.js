import * as React from 'react';
import { useEffect, useState, useRef, useMemo, useCallback, useTransition } from "react";
import Box from '@mui/material/Box';
import { ppplog } from "../util/util";
import useGlobalStore from '../store/useGlobal';
import VideoJS from './videoJsWrap'; // Assuming you have a VideoJS wrapper component

export default function ({ sub, box }) {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoRef = useRef([]);
  const [isPending, startTransition] = useTransition();
  const [videoTwo, setVideoTwo] = useState(null);
  const [zIndex, setZIndex] = useState([1, 0]);

  const { screenWidth, screenHeight, getIsTestOrDisplay } = useGlobalStore();
  const { videoList } = sub;
  const timeoutArrRef = useRef([]);
  const [firstLoad, setFirstLoad] = useState(true);

  useEffect(() => {
    if (videoList.length < 2) {
      return;
    }

    const newIndex = 0;
    const newIndexSecond = 1;
    setVideoTwo([videoList[newIndex], videoList[newIndexSecond]]);
  }, [videoList]);

  const handleVideoEnded = useCallback(() => {
    ppplog('handleVideoEnded');
    startTransition(() => {
      setCurrentVideoIndex((prevIndex) => {
        const newIndex = (prevIndex + 1) % videoList.length;
        const newIndexSecond = (newIndex + 1) % videoList.length;
        setVideoTwo([videoList[newIndex], videoList[newIndexSecond]]);
        return newIndex;
      });

      setZIndex([0, 1]);
      videoRef.current[1]?.play();
    });
  }, [videoList.length]);

  useEffect(() => {
    ppplog('videoTwo', videoTwo);
  }, [videoTwo]);

  useEffect(() => {
    if (firstLoad) {
      setFirstLoad(false);
      return;
    }

    const timeoutId = setTimeout(() => {
      setZIndex([1, 0]);
      // setVideoTwo([videoList[(currentVideoIndex + 1) % videoList.length], videoList[(currentVideoIndex + 2) % videoList.length]]);
      setVideoTwo([videoList[currentVideoIndex], videoList[(currentVideoIndex + 1) % videoList.length]]);
    }, 0);

    timeoutArrRef.current.push(timeoutId);

    return () => {
      timeoutArrRef.current.forEach(timeout => {
        clearTimeout(timeout);
      });
      timeoutArrRef.current = [];
    };
  }, [currentVideoIndex, videoList]);

  const commonStyle = useMemo(() => ({
    backgroundPosition: 'center center',
    backgroundSize: '100% 100%',
    width: sub.fullscreen ? (!getIsTestOrDisplay() ? `${screenWidth}px` : '100vw') : box.width || '100%',
    height: sub.fullscreen ? (!getIsTestOrDisplay() ? `${screenHeight}px` : '100vh') : box.height || '100%',
    position: sub.fullscreen ? 'fixed' : 'absolute',
    top: sub.fullscreen ? 0 : 'auto',
    left: sub.fullscreen ? 0 : 'auto',
    zIndex: sub.fullscreen ? 9999 : 10,
  }), [sub.fullscreen, getIsTestOrDisplay, screenWidth, screenHeight, box.width, box.height]);

  return (
    <Box sx={{ position: sub.fullscreen ? 'fixed' : 'relative' }}>
      {videoTwo &&
        <>
          <RenderVideo index={0} videoRef={videoRef} commonStyle={commonStyle}
            autoplay src={videoTwo[0]} zIndex={zIndex[0]} handleVideoEnded={handleVideoEnded} />
          <RenderVideo index={1} videoRef={videoRef} commonStyle={commonStyle}
            src={videoTwo[1]} zIndex={zIndex[1]} handleVideoEnded={handleVideoEnded} />
        </>
      }
    </Box>
  );
}

const RenderVideo = ({
  handleVideoEnded,
  src,
  autoplay,
  zIndex,
  commonStyle,
  videoRef,
  index,
}) => {
  // ppplog('autoplay', autoplay);
  return (
    <Box style={{ ...commonStyle, zIndex: zIndex }}>
      <VideoJS
        options={{
          responsive: true,
          fluid: true,
          autoplay: autoplay, // Autoplay only the first video
          muted: true,
          sources: [{
            src: src,
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
}
