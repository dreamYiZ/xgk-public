import useBoxStore from '../store/useBo';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { HexColorPicker } from 'react-colorful';  // 引入颜色选择器
import { ANIMATE_TIME_FUNCTION_TYPES_DISPLAY, ANIMATE_TIME_FUNCTION_TYPES, ANIMATE_TYPES, ANIMATE_TYPES_DISPLAY } from "../util/util";
import { useCallback, useState, useMemo, useEffect } from 'react';
import { Box } from '@mui/system';  // 引入 Box 组件
import { useDropzone } from 'react-dropzone';
import { Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import DrawerEditLayout from "./DrawerEditLayout";
import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { MARQUEE_TYPE, MARQUEE_TYPE_DISPLAY, ppplog } from "../util/util";
import { forwardRef, useImperativeHandle, useRef } from "react";


export default function () {
  const boxArr = useBoxStore((state) => state.boxArr);
  const activeBoxId = useBoxStore((state) => state.activeBoxId);
  const activeBox = useMemo(() => boxArr.find((box) => box.boxid === activeBoxId), [boxArr, activeBoxId]);
  const sub = useMemo(() => activeBox?.sub, [activeBox, activeBoxId]);
  const changeById = useBoxStore(state => state.changeById);

  const [isOpen, setIsOpen] = useState(false);


  const [selectTypeMarquee, setSelectTypeMarquee] = useState(null);
  const [marqueeData, setMarqueeData] = useState([]);

  const [baseMarqueeValue, setBaseMarqueeValue] = useState();

  const [color, setColor] = useState('');
  const [fontSize, setFontSize] = useState(24);
  const [time, setTime] = useState(null);


  useEffect(() => {
    if (Array.isArray(marqueeData) && marqueeData.length && typeof marqueeData[0] === 'string') {
      setBaseMarqueeValue(marqueeData.join("\n"))
    }
  }, [marqueeData])







  // const [videoUrl, setVideoUrl] = useState('');

  const saveChange = () => {
    if (sub) {

      ppplog('marqueeData', marqueeData)
      let _newMarqueeData;
      if (selectTypeMarquee === MARQUEE_TYPE.BASIC) {
        if (baseMarqueeValue) {
          _newMarqueeData = baseMarqueeValue.trim().split("\n").filter(Boolean);

        } else {
          _newMarqueeData = [];
        }


      }

      changeById(activeBox.boxid, {
        sub: {
          ...sub,
          marqueeType: selectTypeMarquee,
          data: _newMarqueeData,
          fontSize,
          color,
          time

          // videoJsOptions: {
          //   ...sub.videoJsOptions,
          //   sources: [
          //     {
          //       type: 'video/mp4',
          //       src: videoUrl
          //     }
          //   ]
          // }
        },
      });
    }
  }



  useEffect(() => {
    if (activeBoxId && sub) {
      setSelectTypeMarquee(sub.marqueeType);
      setMarqueeData(sub.data);
      setTime(sub.time);
      setFontSize(sub.fontSize);
      setColor(sub.color);
    }
  }, [sub, activeBoxId]);

  return (
    <Box my={2}>

      <DrawerEditLayout saveChange={saveChange}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        buttonText="编辑数据"
        title="表格"
      >
        <Box>

        </Box>
        <Box mt={1}></Box>

      </DrawerEditLayout>

    </Box>
  );
}




