import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

export default function ChartEditorLayout({ children, saveChange,
  isOpen,
  setIsOpen,
  buttonText = "编辑数据",
  title,
  width = 650
}) {
  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setIsOpen(open);
  };

  return (
    <div>
      <Button color="info" variant="outlined" onClick={toggleDrawer(true)}>{buttonText}</Button>
      <Drawer anchor="right" open={isOpen} onClose={toggleDrawer(false)} >
        <Box sx={{ width: width, padding: 2 }}>

          {title && <Box> <Typography variant="h4" component="h5">
            {title}
          </Typography>
            <Box sx={{ paddingTop: 1 }}></Box>

            <Divider />
            <Box sx={{ paddingTop: 1 }}></Box>
          </Box>}

          {children}

          {/* 在这里添加你的内容 */}
          <div>
            <Button onClick={saveChange}>保存</Button>
          </div>
        </Box>
      </Drawer>
    </div>
  );
}
