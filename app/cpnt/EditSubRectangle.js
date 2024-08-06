import React, { useState, useMemo, useEffect } from 'react';
import { Box, Tabs, Tab, Typography } from '@mui/material';
import DrawerEditLayout from "./DrawerEditLayout";
import useBoxStore from '../store/useBo';
import ColorField from "./ColorField";

export default function EditSubRectangle() {
  const boxArr = useBoxStore((state) => state.boxArr);
  const activeBoxId = useBoxStore((state) => state.activeBoxId);
  const activeBox = useMemo(() => boxArr.find((box) => box.boxid === activeBoxId), [boxArr, activeBoxId]);
  const sub = useMemo(() => activeBox?.sub, [activeBox, activeBoxId]);
  const changeById = useBoxStore(state => state.changeById);

  const [isOpen, setIsOpen] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF');

  const saveChange = () => {
    if (sub) {
      changeById(activeBox.boxid, {
        sub: {
          ...sub,
          backgroundColor,
        },
      });
    }
  };

  useEffect(() => {
    if (activeBoxId && sub) {
      setBackgroundColor(sub.backgroundColor || '#FFFFFF');
    }
  }, [sub, activeBoxId]);

  return (
    <Box my={2}>
      <DrawerEditLayout saveChange={saveChange} isOpen={isOpen} setIsOpen={setIsOpen} buttonText="编辑数据" title="矩形">
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabIndex} onChange={(e, newValue) => setTabIndex(newValue)}>
            <Tab label="样式" />
          </Tabs>
        </Box>
        <Box p={2}>
          {tabIndex === 0 && (
            <Box>
              <ColorField label="颜色" value={backgroundColor} onChange={(event) => setBackgroundColor(event)} />
            </Box>
          )}
        </Box>
      </DrawerEditLayout>
    </Box>
  );
}
