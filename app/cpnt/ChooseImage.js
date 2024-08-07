import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import useGlobalStore from '../store/useGlobal';
import Drawer from '@mui/material/Drawer';
import ppplog from "ppplog";

export default function ChooseImage({
  handleChoose,
  show,
  handleClose
}) {
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);


  useEffect(() => {
    // Fetch the images from the API
    Promise.all([
      fetch('/api/liststatic', { method: 'POST' }).then(res => res.json()),
      fetch('/api/listupload', { method: 'POST' }).then(res => res.json())
    ])
      .then(([staticResponse, uploadResponse]) => {
        if (staticResponse.status === 'success' && uploadResponse.status === 'success') {
          const staticImages = staticResponse.files.map((file) => `/static/${file}`);
          const uploadImages = uploadResponse.files.map((file) => `/upload/${file}`);
          const allImages = [...staticImages, ...uploadImages];
          const images = allImages.filter(file => !file.endsWith('.mp4'));
          const videos = allImages.filter(file => file.endsWith('.mp4'));
          setImages(images);
          setVideos(videos); // Assuming you have a state for videos
        } else {
          console.error(staticResponse.error, uploadResponse.error);
        }
      });
  }, []);


  const handleSelect = (image) => {
    handleChoose && handleChoose({ image })
  };

  return (
    <div>
      {show && (
        <Drawer
          anchor="right"
          open={show}
          onClose={handleClose}
        >
          <Box sx={{ width: 600, padding: 2 }}>  {/* Add flex layout */}

            <h2>图片</h2>
            <Box sx={{ width: 600, padding: 2, display: 'flex', flexWrap: 'wrap' }}>  {/* Add flex layout */}
              {images.map((image) => (
                <Box key={image} sx={{ p: 1, m: 1 }}>
                  <img
                    src={image}
                    width={100}
                    height={70}
                    alt={image}
                    className="object-cover w-full"
                    onClick={() => handleSelect(image)}
                  />
                </Box>
              ))}

            </Box>
            <h2>视频</h2>

            <Box sx={{ width: 600, padding: 2, display: 'flex', flexWrap: 'wrap' }}>  {/* Add flex layout */}

              {videos.map((video) => (
                <Box key={video} sx={{ p: 1, m: 1 }}>
                  <Box key={video} sx={{ display: 'flex', flexDirection: 'column' }}>


                    <video
                      src={video}
                      width={100}
                      height={70}
                      controls

                    />
                    <Button onClick={() => handleSelect(video)}>选择</Button>
                  </Box>

                </Box>
              ))}
            </Box>
          </Box>
        </Drawer>
      )}
    </div>
  );
}

