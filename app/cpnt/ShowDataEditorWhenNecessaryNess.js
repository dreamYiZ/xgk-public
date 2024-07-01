import React from 'react';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import useBoxStore from '../store/useBo';
import { useState, useMemo, useEffect } from 'react';


export default function ShowDataEditorWhenNecessaryNess() {
  const [isOpen, setIsOpen] = React.useState(false);

  const boxArr = useBoxStore((state) => state.boxArr);
  const activeBoxId = useBoxStore((state) => state.activeBoxId);
  const activeBox = useMemo(() => boxArr.find((box) => box.boxid === activeBoxId), [boxArr, activeBoxId]);
  const sub = useMemo(() => activeBox?.sub, [activeBox, activeBoxId]);
  const changeById = useBoxStore(state => state.changeById);



  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setIsOpen(open);
  };

  return (
    <div>
      <Button color="info" variant="outlined" onClick={toggleDrawer(true)}>编辑数据</Button>
      <Drawer anchor="right" open={isOpen} onClose={toggleDrawer(false)}>
        {/* 在这里添加你的内容 */}
        <div>
          <Button onClick={toggleDrawer(false)}>关闭Drawer</Button>
        </div>
      </Drawer>
    </div>
  );
}
