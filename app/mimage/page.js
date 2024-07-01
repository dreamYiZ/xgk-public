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
        if (response.status === 'success') {
          const images = response.files.map((file) => `/upload/${file}`);
          setImages(images);
        } else {
          console.error(response.error);
        }
      });
  }, []);

  const handleDelete = (image) => {
    // Send a request to the server to delete the image
    fetch('/api/deleteimage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ image }),
    })
      .then(res => res.json())
      .then(response => {
        if (response.status === 'success') {
          // Remove the image from the state
          setImages(images.filter(img => img !== image));
        } else {
          console.error(response.error);
        }
      });
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
