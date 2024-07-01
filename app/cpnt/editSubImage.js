import useBoxStore from '../store/useBo';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { HexColorPicker } from 'react-colorful';  // 引入颜色选择器
import { ANIMATE_TIME_FUNCTION_TYPES_DISPLAY, ANIMATE_TIME_FUNCTION_TYPES, ANIMATE_TYPES, ANIMATE_TYPES_DISPLAY } from "../util/util";
import { useState, useMemo, useEffect } from 'react';
import { Box } from '@mui/system';  // 引入 Box 组件
import ChooseImage from "./chooseImage";
import useGlobalStore from '../store/useGlobal';
import ppplog from "ppplog";

function EditSubImage() {

  const boxArr = useBoxStore((state) => state.boxArr);  // Access the 'boxArr' state
  const activeBoxId = useBoxStore((state) => state.activeBoxId);  // Access the 'activeBoxId' state
  const { openSelectImage,
  } = useGlobalStore();  // Access the 'activeBoxId' state

  // Find the active box in the 'boxArr' array
  const activeBox = useMemo(() => boxArr.find((box) => box.boxid === activeBoxId), [boxArr, activeBoxId]);
  const sub = useMemo(() => activeBox?.sub, [activeBox, activeBoxId]);

  // Check if 'sub' exists before accessing its properties

  const [animation, setAnimation] = useState(sub?.animation || ANIMATE_TYPES.NUMBER_GROWING);  // 添加动画状态
  const [animationDuration, setAnimationDuration] = useState(sub?.animationDuration || 0);  // 添加动画时长状态
  const [animationInterval, setAnimationInterval] = useState(sub?.animationInterval || 0);  // 添加动画间隔状态
  const [animationTimingFunction, setAnimationTimingFunction] = useState(sub?.animationTimingFunction || ANIMATE_TIME_FUNCTION_TYPES.LINEAR);
  const [imageUrl, setImageUrl] = useState(sub?.url || '');
  const [showSelectImage, setShowSelectImage] = useState(false);  // Add a state for showing

  const changeById = useBoxStore(state => state.changeById);


  console.log('EditSubImage Render', activeBoxId);



  const handleSave = () => {
    if (sub) {
      changeById(activeBox.boxid, {
        sub: {
          ...sub,
          animation,
          animationDuration,
          animationInterval,
          animationTimingFunction,
          url: imageUrl,  // Save the image URL
        },
      });
    }
  };
  // Handle file input change
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result);

      };
      reader.readAsDataURL(file);
    }
  };


  useEffect(() => {
    if (sub) {
      setImageUrl(sub.url || '');
      setAnimation(sub.animation || ANIMATE_TYPES.NUMBER_GROWING);
      setAnimationDuration(sub.animationDuration || 0);
      setAnimationInterval(sub.animationInterval || 0);
      setAnimationTimingFunction(sub.animationTimingFunction || ANIMATE_TIME_FUNCTION_TYPES.LINEAR);
    }
  }, [sub, activeBoxId]);



  const selectImage = () => {
    setShowSelectImage(true);
  }


  const handleChoose = ({ image }) => {
    ppplog('handleChoose-edit', image);
    setImageUrl(image);

    setShowSelectImage(false); //

  }

  return (
    <div>
      <br />
      <Box sx={{ my: 2 }}>
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id="contained-button-file"
          type="file"
          onChange={handleFileChange}
        />
        <label htmlFor="contained-button-file">
          <Button variant="contained" component="span">
            上传图片
          </Button>
        </label>
        <Button  component="span" onClick={selectImage}>
          选择图片
        </Button>
      </Box>

      {imageUrl && <img src={imageUrl} alt="预览" style={{ maxWidth: '100%' }} />}
      <br />
      <Box display="flex" alignItems="center">
        <Box mr={2}>  {/* 添加右边距 */}
          <label>动画</label>
        </Box>
        <Select
          value={animation}
          onChange={e => setAnimation(e.target.value)}
          renderValue={(value) => ANIMATE_TYPES_DISPLAY[value] || value}  // Use the display name from 'ANIMATE_TYPES_DISPLAY' if it exists, otherwise use the original value
        >
          {Object.entries(ANIMATE_TYPES).map(([key, value]) => (
            <MenuItem key={key} value={value}>{ANIMATE_TYPES_DISPLAY[key]}</MenuItem>
          ))}
          {(!ANIMATE_TYPES.value && animation) && <MenuItem key={animation} value={animation}>{animation}</MenuItem>}
        </Select>
      </Box>
      <br />
      <br />
      <TextField label="动画时长" value={animationDuration} onChange={e => setAnimationDuration(e.target.value)} />
      <br />
      <br />
      <TextField label="动画间隔" value={animationInterval} onChange={e => setAnimationInterval(e.target.value)} />
      <br />
      <br />
      <Box display="flex" alignItems="center">
        <Box mr={2}>  {/* 添加右边距 */}
          <label>动画时间函数</label>
        </Box>
        <Select
          value={animationTimingFunction}
          onChange={e => setAnimationTimingFunction(e.target.value)}
          renderValue={(value) => ANIMATE_TIME_FUNCTION_TYPES_DISPLAY[value] || value}
        >
          {Object.entries(ANIMATE_TIME_FUNCTION_TYPES).map(([key, value]) => (
            <MenuItem key={key} value={value}>{ANIMATE_TIME_FUNCTION_TYPES_DISPLAY[value]}</MenuItem>
          ))}
        </Select>
      </Box>
      <br />

      <Button variant="contained" color="primary" onClick={handleSave}>保存</Button>
      <ChooseImage handleChoose={handleChoose} show={showSelectImage} handleClose={()=>{
        setShowSelectImage(false);
      }} />

    </div>
  );
}

export default EditSubImage;

