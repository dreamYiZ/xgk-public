import React, { useEffect, useState, useRef } from 'react';
import Box from '@mui/material/Box';
import useBoxStore from '../store/useBo';
import useBeFactory from "../hooks/useBeFactory";
import VideoJS from './videoJsWrap'; // Assuming you have a VideoJS wrapper component
import { ANIMATE_TYPE_MARQUEE_IMAGE_VIDEO } from '../util/util'; // Your constants
import { ppplog, pxToNumber } from "../util/util";

const ANIMATION_INTERVAL = 100; // Adjust as needed, faster for smoother animation

export default function MarqueeImageVideo({ box, sub }) {



  const { canClick } = useBeFactory(sub);

  const animationType = sub.animateType;



  return (
    <div style={{ width: box.width, height: box.height, overflow: 'hidden', position: 'relative' }}>
      <Box p={5} display="flex" flexDirection="column" alignItems="center">

      </Box>
    </div>
  );
}

