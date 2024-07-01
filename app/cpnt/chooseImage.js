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


  useEffect(() => {
    // Fetch the images from the API
    fetch('/api/liststatic', {
      method: 'POST',
    })
      .then(res => res.json())
      .then(response => {
        if (response.status === 'success') {
          const images = response.files.map((file) => `/static/${file}`);
          ppplog('images', images)
          setImages(images);
        } else {
          console.error(response.error);
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
        </Drawer>
      )}
    </div>
  );
}
