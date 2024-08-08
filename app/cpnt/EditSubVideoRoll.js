import useBoxStore from '../store/useBo';
import { useState, useMemo, useEffect } from 'react';
import { Box } from '@mui/system';
import DrawerEditLayout from "./DrawerEditLayout";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import ChooseImage from "./ChooseImage";
import { Switch, FormControlLabel } from '@mui/material';
import PreviewVideo from "./PreviewVideo";

export default function EditVideoRollPayload() {
  const boxArr = useBoxStore((state) => state.boxArr);
  const activeBoxId = useBoxStore((state) => state.activeBoxId);
  const activeBox = useMemo(() => boxArr.find((box) => box.boxid === activeBoxId), [boxArr, activeBoxId]);
  const sub = useMemo(() => activeBox?.sub, [activeBox, activeBoxId]);
  const changeById = useBoxStore(state => state.changeById);

  const [isOpen, setIsOpen] = useState(false);
  const [videoList, setVideoList] = useState(sub?.videoList || []);
  const [fullscreen, setFullscreen] = useState(sub?.fullscreen || false);
  const [showSelectVideo, setShowSelectVideo] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(null);

  const saveChange = () => {
    if (sub) {
      changeById(activeBox.boxid, {
        sub: {
          ...sub,
          videoList,
          fullscreen,
        },
      });
    }
  }

  useEffect(() => {
    if (sub) {
      setVideoList(sub.videoList || []);
      setFullscreen(sub.fullscreen || false);
    }
  }, [activeBoxId]);

  const selectVideo = (index) => {
    setCurrentVideoIndex(index);
    setShowSelectVideo(true);
  }

  const handleChoose = ({ image }) => {
    const newVideoList = [...videoList];
    newVideoList[currentVideoIndex] = image;
    setVideoList(newVideoList);
    setShowSelectVideo(false);
  }

  const addVideo = () => {
    setVideoList([...videoList, '']);
  }

  const removeVideo = (index) => {
    const newVideoList = videoList.filter((_, i) => i !== index);
    setVideoList(newVideoList);
  }

  return (
    <Box my={2}>
      <DrawerEditLayout saveChange={saveChange}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        buttonText="编辑数据"
        title="视频轮播编辑"
        width={700}
      >
        <Box mb={2}>
          {videoList.map((video, index) => (
            <Box key={index} mb={2} display="flex" alignItems="center">
              <TextField
                fullWidth
                multiline
                label="视频地址"
                value={video}
                placeholder="请输入视频地址"
                onChange={(event) => {
                  const newVideoList = [...videoList];
                  newVideoList[index] = event.target.value;
                  setVideoList(newVideoList);
                }}
                style={{ marginRight: '10px' }}
              />
              <Button component="span" onClick={() => selectVideo(index)}>
                选择视频
              </Button>
              <Button component="span" onClick={() => removeVideo(index)}>
                删除
              </Button>
              {video && <PreviewVideo src={video} ml={1} />}

            </Box>
          ))}
          <Button component="span" onClick={addVideo}>
            添加视频
          </Button>
          <ChooseImage handleChoose={handleChoose} show={showSelectVideo} handleClose={() => {
            setShowSelectVideo(false);
          }} type="video" />
          <FormControlLabel
            control={
              <Switch
                checked={fullscreen}
                onChange={(event) => setFullscreen(event.target.checked)}
                name="fullscreen"
                color="primary"
              />
            }
            label="全屏"
          />
        </Box>
      </DrawerEditLayout>
    </Box>
  );
}
