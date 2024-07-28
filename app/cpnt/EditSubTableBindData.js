import React, { useState, useMemo } from 'react';
import { Box, Typography, TextField, Tabs, Tab, Switch, FormControlLabel } from '@mui/material';
import { HexColorPicker } from 'react-colorful';  // Import HexColorPicker
import useBoxStore from "../store/useBo";
import DrawerEditLayout from "./DrawerEditLayout";

export default function EditSubChartjs() {
  const boxArr = useBoxStore((state) => state.boxArr);
  const activeBoxId = useBoxStore((state) => state.activeBoxId);
  const activeBox = useMemo(() => boxArr.find((box) => box.boxid === activeBoxId), [boxArr, activeBoxId]);
  const sub = useMemo(() => activeBox?.sub, [activeBox, activeBoxId]);
  const changeById = useBoxStore(state => state.changeById);

  const [isOpen, setIsOpen] = useState(false);
  const [tableHeadArray, setTableHeadArray] = useState(sub?.tableHeadArray || []);
  const [tableBodyArray, setTableBodyArray] = useState(sub?.tableBodyArray || []);
  const [tabIndex, setTabIndex] = useState(0);
  const [color, setColor] = useState(sub?.tableBodyColor || '#FFFFFF');
  const [borderColor, setBorderColor] = useState(sub?.borderColor || '#FFFFFF'); // New state for border color
  const [fontSize, setFontSize] = useState(sub?.tableBodyFontSize || '22');
  const [lineHeight, setLineHeight] = useState(sub?.lineHeight || '40');
  const [timeDuration, setTimeDuration] = useState(5);
  const [hasBorder, setHasBorder] = useState(sub?.hasBorder ?? true);
  const [alternateRowColor, setAlternateRowColor] = useState(sub?.alternateRowColor ?? false);
  const [alternateRowBackgroundColor, setAlternateRowBackgroundColor] = useState(sub?.alternateRowBackgroundColor || '#f0f0f0');

  const saveChange = () => {
    if (sub) {
      changeById(activeBox.boxid, {
        sub: {
          ...sub,
          tableHeadArray,
          tableBodyArray,
          tableBodyColor: color,
          borderColor, // Save border color
          tableBodyFontSize: fontSize,
          lineHeight,
          hasBorder,
          alternateRowColor,
          alternateRowBackgroundColor
        },
      });
    }
  };

  return (
    <Box my={2}>
      <DrawerEditLayout
        saveChange={saveChange}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        buttonText="编辑数据"
        title="Chartjs表格"
      >
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabIndex} onChange={(event, newValue) => setTabIndex(newValue)} aria-label="basic tabs example">
            <Tab label="数据" />
            <Tab label="样式" />
          </Tabs>
        </Box>

        <Box mt={1}></Box>

        <Box sx={{}} hidden={tabIndex !== 0}>
          <Typography variant="h6" component="h6">
            数据
          </Typography>
          <Box mt={2}>
            <TextField
              label="表头数组"
              variant="outlined"
              fullWidth
              value={JSON.stringify(tableHeadArray)}
              onChange={(e) => setTableHeadArray(JSON.parse(e.target.value))}
            />
          </Box>
          <Box mt={2}>
            <TextField
              label="表体数组"
              variant="outlined"
              fullWidth
              multiline
              rows={6}
              value={JSON.stringify(tableBodyArray)}
              onChange={(e) => setTableBodyArray(JSON.parse(e.target.value))}
            />
          </Box>
        </Box>

        <Box sx={{}} hidden={tabIndex !== 1}>
          <Box mt={1}></Box>
          <Typography variant="h6" component="h6">
            表体颜色
          </Typography>
          <HexColorPicker color={color} onChange={setColor} />
          <Box mt={1}></Box>
          <Typography variant="h6" component="h6">
            边框颜色
          </Typography>
          <HexColorPicker color={borderColor} onChange={setBorderColor} /> {/* New color picker for border */}
          <Box mt={1}></Box>
          <TextField value={fontSize} onChange={(event) => setFontSize(event.target.value)} type="number" label="字体大小" variant="outlined" fullWidth />
          <Box mt={1}></Box>
          <TextField value={lineHeight} onChange={(event) => setLineHeight(event.target.value)} type="number" label="行高" variant="outlined" fullWidth />
          <Box mt={1}></Box>
          <TextField value={timeDuration} onChange={(event) => setTimeDuration(event.target.value)} type="number" label="动画间隔" variant="outlined" fullWidth />
          <Box mt={2}>
            <FormControlLabel
              control={<Switch checked={hasBorder} onChange={(e) => setHasBorder(e.target.checked)} />}
              label="显示边框"
            />
          </Box>
          <Box mt={2}>
            <FormControlLabel
              control={<Switch checked={alternateRowColor} onChange={(e) => setAlternateRowColor(e.target.checked)} />}
              label="隔行变色"
            />
          </Box>
          {alternateRowColor && (
            <Box mt={2}>
              <Typography variant="h6" component="h6">
                隔行背景颜色
              </Typography>
              <HexColorPicker color={alternateRowBackgroundColor} onChange={setAlternateRowBackgroundColor} />
            </Box>
          )}
        </Box>
      </DrawerEditLayout>
    </Box>
  );
}
