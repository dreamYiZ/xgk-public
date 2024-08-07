import useBoxStore from '../store/useBo';
import { useState, useMemo, useEffect } from 'react';
import { Box } from '@mui/system';
import DrawerEditLayout from "./DrawerEditLayout";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import ChooseImage from "./ChooseImage";
import { InputAdornment, Switch, FormControlLabel } from '@mui/material';

const UnitSuffix = ({ unit }) => (
  <InputAdornment position="end">{unit}</InputAdornment>
);

export default function EditImageRollPayload() {
  const boxArr = useBoxStore((state) => state.boxArr);
  const activeBoxId = useBoxStore((state) => state.activeBoxId);
  const activeBox = useMemo(() => boxArr.find((box) => box.boxid === activeBoxId), [boxArr, activeBoxId]);
  const sub = useMemo(() => activeBox?.sub, [activeBox, activeBoxId]);
  const changeById = useBoxStore(state => state.changeById);

  const [isOpen, setIsOpen] = useState(false);
  const [images, setImages] = useState(sub?.images || []);
  const [times, setTimes] = useState(sub?.time || []);
  const [fullscreen, setFullscreen] = useState(sub?.fullscreen || false);
  const [showSelectImage, setShowSelectImage] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(null);

  const saveChange = () => {
    if (sub) {
      changeById(activeBox.boxid, {
        sub: {
          ...sub,
          images,
          time: times,
          fullscreen,
        },
      });
    }
  }

  useEffect(() => {
    if (sub) {
      setImages(sub.images || []);
      setTimes(sub.time || []);
      setFullscreen(sub.fullscreen || false);
    }
  }, [activeBoxId]);

  const selectImage = (index) => {
    setCurrentImageIndex(index);
    setShowSelectImage(true);
  }

  const handleChoose = ({ image }) => {
    const newImages = [...images];
    newImages[currentImageIndex] = image;
    setImages(newImages);
    setShowSelectImage(false);
  }

  const handleTimeChange = (index, value) => {
    const newTimes = [...times];
    newTimes[index] = Math.max(1, value); // Ensure time is at least 1 second
    setTimes(newTimes);
  }

  const addImage = () => {
    setImages([...images, '']);
    setTimes([...times, 1]); // Default time to 1 second
  }

  const removeImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    const newTimes = times.filter((_, i) => i !== index);
    setImages(newImages);
    setTimes(newTimes);
  }

  return (
    <Box my={2}>
      <DrawerEditLayout saveChange={saveChange}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        buttonText="编辑数据"
        title="图片轮播编辑"
        width={700}
      >
        <Box mb={2}>
          {images.map((image, index) => (
            <Box key={index} mb={2} display="flex" alignItems="center">
              <TextField
                label="时间 (秒)"
                value={times[index]}
                onChange={(event) => handleTimeChange(index, event.target.value)}
                InputProps={{
                  endAdornment: <UnitSuffix unit="s" />,
                }}
                style={{ marginRight: '10px', width: "220px" }}
              />
              <TextField
                fullWidth
                multiline
                label="图片地址"
                value={image}
                placeholder="请输入图片地址"
                onChange={(event) => {
                  const newImages = [...images];
                  newImages[index] = event.target.value;
                  setImages(newImages);
                }}
                style={{ marginRight: '10px' }}
              />
              <Button component="span" onClick={() => selectImage(index)}>
                选择图片
              </Button>
              <Button component="span" onClick={() => removeImage(index)}>
                删除
              </Button>
              {image && <img src={image} alt="预览" style={{ maxWidth: '100px', marginLeft: '10px' }} />}
            </Box>
          ))}
          <Button component="span" onClick={addImage}>
            添加图片
          </Button>
          <ChooseImage handleChoose={handleChoose} show={showSelectImage} handleClose={() => {
            setShowSelectImage(false);
          }} />
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
