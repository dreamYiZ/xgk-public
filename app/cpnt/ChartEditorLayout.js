import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';

export default function ChartEditorLayout({ children, saveChange,
  isOpen,
  setIsOpen
}) {
  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setIsOpen(open);
  };

  return (
    <div>
      <Button color="info" variant="outlined" onClick={toggleDrawer(true)}>编辑数据</Button>
      <Drawer anchor="right" open={isOpen} onClose={toggleDrawer(false)} >
        <Box sx={{ width: 650, padding: 2 }}>
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
