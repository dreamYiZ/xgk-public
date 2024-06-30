import useBoxStore from '../store/useBo';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { HexColorPicker } from 'react-colorful';  // 引入颜色选择器
import { ANIMATE_TYPES, ANIMATE_TYPES_DISPLAY } from "../util/util";
import { useState, useMemo, useEffect } from 'react';


function EditSubText() {

  const boxArr = useBoxStore((state) => state.boxArr);  // Access the 'boxArr' state
  const activeBoxId = useBoxStore((state) => state.activeBoxId);  // Access the 'activeBoxId' state

  // Find the active box in the 'boxArr' array
  const activeBox = useMemo(() => boxArr.find((box) => box.boxid === activeBoxId), [boxArr, activeBoxId]);
  const sub = useMemo(() => activeBox?.sub, [activeBox, activeBoxId]);

  // Check if 'sub' exists before accessing its properties
  const [fontSize, setFontSize] = useState(sub?.fontSize || '');
  const [fontWeight, setFontWeight] = useState(sub?.fontWeight || '');
  const [content, setContent] = useState(sub?.content || '');
  const [color, setColor] = useState(sub?.color || '');
  const [animation, setAnimation] = useState(sub?.animation || ANIMATE_TYPES.NUMBER_GROWING);  // 添加动画状态
  const [animationDuration, setAnimationDuration] = useState(sub?.animationDuration || 0);  // 添加动画时长状态
  const [animationInterval, setAnimationInterval] = useState(sub?.animationInterval || 0);  // 添加动画间隔状态

  const changeById = useBoxStore(state => state.changeById);


  console.log('EditSubText Render', activeBoxId);
  const handleSave = () => {
    if (sub) {  // Check if 'sub' exists before saving
      changeById(activeBox.boxid, {
        sub: {
          ...sub,
          fontSize,
          fontWeight,
          content,
          color,
          animation,  // 保存动画状态
          animationDuration,  // 保存动画时长状态
          animationInterval,  // 保存动画间隔状态
        },
      });
    }
  };

  useEffect(() => {
    if (sub) {
      setFontSize(sub.fontSize || '');
      setFontWeight(sub.fontWeight || '');
      setContent(sub.content || '');
      setColor(sub.color || '');
      setAnimation(sub.animation || ANIMATE_TYPES.NUMBER_GROWING);
      setAnimationDuration(sub.animationDuration || 0);
      setAnimationInterval(sub.animationInterval || 0);
    }
  }, [sub, activeBoxId]);


  return (
    <div>
      <br />
      <TextField label="Font Size" value={fontSize} onChange={e => setFontSize(e.target.value)} />
      <br />
      <br />
      <TextField label="Font Weight" value={fontWeight} onChange={e => setFontWeight(e.target.value)} />
      <br />
      <br />
      <TextField label="Content" value={content} onChange={e => setContent(e.target.value)} />
      <br />
      <br />
      <div>
        <label>Color</label>
        <HexColorPicker color={color} onChange={setColor} />
        <TextField value={color} onChange={e => setColor(e.target.value)} />
      </div>
      <br />
      <br />
      <div>
        <label>动画</label>
        <Select value={animation} onChange={e => setAnimation(e.target.value)}>
          <MenuItem value={null}>无动画</MenuItem>  // 添加无动画选项
          {Object.entries(ANIMATE_TYPES).map(([key, value]) => (
            <MenuItem key={key} value={value}>{ANIMATE_TYPES_DISPLAY[key]}</MenuItem>
          ))}
        </Select>
      </div>
      <br />
      <br />
      <TextField label="动画时长" value={animationDuration} onChange={e => setAnimationDuration(e.target.value)} />
      <br />
      <br />
      <TextField label="动画间隔" value={animationInterval} onChange={e => setAnimationInterval(e.target.value)} />
      <br />
      <br />
      <Button variant="contained" color="primary" onClick={handleSave}>保存</Button>
    </div>
  );
}

export default EditSubText;
