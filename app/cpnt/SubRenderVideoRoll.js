import * as React from 'react';
import {
  useEffect, memo,
  useState, useRef, useMemo, useCallback, useTransition
} from "react";
import Box from '@mui/material/Box';
import { ppplog } from "../util/util";
import useGlobalStore from '../store/useGlobal';
import VideoJS from './videoJsWrap'; // Assuming you have a VideoJS wrapper component

export default memo(function ({ sub, box }) {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoRef = useRef([]);
  const [isPending, startTransition] = useTransition();
  const [zIndex, setZIndex] = useState([1, 0]);
  const [videoTwo, setVideoTwo] = useState(null);

  const { screenWidth, screenHeight, getIsTestOrDisplay } = useGlobalStore();
  const { videoList } = sub;
  const timeoutArrRef = useRef([]);
  const [firstLoad, setFirstLoad] = useState(true);
  const [secondAutoPlay, setSecondAutoPlay] = useState(true);
  const [firstAutoPlay, setFirstAutoPlay] = useState(true);
  const isFirstPlaying = useRef(true);

  // const videoTwo = useMemo(() => {
  //   if (videoList.length < 2) return null;
  //   const newIndex = currentVideoIndex % videoList.length;
  //   const newIndexSecond = (newIndex + 1) % videoList.length;
  //   return [videoList[newIndex], videoList[newIndexSecond]];
  // }, [currentVideoIndex, videoList]);


  useEffect(() => {
    if (videoList.length < 2) {
      return;
    }

    const newIndex = 0;
    const newIndexSecond = 1;
    setVideoTwo([videoList[newIndex], videoList[newIndexSecond]]);
  }, [videoList]);

  const handleVideoEnded = useCallback((playerIndex) => {
    if (playerIndex === 0 && isFirstPlaying || (playerIndex === 1 && !isFirstPlaying)) {

      ppplog('handleVideoEnded');
      startTransition(() => {
        // const newIndex = (prevIndex + 1) % videoList.length);
        setCurrentVideoIndex((prevIndex) => {
          const newIndex = (prevIndex + 1) % videoList.length;
          const newIndexSecond = (prevIndex + 2) % videoList.length;
          if (isFirstPlaying.current) {
            setZIndex([0, 1]);
            // videoRef.current[1]?.play();
            // ppplog('videoRef.current[1]', videoRef.current[1]);

            videoRef.current[1]?.currentTime(0);
            setSecondAutoPlay(true);
            // setFirstAutoPlay(false);
            isFirstPlaying.current = false;
            setVideoTwo([videoList[newIndexSecond], videoList[newIndex]]);

          } else {
            setZIndex([1, 0]);
            // videoRef.current[0]?.play();
            // ppplog('videoRef.current[0]', videoRef.current[0]);
            videoRef.current[0]?.currentTime(0);
            setSecondAutoPlay(false);
            // setFirstAutoPlay(true);
            isFirstPlaying.current = true;
            setVideoTwo([videoList[newIndex], videoList[newIndexSecond]]);

          }
          return newIndex;
        });



      });
    }

  }, [videoList]);


  const commonStyle = useMemo(() => ({
    backgroundPosition: 'center center',
    backgroundSize: '100% 100%',
    width: sub.fullscreen ? (getIsTestOrDisplay() ? '100vw' : `${screenWidth}px`) : box.width || '100%',
    height: sub.fullscreen ? (getIsTestOrDisplay() ? '100vh' : `${screenHeight}px`) : box.height || '100%',
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
            autoplay={firstAutoPlay} src={videoTwo[0]} zIndex={zIndex[0]} handleVideoEnded={() => handleVideoEnded(0)} />
          <RenderVideo index={1} videoRef={videoRef} commonStyle={commonStyle}
            autoplay={secondAutoPlay} src={videoTwo[1]} zIndex={zIndex[1]} handleVideoEnded={() => handleVideoEnded(1)} />
        </>
      }
    </Box>
  );
})

const RenderVideo = memo(({
  handleVideoEnded,
  src,
  autoplay,
  zIndex,
  commonStyle,
  videoRef,
  index,
}) => {
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
})
