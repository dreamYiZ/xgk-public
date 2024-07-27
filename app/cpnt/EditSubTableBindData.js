import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-monokai";
import { ppplog } from "../util/util";
import useBoxStore from "../store/useBo";
import React, { useState, useMemo, useEffect } from 'react';
import { Box, Typography, Button, TextField, Tabs, Tab } from '@mui/material';
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
  const [fontSize, setFontSize] = useState(sub?.tableBodyFontSize || '22');
  const [lineHeight, setLineHeight] = useState(sub?.lineHeight || '40');
  const [timeDuration, setTimeDuration] = useState(5);

  const saveChange = () => {
    if (sub) {
      changeById(activeBox.boxid, {
        sub: {
          ...sub,
          tableHeadArray,
          tableBodyArray,
          tableBodyColor: color,
          tableBodyFontSize: fontSize,
          lineHeight,
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
          <TextField value={color} onChange={(event) => setColor(event.target.value)} label="颜色" variant="outlined" fullWidth />
          <Box mt={1}></Box>
          <TextField value={fontSize} onChange={(event) => setFontSize(event.target.value)} type="number" label="字体大小" variant="outlined" fullWidth />
          <Box mt={1}></Box>
          <TextField value={lineHeight} onChange={(event) => setLineHeight(event.target.value)} type="number" label="行高" variant="outlined" fullWidth />
          <Box mt={1}></Box>
          <TextField value={timeDuration} onChange={(event) => setTimeDuration(event.target.value)} type="number" label="动画间隔" variant="outlined" fullWidth />
        </Box>
      </DrawerEditLayout>
    </Box>
  );
}
