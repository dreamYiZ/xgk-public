import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import useGlobalStore from '../store/useGlobal';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import ppplog from "ppplog";
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import { MODE, GLOBAL_STORAGE_KEY } from "../store/useGlobal";

export default function Setting() {
  const { isOpenSetting, openSetting, closeSetting, setLicense, license,
    themePaletteMode, setThemePaletteMode, mainScale, setMainScale } = useGlobalStore();

  const downloadConfig = () => {
    const config = JSON.stringify(localStorage, null, 2);
    const blob = new Blob([config], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'config.txt';
    link.click();
  };

  const downloadTestConfig = () => {
    const newLocalStorage = localStorage;
    const globalSetting = JSON.parse(localStorage.getItem(GLOBAL_STORAGE_KEY));
    globalSetting.state.mode = MODE.TEST;
    newLocalStorage[GLOBAL_STORAGE_KEY] = JSON.stringify(globalSetting);

    const config = JSON.stringify(newLocalStorage, null, 2);
    const blob = new Blob([config], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'config.txt';
    link.click();
  }

  const downloadDisplayConfig = () => {
    const newLocalStorage = localStorage;
    const globalSetting = JSON.parse(localStorage.getItem(GLOBAL_STORAGE_KEY));
    globalSetting.state.mode = MODE.DISPLAY;
    newLocalStorage[GLOBAL_STORAGE_KEY] = JSON.stringify(globalSetting);

    const config = JSON.stringify(newLocalStorage, null, 2);
    const blob = new Blob([config], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'config.txt';
    link.click();
  }

  const uploadConfig = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function (event) {
      const config = JSON.parse(event.target.result);
      for (let key in config) {
        localStorage.setItem(key, config[key]);
      }

      window.location.reload();
    };
    reader.readAsText(file);
  };

  const clearLocalStorage = () => {
    localStorage.clear();
  };

  const handleLicenseChange = (event) => {
    setLicense(event.target.value);
  };

  const handleThemeChange = (event) => {
    setThemePaletteMode(event.target.value);
  };

  const handleMainScaleChange = (event, newValue) => {
    setMainScale(newValue);
  };

  return (
    <div>
      <Drawer
        anchor="right"
        open={isOpenSetting}
        onClose={closeSetting}
      >
        <Box sx={{ width: 380, padding: 2 }}>
          <Button onClick={downloadConfig}>下载配置</Button>
          <Button onClick={downloadTestConfig}>下载测试配置</Button>
          <Button onClick={downloadDisplayConfig}>下载展示配置</Button>

          <Box mt={1} />

          <Button variant="contained" component="label">
            上传配置
            <input type="file" hidden onChange={uploadConfig} />
          </Button>
        </Box>

        <Divider />

        <Button onClick={clearLocalStorage}>初始化系统</Button>

        <Divider />

        <Box sx={{ padding: 2 }}>
          <Typography variant="h6">主题模式</Typography>
          <RadioGroup
            aria-label="theme"
            name="theme"
            value={themePaletteMode}
            onChange={handleThemeChange}
          >
            <FormControlLabel value="light" control={<Radio />} label="明亮" />
            <FormControlLabel value="dark" control={<Radio />} label="暗黑" />
          </RadioGroup>
        </Box>

        <Divider />

        <Box sx={{ padding: 2 }}>
          <TextField
            label="License"
            value={license}
            onChange={handleLicenseChange}
            fullWidth
            multiline
          />
        </Box>

        <Divider />

        <Box sx={{ padding: 2 }}>
          <Typography variant="h6">画布缩放</Typography>
          <Typography variant="body1">{mainScale}</Typography>
          <Slider
            value={mainScale}
            fullWidth
            onChange={handleMainScaleChange}
            min={0.05}
            max={1}
            step={0.01}
            valueLabelDisplay="auto"
          />
        </Box>
      </Drawer>
    </div>
  );
}
