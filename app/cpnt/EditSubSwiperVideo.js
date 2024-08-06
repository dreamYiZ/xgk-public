import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Box, Tabs, Tab, Typography, TextField, Button, Checkbox, IconButton, Switch, FormControlLabel } from '@mui/material';
import AceEditor from 'react-ace';
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-monokai";
import DrawerEditLayout from "./DrawerEditLayout";
import ClearIcon from '@mui/icons-material/Clear';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import useBoxStore from '../store/useBo';
import { safeNumberIfString, SUB_TYPE } from "../util/util";
import ChooseImage from './ChooseImage';  // Make sure to import ChooseImage

export default function EditSwiperVideoSettings() {
  const boxArr = useBoxStore((state) => state.boxArr);
  const activeBoxId = useBoxStore((state) => state.activeBoxId);
  const activeBox = useMemo(() => boxArr.find((box) => box.boxid === activeBoxId), [boxArr, activeBoxId]);
  const sub = useMemo(() => activeBox?.sub, [activeBox, activeBoxId]);
  const changeById = useBoxStore(state => state.changeById);

  const [isOpen, setIsOpen] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const [videoSrc, setVideoSrc] = useState('');
  const [videoSrcList, setVideoSrcList] = useState([]);
  const [muted, setMuted] = useState(true);  // Add state for muted
  const [showSelectImage, setShowSelectImage] = useState(false);  // Add state for showing image selection

  const dragItem = useRef();
  const dragOverItem = useRef();

  const saveChange = () => {
    if (sub) {
      changeById(activeBox.boxid, {
        sub: {
          ...sub,
          fullscreen,
          videoSrcList,
          muted,
        },
      });
    }
  };

  useEffect(() => {
    if (activeBoxId && sub) {
      setFullscreen(sub.fullscreen || false);
      setVideoSrcList(sub.videoSrcList || []);
      setMuted(sub.muted);  // Initialize muted state
    }
  }, [sub, activeBoxId]);

  const handleAddVideoSrc = () => {
    if (videoSrc.trim() !== '') {
      setVideoSrcList([...videoSrcList, videoSrc.trim()]);
      setVideoSrc('');
    }
  };

  const handleDeleteVideoSrc = (index) => {
    const updatedList = videoSrcList.filter((_, i) => i !== index);
    setVideoSrcList(updatedList);
  };

  const handleSort = () => {
    const _videoSrcList = [...videoSrcList];
    const draggedItemContent = _videoSrcList.splice(dragItem.current, 1)[0];
    _videoSrcList.splice(dragOverItem.current, 0, draggedItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setVideoSrcList(_videoSrcList);
  };

  const handleChoose = ({ image }) => {
    if (image.endsWith('.mp4')) {
      setVideoSrc(image);  // Set the video URL when a video is selected
    }
    setShowSelectImage(false);
  }

  const selectImage = () => {
    setShowSelectImage(true);
  }

  return (
    <Box my={2}>
      <DrawerEditLayout saveChange={saveChange} isOpen={isOpen} setIsOpen={setIsOpen} buttonText="编辑数据" title="视频轮播">
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabIndex} onChange={(event, newValue) => setTabIndex(newValue)} aria-label="basic tabs example">
            <Tab label="数据" />
            <Tab label="样式" />
          </Tabs>
        </Box>
        <Box mt={1}></Box>
        <Box sx={{}} hidden={tabIndex !== 0}>
          <Typography variant="h6" component="h6">
            数据
          </Typography>
          <Box>
            <AceEditor
              mode="json"
              theme="monokai"
              value={JSON.stringify(sub, null, 2)}
              readOnly={true}
              name="UNIQUE_ID_OF_DIV"
              editorProps={{ $blockScrolling: true }}
              fontSize={14}
              showPrintMargin={true}
              showGutter={true}
              highlightActiveLine={true}
              width={"100%"}
              setOptions={{
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
                enableSnippets: true,
                showLineNumbers: true,
                tabSize: 2,
              }}
            />
          </Box>
        </Box>
        <Box sx={{}} hidden={tabIndex !== 1}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Checkbox
              checked={fullscreen}
              onChange={(event) => setFullscreen(event.target.checked)}
              label="全屏模式"
            />
            <Box>是否全屏模式</Box>
          </Box>
          <Box mt={1}></Box>
          <FormControlLabel
            control={<Switch checked={muted} onChange={(e) => setMuted(e.target.checked)} />}
            label="Muted"
          />
          <Box mt={1}></Box>
          <TextField
            value={videoSrc}
            onChange={(event) => setVideoSrc(event.target.value)}
            label="添加视频地址"
            variant="outlined"
            fullWidth
          />
          <Button color="success" onClick={selectImage}>选择视频</Button>
          <ChooseImage handleChoose={handleChoose} show={showSelectImage} handleClose={() => setShowSelectImage(false)} />

          <Box mt={1}></Box>
          <Button variant="contained" onClick={handleAddVideoSrc} sx={{ ml: 2 }}>
            添加
          </Button>
          <Box mt={1}></Box>
          <Box>
            {videoSrcList.map((src, index) => (
              <Box
                key={index}
                draggable
                onDragStart={(e) => (dragItem.current = index)}
                onDragEnter={(e) => (dragOverItem.current = index)}
                onDragEnd={handleSort}
                onDragOver={(e) => e.preventDefault()}
                display="flex"
                alignItems="center"
                mt={1}
                sx={{ border: '1px solid #ccc', borderRadius: '4px', p: 1 }}
              >
                <IconButton>
                  <SwapVertIcon sx={{ cursor: 'pointer' }} />
                </IconButton>
                <TextField
                  value={src}
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                  sx={{ mr: 1 }}
                />
                <IconButton
                  onClick={() => handleDeleteVideoSrc(index)}
                  color="error"
                >
                  <ClearIcon sx={{ cursor: "pointer" }} />
                </IconButton>
              </Box>
            ))}
          </Box>
        </Box>
      </DrawerEditLayout>
    </Box>
  );
}
