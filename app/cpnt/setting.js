import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import useGlobalStore from '../store/useGlobal';
import Divider from '@mui/material/Divider';

export default function Setting() {
  const { isOpenSetting, openSetting, closeSetting } = useGlobalStore();

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
    reader.onload = function(event) {
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


  return (
    <div>
      <Drawer
        anchor="right"
        open={isOpenSetting}
        onClose={closeSetting}
      >
        <Box sx={{ width: 200, padding: 2 }}>
          <Button onClick={downloadConfig}>下载配置</Button>
          <Button variant="contained" component="label">
            上传配置
            <input type="file" hidden onChange={uploadConfig} />
          </Button>
        </Box>

        <Divider />


        <Button onClick={clearLocalStorage}>Initialize System</Button>

      </Drawer>
    </div>
  );
}
