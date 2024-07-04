import useBoxStore from '../store/useBo';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState, useMemo, useEffect } from 'react';
import EditPayloadEcharts from "./editPayloadEcharts";
import { Box } from '@mui/system';

export default function () {
  const boxArr = useBoxStore((state) => state.boxArr);
  const activeBoxId = useBoxStore((state) => state.activeBoxId);
  const activeBox = useMemo(() => boxArr.find((box) => box.boxid === activeBoxId), [boxArr, activeBoxId]);
  const sub = useMemo(() => activeBox?.sub, [activeBox, activeBoxId]);
  const changeById = useBoxStore(state => state.changeById);

  // Use local state for width and height
  const [width, setWidth] = useState(sub?.width);
  const [height, setHeight] = useState(sub?.height);

  const handleSave = () => {
    if (sub) {
      changeById(activeBox.boxid, {
        sub: {
          ...sub,
          width: Number(width),
          height: Number(height),
        },
      });
    }
  };

  const handleWidthChange = (event) => {
    setWidth(event.target.value);
  };

  const handleHeightChange = (event) => {
    setHeight(event.target.value);
  };

  useEffect(() => {
    if (sub) {
      setWidth(sub.width);
      setHeight(sub.height);
    }
  }, [sub, activeBoxId]);

  return (
    <div>
      <Box mb={2} my={2}>
        <TextField
          label="宽度"
          value={width}
          onChange={handleWidthChange}
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Box>
      <Box mb={2}>
        <TextField
          label="高度"
          value={height}
          onChange={handleHeightChange}
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Box>
      <Box mb={2}>
        <EditPayloadEcharts />
      </Box>
      <Box mb={2}>
        <Button variant="contained" color="primary" onClick={handleSave}>保存</Button>
      </Box>
    </div>
  );
}
