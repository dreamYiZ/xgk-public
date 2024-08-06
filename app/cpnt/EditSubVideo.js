import useBoxStore from '../store/useBo';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { HexColorPicker } from 'react-colorful';  // 引入颜色选择器
import {
  ANIMATE_TIME_FUNCTION_TYPES_DISPLAY, ANIMATE_TIME_FUNCTION_TYPES, ANIMATE_TYPES, ANIMATE_TYPES_DISPLAY
  , ppplog,
} from "../util/util";
import { useCallback, useState, useMemo, useEffect } from 'react';
import { Box } from '@mui/system';  // 引入 Box 组件
import { useDropzone } from 'react-dropzone';
import { Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import DrawerEditLayout from "./DrawerEditLayout";
import ChooseImage from './ChooseImage';  // Make sure to import ChooseImage

export default function () {
  const boxArr = useBoxStore((state) => state.boxArr);
  const activeBoxId = useBoxStore((state) => state.activeBoxId);
  const activeBox = useMemo(() => boxArr.find((box) => box.boxid === activeBoxId), [boxArr, activeBoxId]);
  const sub = useMemo(() => activeBox?.sub, [activeBox, activeBoxId]);
  const [isOpen, setIsOpen] = useState(false);
  const [showSelectImage, setShowSelectImage] = useState(false);  // Add state for showing image selection
  const [videoUrl, setVideoUrl] = useState('');

  const changeById = useBoxStore(state => state.changeById);

  const saveChange = () => {
    if (sub) {
      changeById(activeBox.boxid, {
        sub: {
          ...sub,
          videoJsOptions: {
            ...sub.videoJsOptions,
            sources: [
              {
                type: 'video/mp4',
                src: videoUrl
              }
            ]
          }
        },
      });
    }
  }

  useEffect(() => {
    if (activeBoxId && sub) {

      ppplog('sub?.videoJsOptions', sub?.videoJsOptions)
      if (sub?.videoJsOptions?.sources?.length > 0) {
        setVideoUrl(sub?.videoJsOptions?.sources[0]?.src)
      } else {
        setVideoUrl('')
      }
    }
  }, [sub, activeBoxId]);

  const handleChoose = ({ image }) => {
    if (image.endsWith('.mp4')) {
      setVideoUrl(image);  // Set the video URL when a video is selected
    } else {
      setBg({
        type: BG_TYPE.IMAGE,
        filename: `${image}`,
      });
    }
    setShowSelectImage(false);
  }

  const selectImage = () => {
    setShowSelectImage(true);
  }

  return (
    <Box my={2}>
      <DrawerEditLayout saveChange={saveChange}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        buttonText="编辑数据"
        title="视频编辑"
      >
        <Box>
          <TextField
            fullWidth
            label="视频地址"
            value={videoUrl}
            placeholder="请输入视频地址"
            rows={4}
            multiline
            onChange={(event) => {
              setVideoUrl(event.target.value);
            }}
          />
          <Button color="success" onClick={selectImage}>选择视频</Button>
        </Box>
        <Box mt={1}></Box>
        <ChooseImage handleChoose={handleChoose} show={showSelectImage} handleClose={() => setShowSelectImage(false)} />
      </DrawerEditLayout>
    </Box>
  );
}
