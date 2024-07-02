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

export default function Setting() {
  const { isOpenSetting, openSetting, closeSetting, setLicense, license,
    themePaletteMode, setThemePaletteMode } = useGlobalStore();

  ppplog('themePaletteMode', themePaletteMode)

  const downloadConfig = () => {
    const config = JSON.stringify(localStorage, null, 2);
    const blob = new Blob([config], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'config.txt';
    link.click();
  };

  const uploadConfig = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function (event) {
      const config = JSON.parse(event.target.result);
      for (let key in config) {
        localStorage.setItem(key, config[key]);
      }
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
    ppplog('event.target.value', event.target.value)
    setThemePaletteMode(event.target.value);
  };


  return (
    <div>
      <Drawer
        anchor="right"
        open={isOpenSetting}
        onClose={closeSetting}
      >
        <Box sx={{ width: 350, padding: 2 }}>
          <Button onClick={downloadConfig}>下载配置</Button>
          <Button variant="contained" component="label">
            上传配置
            <input type="file" hidden onChange={uploadConfig} />
          </Button>
        </Box>

        <Divider />


        <Button onClick={clearLocalStorage}>Initialize System</Button>


        <Divider />


        <Box sx={{ padding: 2 }}>
          <Typography variant="h6">主题模式</Typography>
          <RadioGroup
            aria-label="theme"
            name="theme"
            value={themePaletteMode}
            onChange={handleThemeChange}
          >
            <FormControlLabel value="light" control={<Radio />} label="Light" />
            <FormControlLabel value="dark" control={<Radio />} label="Dark" />
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
      </Drawer>
    </div>
  );
}
