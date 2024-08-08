import React, { useState, useRef } from 'react';
import { Box, Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import VideoJS from './videoJsWrap'; // Assuming you have a VideoJS wrapper component

export default function PreviewVideo({ src, width = 90, height = 50, style, ...rest }) {
  const [open, setOpen] = useState(false);
  const videoRef = useRef(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box {...rest}>
      <Box
        onClick={handleClickOpen}
        sx={{
          width: `${width}px`,
          height: `${height}px`,
          cursor: 'pointer',
          overflow: 'hidden',
          position: 'relative',
          ...style,
        }}
      >
        <VideoJS
          options={{
            responsive: true,
            fluid: true,
            autoplay: false,
            muted: true,
            sources: [{
              src: src,
              type: 'video/mp4',
            }],
          }}
          ref={videoRef}
        />
      </Box>

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>
          视频预览
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <VideoJS
            options={{
              responsive: true,
              fluid: true,
              autoplay: true,
              muted: false,
              controls: true,
              sources: [{
                src: src,
                type: 'video/mp4',
              }],
            }}
            ref={videoRef}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
}
