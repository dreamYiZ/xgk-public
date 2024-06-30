import React from 'react';
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, TextField, Tabs, Tab, Box } from '@mui/material';
import classes from "./sidePanel.module.sass"
import useGlobalStore from '../store/useGlobal';
import { MODE } from '../store/useGlobal';
import { Snackbar } from '@mui/material';
import Alert from '@mui/material/Alert';
import EditPage from "./editPage";
import EditBox from "./editBox";
import EditMarket from "./editMarket";


function SidePanel() {
  const { mode, setMode, screenWidth, screenHeight, setScreenWidth, setScreenHeight, tab: tabValue, setTabValue } = useGlobalStore();


  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');



  const handleChange = (event) => {
    setMode(event.target.value);
  };

  const handleWidthChange = (event) => {
    const value = event.target.value;
    if (!isNaN(value)) {
      setScreenWidth(value);
    } else {
      setErrorMessage('宽度必须是数字');
      setOpenSnackbar(true);
    }
  };

  const handleHeightChange = (event) => {
    const value = event.target.value;
    if (!isNaN(value)) {
      setScreenHeight(value);
    } else {
      setErrorMessage('高度必须是数字');
      setOpenSnackbar(true);
    }
  };


  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);  // 更新当前选中的标签页
  };

  return (
    <div className={classes['side-panel-view']}>
      <FormControl component="fieldset" className={classes.oneLine} row>
        <FormLabel component="legend">模式</FormLabel>
        <RadioGroup row aria-label="mode" name="mode" value={mode} onChange={handleChange} className={classes['radio-group']}>
          <FormControlLabel value={MODE.EDIT} control={<Radio />} label="编辑" />
          <FormControlLabel value={MODE.TEST} control={<Radio />} label="测试" />
          <FormControlLabel value={MODE.DISPLAY} control={<Radio />} label="展示" />
        </RadioGroup>
        <br />

        <Tabs value={tabValue} onChange={(event, newValue) => setTabValue(newValue)} aria-label="simple tabs example">
          <Tab label="页面" />
          <Tab label="组件" />
          <Tab label="市场" />
        </Tabs>

        <Box style={{ display: tabValue === 0 ? 'block' : 'none' }}>
          <br />
          <TextField label="屏幕宽度" value={screenWidth} onChange={handleWidthChange} />
          <br />
          <br />
          <TextField label="屏幕高度" value={screenHeight} onChange={handleHeightChange} />
          <br />
          <EditPage />
        </Box>

        <Box style={{ display: tabValue === 1 ? 'block' : 'none' }}>


          <EditBox />
        </Box>

        <Box style={{ display: tabValue === 2 ? 'block' : 'none' }}>
          {/* 市场标签页的内容 */}

          <EditMarket />
        </Box>

      </FormControl>

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
        <Alert onClose={() => setOpenSnackbar(false)} severity="error" sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>

    </div>
  );
}

export default SidePanel;
