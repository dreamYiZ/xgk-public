import TextField from '@mui/material/TextField';
import { HexColorPicker } from 'react-colorful';
import { useState, useMemo, useEffect } from 'react';
import { Box } from '@mui/system';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import IconButton from '@mui/material/IconButton';


const ColorField = ({
  value: color,
  onChange: handleColorChange,
  label = "颜色"
}) => {

  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);


  return <Box >
    <TextField
      label={label}
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



export default ColorField
