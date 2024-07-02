import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { HexColorPicker } from "react-colorful";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import ppplog from "ppplog";

export default function ChartColorEdit({ colorArray, setColorArray }) {
  const [inputColor, setInputColor] = React.useState('#000000');



  const handleDeleteColor = (colorToDelete) => {
    setColorArray(colorArray.filter(color => color !== colorToDelete));
  };

  const [editIndex, setEditIndex] = React.useState(null);

  const handleAddColor = () => {
    if (editIndex !== null) {
      ppplog(111, editIndex, colorArray)
      setColorArray(colorArray.map((color, index) => index === editIndex ? inputColor : color));
      setEditIndex(null);
    } else if (!colorArray.includes(inputColor)) {
      ppplog(222)

      setColorArray([...colorArray, inputColor]);
    }
    setInputColor('#000000');
  };

  const handleEditColor = (colorToEdit, index) => {
    setInputColor(colorToEdit);
    setEditIndex(index);
  };


  const handleMoveUp = (index) => () => {
    if (index === 0) return; // 如果已经是第一个，则不移动
    setColorArray((oldArray) => {
      const newArray = [...oldArray];
      [newArray[index - 1], newArray[index]] = [newArray[index], newArray[index - 1]];
      return newArray;
    });
  };

  const handleMoveDown = (index) => () => {
    if (index === colorArray.length - 1) return; // 如果已经是最后一个，则不移动
    setColorArray((oldArray) => {
      const newArray = [...oldArray];
      [newArray[index], newArray[index + 1]] = [newArray[index + 1], newArray[index]];
      return newArray;
    });
  };


  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <HexColorPicker color={inputColor} onChange={setInputColor} />
      <Box sx={{ my: 1 }} /> {/* 添加间距 */}

      <TextField
        value={inputColor}
        onChange={(e) => setInputColor(e.target.value)}
        label="Or enter color"
        variant="outlined"
      />
      <Box sx={{ my: 1 }} /> {/* 添加间距 */}
      <Button variant="contained" startIcon={editIndex !== null ? <SaveIcon /> : <AddIcon />} onClick={handleAddColor}>
        {editIndex !== null ? '保存颜色' : '添加颜色'}
      </Button>
      <Box sx={{ width: 400 }}> {/* 设置宽度为 400px */}
        <List>
          {colorArray.map((color, index) => (
            <ListItem key={index}>
              <Box sx={{ width: 16, height: 16, bgcolor: color, marginRight: 1 }} />
              <Box sx={{ width: 60 }}> {/* 设置宽度为 60px */}

                {color}
              </Box>

              <Box sx={{ width: 120, display: 'flex' }}> {/* 设置宽度为 60px, 并使用 flex 布局 */}
                {index > 0 && (
                  <Button sx={{ width: 30 }} startIcon={<ArrowUpwardIcon />} onClick={handleMoveUp(index)}>
                  </Button>
                )}
                {index < colorArray.length - 1 && (
                  <Button sx={{ width: 30 }} startIcon={<ArrowDownwardIcon />} onClick={handleMoveDown(index)}>
                  </Button>
                )}
              </Box>

              <Button startIcon={<EditIcon />} onClick={() => handleEditColor(color, index)}>
                编辑
              </Button>
              <Button startIcon={<DeleteIcon />} onClick={() => handleDeleteColor(color)}>
                删除
              </Button>
            </ListItem>
          ))}
        </List>
      </Box>


    </Box>
  );
}
