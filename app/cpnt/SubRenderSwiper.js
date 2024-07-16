import React from 'react';
import { ppplog, TIME_TYPE, MARQUEE_TYPE } from "../util/util";
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


  const { data } = sub;

  ppplog('data', data)


  useEffect(() => {

    return () => {
    }
  }, [sub]);

  return <div style={{ width: box.width, height: box.height, }} >

    <Box py={2}></Box>
    <Swiper
      slidesPerView={3}
      breakpoints={{ 768: { slidesPerView: 4 } }}
      on={{
        slideChange: () => console.log('slide changed'),
        progress: (s, progress) => console.log(`progress is ${progress}`),
      }}
      autoplay={{
        delay: 2000,
      }}
      loop={true}
    >

      {data.map(person => {
        return <SwiperSlideItem key={person.id} person={person} />
      })}


    </Swiper>
  </div >
}


const SwiperSlideItem = ({ person }) => {
  ppplog('person.faceUrl', person.faceUrl)
  return <SwiperSlide>
    <Box>

      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Avatar
          alt="Remy Sharp"
          src={person.faceUrl}
          sx={{ width: 56, height: 56 }}
        />
      </Box>
    </Box>

  </SwiperSlide>
}
