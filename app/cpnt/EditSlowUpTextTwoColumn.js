import React, { useState, useMemo, useEffect } from 'react';
import useBoxStore from '../store/useBo';
import DrawerEditLayout from "./DrawerEditLayout";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-monokai";
import { BASIC_PAYLOAD_SLOW_UP_TEXT_TWO_COLUMN } from "../util/util";
import { Slider, Typography } from '@mui/material';
import ColorField from "./ColorField";
import { v4 as uuidv4 } from 'uuid';

export default function EditMarqueeImageVideo() {
  const boxArr = useBoxStore((state) => state.boxArr);
  const activeBoxId = useBoxStore((state) => state.activeBoxId);
  const activeBox = useMemo(() => boxArr.find((box) => box.boxid === activeBoxId), [boxArr, activeBoxId]);
  const sub = useMemo(() => activeBox?.sub, [activeBox, activeBoxId]);
  const changeById = useBoxStore(state => state.changeById);

  const [isOpen, setIsOpen] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  const [option, setOption] = useState('');

  const [fontSize, setFontSize] = useState(BASIC_PAYLOAD_SLOW_UP_TEXT_TWO_COLUMN.fontSize);
  const [fontSizeSecond, setFontSizeSecond] = useState(BASIC_PAYLOAD_SLOW_UP_TEXT_TWO_COLUMN.fontSizeSecond);
  const [animationTime, setAnimationTime] = useState(BASIC_PAYLOAD_SLOW_UP_TEXT_TWO_COLUMN.animationTime);
  const [rowHeight, setRowHeight] = useState(BASIC_PAYLOAD_SLOW_UP_TEXT_TWO_COLUMN.rowHeight);
  const [color, setColor] = useState(BASIC_PAYLOAD_SLOW_UP_TEXT_TWO_COLUMN.color);
  const [colorSecond, setColorSecond] = useState(BASIC_PAYLOAD_SLOW_UP_TEXT_TWO_COLUMN.colorSecond);

  const saveChange = () => {
    if (sub) {
      changeById(activeBox.boxid, {
        sub: {
          ...sub,
          fontSize: fontSize,
          fontSizeSecond: fontSizeSecond,
          animationTime: animationTime,
          rowHeight: rowHeight,
          color: color,
          colorSecond: colorSecond,
          data: JSON.parse(option),
        },
      });
    }
  };

  useEffect(() => {
    if (activeBoxId && sub) {
      setOption(JSON.stringify(sub.data, null, 2));
      setFontSize(sub.fontSize || BASIC_PAYLOAD_SLOW_UP_TEXT_TWO_COLUMN.fontSize);
      setFontSizeSecond(sub.fontSizeSecond || BASIC_PAYLOAD_SLOW_UP_TEXT_TWO_COLUMN.fontSizeSecond);
      setAnimationTime(sub.animationTime || BASIC_PAYLOAD_SLOW_UP_TEXT_TWO_COLUMN.animationTime);
      setRowHeight(sub.rowHeight || BASIC_PAYLOAD_SLOW_UP_TEXT_TWO_COLUMN.rowHeight);
      setColor(sub.color || BASIC_PAYLOAD_SLOW_UP_TEXT_TWO_COLUMN.color);
      setColorSecond(sub.colorSecond || BASIC_PAYLOAD_SLOW_UP_TEXT_TWO_COLUMN.colorSecond);
    }
  }, [sub, activeBoxId]);

  return (
    <Box my={2}>
      <DrawerEditLayout
        saveChange={saveChange}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        buttonText="编辑数据"
        title="两列缓慢上升文字"
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

          <Typography gutterBottom>字体大小</Typography>
          <Slider
            value={fontSize}
            onChange={(event, newValue) => setFontSize(newValue)}
            aria-labelledby="font-size-slider"
            step={1}
            min={10}
            max={100}
            valueLabelDisplay="auto"
          />

          <Box mt={2}></Box>

          <Typography gutterBottom>第二列字体大小</Typography>
          <Slider
            value={fontSizeSecond}
            onChange={(event, newValue) => setFontSizeSecond(newValue)}
            aria-labelledby="font-size-second-slider"
            step={1}
            min={10}
            max={100}
            valueLabelDisplay="auto"
          />

          <Box mt={2}></Box>

          <Typography gutterBottom>动画时间</Typography>
          <Slider
            value={animationTime}
            onChange={(event, newValue) => setAnimationTime(newValue)}
            aria-labelledby="animation-time-slider"
            step={1}
            min={1}
            max={60}
            valueLabelDisplay="auto"
          />

          <Box mt={2}></Box>

          <Typography gutterBottom>行高</Typography>
          <Slider
            value={rowHeight}
            onChange={(event, newValue) => setRowHeight(newValue)}
            aria-labelledby="row-height-slider"
            step={1}
            min={10}
            max={200}
            valueLabelDisplay="auto"
          />

          <Box mt={2}></Box>

          <Typography gutterBottom>颜色</Typography>
          <ColorField label="颜色" value={color} onChange={(event) => setColor(event)} />

          <Box mt={2}></Box>

          <Typography gutterBottom>第二列颜色</Typography>
          <ColorField label="第二列颜色" value={colorSecond} onChange={(event) => setColorSecond(event)} />

          <Box mt={1}></Box>
        </Box>
      </DrawerEditLayout>
    </Box>
  );
}
