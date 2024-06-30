"use client";
import React, { useEffect, useState } from 'react';
import Image from "next/image";
import withPassword from '../cpnt/withPassword';
import ppplog from "ppplog";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

function M_IMAGE() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Fetch the images from the API
    fetch('/api/listupload', {
      method: 'POST',
    })
      .then(res => res.json())
      .then(response => {
        ppplog('response', response);
        if (response.status === 'success') {
          const images = response.files.map((file) => `/upload/${file}`);
          setImages(images);
        } else {
          console.error(response.error);
        }
      });
  }, []);

  const handleDelete = (image) => {
    // Add your delete logic here
    console.log(`Delete ${image}`);
  };

  const isImage = (filename) => {
    return filename.endsWith('.jpg') || filename.endsWith('.jpeg') || filename.endsWith('.png');
  };

  return (
    <main>
      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
        {images.map((image) => (
          <Box key={image} sx={{ p: 1, m: 1 }}>
            {isImage(image) ? (
              <img
                src={image}
                width={100}
                height={70}
                alt={image}
                className="object-cover w-full"
              />
            ) : (
              <InsertDriveFileIcon style={{ fontSize: 70 }} />
            )}
            <p>{image}</p>
            <Button variant="contained" color="secondary" onClick={() => handleDelete(image)}>Delete</Button>
          </Box>
        ))}
      </Box>
    </main>
  );
}

export default withPassword(M_IMAGE);
