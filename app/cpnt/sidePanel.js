import React, { useRef, useState } from 'react';
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, TextField, Tabs, Tab, Box } from '@mui/material';
import classes from "./sidePanel.module.sass"
import useGlobalStore from '../store/useGlobal';
import { MODE, BG_TYPE } from '../store/useGlobal';
import { Snackbar } from '@mui/material';
import Alert from '@mui/material/Alert';
import EditPage from "./editPage";
import EditBox from "./editBox";
import EditMarket from "./editMarket";
import { Button } from '@mui/material';

function SidePanel() {
  const { mode, setMode, screenWidth, screenHeight, setScreenWidth, setScreenHeight, tab: tabValue, setTabValue, setBg } = useGlobalStore();
  const fileInput = useRef(null);

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




  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);

    // Reset the preview
    setPreview(null);

    // Create a preview
    const file = event.target.files[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        // If it's an image, create an object URL and use it as a preview
        setPreview(URL.createObjectURL(file));
      } else if (file.type.startsWith('video/')) {
        // If it's a video, just display the file name
        setPreview(file.name);
      }
    }
  };


  const handleUploadClick = async () => {
    const formData = new FormData();
    formData.append("file", fileInput?.current?.files?.[0]);

    const response = await fetch("/api/uploadImage", {
      method: "POST",
      body: formData,
    });
    const result = await response.json();

    if (result.status === "success") {
      // If the upload was successful, update the 'bg' state
      setBg({
        type: selectedFile.type.startsWith('image/') ? BG_TYPE.IMAGE : BG_TYPE.VIDEO,
        filename: selectedFile.name,
      });
    } else {
      console.error(result.error);
    }
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
          <br />

          <Button variant="contained" component="label">
            Upload File
            <input ref={fileInput} type="file" hidden onChange={handleFileChange} />
          </Button>
          <Button onClick={handleUploadClick}>Submit</Button>
          <br />

          {preview && (preview.startsWith('blob:') ? <img style={{ width: "100px", height: "60px" }} src={preview} alt="Preview" /> : <p>{preview}</p>)}

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
