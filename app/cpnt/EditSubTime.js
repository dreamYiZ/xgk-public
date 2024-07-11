import useBoxStore from '../store/useBo';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { HexColorPicker } from 'react-colorful';  // 引入颜色选择器
import { ANIMATE_TIME_FUNCTION_TYPES_DISPLAY, ANIMATE_TIME_FUNCTION_TYPES, ANIMATE_TYPES, ANIMATE_TYPES_DISPLAY } from "../util/util";
import { useCallback, useState, useMemo, useEffect } from 'react';
import { Box } from '@mui/system';  // 引入 Box 组件
import { useDropzone } from 'react-dropzone';
import { Typography } from '@mui/material';



export default function () {

  const boxArr = useBoxStore((state) => state.boxArr);  // Access the 'boxArr' state
  const activeBoxId = useBoxStore((state) => state.activeBoxId);  // Access the 'activeBoxId' state

  // Find the active box in the 'boxArr' array
  const activeBox = useMemo(() => boxArr.find((box) => box.boxid === activeBoxId), [boxArr, activeBoxId]);
  const sub = useMemo(() => activeBox?.sub, [activeBox, activeBoxId]);

  // Check if 'sub' exists before accessing its properties
  const [fontSize, setFontSize] = useState(sub?.fontSize.replace('px', '') || '');
  const [color, setColor] = useState(sub?.color || '');

  const changeById = useBoxStore(state => state.changeById);

  const handleSave = () => {
    if (sub) {  // Check if 'sub' exists before saving
      changeById(activeBox.boxid, {
        sub: {
          ...sub,
          fontSize: fontSize,
          color: color,
        },
      });
    }
  };


  useEffect(() => {
    if (sub) {
      setFontSize(sub.fontSize.replace('px', '') || '');
      setColor(sub.color || '');
    }
  }, [sub, activeBoxId]);




  return (
    <Box my={2}>
      <Box mb={2}>
        <TextField label="字体大小 (px)" value={fontSize} onChange={e => setFontSize(e.target.value)} />
      </Box>
      <Box mb={2}>
        <div>
          <label>颜色</label>
          <HexColorPicker color={color} onChange={setColor} />
          <TextField value={color} onChange={e => setColor(e.target.value)} />
        </div>
      </Box>
      <Box>
        <Button variant="contained" color="primary" onClick={handleSave}>保存</Button>
      </Box>
    </Box>
  );
}
