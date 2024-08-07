import * as React from 'react';
import { useEffect, useState } from "react";
import Box from '@mui/material/Box';

export default function ({ sub, box }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [images, setImages] = useState([sub.images[0], sub.images[1]]);
  const [zIndex, setZIndex] = useState([1, 0]);
  const [firstLoad, setFirstLoad] = useState(true);

  useEffect(() => {
    let timeout;

    const updateImage = () => {
      setCurrentImageIndex((prevIndex) => {
        const newIndex = (prevIndex + 1) % sub.images.length;
        timeout = setTimeout(updateImage, sub.time[newIndex] * 1000);
        return newIndex;
      });
    };

    timeout = setTimeout(updateImage, sub.time[currentImageIndex] * 1000);

    return () => clearTimeout(timeout);
  }, [sub.images, sub.time, currentImageIndex]);

  useEffect(() => {
    if (firstLoad) {
      setFirstLoad(false);
      return;
    }

    setZIndex([0, 1]);
    const img_0 = sub.images[currentImageIndex];
    const img_1 = sub.images[(currentImageIndex + 1) % sub.images.length];
    setImages([img_0, img_1]);

    const timeout = setTimeout(() => {
      const img_0 = sub.images[(currentImageIndex + 1) % sub.images.length];
      const img_1 = sub.images[(currentImageIndex + 2) % sub.images.length];
      setImages([img_0, img_1]);
      setZIndex([1, 0]);
    }, sub.time[currentImageIndex] * 1000 - 300);

    return () => clearTimeout(timeout);
  }, [currentImageIndex, sub.images, sub.time]);

  const commonStyle = {
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
    width: sub.fullscreen ? '100vw' : box.width || '100%',
    height: sub.fullscreen ? '100vh' : box.height || '100%',
    position: sub.fullscreen ? 'fixed' : 'absolute',
    top: sub.fullscreen ? 0 : 'auto',
    left: sub.fullscreen ? 0 : 'auto',
  };

  return (
    <Box sx={{ position: sub.fullscreen ? 'fixed' : 'relative' }}>
      <div style={{ ...commonStyle, backgroundImage: `url(${images[0]})`, zIndex: zIndex[0] }}></div>
      <div style={{ ...commonStyle, backgroundImage: `url(${images[1]})`, zIndex: zIndex[1] }}></div>
    </Box>
  );
}
