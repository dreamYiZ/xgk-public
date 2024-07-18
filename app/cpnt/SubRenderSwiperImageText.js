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
import Image from 'next/image'

export default function (
  { box, sub }

) {


  const { data,
    color,
    fontSize,
    lineHeight,
    timeDuration,
    imageWidth,
    imageHeight,
    textWidth,
    width,
    height,
    textMarginBottom,
  } = sub;

  const styleObj = {
    color,
    fontSize,
    lineHeight,
    imageWidth,
    imageHeight,
    textWidth,
    width,
    height,
    textMarginBottom,
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
        // delay: maybeNumberOr(2220 * 1000),
      }}
      loop={true}
    >

      {data.map(imgAndTextArr => {
        ppplog('imgAndTextArr', imgAndTextArr)
        return <SwiperSlideItem styleObj={styleObj} key={imgAndTextArr.id} imgAndTextArr={imgAndTextArr} />
      })}


    </Swiper>
  </div >
}


const SwiperSlideItem = (props) => {
  ppplog('SwiperSlideItem', props)
  return <SwiperSlide>
    <ImageTextBox {...props} />
  </SwiperSlide>
}


const ImageTextBox = (props) => {

  // ppplog('ImageTextBox props ', props)
  const {
    imgAndTextArr, styleObj
  } = props;
  // ppplog('ImageTextBox props', imgAndTextArr, styleObj)

  const {
    id,
    img,
    textArr,
    imgLeft
  } = imgAndTextArr;

  return <Box sx={{ display: "flex", width: `${styleObj.width}px`, height: `${styleObj.height}px`, alignItems: "center", justifyContent: "space-around" }} >
    {imgLeft && <ImageBox img={img} styleObj={styleObj} />}

    <TextArrayBox textArr={textArr} styleObj={styleObj} />

    {!imgLeft && <ImageBox img={img} styleObj={styleObj} />}

  </Box>
}


const ImageBox = ({
  img, styleObj
}) => {
  return <Box >
    <img
      src={img}
      width={styleObj.imageWidth || 130}
      height={styleObj.imageHeight || 130}
      alt={img || 'no img url'}
    />
  </Box>
}


const TextArrayBox = ({
  textArr, styleObj
}) => {
  return <Box sx={{ width: `${styleObj.textWidth}px`, display: "flex", flexDirection: "column", overflowY: "auto", height: `${styleObj.height}px` }}>
    {textArr.map(text => {
      return <Box sx={{ display: "block", whiteSpace: "wrap", wordBreak: "break-all", textIndent: "2em", marginBottom: `${styleObj.textMarginBottom}px` }}>{text || ''}</Box>

    })}
  </Box>
}
