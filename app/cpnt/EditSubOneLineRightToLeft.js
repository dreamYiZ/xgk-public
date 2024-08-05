import React, { useState, useMemo, useEffect } from 'react';
import { Box, Tabs, Tab, Typography, TextField, Slider, MenuItem, Select } from '@mui/material';
import DrawerEditLayout from "./DrawerEditLayout";
import useBoxStore from '../store/useBo';
import { SUB_TYPE, FONT_WEIGHT } from "../util/util";
import ColorField from "./ColorField";

export default function EditSwiperVideoSettings() {
  const boxArr = useBoxStore((state) => state.boxArr);
  const activeBoxId = useBoxStore((state) => state.activeBoxId);
  const activeBox = useMemo(() => boxArr.find((box) => box.boxid === activeBoxId), [boxArr, activeBoxId]);
  const sub = useMemo(() => activeBox?.sub, [activeBox, activeBoxId]);
  const changeById = useBoxStore(state => state.changeById);

  const [isOpen, setIsOpen] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  const [content, setContent] = useState('');
  const [speed, setSpeed] = useState(3);
  const [fontSize, setFontSize] = useState(26);
  const [fontWeight, setFontWeight] = useState(500);
  const [color, setColor] = useState('#FFFFFF');
  const [endSpace, setEndSpace] = useState(20);

  const saveChange = () => {
    if (sub) {
      changeById(activeBox.boxid, {
        sub: {
          ...sub,
          content,
          speed,
          fontSize,
          fontWeight,
          color,
          endSpace,
        },
      });
    }
  };

  useEffect(() => {
    if (activeBoxId && sub) {
      setContent(sub.content || '');
      setSpeed(sub.speed || 3);
      setFontSize(sub.fontSize || 26);
      setFontWeight(sub.fontWeight || 500);
      setColor(sub.color || '#FFFFFF');
      setEndSpace(sub.endSpace || 20);
    }
  }, [sub, activeBoxId]);

  return (
    <Box my={2}>
      <DrawerEditLayout saveChange={saveChange} isOpen={isOpen} setIsOpen={setIsOpen} buttonText="编辑数据" title="单行文字从右到左">
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabIndex} onChange={(e, newValue) => setTabIndex(newValue)}>
            <Tab label="文本设置" />
            <Tab label="其他设置" />
          </Tabs>
        </Box>
        <Box p={2}>
          {tabIndex === 0 && (
            <Box>
              <Typography variant="h6">文本设置</Typography>
              <TextField
                label="内容"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                fullWidth
                multiline
                rows={4}
                margin="normal"
              />
              <Typography gutterBottom>速度</Typography>
              <Slider
                value={speed}
                onChange={(e, newValue) => setSpeed(newValue)}
                min={0.3}
                max={5}
                step={0.1}
                valueLabelDisplay="auto"
                marks
              />
              <TextField
                label="字体大小"
                type="number"
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                fullWidth
                margin="normal"
              />
              <Typography gutterBottom>字体粗细</Typography>
              <Select
                value={fontWeight}
                onChange={(e) => setFontWeight(e.target.value)}
                fullWidth
                margin="normal"
              >
                {Object.entries(FONT_WEIGHT).map(([key, value]) => (
                  <MenuItem key={key} value={value}>
                    {key}
                  </MenuItem>
                ))}
              </Select>
              <Box mt={1}></Box>
              <ColorField label="颜色" value={color} onChange={(event) => setColor(event)} />
              <Typography gutterBottom>结束空白</Typography>
              <Slider
                value={endSpace}
                onChange={(e, newValue) => setEndSpace(newValue)}
                min={0}
                max={100}
                step={1}
                valueLabelDisplay="auto"
                marks
              />
            </Box>
          )}
          {tabIndex === 1 && (
            <Box>
              <Typography variant="h6">其他设置</Typography>
              {/* Add other settings fields here */}
            </Box>
          )}
        </Box>
      </DrawerEditLayout>
    </Box>
  );
}
