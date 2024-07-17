import React, { useState, useEffect } from 'react';
import { TIME_TYPE, MARQUEE_TYPE, ppplog } from "../util/util";
import classes from "./SubRenderMarquee.module.sass";
import { Box } from '@mui/system';  // 引入 Box 组件

export default function (
  { box, sub }

) {

  const { marqueeType, time, fontSize, color } = sub

  return <div style={{ width: box.width, height: box.height, }} >
    <Box sx={{ overflow: "hidden", height: "100%" }}>
      <Box sx={{ animation: `${classes.marqueeTop} ${time}s linear infinite` }}>
        {marqueeType === MARQUEE_TYPE.BASIC && <RenderMarqueeBase sub={sub} />}
      </Box>
    </Box>
  </div>
}


const RenderMarqueeBase = ({ sub }) => {
  const { data, color, fontSize } = sub;
  return <Box >
    {data.map(line => {
      return <div style={{ color: color, fontSize: `${fontSize}px` }}>{line}</div>
    })}
  </Box>
}
