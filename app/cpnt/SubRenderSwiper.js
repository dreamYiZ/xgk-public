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
      slidesPerView={slidesPerView}
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

      <Comments comment={person?.comment} />
    </Box>

  </SwiperSlide>
}


const Comments = ({ comment, commentTime = 1 }) => {
  if (!comment || !comment.length) {
    return null;
  }

  let time = comment.length * commentTime;

  return <Box>
    <Box>
      评价：
    </Box>
    <Box sx={{ height: '300px', overflow: 'hidden' }}>
      <Box sx={{
        animation: `${classes.marqueeTop} ${time}s linear infinite`,
      }}>

        {comment.map(oneComment => {
          ppplog('comment', comment)
          return <Box key={oneComment?.id} >
            {oneComment.text}
          </Box>
        })}
      </Box>
    </Box>
  </Box>
}



// const RenderMarqueeBase = ({ props }) => {
//   const { data, color, fontSize } = props;
//   return <Box >
//     {data.map(line => {
//       return <div style={{ color: color, fontSize: `${fontSize}px` }}>{line}</div>
//     })}
//   </Box>
// }
