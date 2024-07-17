import useBoxStore from '../store/useBo';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { HexColorPicker } from 'react-colorful';  // 引入颜色选择器
import { ANIMATE_TIME_FUNCTION_TYPES_DISPLAY, ANIMATE_TIME_FUNCTION_TYPES, ANIMATE_TYPES, ANIMATE_TYPES_DISPLAY } from "../util/util";
import { useCallback, useState, useMemo, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import DrawerEditLayout from "./DrawerEditLayout";
import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { safeNumberIfString, MARQUEE_TYPE, MARQUEE_TYPE_DISPLAY, ppplog } from "../util/util";
import { forwardRef, useImperativeHandle, useRef } from "react";
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-monokai";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import ColorField from "./ColorField";
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';


export default function () {
  const boxArr = useBoxStore((state) => state.boxArr);
  const activeBoxId = useBoxStore((state) => state.activeBoxId);
  const activeBox = useMemo(() => boxArr.find((box) => box.boxid === activeBoxId), [boxArr, activeBoxId]);
  const sub = useMemo(() => activeBox?.sub, [activeBox, activeBoxId]);
  const changeById = useBoxStore(state => state.changeById);


  const [isOpen, setIsOpen] = useState(false);

  const [option, setOption] = useState('');  // 新增的状态和处理函数

  const [tableHeadString, setTableHeadString] = useState(''); //

  const [tabIndex, setTabIndex] = useState(0);


  const [color, setColor] = useState();
  const [fontSize, setFontSize] = useState();
  const [headFontSize, setHeadFontSize] = useState();
  const [time, setTime] = useState();
  const [borderColor, setBorderColor] = useState();
  const [pageRowCount, setPageRowCount] = useState();
  const [timeDuration, setTimeDuration] = useState();
  const [lineHeight, setLineHeight] = useState();
  const [isEndFollowStart, setIsEndFollowStart] = useState();
  const [showBorder, setShowBorder] = useState(false);





  const saveChange = () => {
    if (sub) {

      let newHead = [];
      if (tableHeadString) {
        let _tableHeadString = tableHeadString.replaceAll("，", ",")
        newHead = _tableHeadString.split(",")
      }

      let data = [];

      try {

        let _data = JSON.parse(option)
        if (Array.isArray(_data)) {
          data = _data;
        }
      } catch (e) {
        alert('json error: ' + e.message);
        return
        console.log('error', e);
      }


      changeById(activeBox.boxid, {
        sub: {
          ...sub,
          tableHead: newHead,
          data,
          color: color,
          borderColor,
          fontSize: safeNumberIfString(fontSize),
          pageRowCount: safeNumberIfString(pageRowCount),
          timeDuration: safeNumberIfString(timeDuration),
          lineHeight: safeNumberIfString(lineHeight),
          isEndFollowStart: safeNumberIfString(isEndFollowStart),
          headFontSize: safeNumberIfString(headFontSize),
          showBorder,
        },
      });
    }
  }



  useEffect(() => {
    if (activeBoxId && sub) {
      const { tableHead, data } = sub;

      setTableHeadString(tableHead?.join(","));
      setOption(JSON.stringify(data, null, 2));


      setColor(sub.color);
      setFontSize(sub.fontSize);
      setBorderColor(sub.borderColor);
      setPageRowCount(sub.pageRowCount);
      setTimeDuration(sub.timeDuration);
      setLineHeight(sub.lineHeight);
      setIsEndFollowStart(sub.isEndFollowStart);
      setHeadFontSize(sub.headFontSize);
      setShowBorder(sub.showBorder);
    }
  }, [sub, activeBoxId]);


  return (
    <Box my={2}>

      <DrawerEditLayout saveChange={saveChange}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        buttonText="编辑数据"
        title="表格"
      >

        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabIndex} onChange={(event, newValue) => setTabIndex(newValue)} aria-label="basic tabs example">
            <Tab label="数据" />
            <Tab label="样式" />
          </Tabs>
        </Box>

        <Box mt={1}></Box>


        <Box sx={{}} hidden={tabIndex !== 0}>
          <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel htmlFor="outlined-column-name">表头逗号间隔</InputLabel>
            <OutlinedInput
              id="outlined-column-name"
              startAdornment={<InputAdornment position="start">  </InputAdornment>}
              label="Amount"
              value={tableHeadString}
              onChange={(event) => {
                setTableHeadString(event.target.value);
              }}
            />
          </FormControl>

          <Typography variant="h6" component="h6">
            数据
          </Typography>

          <Box >
            <AceEditor
              mode="json"
              theme="monokai"
              value={option}  // 使用 option 作为 value
              onChange={setOption}  // 使用 setOption 作为 onChange 的处理函数
              name="UNIQUE_ID_OF_DIV"
              editorProps={{ $blockScrolling: true }}
              fontSize={14}
              showPrintMargin={true}
              showGutter={true}
              highlightActiveLine={true}
              width={"100%"}
              setOptions={{
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
                enableSnippets: true,
                showLineNumbers: true,
                tabSize: 2,
              }}
            />
          </Box>
        </Box>

        <Box sx={{}} hidden={tabIndex !== 1} >
          {/* <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "flex-start" }}> */}

          <ColorField label="颜色" value={color} onChange={(event) => setColor(event)} />
          <Box mt={1}></Box>
          <ColorField label="边框颜色" value={borderColor} onChange={(event) => setBorderColor(event)} />
          <Box mt={1}></Box>
          <TextField value={headFontSize} onChange={(event) => setHeadFontSize(event.target.value)} type="number" label="表头字体大小" variant="outlined" />
          <Box mt={1}></Box>
          <TextField value={fontSize} onChange={(event) => setFontSize(event.target.value)} type="number" label="字体大小" variant="outlined" />
          <Box mt={1}></Box>

          <TextField value={pageRowCount} onChange={(event) => setPageRowCount(event.target.value)} type="number" label="一页多少个" variant="outlined" />
          <Box mt={1}></Box>

          <TextField value={timeDuration} onChange={(event) => setTimeDuration(event.target.value)} type="number" label="动画间隔" variant="outlined" />
          <Box mt={1}></Box>

          <TextField value={lineHeight} onChange={(event) => setLineHeight(event.target.value)} type="number" label="行高" variant="outlined" />

          <Box mt={1}></Box>

          <FormControlLabel control={<Checkbox onChange={(event) => setIsEndFollowStart(event.target.value)} checked={isEndFollowStart} />} label="循环连接" />

          <FormControlLabel control={<Checkbox onChange={(event) => setShowBorder(event.target.value)} checked={showBorder} />} label="是否border" />

          {/* </Box> */}
        </Box>


      </DrawerEditLayout>

    </Box>
  );
}




