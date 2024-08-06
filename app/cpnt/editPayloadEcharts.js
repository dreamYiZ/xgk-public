import React from 'react';
import Drawer from '@mui/material/Drawer';
import useBoxStore from '../store/useBo';
import { useState, useMemo, useEffect } from 'react';
import SeriesRecordEdit from "./SeriesRecordEdit";
import ppplog from "ppplog";
import ChartEditorLayout from "./DrawerEditLayout";
import ChartColorEdit from "./ChartColorEdit";
import ChartLabelEdit from "./ChartLabelEdit";
import { BASIC_PAYLOAD_BAR_CHART } from "../util/util";
import AceEditorWrap from "./AceEditorWrap";
import { Box, Tabs, Tab, Typography, TextField, Button, Checkbox, IconButton, Switch, FormControlLabel } from '@mui/material';

import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-monokai";

export default function EditChartPayload() {

  const boxArr = useBoxStore((state) => state.boxArr);
  const activeBoxId = useBoxStore((state) => state.activeBoxId);
  const activeBox = useMemo(() => boxArr.find((box) => box.boxid === activeBoxId), [boxArr, activeBoxId]);
  const sub = useMemo(() => activeBox?.sub, [activeBox, activeBoxId]);
  const changeById = useBoxStore(state => state.changeById);

  const [isOpen, setIsOpen] = React.useState(false);
  const [_option, setOption] = useState(JSON.stringify(sub.option, null, 2));
  const [tabIndex, setTabIndex] = useState(0); // Added state for tab index
  const [reInit, setReInit] = useState(sub?.reInit || 30); // Added state for reInit

  const saveChange = () => {
    if (sub) {
      changeById(activeBox.boxid, {
        sub: {
          ...sub,
          option: JSON.parse(_option),
          reInit: reInit, // Save reInit value
        },
      });
    }
  }

  const handleParse = () => {
    try {
      // Execute the code in the option string
      let option;
      eval(_option);
      let parseOption = option;
      // After eval, the variable option should be defined in this scope
      // Assign its value to sub.option

      if (sub && typeof parseOption === 'object') {
        setOption(JSON.stringify(parseOption, null, 2));
        changeById(activeBox.boxid, {
          sub: {
            ...sub,
            option: parseOption,
          },
        });
      }
    } catch (error) {
      console.error('Failed to parse JSON:', error);
    }
  }

  return (
    <ChartEditorLayout saveChange={saveChange}
      isOpen={isOpen}
      setIsOpen={setIsOpen}>

      <Box>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabIndex} onChange={(event, newValue) => setTabIndex(newValue)} aria-label="basic tabs example">
            <Tab label="数据" />
            <Tab label="样式" />
          </Tabs>
        </Box>
        <Box sx={{}} hidden={tabIndex !== 0}>
          <Box>
            <AceEditorWrap
              value={_option}
              onChange={setOption}
            />
            <Box my={2}>
              <Button variant="contained" color="primary" onClick={handleParse}>解析JSON</Button>
            </Box>
          </Box>
        </Box>
        <Box sx={{}} hidden={tabIndex !== 1}>
          {/* Add content for the "样式" tab here */}
          <Box my={2}>
            <TextField
              label="自动重载时间"
              type="number"
              value={reInit}
              onChange={(e) => setReInit(Number(e.target.value))}
              fullWidth
            />
          </Box>
        </Box>
      </Box>

    </ChartEditorLayout>
  );
}
