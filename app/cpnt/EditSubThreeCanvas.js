import React, { useState, useMemo, useEffect } from 'react';
import useBoxStore from '../store/useBo';
import TextField from '@mui/material/TextField';
import DrawerEditLayout from "./DrawerEditLayout";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Select, MenuItem, FormControl, InputLabel, Slider, Typography } from '@mui/material';
import {
  maybeNumberOr, safeNumberIfString, ppplog,
  THREE_ANIMATE_TYPE, THREE_ANIMATE_TYPE_DISPLAY,
  THREE_AUTO_ANIMATION_DIRECTION, THREE_AUTO_ANIMATION_DIRECTION_DISPLAY
} from "../util/util";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-monokai";

const speedScale = (value) => {
  if (value <= 30) {
    return 0.01 + (value / 30) * 0.99;
  } else {
    return 1 + ((value - 30) / 70) * 4;
  }
};

const speedValueLabelFormat = (value) => {
  return speedScale(value).toFixed(2);
};

export default function EditModel() {
  const boxArr = useBoxStore((state) => state.boxArr);
  const activeBoxId = useBoxStore((state) => state.activeBoxId);
  const activeBox = useMemo(() => boxArr.find((box) => box.boxid === activeBoxId), [boxArr, activeBoxId]);
  const sub = useMemo(() => activeBox?.sub, [activeBox, activeBoxId]);
  const changeById = useBoxStore(state => state.changeById);

  const [isOpen, setIsOpen] = useState(false);
  const [option, setOption] = useState('');
  const [tabIndex, setTabIndex] = useState(0);

  const [modelUrl, setModelUrl] = useState('');
  const [animateType, setAnimateType] = useState(THREE_ANIMATE_TYPE.NONE);
  const [animateSpeed, setAnimateSpeed] = useState(1);
  const [modelScale, setModelScale] = useState(1);
  const [positionX, setPositionX] = useState(0);
  const [positionY, setPositionY] = useState(0);
  const [positionZ, setPositionZ] = useState(0);
  const [direction, setDirection] = useState(THREE_AUTO_ANIMATION_DIRECTION.HORIZONTAL_REVERSE_POINTER);

  const saveChange = () => {
    if (sub) {
      changeById(activeBox.boxid, {
        sub: {
          ...sub,
          modelUrl: modelUrl,
          animateType: animateType,
          animateSpeed: speedScale(animateSpeed),
          modelScale: modelScale,
          positionX: positionX,
          positionY: positionY,
          positionZ: positionZ,
          direction: direction,
        },
      });
    }
  }

  useEffect(() => {
    if (activeBoxId && sub) {
      setOption(JSON.stringify(sub, null, 2));
      setModelUrl(sub.modelUrl);
      setAnimateType(sub.animateType || THREE_ANIMATE_TYPE.NONE);
      setAnimateSpeed(sub.animateSpeed ? (sub.animateSpeed <= 1 ? (sub.animateSpeed - 0.01) * 30 / 0.99 : 30 + (sub.animateSpeed - 1) * 70 / 4) : 30);
      setModelScale(maybeNumberOr(sub.modelScale, 0) || 1);
      setPositionX(maybeNumberOr(sub.positionX, 0) || 0);
      setPositionY(maybeNumberOr(sub.positionY, 0) || 0);
      setPositionZ(maybeNumberOr(sub.positionZ, 0) || 0);
      setDirection(sub.direction || THREE_AUTO_ANIMATION_DIRECTION.HORIZONTAL_REVERSE_POINTER);
    }
  }, [sub, activeBoxId]);

  return (
    <Box my={2}>
      <DrawerEditLayout
        saveChange={saveChange}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        buttonText="编辑数据"
        title="模型编辑"
      >
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabIndex} onChange={(event, newValue) => setTabIndex(newValue)} aria-label="basic tabs example">
            <Tab label="编辑" />
          </Tabs>
        </Box>

        <Box mt={1}></Box>

        <Box sx={{}} hidden={tabIndex !== 0}>
          <Box mt={2}></Box>

          <TextField
            label="模型地址"
            value={modelUrl}
            onChange={(event) => setModelUrl(event.target.value)}
            fullWidth
            multiline
            rows={3}
          />

          <Box mt={2}></Box>

          <FormControl fullWidth>
            <InputLabel id="animate-type-label">动画类型</InputLabel>
            <Select
              labelId="animate-type-label"
              value={animateType}
              label="动画类型"
              onChange={(event) => setAnimateType(event.target.value)}
            >
              {Object.keys(THREE_ANIMATE_TYPE).map((key) => (
                <MenuItem key={key} value={THREE_ANIMATE_TYPE[key]}>
                  {THREE_ANIMATE_TYPE_DISPLAY[key]}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box mt={2}></Box>

          <Typography gutterBottom>动画速度</Typography>
          <Slider
            value={animateSpeed}
            onChange={(event, newValue) => setAnimateSpeed(newValue)}
            aria-labelledby="animate-speed-slider"
            step={1}
            min={0}
            max={100}
            valueLabelDisplay="auto"
            valueLabelFormat={speedValueLabelFormat}
          />

          <Box mt={2}></Box>

          <Typography gutterBottom>模型缩放</Typography>
          <Slider
            value={modelScale}
            onChange={(event, newValue) => setModelScale(newValue)}
            aria-labelledby="model-scale-slider"
            step={0.1}
            min={1}
            max={10}
            valueLabelDisplay="auto"
          />

          <Box mt={2}></Box>

          <TextField
            label="位置 X"
            type="number"
            value={positionX}
            onChange={(event) => setPositionX(parseFloat(event.target.value))}
            fullWidth
          />
          <Box mt={2}></Box>

          <TextField
            label="位置 Y"
            type="number"
            value={positionY}
            onChange={(event) => setPositionY(parseFloat(event.target.value))}
            fullWidth
          />
          <Box mt={2}></Box>

          <TextField
            label="位置 Z"
            type="number"
            value={positionZ}
            onChange={(event) => setPositionZ(parseFloat(event.target.value))}
            fullWidth
          />

          <Box mt={2}></Box>

          <FormControl fullWidth>
            <InputLabel id="direction-label">方向</InputLabel>
            <Select
              labelId="direction-label"
              value={direction}
              label="方向"
              onChange={(event) => setDirection(event.target.value)}
            >
              {Object.keys(THREE_AUTO_ANIMATION_DIRECTION).map((key) => (
                <MenuItem key={key} value={THREE_AUTO_ANIMATION_DIRECTION[key]}>
                  {THREE_AUTO_ANIMATION_DIRECTION_DISPLAY[key]}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box mt={1}></Box>
        </Box>
      </DrawerEditLayout>
    </Box>
  );
}
