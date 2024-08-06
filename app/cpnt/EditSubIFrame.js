import useBoxStore from '../store/useBo';
import { useState, useMemo, useEffect } from 'react';
import { Box } from '@mui/system';
import DrawerEditLayout from "./DrawerEditLayout";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

export default function EditIFramePayload() {
  const boxArr = useBoxStore((state) => state.boxArr);
  const activeBoxId = useBoxStore((state) => state.activeBoxId);
  const activeBox = useMemo(() => boxArr.find((box) => box.boxid === activeBoxId), [boxArr, activeBoxId]);
  const sub = useMemo(() => activeBox?.sub, [activeBox, activeBoxId]);
  const changeById = useBoxStore(state => state.changeById);

  const [isOpen, setIsOpen] = useState(false);
  const [iframeSrc, setIframeSrc] = useState(sub?.src || '');

  const saveChange = () => {
    if (sub) {
      changeById(activeBox.boxid, {
        sub: {
          ...sub,
          src: iframeSrc,
        },
      });
    }
  }

  useEffect(() => {
    if (sub) {
      setIframeSrc(sub.src || '');
    }
  }, [sub, activeBoxId]);

  return (
    <Box my={2}>
      <DrawerEditLayout saveChange={saveChange}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        buttonText="编辑数据"
        title="iframe编辑"
      >
        <Box mb={2}>
          <TextField
            fullWidth
            label="iframe 地址"
            value={iframeSrc}
            placeholder="请输入 iframe 地址"
            onChange={(event) => setIframeSrc(event.target.value)}
            multiline
            rows={3}
            maxRows={Infinity}
          />

        </Box>

      </DrawerEditLayout>
    </Box>
  );
}
