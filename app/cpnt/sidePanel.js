import React, { useEffect, useRef, useState, lazy, Suspense } from 'react';
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, TextField, Tabs, Tab, Box, IconButton } from '@mui/material';
import classes from "./sidePanel.module.sass"
import useGlobalStore from '../store/useGlobal';
import { MODE, BG_TYPE } from '../store/useGlobal';
import { Snackbar } from '@mui/material';
import Alert from '@mui/material/Alert';
import EditPage from "./editPage";
import EditBox from "./editBox";
// import EditMarket from "./editMarket";
import { Button } from '@mui/material';
import useBoxStore from '../store/useBo';
import ppplog from 'ppplog';
import { handleFullscreen } from "../util/util";
import SettingsIcon from '@mui/icons-material/Settings';  // 引入 SettingsIcon 图标
import Setting from "./setting";
import ChooseImage from "./ChooseImage";
import BarChartIcon from '@mui/icons-material/BarChart';  // 引入 BarChartIcon 图标
import DataCenter from "./dataCenter";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import FeaturedPlayListIcon from '@mui/icons-material/FeaturedPlayList';
import PageManage from "./PageManage";
import FlipCameraAndroidIcon from '@mui/icons-material/FlipCameraAndroid';
import EditTabContainer from "./editTabContainer";

const EditMarket = lazy(() => import('./editMarket'));



function SidePanel() {
  const { mode, setMode, screenWidth, screenHeight, setScreenWidth,
    setScreenHeight, tab: tabValue, setTabValue, setBg,
    openSetting,
    closeSetting,
    openSelectImage,
    setBgVideo,
    isFullScreenAutoBoolean,
    setIsFullScreenAutoBoolean,
    clearMainDivState,
    bg
  } = useGlobalStore();
  const { clearActiveId, activeBoxId } = useBoxStore();
  const fileInput = useRef(null);

  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [showSelectImage, setShowSelectImage] = useState(false);  // Add a state for showing
  const [isShowDataCenter, setIsShowDataCenter] = React.useState(false);
  const [isShowPageManage, setIsShowPageManage] = React.useState(false);

  const [isFullScreenAuto, setIsFullScreenAuto] = useState('no')



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

  const handleResetBgClick = () => {
    setBgVideo(null);
    setBg({
      type: BG_TYPE.IMAGE,
      filename: null,
    })

  }




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
      if (selectedFile.type.startsWith('image/')) {
        setBg({
          type: selectedFile.type.startsWith('image/') ? BG_TYPE.IMAGE : BG_TYPE.VIDEO,
          filename: `/upload/${selectedFile.name}`,
        });
      }
      if (selectedFile.type.startsWith('video/')) {
        setBgVideo(
          `/upload/${selectedFile.name}`
        );
      }

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
    if (image.endsWith('.mp4')) {
      setBgVideo(image);
    } else {
      setBg({
        type: BG_TYPE.IMAGE,
        filename: `${image}`,
      });
    }
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

  const handleOpenDataControlCenter = () => {
    setIsShowDataCenter(true);
  }


  const handleOpenPageManage = () => {
    setIsShowPageManage(true);
  }

  const onChangeFullScreenAuto = (event) => {
    // ppplog('event', event, event.target.value)
    setIsFullScreenAuto(event.target.value)
    setIsFullScreenAutoBoolean(event.target.value === 'yes');
  }

  useEffect(() => {
    setIsFullScreenAuto(isFullScreenAutoBoolean ? 'yes' : 'no');
  }, [isFullScreenAutoBoolean])


  useEffect(() => {
    if (bg && bg.filename) {
      setImageUrl(bg.filename);
    }
  }, [])


  return (
    <div className={classes['side-panel-view']}>
      <Box display="flex" justifyContent="space-between" mb={2}>
        {activeBoxId && <Button variant="outlined" color="primary" onClick={handelClearActiveId}>取消</Button>}

        {!activeBoxId && <IconButton onClick={clearMainDivState}>
          <FlipCameraAndroidIcon />
        </IconButton>}
        <IconButton onClick={handleOpenSettings}>
          <SettingsIcon />
        </IconButton>
        <IconButton onClick={handleOpenPageManage}>
          <FeaturedPlayListIcon />
        </IconButton>
        <IconButton onClick={handleOpenDataControlCenter}>
          <BarChartIcon />
        </IconButton>
        <Button variant="outlined" color="primary" onClick={handleFullscreen}>全屏</Button>
      </Box>
      <FormControl component="fieldset" className={classes.oneLine}>
        <RadioGroup row={true} aria-label="mode" name="mode" value={mode} onChange={handleChange} className={classes['radio-group']}>
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
        <EditTabContainer>
          <Accordion>
            <AccordionSummary
              expandIcon={<ArrowDownwardIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography>编辑页面</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box>
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
                  <TextField
                    multiline
                    label="输入图片地址" value={imageUrl} onChange={handleImageUrlChange} />
                  <Button onClick={handleConfirmClick}>确定</Button>
                </Box>
                {preview && (preview.startsWith('blob:') ? <img style={{ width: "100px", height: "60px" }} src={preview} alt="Preview" /> : <p>{preview}</p>)}
                <Box mt={2}>
                  <Button color='warning' variant='outlined' onClick={handleResetBgClick}>重置</Button>
                </Box>
                <Box sx={{ paddingTop: 1 }}></Box>
                <FormControl>
                  <FormLabel id="demo-controlled-radio-buttons-group">全屏适配</FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={isFullScreenAuto}
                    onChange={onChangeFullScreenAuto}
                    row
                  >
                    <FormControlLabel value="yes" control={<Radio />} label="是" />
                    <FormControlLabel value="no" control={<Radio />} label="否" />
                  </RadioGroup>
                </FormControl>
              </Box>
            </AccordionDetails>
          </Accordion>
          <EditPage />
        </EditTabContainer>
      </Box>

      <Box style={{ display: tabValue === 1 ? 'block' : 'none' }}>
        <EditBox />
      </Box>

      <Box style={{ display: tabValue === 2 ? 'block' : 'none' }}>
        <Suspense fallback={<div>Loading...</div>}>
          <EditMarket />
        </Suspense>
      </Box>

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
        <Alert onClose={() => setOpenSnackbar(false)} severity="error" sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>
      <Setting />
      <ChooseImage handleChoose={handleChoose} show={showSelectImage} handleClose={() => setShowSelectImage(false)} />
      <PageManage show={isShowPageManage} handleClose={() => setIsShowPageManage(false)} />
      <DataCenter show={isShowDataCenter} setShow={setIsShowDataCenter} />
    </div>
  );

}

export default SidePanel;


