import { useState } from 'react';
import useBoxStore from '../store/useBo';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { HexColorPicker } from 'react-colorful';  // 引入颜色选择器

function EditSubText({ sub, activeBox }) {
  const [fontSize, setFontSize] = useState(sub.fontSize);
  const [fontWeight, setFontWeight] = useState(sub.fontWeight);
  const [content, setContent] = useState(sub.content);
  const [color, setColor] = useState(sub.color);

  const changeById = useBoxStore(state => state.changeById);

  const handleSave = () => {
    changeById(activeBox.boxid, {
      sub: {
        ...sub,
        fontSize,
        fontWeight,
        content,
        color,
      },
    });
  };

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
      <Button variant="contained" color="primary" onClick={handleSave}>Save</Button>
    </div>
  );
}

export default EditSubText;
