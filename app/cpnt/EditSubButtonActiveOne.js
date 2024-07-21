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
import EditOnClickEvent from "./EditOnClickEvent";
import ppplog from "ppplog";

export default function EditSubButtonActiveOne() {
  const boxArr = useBoxStore((state) => state.boxArr);  // Access the 'boxArr' state
  const activeBoxId = useBoxStore((state) => state.activeBoxId);  // Access the 'activeBoxId' state
  const { openSelectImage } = useGlobalStore();  // Access the 'openSelectImage' state

  // Find the active box in the 'boxArr' array
  const activeBox = useMemo(() => boxArr.find((box) => box.boxid === activeBoxId), [boxArr, activeBoxId]);
  const sub = useMemo(() => activeBox?.sub, [activeBox, activeBoxId]);

  // Check if 'sub' exists before accessing its properties
  const [animation, setAnimation] = useState(sub?.animation || ANIMATE_TYPES.NUMBER_GROWING);  // 添加动画状态
  const [animationDuration, setAnimationDuration] = useState(sub?.animationDuration || 0);  // 添加动画时长状态
  const [animationInterval, setAnimationInterval] = useState(sub?.animationInterval || 0);  // 添加动画间隔状态
  const [animationTimingFunction, setAnimationTimingFunction] = useState(sub?.animationTimingFunction || ANIMATE_TIME_FUNCTION_TYPES.LINEAR);

  const [imageUrl, setImageUrl] = useState(sub?.imgUrl || '');
  const [activeImageUrl, setActiveImageUrl] = useState(sub?.imgActiveUrl || '');
  const [groupid, setGroupid] = useState(sub?.groupid || '');

  const [showSelectImage, setShowSelectImage] = useState(false);  // Add a state for showing
  const [showEditOnClickEvent, setShowEditOnClickEvent] = useState(false);

  const changeById = useBoxStore(state => state.changeById);

  const handleSave = () => {
    if (sub) {
      changeById(activeBox.boxid, {
        sub: {
          ...sub,
          animation,
          animationDuration,
          animationInterval,
          animationTimingFunction,
          imgUrl: imageUrl,  // Save the image URL
          imgActiveUrl: activeImageUrl,  // Save the active image URL
          groupid,  // Save the groupid
        },
      });
    }
  };

  const handleFileChange = (event, isActive) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (isActive) {
          setActiveImageUrl(reader.result);
        } else {
          setImageUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (sub) {
      setImageUrl(sub.imgUrl || '');
      setActiveImageUrl(sub.imgActiveUrl || '');
      setAnimation(sub.animation || ANIMATE_TYPES.NUMBER_GROWING);
      setAnimationDuration(sub.animationDuration || 0);
      setAnimationInterval(sub.animationInterval || 0);
      setAnimationTimingFunction(sub.animationTimingFunction || ANIMATE_TIME_FUNCTION_TYPES.LINEAR);
      setGroupid(sub.groupid || '');
    }
  }, [sub, activeBoxId]);

  const selectImage = () => {
    setShowSelectImage(true);
  };

  const handleChoose = ({ image }) => {
    setImageUrl(image);
    setShowSelectImage(false);
  };

  const handleChooseActiveImage = ({ image }) => {
    setActiveImageUrl(image);
    setShowSelectImage(false);
  };

  return (
    <div>
      <br />
      <Box sx={{ my: 2 }}>
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id="contained-button-file"
          type="file"
          onChange={(event) => handleFileChange(event, false)}
        />
        <label htmlFor="contained-button-file">
          <Button variant="contained" component="span">
            上传未激活图片
          </Button>
        </label>
        <Button component="span" onClick={selectImage}>
          选择未激活图片
        </Button>
      </Box>
      {imageUrl && <img src={imageUrl} alt="预览" style={{ maxWidth: '50%' }} />}
      <br />
      <Box sx={{ my: 2 }}>
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id="contained-button-file-active"
          type="file"
          onChange={(event) => handleFileChange(event, true)}
        />
        <label htmlFor="contained-button-file-active">
          <Button variant="contained" component="span">
            上传激活图片
          </Button>
        </label>
        <Button component="span" onClick={selectImage}>
          选择激活图片
        </Button>
      </Box>
      {activeImageUrl && <img src={activeImageUrl} alt="激活预览" style={{ maxWidth: '50%' }} />}
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
            <MenuItem key={key} value={value}>{ANIMATE_TIME_FUNCTION_TYPES_DISPLAY[key]}</MenuItem>
          ))}
        </Select>
      </Box>
      <br />
      <TextField label="分组" value={groupid} onChange={e => setGroupid(e.target.value)} />
      <br />
      <Box mb={1} />
      <Button variant="contained" color="primary" onClick={handleSave}>保存</Button>
      <ChooseImage handleChoose={handleChoose} show={showSelectImage} handleClose={() => {
        setShowSelectImage(false);
      }} />
      <br />
      <EditOnClickEvent setShowEditOnClickEvent={setShowEditOnClickEvent} showEditOnClickEvent={showEditOnClickEvent} />
    </div>
  );
}


