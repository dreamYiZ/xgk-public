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
        title="跑马灯"
      >
        <Box>
          <Box>

            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">跑马灯类型</FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={selectTypeMarquee}
                onChange={(event) => {
                  setSelectTypeMarquee(event.target.value)
                }}
              >

                {Object.keys(MARQUEE_TYPE).map(
                  keyOfMarqueeType => {
                    return <FormControlLabel
                      key={keyOfMarqueeType}
                      value={MARQUEE_TYPE[keyOfMarqueeType]}
                      control={<Radio />}
                      label={MARQUEE_TYPE_DISPLAY[MARQUEE_TYPE[keyOfMarqueeType]]} />
                  }
                )}
                {/* <FormControlLabel value="female" control={<Radio />} label="Female" />
                <FormControlLabel value="male" control={<Radio />} label="Male" />
                <FormControlLabel value="other" control={<Radio />} label="Other" /> */}
                <FormControlLabel
                  value="disabled"
                  disabled
                  control={<Radio />}
                  label="other"
                />
              </RadioGroup>
            </FormControl>

          </Box>


          <Box>
            {selectTypeMarquee === MARQUEE_TYPE.BASIC && <EditBasicMarquee baseMarqueeValue={baseMarqueeValue}
              setBaseMarqueeValue={setBaseMarqueeValue}
              color={color}
              fontSize={fontSize}
              setColor={setColor}
              setFontSize={setFontSize}
              time={time}
              setTime={setTime}
            />}
          </Box>
        </Box>

        <Box mt={1}></Box>

      </DrawerEditLayout>

    </Box>
  );
}




const EditBasicMarquee = ({ baseMarqueeValue, setBaseMarqueeValue,
  color, setColor,
  fontSize, setFontSize,
  time, setTime

}) => {

  const onChangeBasicMarquee = (event) => {
    setBaseMarqueeValue(event.target.value);
  }


  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);


  return <Box>
    <TextField
      fullWidth
      label="简单跑马灯"
      multiline
      rows={20}
      value={baseMarqueeValue}
      onChange={onChangeBasicMarquee}
    />

    <Box mt={1}></Box>
    <TextField
      label="时间"
      type="number"
      InputLabelProps={{
        shrink: true,
      }}
      variant="filled"
      value={time}
      onChange={(event) => { setTime(event.target.value) }}
    />

    <Box mb={2}>
      <div>
        <label>文字颜色</label>
        <br />
        <TextField value={color} onChange={e => setColor(e.target.value)} />
        <IconButton onClick={() => setIsColorPickerOpen(!isColorPickerOpen)}>
          <ColorLensIcon />
        </IconButton>
        {isColorPickerOpen && <HexColorPicker color={color} onChange={setColor} />}
      </div>
    </Box>
    <Box mt={1}></Box>

    <TextField
      label="文字大小"
      type="number"
      InputLabelProps={{
        shrink: true,
      }}
      variant="filled"
      value={fontSize}
      onChange={(event) => { setFontSize(event.target.value) }}
    />
  </Box>
}
