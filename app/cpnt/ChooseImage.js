import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import ppplog from "ppplog";

export default function ChooseImage({
  handleChoose,
  show,
  handleClose,
  type = 'all' // Default type is 'all'
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
          const staticImages = staticResponse.files
            .filter(file => file !== '.DS_Store')
            .map((file) => `/static/${file}`);
          const uploadImages = uploadResponse.files
            .filter(file => file !== '.DS_Store')
            .map((file) => `/upload/${file}`);
          const allImages = [...staticImages, ...uploadImages];
          const images = allImages.filter(file => !file.endsWith('.mp4'));
          const videos = allImages.filter(file => file.endsWith('.mp4'));
          setImages(images);
          setVideos(videos);
        } else {
          console.error(staticResponse.error, uploadResponse.error);
        }
      });
  }, []);

  const handleSelect = (image) => {
    handleChoose && handleChoose({ image });
  };

  return (
    <div>
      {show && (
        <Drawer
          anchor="right"
          open={show}
          onClose={handleClose}
        >
          <Box sx={{ width: 600, padding: 2 }}>
            {type !== 'video' && (
              <>
                <h2>图片</h2>
                <Box sx={{ width: 580, padding: 2, display: 'flex', flexWrap: 'wrap' }}>
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
              </>
            )}
            {type !== 'image' && (
              <>
                <h2>视频</h2>
                <Box sx={{ width: 580, padding: 2, display: 'flex', flexWrap: 'wrap' }}>
                  {videos.map((video) => (
                    <Box key={video} sx={{ p: 1, m: 1 }}>
                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <video
                          src={video}
                          width={210}
                          height={140}
                          controls
                        />
                        <Button onClick={() => handleSelect(video)}>选择</Button>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </>
            )}
          </Box>
        </Drawer>
      )}
    </div>
  );
}
