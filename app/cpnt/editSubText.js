import useBoxStore from '../store/useBo';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { HexColorPicker } from 'react-colorful';  // 引入颜色选择器
import { ANIMATE_TIME_FUNCTION_TYPES_DISPLAY, ANIMATE_TIME_FUNCTION_TYPES, ANIMATE_TYPES, ANIMATE_TYPES_DISPLAY } from "../util/util";
import { useState, useMemo, useEffect } from 'react';
import { Box } from '@mui/system';  // 引入 Box 组件


function EditSubText() {

  const boxArr = useBoxStore((state) => state.boxArr);  // Access the 'boxArr' state
  const activeBoxId = useBoxStore((state) => state.activeBoxId);  // Access the 'activeBoxId' state

  // Find the active box in the 'boxArr' array
  const activeBox = useMemo(() => boxArr.find((box) => box.boxid === activeBoxId), [boxArr, activeBoxId]);
  const sub = useMemo(() => activeBox?.sub, [activeBox, activeBoxId]);

  // Check if 'sub' exists before accessing its properties
  const [fontSize, setFontSize] = useState(sub?.fontSize.replace('px', '') || '');
  const [fontWeight, setFontWeight] = useState(sub?.fontWeight || '');
  const [content, setContent] = useState(sub?.content || '');
  const [color, setColor] = useState(sub?.color || '');
  const [animation, setAnimation] = useState(sub?.animation || ANIMATE_TYPES.NUMBER_GROWING);  // 添加动画状态
  const [animationDuration, setAnimationDuration] = useState(sub?.animationDuration || 0);  // 添加动画时长状态
  const [animationInterval, setAnimationInterval] = useState(sub?.animationInterval || 0);  // 添加动画间隔状态
  const [animationTimingFunction, setAnimationTimingFunction] = useState(sub?.animationTimingFunction || ANIMATE_TIME_FUNCTION_TYPES.LINEAR);

  const changeById = useBoxStore(state => state.changeById);


  const handleSave = () => {
    if (sub) {  // Check if 'sub' exists before saving
      changeById(activeBox.boxid, {
        sub: {
          ...sub,
          fontSize: fontSize,
          fontWeight,
          content,
          color,
          animation,  // 保存动画状态
          animationDuration,  // 保存动画时长状态
          animationInterval,  // 保存动画间隔状态
          animationTimingFunction,  // Save the animation timing function
        },
      });
    }
  };

  useEffect(() => {
    if (sub) {
      setFontSize(sub.fontSize.replace('px', '') || '');
      setFontWeight(sub.fontWeight || '');
      setContent(sub.content || '');
      setColor(sub.color || '');
      setAnimation(sub.animation || ANIMATE_TYPES.NUMBER_GROWING);
      setAnimationDuration(sub.animationDuration || 0);
      setAnimationInterval(sub.animationInterval || 0);
      setAnimationTimingFunction(sub.animationTimingFunction || ANIMATE_TIME_FUNCTION_TYPES.LINEAR);
    }
  }, [sub, activeBoxId]);


  return (
    <div>
      <br />
      <TextField label="字体大小 (px)" value={fontSize} onChange={e => setFontSize(e.target.value)} />
      <br />
      <br />
      <TextField label="字体粗细" value={fontWeight} onChange={e => setFontWeight(e.target.value)} />
      <br />
      <br />
      <TextField label="内容" value={content} onChange={e => setContent(e.target.value)} />
      <br />
      <br />
      <div>
        <label>颜色</label>
        <HexColorPicker color={color} onChange={setColor} />
        <TextField value={color} onChange={e => setColor(e.target.value)} />
      </div>
      <br />
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
    </div>
  );
}

export default EditSubText;
