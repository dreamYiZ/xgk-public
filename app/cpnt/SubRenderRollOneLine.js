import React from 'react';
import { maybeNumberOr, ppplog, TIME_TYPE, MARQUEE_TYPE } from "../util/util";
import classes from "./SubRenderMarquee.module.sass";
import RenderBasicTable from "./RenderBasicTable";
import { useEffect, useState, useRef } from "react";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Swiper, SwiperSlide } from "./SwiperWarper";
import Avatar from '@mui/material/Avatar';
import useRollOne from "../hooks/useRollOne";
import useRollOneAnimate from "../hooks/useRollOneAnimate";

export default function (
  { box, sub }

) {




  const {
    data,
    color,
    fontSize,
    lineHight,
    timeDuration,
    perPage,
  } = sub;



  const {
    displayData
  } = useRollOne({
    data,
    perPage,
    timeDuration,
  })

  const {
    firstRowClass,
    restClass,
    comeOnRowClass,
    getClassAnimate,
  } = useRollOneAnimate(
    {
      data,
      perPage,
      timeDuration,
    }
  );


  const styleObj = {
    color,

  }


  useEffect(() => {
    ppplog('sub-one-line', sub);
  }, [sub])



  useEffect(() => {
    // ppplog('sub-one-line', sub);


  }, [sub])








  // ppplog('display', displayData, currentPageIndex);




  return <div style={{ width: box.width, height: box.height, }} >

    <Box py={2}>

      {
        displayData.map((i, idx) => {
          return <OneText className={getClassAnimate(idx)} text={i} key={idx + i} />
        })
      }
    </Box>

  </div >
}



const OneText = ({ text, className }) => {
  return <Box className={className}>
    { text }
  </Box >
}
