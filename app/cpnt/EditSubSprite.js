import useBoxStore from '../store/useBo';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { HexColorPicker } from 'react-colorful';  // 引入颜色选择器
import { canToBeNumber, pxToNumber, SPRINT_STATUS } from "../util/util";
import { useState, useMemo, useEffect } from 'react';
import { Box } from '@mui/system';  // 引入 Box 组件
import ChooseImage from "./chooseImage";
import useGlobalStore from '../store/useGlobal';
import ppplog from "ppplog";


export default function () {

  const boxArr = useBoxStore((state) => state.boxArr);  // Access the 'boxArr' state
  const activeBoxId = useBoxStore((state) => state.activeBoxId);  // Access the 'activeBoxId' state


  // Find the active box in the 'boxArr' array
  const activeBox = useMemo(() => boxArr.find((box) => box.boxid === activeBoxId), [boxArr, activeBoxId]);
  const sub = useMemo(() => activeBox?.sub, [activeBox, activeBoxId]);

  // Check if 'sub' exists before accessing its properties


  const [imageUrl, setImageUrl] = useState(sub?.url || '');
  const [showSelectImage, setShowSelectImage] = useState(false);  // Add a state for showing

  const changeById = useBoxStore(state => state.changeById);
  // Add state for error messages
  const [error, setError] = useState({ spriteWidth: false, spriteHeight: false, spriteSpeed: false });


  const [currentStatus, setCurrentStatus] = useState([SPRINT_STATUS.RUNNING])
  const [spriteImageUrl, setSpriteImageUrl] = useState();
  const [spriteWidth, setSpriteWidth] = useState();
  const [spriteHeight, setSpriteHeight] = useState();
  const [spriteSpeed, setSpriteSpeed] = useState(1000);





  const handleSave = () => {
    if (sub) {

      if ([spriteWidth, spriteHeight, spriteSpeed].every((fieldValue) => {
        if (canToBeNumber(fieldValue)) {
          return true;
        }
        return false;

      })) {
        changeById(activeBox.boxid, {
          sub: {
            ...sub,
            url: imageUrl,  // Save the image URL
            sizeMap: {
              ...sub.sizeMap,
              [currentStatus]: { width: pxToNumber(spriteWidth), height: pxToNumber(spriteHeight) },  // Save the spriteWidth and spriteHeight
            },
            speedMap: {
              ...sub.speedMap,
              [currentStatus]: pxToNumber(spriteSpeed),  // Save the spriteSpeed
            },
          },
        });
      }

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

      if (currentStatus) {
        setImageUrl(sub.urlMap[currentStatus]);
        setSpriteImageUrl(sub.urlMap[currentStatus]);
        setSpriteWidth(sub.sizeMap[currentStatus].width);
        setSpriteHeight(sub.sizeMap[currentStatus].height);
        setSpriteSpeed(sub.speedMap[currentStatus]);


      } else {
        setSpriteImageUrl(null);
        setSpriteWidth(null);
        setSpriteHeight(null);

      }

    }
  }, [sub, activeBoxId, currentStatus]);



  const selectImage = () => {
    setShowSelectImage(true);
  }


  const handleChoose = ({ image }) => {
    setImageUrl(image);

    setShowSelectImage(false); //

  }

  return (
    <div>
      <Box sx={{ my: 2 }} />
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
        <Button component="span" onClick={selectImage}>
          选择图片
        </Button>
      </Box>

      {imageUrl && <img src={imageUrl} alt="预览" style={{ maxWidth: '100%' }} />}
      <Box sx={{ my: 2 }} />

      <Box sx={{ my: 2 }} />

      <TextField
        label="宽度"
        value={spriteWidth}
        onChange={(e) => {
          const value = e.target.value;
          if (canToBeNumber(value)) {
            setSpriteWidth(value);
            setError(prev => ({ ...prev, spriteWidth: false }));
          } else {
            setError(prev => ({ ...prev, spriteWidth: true }));
          }
        }}
        error={error.spriteWidth}
        helperText={error.spriteWidth ? "只能输入数字" : ""}
      />
      <Box sx={{ my: 2 }} />

      <Box sx={{ my: 2 }} />
      <TextField
        label="高度"
        value={spriteHeight}
        onChange={(e) => {
          const value = e.target.value;
          if (canToBeNumber(value)) {
            setSpriteHeight(value);
            setError(prev => ({ ...prev, spriteHeight: false }));
          } else {
            setError(prev => ({ ...prev, spriteHeight: true }));
          }
        }}
        error={error.spriteHeight}
        helperText={error.spriteHeight ? "只能输入数字" : ""}
      />
      <Box sx={{ my: 2 }} />

      <Box sx={{ my: 2 }} />
      <TextField
        label="速度"
        value={spriteSpeed}
        onChange={(e) => {
          const value = e.target.value;
          if (canToBeNumber(value)) {
            setSpriteSpeed(value);
            setError(prev => ({ ...prev, spriteSpeed: false }));
          } else {
            setError(prev => ({ ...prev, spriteSpeed: true }));
          }
        }}
        error={error.spriteSpeed}
        helperText={error.spriteSpeed ? "只能输入数字" : ""}
      />
      <Box sx={{ my: 2 }} />
      <Box sx={{ my: 2 }} />

      <Button variant="contained" color="primary" onClick={handleSave}>保存</Button>
      <ChooseImage handleChoose={handleChoose} show={showSelectImage} handleClose={() => {
        setShowSelectImage(false);
      }} />

    </div>
  );
}
