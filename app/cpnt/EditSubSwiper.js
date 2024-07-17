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
import {
  safeNumberIfString, MARQUEE_TYPE, MARQUEE_TYPE_DISPLAY, ppplog
  , SUB_TYPE

} from "../util/util";
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


  const [tabIndex, setTabIndex] = useState(0);


  const [color, setColor] = useState();
  const [nameFontSize, setNameFontSize] = useState();
  const [descFontSize, setDescFontSize] = useState();
  const [commentFontSize, setCommentFontSize] = useState();
  const [timeDuration, setTimeDuration] = useState();
  const [faceWidth, setFaceWidth] = useState();;
  const [commentTime, setCommentTime] = useState();
  const [slidesPerView, setSlidesPerView] = useState();





  const saveChange = () => {
    if (sub) {


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

      let rest = {};
      if (sub.type === SUB_TYPE.SWIPER_JS) {
        rest.commentTime = commentTime;
      }

      changeById(activeBox.boxid, {
        sub: {
          ...sub,
          data,
          color: color,
          timeDuration: safeNumberIfString(timeDuration),
          nameFontSize: safeNumberIfString(nameFontSize),
          descFontSize: safeNumberIfString(descFontSize),
          commentFontSize: safeNumberIfString(commentFontSize),
          faceWidth: safeNumberIfString(faceWidth),
          slidesPerView: safeNumberIfString(slidesPerView),
          ...rest
        },
      });
    }
  }



  useEffect(() => {
    if (activeBoxId && sub) {
      const { tableHead, data } = sub;

      setOption(JSON.stringify(data, null, 2));



      setNameFontSize(sub.nameFontSize)
      setDescFontSize(sub.descFontSize)
      setCommentFontSize(sub.commentFontSize)
      setColor(sub.color);
      setTimeDuration(sub.timeDuration);
      setFaceWidth(sub.faceWidth);
      setSlidesPerView(sub.slidesPerView);


      if (sub.type === SUB_TYPE.SWIPER_JS) {
        setCommentTime(sub.commentTime);
      }
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
          <TextField value={faceWidth} onChange={(event) => setFaceWidth(event.target.value)} type="number" label="头像宽度" variant="outlined" />
          <Box mt={1}></Box>
          <ColorField label="颜色" value={color} onChange={(event) => setColor(event)} />
          <Box mt={1}></Box>

          <TextField value={nameFontSize} onChange={(event) => setNameFontSize(event.target.value)} type="number" label="表头字体大小" variant="outlined" />
          <Box mt={1}></Box>
          <TextField value={descFontSize} onChange={(event) => setDescFontSize(event.target.value)} type="number" label="字体大小" variant="outlined" />
          <Box mt={1}></Box>

          <TextField value={commentFontSize} onChange={(event) => setCommentFontSize(event.target.value)} type="number" label="评论字体大小" variant="outlined" />
          <Box mt={1}></Box>

          <TextField value={slidesPerView} onChange={(event) => setSlidesPerView(event.target.value)} type="number" label="一页多少个" variant="outlined" />
          <Box mt={1}></Box>

          <TextField value={timeDuration} onChange={(event) => setTimeDuration(event.target.value)} type="number" label="动画间隔" variant="outlined" />
          <Box mt={1}></Box>

          {sub.type === SUB_TYPE.SWIPER_JS && <TextField value={commentTime} onChange={(event) => setCommentTime(event.target.value)} type="number" label="动画间隔" variant="outlined" />}
          <Box mt={1}></Box>


          {/* </Box> */}
        </Box>


      </DrawerEditLayout>

    </Box>
  );
}




