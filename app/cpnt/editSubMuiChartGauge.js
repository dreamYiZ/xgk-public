import useBoxStore from '../store/useBo';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { HexColorPicker } from 'react-colorful';
import { ANIMATE_TIME_FUNCTION_TYPES_DISPLAY, ANIMATE_TIME_FUNCTION_TYPES, ANIMATE_TYPES, ANIMATE_TYPES_DISPLAY } from "../util/util";
import { useState, useMemo, useEffect } from 'react';
import { Box } from '@mui/system';
import Divider from '@mui/material/Divider';
import {SUB_TYPE} from "../util/util";

function EditSubMuiChartGuage() {
  const boxArr = useBoxStore((state) => state.boxArr);
  const activeBoxId = useBoxStore((state) => state.activeBoxId);
  const activeBox = useMemo(() => boxArr.find((box) => box.boxid === activeBoxId), [boxArr, activeBoxId]);
  const sub = useMemo(() => activeBox?.sub, [activeBox, activeBoxId]);
  const changeById = useBoxStore(state => state.changeById);

  const [value, setValue] = useState(sub?.value || BASIC_PAYLOAD_GAUGE_CHART.value);



  // Use local state for width and height
  const [width, setWidth] = useState(sub?.width);
  const [height, setHeight] = useState(sub?.height);


  const handleSave = () => {
    if (sub) {
      changeById(activeBox.boxid, {
        sub: {
          ...sub,
          width: width,
          height: height,
          value: value,  // Save the value
        },
      });
    }
  };

  const handleValueChange = (event) => {
    setValue(event.target.value);
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
      setValue(sub.value || BASIC_PAYLOAD_GAUGE_CHART.value);  // Update the value state when 'sub' changes
    }
  }, [sub, activeBoxId]);


  return (
    <div>
      <br />
      <TextField
        label="宽度"
        value={width}
        onChange={handleWidthChange}
        type="number"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <br />
      <br />
      <TextField
        label="高度"
        value={height}
        onChange={handleHeightChange}
        type="number"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <br />
      <br />
      <TextField
        label="数值"
        value={value}
        onChange={handleValueChange}
        type="number"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <br />
      <br />
      <Button variant="contained" color="primary" onClick={handleSave}>保存</Button>
      <br />
      <br />
      <Divider />

    </div>
  );
}

export default EditSubMuiChartGuage;
