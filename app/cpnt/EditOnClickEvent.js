import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import useBoxStore from '../store/useBo';
import { useState, useMemo, useEffect } from 'react';
import ChartEditorLayout from "./DrawerEditLayout";
import SeriesRecordEdit from "./SeriesRecordEdit";
import ChartColorEdit from "./ChartColorEdit";
import ChartLabelEdit from "./ChartLabelEdit";
import { BASIC_PAYLOAD_BAR_CHART } from "../util/util";
import { ppplog, CMD_TIME, CMD_TIME_DISPLAY, CMD, CMD_DISPLAY, SUB_TYPE_DISPLAY, SUB_TYPE } from "../util/util";
import { Select, MenuItem } from '@mui/material';
import { FormControl, InputLabel } from '@mui/material';
import { Autocomplete } from '@mui/material';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


export default function EditChartPayload() {

  const boxArr = useBoxStore((state) => state.boxArr);
  const activeBoxId = useBoxStore((state) => state.activeBoxId);
  const activeBox = useMemo(() => boxArr.find((box) => box.boxid === activeBoxId), [boxArr, activeBoxId]);
  const sub = useMemo(() => activeBox?.sub, [activeBox, activeBoxId]);
  const changeById = useBoxStore(state => state.changeById);

  const [isOpen, setIsOpen] = React.useState(false);
  const [_option, setOption] = useState(JSON.stringify(sub.option, null, 2));


  const [selectedCmd, setSelectedCmd] = useState(null);
  const [selectedTarget, setSelectedTarget] = useState(null);
  const [selectedTime, setSelectedTime] = useState('立即执行');

  const [availableTargetList, setAvailableTargetList] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [code, setCode] = useState('');



  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackbar(false);
  };


  const onCmdSelectionChange = (_selectedCmd) => {

    let _availableTargetList = boxArr.filter(box => {

      if (!box.sub) {
        return false;
      }

      if (!box.sub.CMD) {
        return false
      }

      if (!Array.isArray(box.sub.CMD) || box.sub.CMD.length <= 0) {
        return false
      }

      if (!box.sub.CMD.includes(_selectedCmd)) {
        return false
      }

      return true;
    })


    setAvailableTargetList(_availableTargetList);

    setSelectedTarget(null);
  }


  const saveChange = () => {

    if (sub) {
      let be = {
        cmd: selectedCmd,
        target: selectedTarget,
        time: selectedTime,
        code
      };

      // 检查 be 的字段中，cmd、target、time 这三项是否都有值
      if (!be.cmd || !be.target || !be.time) {
        setOpenSnackbar(true);
        return;
      }

      changeById(activeBox.boxid, {
        sub: {
          ...sub,
          be
        },
      });
    }
  }

  // export const CMD = {
  //   CHANGE_SPRITE_STATE: 'CHANGE_SPRITE_STATE'
  // }

  // export const CMD_DISPLAY = {
  //   [CMD.CHANGE_SPRITE_STATE]: '修改雪碧状态'
  // }


  // export const createBoxPayload = (sub) => ({
  //   boxid: uuidv4(),
  //   position: 'absolute',
  //   zIndex: 1,
  //   groupId: 'group1',
  //   width: '100px',
  //   height: '30px',
  //   x: 0,
  //   y: 0,
  //   opacity: 1,
  //   sub: sub,
  // });


  useEffect(() => {
    if (sub?.be) {
      setSelectedCmd(sub.be.cmd);
      setSelectedTarget(sub.be.target);
      setSelectedTime(sub.be.time);
      setCode(sub.be.code);
    }
  }, [sub?.be])



  return (
    <ChartEditorLayout saveChange={saveChange}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      buttonText="点击事件"
    >

      <Box sx={{ padding: 2 }}>

        <Box>


          <InputLabel>选择事件</InputLabel>
          <FormControl fullWidth>
            <Autocomplete
              value={selectedCmd}
              onChange={(event, newValue) => { setSelectedCmd(newValue); onCmdSelectionChange(newValue); }}
              options={Object.keys(CMD)}
              getOptionLabel={(option) => CMD_DISPLAY[option]}
              renderInput={(params) => <TextField {...params} InputLabelProps={{ shrink: true }} />}
            />
          </FormControl>
          <Box sx={{ height: '16px' }} /> {/* 添加间隔 */}
          <InputLabel>选择目标</InputLabel>
          <FormControl fullWidth>
            <Autocomplete
              value={selectedTarget}
              onChange={(event, newValue) => setSelectedTarget(newValue)}
              options={availableTargetList.map((box) => box.boxid)}
              renderInput={(params) => <TextField {...params} InputLabelProps={{ shrink: true }} />}
            />
          </FormControl>
          <Box sx={{ height: '16px' }} /> {/* 添加间隔 */}
          <InputLabel>选择执行时间</InputLabel>
          <FormControl fullWidth>
            <Select value={selectedTime} onChange={(event) => setSelectedTime(event.target.value)}>
              {Object.keys(CMD_TIME).map((time) => (
                <MenuItem value={time}>{CMD_TIME_DISPLAY[time]}</MenuItem>
              ))}
            </Select>
          </FormControl>


          <Box my={2}>
            <FormControl fullWidth>
              <TextField
                label="代码"
                multiline
                rows={3}
                value={code}
                onChange={(event) => setCode(event.target.value)}
              />
            </FormControl>
          </Box>


        </Box>
      </Box>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <MuiAlert onClose={handleSnackbarClose} severity="warning" sx={{ width: '100%' }}>
          请确保已选择事件、目标和执行时间！
        </MuiAlert>
      </Snackbar>
    </ChartEditorLayout>
  );
}


// export const CMD_TIME ={
//   NOW: 'NOW',
//   AFTER_3S: 'AFTER_3S',
// }
// export const CMD_TIME_DISPLAY ={
//   [CMD_TIME.NOW]: '立即执行',
//   [CMD_TIME.AFTER_3S]: '三秒之后',
// }
