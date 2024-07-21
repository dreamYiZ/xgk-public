import React, { useState, useMemo, useEffect } from 'react';
import useBoxStore from '../store/useBo';
import TextField from '@mui/material/TextField';
import DrawerEditLayout from "./DrawerEditLayout";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Select, MenuItem, FormControl, InputLabel, Slider, Typography } from '@mui/material';
import { safeNumberIfString, ppplog, THREE_ANIMATE_TYPE, THREE_ANIMATE_TYPE_DISPLAY } from "../util/util";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-monokai";

export default function () {
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
  // Commenting out animateSpeed
  // const [animateSpeed, setAnimateSpeed] = useState(1);
  const [modelScale, setModelScale] = useState(1);

  const saveChange = () => {
    if (sub) {
      changeById(activeBox.boxid, {
        sub: {
          ...sub,
          modelUrl: modelUrl,
          animateType: animateType,
          // Uncomment if you want to include animateSpeed
          // animateSpeed: animateSpeed,
          modelScale: modelScale,
        },
      });
    }
  }

  useEffect(() => {
    if (activeBoxId && sub) {
      setOption(JSON.stringify(sub, null, 2));
      setModelUrl(sub.modelUrl);
      setAnimateType(sub.animateType || THREE_ANIMATE_TYPE.NONE);
      // Commenting out animateSpeed
      // setAnimateSpeed(sub.animateSpeed || 1);
      setModelScale(sub.modelScale || 1);
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

          {/* Commenting out animation speed related code */}
          {/*
          <Typography gutterBottom>动画速度</Typography>
          <Slider
            value={animateSpeed}
            onChange={(event, newValue) => setAnimateSpeed(newValue)}
            aria-labelledby="animate-speed-slider"
            step={0.1}
            min={0.1}
            max={5}
            valueLabelDisplay="auto"
          />
          */}

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

          <Box mt={1}></Box>
        </Box>
      </DrawerEditLayout>
    </Box>
  );
}
