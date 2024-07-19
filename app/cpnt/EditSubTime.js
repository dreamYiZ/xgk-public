import useBoxStore from '../store/useBo';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { HexColorPicker } from 'react-colorful';  // 引入颜色选择器
import {
  TIME_TYPE, TIME_TYPE_DISPLAY,
  ppplog,
  ANIMATE_TIME_FUNCTION_TYPES_DISPLAY, ANIMATE_TIME_FUNCTION_TYPES,
  ANIMATE_TYPES, ANIMATE_TYPES_DISPLAY
} from "../util/util";
import { useCallback, useState, useMemo, useEffect } from 'react';
import { Box } from '@mui/system';  // 引入 Box 组件
import { useDropzone } from 'react-dropzone';
import { Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import DrawerEditLayout from "./DrawerEditLayout";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';




export default function () {
  const boxArr = useBoxStore((state) => state.boxArr);
  const activeBoxId = useBoxStore((state) => state.activeBoxId);
  const activeBox = useMemo(() => boxArr.find((box) => box.boxid === activeBoxId), [boxArr, activeBoxId]);
  const sub = useMemo(() => activeBox?.sub, [activeBox, activeBoxId]);

  const [fontSize, setFontSize] = useState(sub?.fontSize.replace('px', '') || '');
  const [color, setColor] = useState(sub?.color || '');
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);

  const changeById = useBoxStore(state => state.changeById);
  const [option, setOption] = useState('');  // 新增的状态和处理函数
  const [isOpen, setIsOpen] = useState(false);
  const [timeType, setTimeType] = useState();

  const saveChange = () => {
    if (sub) {
      changeById(activeBox.boxid, {
        sub: {
          ...sub,
          fontSize: fontSize,
          color: color,
          timeType,
        },
      });
    }
  };

  useEffect(() => {
    if (sub) {
      setFontSize(sub?.fontSize?.replace('px', '') || '');
      setColor(sub.color || '');
      setTimeType(sub.timeType);
    }
  }, [sub, activeBoxId]);

  // const [value, fvf] = useState('female');

  // const handleChange = (event) => {
  //   setValue(event.target.value);
  // };

  const handleChangeTimeType = (event) => {
    setTimeType(event.target.value)
  }

  return (
    <Box my={2}>

      <DrawerEditLayout saveChange={saveChange}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        buttonText="编辑数据"
        title="时间组件"
      >

        <Box mb={2}>
          <TextField label="字体大小 (px)" value={fontSize} onChange={e => setFontSize(e.target.value)} />
        </Box>
        <Box mb={2}>
          <div>
            <label>颜色</label>
            <br />
            <TextField value={color} onChange={e => setColor(e.target.value)} />
            <IconButton onClick={() => setIsColorPickerOpen(!isColorPickerOpen)}>
              <ColorLensIcon />
            </IconButton>
            {isColorPickerOpen && <HexColorPicker color={color} onChange={setColor} />}
          </div>
        </Box>
        <Box>


          <Box>

            <FormControl>
              <FormLabel id="demo-controlled-radio-buttons-group">展示类型</FormLabel>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={timeType}
                onChange={handleChangeTimeType}
              >
                {
                  Object.values(TIME_TYPE).map(oneTypeOfTime => {
                    return <FormControlLabel value={oneTypeOfTime} control={<Radio />}
                      label={TIME_TYPE_DISPLAY[oneTypeOfTime]} />
                  })
                }
                {/* <FormControlLabel value="female" control={<Radio />} label="Female" />
                <FormControlLabel value="male" control={<Radio />} label="Male" /> */}
              </RadioGroup>
            </FormControl>
          </Box>

          {/* <Button variant="contained" color="primary" onClick={handleSave}>保存</Button> */}
        </Box>
      </DrawerEditLayout>

    </Box>
  );
}
