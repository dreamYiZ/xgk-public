import * as React from 'react';
import { useEffect, useState, useRef, useMemo, useCallback, useTransition } from "react";
import Box from '@mui/material/Box';
import { ppplog } from "../util/util";
import useGlobalStore from '../store/useGlobal';

export default function ({ sub, box }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [images, setImages] = useState([sub.images[0], sub.images[1]]);
  const [zIndex, setZIndex] = useState([1, 0]);
  const [firstLoad, setFirstLoad] = useState(true);
  const timeoutsRef = useRef([]);
  const [isPending, startTransition] = useTransition();

  const { screenWidth, screenHeight, getIsTestOrDisplay } = useGlobalStore();

  const clearAllTimeouts = useCallback(() => {
    timeoutsRef.current.forEach(timeout => clearTimeout(timeout));
    timeoutsRef.current = [];
  }, []);

  const updateImage = useCallback(() => {
    setCurrentImageIndex((prevIndex) => {
      const newIndex = (prevIndex + 1) % sub.images.length;
      // ppplog('sub.time[newIndex]', sub.time[newIndex]);
      clearAllTimeouts();
      timeoutsRef.current.push(setTimeout(() => {
        startTransition(() => {
          setCurrentImageIndex(newIndex);
        });
      }, sub.time[newIndex] * 1000));
      return newIndex;
    });
  }, [sub.images, sub.time, clearAllTimeouts]);

  useEffect(() => {
    timeoutsRef.current.push(setTimeout(updateImage, sub.time[currentImageIndex] * 1000));
    return clearAllTimeouts;
  }, [updateImage, sub.time, currentImageIndex]);

  useEffect(() => {
    if (firstLoad) {
      setFirstLoad(false);
      return;
    }

    // ppplog('currentImageIndex useEffect', currentImageIndex);

    setZIndex([0, 1]);

    const timeout = setTimeout(() => {
      const img_0 = sub.images[currentImageIndex % sub.images.length];
      const img_1 = sub.images[(currentImageIndex + 1) % sub.images.length];
      setImages([img_0, img_1]);
      setZIndex([1, 0]);
    }, 500);

    timeoutsRef.current.push(timeout);

    return () => clearTimeout(timeout);
  }, [currentImageIndex, sub.images, sub.time]);

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
      <div style={{ ...commonStyle, backgroundImage: `url(${images[0]})`, zIndex: zIndex[0] }}></div>
      <div style={{ ...commonStyle, backgroundImage: `url(${images[1]})`, zIndex: zIndex[1] }}></div>
    </Box>
  );
}
