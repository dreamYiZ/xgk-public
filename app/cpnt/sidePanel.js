import React, { useRef, useState } from 'react';
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, TextField, Tabs, Tab, Box, IconButton } from '@mui/material';
import classes from "./sidePanel.module.sass"
import useGlobalStore from '../store/useGlobal';
import { MODE, BG_TYPE } from '../store/useGlobal';
import { Snackbar } from '@mui/material';
import Alert from '@mui/material/Alert';
import EditPage from "./editPage";
import EditBox from "./editBox";
import EditMarket from "./editMarket";
import { Button } from '@mui/material';
import useBoxStore from '../store/useBo';
import ppplog from 'ppplog';
import { handleFullscreen } from "../util/util";
import SettingsIcon from '@mui/icons-material/Settings';  // 引入 SettingsIcon 图标
import Setting from "./setting";
import ChooseImage from "./chooseImage";

function SidePanel() {
  const { mode, setMode, screenWidth, screenHeight, setScreenWidth,
    setScreenHeight, tab: tabValue, setTabValue, setBg,
    openSetting,
    closeSetting,
    openSelectImage,

  } = useGlobalStore();
  const { clearActiveId, activeBoxId } = useBoxStore();
  const fileInput = useRef(null);

  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [showSelectImage, setShowSelectImage] = useState(false);  // Add a state for showing


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
        filename: `/upload/${selectedFile.name}`,
      });
    } else {
      console.error(result.error);
    }
  };


  const handelClearActiveId = () => {
    clearActiveId();
  }



  const handleOpenSettings = () => {
    openSetting();
  };

  const handleCloseSettings = () => {
    closeSetting();
  };

  const selectImage = () => {

    setShowSelectImage(true);
  }


  const handleChoose = ({ image }) => {

    setBg({
      type: BG_TYPE.IMAGE,
      filename: `${image}`,
    });

    setShowSelectImage(false);

  }


  // Add a new state for the image URL
  const [imageUrl, setImageUrl] = useState('');

  // Add a function to handle the image URL input change
  const handleImageUrlChange = (event) => {
    setImageUrl(event.target.value);
  };

  // Add a function to handle the confirm button click
  const handleConfirmClick = () => {
    if (imageUrl) {
      setBg({
        type: BG_TYPE.IMAGE,
        filename: imageUrl,
      });
    }
  };


  return (
    <div className={classes['side-panel-view']}>
      <Box display="flex" justifyContent="space-between" mb={2}>
        {activeBoxId && <Button variant="outlined" color="primary" onClick={handelClearActiveId}>取消选择</Button>}
        <IconButton onClick={handleOpenSettings}>  {/* 添加一个 IconButton 来打开设置面板 */}
          <SettingsIcon />
        </IconButton>
        <Button variant="outlined" color="primary" onClick={handleFullscreen}>全屏</Button>
      </Box>
      <FormControl component="fieldset" className={classes.oneLine} row>
        <FormLabel component="legend">模式</FormLabel>
        <RadioGroup row aria-label="mode" name="mode" value={mode} onChange={handleChange} className={classes['radio-group']}>
          <FormControlLabel value={MODE.EDIT} control={<Radio />} label="编辑" />
          <FormControlLabel value={MODE.TEST} control={<Radio />} label="测试" />
          <FormControlLabel value={MODE.DISPLAY} control={<Radio />} label="展示" />
        </RadioGroup>


      </FormControl>
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
          上传文件
          <input ref={fileInput} type="file" hidden onChange={handleFileChange} />
        </Button>
        <Button color="success" onClick={selectImage}>选择图片</Button>
        <Button onClick={handleUploadClick}>确定</Button>
        <br />


        <br />
        <Box>
          <TextField label="输入图片地址" value={imageUrl} onChange={handleImageUrlChange} />
          <Button onClick={handleConfirmClick}>确定</Button>

        </Box>


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


      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
        <Alert onClose={() => setOpenSnackbar(false)} severity="error" sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>
      <Setting />  {/* 设置面板 */}
      <ChooseImage handleChoose={handleChoose} show={showSelectImage} handleClose={() => {
        setShowSelectImage(false);
      }} />
    </div>
  );
}

export default SidePanel;
