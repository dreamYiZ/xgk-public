import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import useBoxStore from '../store/useBo';
import { useState, useMemo, useEffect } from 'react';
import { CMD, CMD_DISPLAY, CMD_TIME, CMD_TIME_DISPLAY } from "../util/util";
import { Select, MenuItem, FormControl, InputLabel, Autocomplete, TextField, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import usePageStorage from "../store/usePage";

export default function EditOnClickEventItem({ beItem, updateBeItem, updateBeList }) {
  const boxArr = useBoxStore((state) => state.boxArr);

  const { getById } = useBoxStore();
  // const activeBoxId = useBoxStore((state) => state.activeBoxId);
  // const activeBox = useMemo(() => boxArr.find((box) => box.boxid === activeBoxId), [boxArr, activeBoxId]);
  // const sub = useMemo(() => activeBox?.sub, [activeBox, activeBoxId]);

  const [selectedCmd, setSelectedCmd] = useState(null);
  const [selectedTarget, setSelectedTarget] = useState(null);
  const [selectedTime, setSelectedTime] = useState(CMD_TIME.NOW);
  const [availableTargetList, setAvailableTargetList] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [code, setCode] = useState('');
  const { pageList } = usePageStorage();

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const onCmdSelectionChange = (_selectedCmd, shouldNotUnSelectTarget) => {
    if (_selectedCmd !== CMD.GOTO) {
      let _availableTargetList = boxArr.filter(box => {
        if (!box.sub) return false;
        if (!box.sub.CMD) return false;
        if (!Array.isArray(box.sub.CMD) || box.sub.CMD.length <= 0) return false;
        if (!box.sub.CMD.includes(_selectedCmd)) return false;
        return true;
      });
      setAvailableTargetList(_availableTargetList.length ? _availableTargetList : []);
    }
    if (_selectedCmd === CMD.GOTO) {
      setAvailableTargetList(pageList.map(page => ({
        id: page.id,
        name: page.name,
      })));
    }
    if (!shouldNotUnSelectTarget) setSelectedTarget(null);
  };

  const deleteEvent = () => {
    updateBeList(prev => prev.filter(item => item.id !== beItem.id));
  };

  const handleChange = (key, value) => {
    const updatedBeItem = { ...beItem, [key]: value };
    updateBeItem(updatedBeItem);
  };

  useEffect(() => {
    if (beItem) {
      setSelectedCmd(beItem.cmd);
      setSelectedTarget(beItem.target);
      setSelectedTime(beItem.time);
      setCode(beItem.code);
      if (beItem?.cmd && availableTargetList.length <= 0) {
        onCmdSelectionChange(beItem?.cmd, true);
      }
    }
  }, [beItem]);

  return (
    <Box sx={{ padding: 2 }}>
      <Box>
        <InputLabel>选择事件</InputLabel>
        <FormControl fullWidth>
          <Autocomplete
            value={selectedCmd}
            onChange={(event, newValue) => { handleChange('cmd', newValue); onCmdSelectionChange(newValue); }}
            options={Object.keys(CMD)}
            getOptionLabel={(option) => CMD_DISPLAY[option]}
            renderInput={(params) => <TextField {...params} InputLabelProps={{ shrink: true }} />}
          />
        </FormControl>
        <Box sx={{ height: '16px' }} />

        {selectedCmd !== CMD.GOTO && (
          <Box>
            <InputLabel>选择目标</InputLabel>
            <FormControl fullWidth>
              <Autocomplete
                value={selectedTarget}
                onChange={(event, newValue) => handleChange('target', newValue?.boxid)}
                options={availableTargetList}
                getOptionLabel={(option) => `${getById(option)?.name ?? ''}:${getById(option)?.boxid ?? ''}`}
                renderOption={(props, option) => (
                  <li {...props} key={option.boxid}>
                    {/* {JSON.stringify(option)} */}
                    {`${option?.name ?? ''}:${option.boxid}`}
                  </li>
                )}
                renderInput={(params) => <TextField {...params} InputLabelProps={{ shrink: true }} />}
              />
            </FormControl>
          </Box>
        )}

        {/* 修改这个，只有options展示的时候，才采用`${box?.name??''}:${box.boxid}`，值实际上使用boxid */}


        {selectedCmd === CMD.GOTO && (
          <Box>
            <InputLabel>选择目标</InputLabel>
            <FormControl fullWidth>
              <Autocomplete
                value={selectedTarget}
                onChange={(event, newValue) => handleChange('target', newValue)}
                options={availableTargetList}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => <TextField {...params} InputLabelProps={{ shrink: true }} />}
              />
            </FormControl>
          </Box>
        )}
        <Box sx={{ height: '16px' }} />
        <InputLabel>选择执行时间</InputLabel>
        <FormControl fullWidth>
          <Select value={selectedTime} onChange={(event) => handleChange('time', event.target.value)}>
            {Object.keys(CMD_TIME).map((time) => (
              <MenuItem value={time} key={time}>{CMD_TIME_DISPLAY[time]}</MenuItem>
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
              onChange={(event) => handleChange('code', event.target.value)}
            />
          </FormControl>
        </Box>
        <Button variant="contained" color="error" onClick={deleteEvent}>
          删除事件
        </Button>
        <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
          <MuiAlert onClose={handleSnackbarClose} severity="warning" sx={{ width: '100%' }}>
            请确保已选择事件、目标和执行时间！
          </MuiAlert>
        </Snackbar>
      </Box>
    </Box>
  );
}
