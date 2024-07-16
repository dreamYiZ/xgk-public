import TextField from '@mui/material/TextField';
import { HexColorPicker } from 'react-colorful';
import { useState, useMemo, useEffect } from 'react';
import { Box } from '@mui/system';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import IconButton from '@mui/material/IconButton';

export default ColorField = ({
  color,
  handleColorChange
}) => {

  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);


  return <Box >
    <TextField
      label="颜色"
      value={color}
      onChange={(e) => handleColorChange(e.target.value)}
      type="text"
      InputLabelProps={{
        shrink: true,
      }}
    />
    <IconButton onClick={() => setIsColorPickerOpen(!isColorPickerOpen)}>
      <ColorLensIcon />
    </IconButton>
    {isColorPickerOpen && <HexColorPicker color={color} onChange={handleColorChange} />}
  </Box>
}
