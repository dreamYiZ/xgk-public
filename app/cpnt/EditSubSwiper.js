import React, { useState, useMemo, useEffect } from 'react';
import { Box, Tabs, Tab, Typography, TextField } from '@mui/material';
import AceEditor from 'react-ace';
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-monokai";
import DrawerEditLayout from "./DrawerEditLayout";
import ColorField from "./ColorField";
import useBoxStore from '../store/useBo';
import { safeNumberIfString, SUB_TYPE } from "../util/util";

export default function EditSwiperSettings() {
  const boxArr = useBoxStore((state) => state.boxArr);
  const activeBoxId = useBoxStore((state) => state.activeBoxId);
  const activeBox = useMemo(() => boxArr.find((box) => box.boxid === activeBoxId), [boxArr, activeBoxId]);
  const sub = useMemo(() => activeBox?.sub, [activeBox, activeBoxId]);
  const changeById = useBoxStore(state => state.changeById);

  const [isOpen, setIsOpen] = useState(false);
  const [option, setOption] = useState('');
  const [tabIndex, setTabIndex] = useState(0);
  const [color, setColor] = useState();
  const [nameFontSize, setNameFontSize] = useState();
  const [descFontSize, setDescFontSize] = useState();
  const [commentFontSize, setCommentFontSize] = useState();
  const [commentColor, setCommentColor] = useState();
  const [commentHeaderText, setCommentHeaderText] = useState();
  const [timeDuration, setTimeDuration] = useState();
  const [faceWidth, setFaceWidth] = useState();
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
      }

      let rest = {};
      if (sub.type === SUB_TYPE.SWIPER_JS) {
        rest.commentTime = commentTime;
        rest.commentColor = commentColor;
        rest.commentHeaderText = commentHeaderText;
      }

      changeById(activeBox.boxid, {
        sub: {
          ...sub,
          data,
          color,
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
  };

  useEffect(() => {
    if (activeBoxId && sub) {
      const { data } = sub;
      setOption(JSON.stringify(data, null, 2));
      setNameFontSize(sub.nameFontSize);
      setDescFontSize(sub.descFontSize);
      setCommentFontSize(sub.commentFontSize);
      setColor(sub.color);
      setTimeDuration(sub.timeDuration);
      setFaceWidth(sub.faceWidth);
      setSlidesPerView(sub.slidesPerView);
      if (sub.type === SUB_TYPE.SWIPER_JS) {
        setCommentTime(sub.commentTime);
        setCommentColor(sub.commentColor);
        setCommentHeaderText(sub.commentHeaderText);
      }
    }
  }, [sub, activeBoxId]);

  return (
    <Box my={2}>
      <DrawerEditLayout saveChange={saveChange} isOpen={isOpen} setIsOpen={setIsOpen} buttonText="编辑数据" title="轮播图">
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
          <Box>
            <AceEditor
              mode="json"
              theme="monokai"
              value={option}
              onChange={setOption}
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
        <Box sx={{}} hidden={tabIndex !== 1}>
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
          <ColorField label="评论颜色" value={commentColor} onChange={(event) => setCommentColor(event)} />
          <Box mt={1}></Box>
          <TextField value={commentHeaderText} onChange={(event) => setCommentHeaderText(event.target.value)} label="评论标题" variant="outlined" />
          <Box mt={1}></Box>
          <TextField value={slidesPerView} onChange={(event) => setSlidesPerView(event.target.value)} type="number" label="一页多少个" variant="outlined" />
          <Box mt={1}></Box>
          <TextField value={timeDuration} onChange={(event) => setTimeDuration(event.target.value)} type="number" label="动画间隔" variant="outlined" />
          <Box mt={1}></Box>
          {sub.type === SUB_TYPE.SWIPER_JS && (
            <TextField value={commentTime} onChange={(event) => setCommentTime(event.target.value)} type="number" label="评论间隔" variant="outlined" />
          )}
        </Box>
      </DrawerEditLayout>
    </Box>
  );
}
