import React from 'react';
import { Box, Avatar } from '@mui/material';
import { Swiper, SwiperSlide } from "./SwiperWarper";
import classes from "./SubRenderMarquee.module.sass";
import { maybeNumberOr } from "../util/util";

const SwiperSlideItem = ({ person, styleObj }) => {
  return (
    <SwiperSlide>
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Avatar alt="Remy Sharp" src={person.faceUrl} sx={{ width: styleObj.faceWidth, height: styleObj.faceWidth }} />
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
        <Comments comment={person.comment} styleObj={styleObj} />
      </Box>
    </SwiperSlide>
  );
};

const Comments = ({ comment, styleObj }) => {
  if (!comment || !comment.length) {
    return null;
  }

  let time = comment.length * styleObj.commentTime;

  return (
    <Box>
      <Box sx={{ color: styleObj.commentColor }}>
        {styleObj.commentHeaderText}：
      </Box>
      <Box sx={{ height: '300px', overflow: 'hidden' }}>
        <Box
          sx={{
            animation: `${classes.marqueeTop} ${time}s linear infinite`,
            color: styleObj.commentColor,
            fontSize: `${styleObj.commentFontSize}px`,
          }}
        >
          {comment.map(oneComment => (
            <Box key={oneComment.id}>
              {oneComment.text}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default function RenderSwiper({ box, sub }) {
  const { data, color, nameFontSize, descFontSize, faceWidth, timeDuration, slidesPerView = 3, commentFontSize, commentColor, commentHeaderText } = sub;

  const styleObj = {
    color,
    faceWidth,
    nameFontSize,
    descFontSize,
    commentFontSize,
    commentColor,
    commentHeaderText,
    commentTime: sub.commentTime
  };

  return (
    <div style={{ width: box.width, height: box.height }}>
      <Box p={3} sx={{ overflow: "hidden", height: "100%" }}>
        <Swiper
          slidesPerView={slidesPerView}
          autoplay={{
            delay: maybeNumberOr(timeDuration * 1000, 3000),
          }}
          loop={true}
        >
          {data.map(person => (
            <SwiperSlideItem styleObj={styleObj} key={person.id} person={person} />
          ))}
        </Swiper>
      </Box>
    </div>
  );
}
