import useBoxStore from '../store/useBo';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { HexColorPicker } from 'react-colorful';  // 引入颜色选择器
import { SPRINT_STATUS, ANIMATE_TIME_FUNCTION_TYPES_DISPLAY, ANIMATE_TIME_FUNCTION_TYPES, ANIMATE_TYPES, ANIMATE_TYPES_DISPLAY } from "../util/util";
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


  const [currentStatus, setCurrentStatus] = useState([SPRINT_STATUS.RUNNING])
  const [spriteImageUrl, setSpriteImageUrl] = useState();
  const [spriteWidth, setSpriteWidth] = useState();
  const [spriteHeight, setSpriteHeight] = useState();
  const [spriteSpeed, setSpriteSpeed] = useState(1000);





  const handleSave = () => {
    if (sub) {
      changeById(activeBox.boxid, {
        sub: {
          ...sub,

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

      if (currentStatus) {
        setImageUrl(sub.urlMap[currentStatus]);
        setSpriteImageUrl(sub.urlMap[currentStatus]);
        setSpriteWidth(sub.sizeMap[currentStatus].width);
        setSpriteHeight(sub.sizeMap[currentStatus].height);
        setSpriteSpeed(sub.speedMap[currentStatus]);
        // 创建一个新的 Image 对象
        const img = new Image();
        // 设置图片的 URL
        img.src = sub.urlMap[currentStatus];
        // 当图片加载完成后
        img.onload = () => {

          console.log('img.onload', img, img.width, img.height);
          // 获取图片的宽度和高度
          if (img.width) {
            setSourceWidth(img.width);
          }
          if (img.height) {
            setSourceHeight(img.height);
          }
        };


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
        <Button component="span" onClick={selectImage}>
          选择图片
        </Button>
      </Box>

      {imageUrl && <img src={imageUrl} alt="预览" style={{ maxWidth: '100%' }} />}
      <br />

      <br />

      <Button variant="contained" color="primary" onClick={handleSave}>保存</Button>
      <ChooseImage handleChoose={handleChoose} show={showSelectImage} handleClose={() => {
        setShowSelectImage(false);
      }} />

    </div>
  );
}



