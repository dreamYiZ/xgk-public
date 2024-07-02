import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import DeleteIcon from '@mui/icons-material/Delete';
import { HexColorPicker } from "react-colorful";

export default function ChartColorEdit({ colorArray, setColorArray }) {
  const [inputColor, setInputColor] = React.useState('#000000');

  const handleAddColor = () => {
    setColorArray([...colorArray, inputColor]);
    setInputColor('#000000');
  };

  const handleDeleteColor = (colorToDelete) => {
    setColorArray(colorArray.filter(color => color !== colorToDelete));
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
      <Button variant="contained" onClick={handleAddColor}>
        添加颜色
      </Button>
      <List>
        {colorArray.map((color, index) => (
          <ListItem key={index}>
            <Box sx={{ width: 16, height: 16, bgcolor: color, marginRight: 1 }} />
            {color}
            <Button startIcon={<DeleteIcon />} onClick={() => handleDeleteColor(color)}>
              删除
            </Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
