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

export default function (
  { box, sub }

) {


  const { data,
    color,
    nameFontSize,
    descFontSize,
    faceWidth,
    timeDuration,
    slidesPerView = 3,
    commentFontSize } = sub;

  const styleObj = {
    color,
    faceWidth,
    nameFontSize,
    descFontSize,
    commentFontSize,
  }





  return <div style={{ width: box.width, height: box.height, }} >

    <Box py={2}></Box>
    <Swiper
      slidesPerView={1}
      on={{
        slideChange: () => {
          // console.log('slide changed')
        },
        progress: (s, progress) => {
          // console.log(`progress is ${progress}`)
        },
      }}
      autoplay={{
        delay: maybeNumberOr(timeDuration * 1000, 3000),
      }}
      loop={true}
    >

      {data.map(person => {
        return <SwiperSlideItem styleObj={styleObj} key={person.id} person={person} />
      })}


    </Swiper>
  </div >
}


const SwiperSlideItem = ({ person, styleObj }) => {
  return <SwiperSlide>
    <Box>

      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Avatar
          alt="Remy Sharp"
          src={person.faceUrl}
          sx={{ width: styleObj.faceWidth, height: styleObj.faceWidth }}
        />
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box sx={{ fontSize: `${styleObj.nameFontSize}px`, color: styleObj.color }}>
          {person.name}
        </Box>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', textAlign: "center" }}>
        <Box sx={{ fontSize: `${styleObj.descFontSize}px`, color: styleObj.color }}>
          {person.description}
        </Box>
      </Box>

    </Box>

  </SwiperSlide>
}


