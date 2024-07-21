import React from 'react';
import { safeNumberIfString, maybeNumberOr, ppplog, TIME_TYPE, MARQUEE_TYPE } from "../util/util";
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
import useBoxStore from '../store/useBo';
import useBeFactory from "../hooks/useBeFactory";
import useActiveBoxSub from "../hooks/useActiveBoxSub"

export default function (
  { box, sub }

) {

  // const boxArr = useBoxStore((state) => state.boxArr);

  // const activeBoxId = useBoxStore((state) => state.activeBoxId);
  // const activeBox = useMemo(() => boxArr.find((box) => box.boxid === activeBoxId), [boxArr, activeBoxId]);
  // const sub = useMemo(() => activeBox?.sub, [activeBox, activeBoxId]);

  const {
    activeBoxId, changeById,
    boxArr, setBoxArr } = useBoxStore();

  const { canClick } = useBeFactory(sub);

  // const {
  //   activeBox,
  // } = useActiveBoxSub();
  // const changeById = useBoxStore(state => state.changeById);

  const {
    onClickHandler,
  } = useBeFactory({ sub });


  const {
    imgUrl,
    imgActiveUrl,
    groupid,
    isActive,
  } = sub;

  const handleOnClickImage = () => {
    if (!canClick) {
      return
    }


    const _boxArr = boxArr.map(_box => {
      const __box = { ..._box };
      const { sub: _sub } = __box;

      if (_sub.groupid === groupid) {
        _sub.isActive = false;
      }

      if (__box.boxid === box.boxid) {
        _sub.isActive = true;
      }

      return _box
    })

    setBoxArr(_boxArr);
    onClickHandler();
  }

  return <div style={{ width: box.width, height: box.height, }} >
    <img onClick={handleOnClickImage} src={isActive ? imgActiveUrl : imgUrl} width="100%" height="100%"
      onDragStart={event => event.preventDefault()} />
  </div >
}

