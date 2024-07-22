import React, { useState, useMemo, useEffect } from 'react';
import useBoxStore from '../store/useBo';
import TextField from '@mui/material/TextField';
import DrawerEditLayout from "./DrawerEditLayout";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Select, MenuItem, FormControl, InputLabel, Slider, Typography } from '@mui/material';
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-monokai";
import { ANIMATE_TYPE_MARQUEE_IMAGE_VIDEO, ANIMATE_TYPE_MARQUEE_IMAGE_VIDEO_DISPLAY } from "../util/util";

export default function EditMarqueeImageVideo() {
  const boxArr = useBoxStore((state) => state.boxArr);
  const activeBoxId = useBoxStore((state) => state.activeBoxId);
  const activeBox = useMemo(() => boxArr.find((box) => box.boxid === activeBoxId), [boxArr, activeBoxId]);
  const sub = useMemo(() => activeBox?.sub, [activeBox, activeBoxId]);
  const changeById = useBoxStore(state => state.changeById);

  const [isOpen, setIsOpen] = useState(false);
  const [option, setOption] = useState('');
  const [tabIndex, setTabIndex] = useState(0);

  const [imageWidth, setImageWidth] = useState(200);
  const [imageHeight, setImageHeight] = useState(200);
  const [animateType, setAnimateType] = useState(ANIMATE_TYPE_MARQUEE_IMAGE_VIDEO.GO_LEFT);

  const saveChange = () => {
    if (sub) {
      changeById(activeBox.boxid, {
        sub: {
          ...sub,
          imageWidth: imageWidth,
          imageHeight: imageHeight,
          animateType: animateType,
        },
      });
    }
  }

  useEffect(() => {
    if (activeBoxId && sub) {
      setOption(JSON.stringify(sub.data, null, 2));
      setImageWidth(sub.imageWidth || 200);
      setImageHeight(sub.imageHeight || 200);
      setAnimateType(sub.animateType || ANIMATE_TYPE_MARQUEE_IMAGE_VIDEO.GO_LEFT);
    }
  }, [sub, activeBoxId]);

  return (
    <Box my={2}>
      <DrawerEditLayout
        saveChange={saveChange}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        buttonText="编辑数据"
        title="图片视频跑马灯"
      >
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabIndex} onChange={(event, newValue) => setTabIndex(newValue)} aria-label="basic tabs example">
            <Tab label="样式" />
            <Tab label="数据" />
          </Tabs>
        </Box>

        <Box mt={1}></Box>

        <Box sx={{}} hidden={tabIndex !== 1}>
          <Box mt={2}></Box>
          <AceEditor
            mode="json"
            theme="monokai"
            value={option}
            onChange={setOption}
            name="UNIQUE_ID_OF_DIV"
            editorProps={{ $blockScrolling: true }}
            fontSize={14}
            showPrintMargin={true}
            showGutter={true}
            highlightActiveLine={true}
            width={"100%"}
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              enableSnippets: true,
              showLineNumbers: true,
              tabSize: 2,
            }}
          />

          <Box mt={1}></Box>
        </Box>

        <Box sx={{}} hidden={tabIndex !== 0}>
          <Box mt={2}></Box>

          <Typography gutterBottom>图片宽度</Typography>
          <Slider
            value={imageWidth}
            onChange={(event, newValue) => setImageWidth(newValue)}
            aria-labelledby="image-width-slider"
            step={10}
            min={50}
            max={300}
            valueLabelDisplay="auto"
          />

          <Box mt={2}></Box>

          <Typography gutterBottom>图片高度</Typography>
          <Slider
            value={imageHeight}
            onChange={(event, newValue) => setImageHeight(newValue)}
            aria-labelledby="image-height-slider"
            step={10}
            min={50}
            max={300}
            valueLabelDisplay="auto"
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
              {Object.keys(ANIMATE_TYPE_MARQUEE_IMAGE_VIDEO).map((key) => (
                <MenuItem key={key} value={ANIMATE_TYPE_MARQUEE_IMAGE_VIDEO[key]}>
                  {ANIMATE_TYPE_MARQUEE_IMAGE_VIDEO_DISPLAY[key]}
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
