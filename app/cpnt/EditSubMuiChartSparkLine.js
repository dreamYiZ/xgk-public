import useBoxStore from '../store/useBo';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { HexColorPicker } from 'react-colorful';
import { ANIMATE_TIME_FUNCTION_TYPES_DISPLAY, ANIMATE_TIME_FUNCTION_TYPES, ANIMATE_TYPES, ANIMATE_TYPES_DISPLAY } from "../util/util";
import { useState, useMemo, useEffect } from 'react';
import { Box } from '@mui/system';
import Divider from '@mui/material/Divider';
import { SUB_TYPE } from "../util/util";
import EditChartPayloadSparkLine from "./EditChartPayloadSparkLine"

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





  // ...

  // Add a new state for the checkbox
  const [plotType, setPlotType] = useState(sub?.plotType === 'bar');

  // Add new states for the checkboxes
  const [area, setArea] = useState(sub?.area === true);
  const [curve, setCurve] = useState(sub?.curve === 'natural');

  // Modify the handlePlotTypeChange function
  const handlePlotTypeChange = (event) => {
    setPlotType(event.target.checked);
    if (event.target.checked) {
      setArea(!event.target.checked);
      setCurve(!event.target.checked);
    }
    if (event.target.checked) {
      const { area,
        curve, ...restSub } = sub;
      changeById(activeBox.boxid, {
        sub: {
          ...restSub,
          plotType: 'bar',
        },
      });
    } else {
      const { plotType, ...restSub } = sub;
      changeById(activeBox.boxid, {
        sub: restSub,
      });
    }
  };

  // Modify the handleAreaChange function
  const handleAreaChange = (event) => {
    setArea(event.target.checked);
    if (event.target.checked) {
      setPlotType(!event.target.checked);
      setCurve(!event.target.checked);
    }

    if (event.target.checked) {
      const { plotType,
        curve, ...restSub } = sub;
      changeById(activeBox.boxid, {
        sub: {
          ...restSub,
          area: true,
        },
      });
    } else {
      const { area, ...restSub } = sub;
      changeById(activeBox.boxid, {
        sub: restSub,
      });
    }
  };

  // Modify the handleCurveChange function
  const handleCurveChange = (event) => {
    setCurve(event.target.checked);
    if (event.target.checked) {
      setPlotType(!event.target.checked);
      setArea(!event.target.checked);
    }

    if (event.target.checked) {
      changeById(activeBox.boxid, {
        sub: {
          ...sub,
          curve: 'natural',
          area: true,
          plotType: false,
        },
      });
    } else {
      const { curve, ...restSub } = sub;
      changeById(activeBox.boxid, {
        sub: restSub,
      });
    }
  };


  return (
    <div>
      <br />
      {/* <TextField
        label="宽度"
        value={width}
        onChange={handleWidthChange}
        type="number"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <br /> */}
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

      <FormControlLabel
        control={
          <Checkbox
            checked={plotType}
            onChange={handlePlotTypeChange}
          />
        }
        label="柱状图类型"
      />

      <FormControlLabel
        control={
          <Checkbox
            checked={area}
            onChange={handleAreaChange}
          />
        }
        label="区域"
      />

      <FormControlLabel
        control={
          <Checkbox
            checked={curve}
            onChange={handleCurveChange}
          />
        }
        label="曲线"
      />
      <br />

      <br />

      <EditChartPayloadSparkLine />
      <br />
      <Button variant="contained" color="primary" onClick={handleSave}>保存</Button>
      <br />
      <br />
      <Divider />

    </div>
  );
}


