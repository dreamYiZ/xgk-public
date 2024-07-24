import React, { useState, useMemo, useEffect } from 'react';
import useBoxStore from '../store/useBo'; // 确保路径正确
import DrawerEditLayout from "./DrawerEditLayout";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Slider, Typography } from '@mui/material';
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-monokai";

const BASIC_PAYLOAD_SLOW_UP_TEXT = {
  data: new Array(6).fill().map((_, idx) => {
    return {
      id: idx,
      text: idx + 'blah'.repeat(7),
      secondText: idx + 'right-blah'.repeat(1)
    }
  }),
  fontSize: 22,
  animationTime: 10,
  rowHeight: 50,
};

export default function EditMarqueeImageVideo() {
  const boxArr = useBoxStore((state) => state.boxArr);
  const activeBoxId = useBoxStore((state) => state.activeBoxId);
  const activeBox = useMemo(() => boxArr.find((box) => box.boxid === activeBoxId), [boxArr, activeBoxId]);
  const sub = useMemo(() => activeBox?.sub, [activeBox, activeBoxId]);
  const changeById = useBoxStore(state => state.changeById);

  const [isOpen, setIsOpen] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  const [option, setOption] = useState('');

  const [fontSize, setFontSize] = useState(BASIC_PAYLOAD_SLOW_UP_TEXT.fontSize);
  const [animationTime, setAnimationTime] = useState(BASIC_PAYLOAD_SLOW_UP_TEXT.animationTime);
  const [rowHeight, setRowHeight] = useState(BASIC_PAYLOAD_SLOW_UP_TEXT.rowHeight);

  const saveChange = () => {
    if (sub) {
      changeById(activeBox.boxid, {
        sub: {
          ...sub,
          fontSize: fontSize,
          animationTime: animationTime,
          rowHeight: rowHeight,
        },
      });
    }
  };

  useEffect(() => {
    if (activeBoxId && sub) {
      setOption(JSON.stringify(sub.data, null, 2));
      setFontSize(sub.fontSize || BASIC_PAYLOAD_SLOW_UP_TEXT.fontSize);
      setAnimationTime(sub.animationTime || BASIC_PAYLOAD_SLOW_UP_TEXT.animationTime);
      setRowHeight(sub.rowHeight || BASIC_PAYLOAD_SLOW_UP_TEXT.rowHeight);
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

          <Box mt={1}></Box>
        </Box>
      </DrawerEditLayout>
    </Box>
  );
}
