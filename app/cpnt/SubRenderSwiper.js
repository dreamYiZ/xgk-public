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


  const { data,
    color,
    nameFontSize,
    descFontSize,
    commentFontSize } = sub;

  const styleObj = {
    color,
    nameFontSize,
    descFontSize,
    commentFontSize,
  }

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
        return <SwiperSlideItem styleObj={styleObj} key={person.id} person={person} />
      })}


    </Swiper>
  </div >
}


const SwiperSlideItem = ({ person, styleObj }) => {
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

      <Comments comment={person?.comment} />
    </Box>

  </SwiperSlide>
}


const Comments = ({ comment }) => {
  if (!comment || !comment.length) {
    return null;
  }

  return <Box>
    <Box>

    </Box>
    <Box>
      {comment.map(oneComment => {
        return <Box key={oneComment?.id}>
          {oneComment}
        </Box>
      })}

    </Box>
  </Box>
}
