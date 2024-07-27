import useBoxStore from '../store/useBo';
import { useState, useMemo, useEffect } from 'react';
import { Box, Typography, TextField, Button, Switch, FormControlLabel } from '@mui/material';
import DrawerEditLayout from "./DrawerEditLayout";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-monokai";
import { ppplog } from "../util/util";

export default function EditSubChartjs() {
  const boxArr = useBoxStore((state) => state.boxArr);
  const activeBoxId = useBoxStore((state) => state.activeBoxId);
  const activeBox = useMemo(() => boxArr.find((box) => box.boxid === activeBoxId), [boxArr, activeBoxId]);
  const sub = useMemo(() => activeBox?.sub, [activeBox, activeBoxId]);
  const changeById = useBoxStore(state => state.changeById);

  const [isOpen, setIsOpen] = useState(false);
  const [payload, setPayload] = useState('');
  const [parsedData, setParsedData] = useState(null);
  const [parseError, setParseError] = useState('');

  const [borderColor, setBorderColor] = useState(sub?.borderColor || '#000000');
  const [alternateRowColor, setAlternateRowColor] = useState(sub?.alternateRowColor || false);
  const [alternateRowBackgroundColor, setAlternateRowBackgroundColor] = useState(sub?.alternateRowBackgroundColor || '#f0f0f0');

  const saveChange = () => {
    if (sub) {
      try {
        let data = JSON.parse(payload);
        changeById(activeBox.boxid, {
          sub: {
            ...sub,
            payload: data,
            borderColor,
            alternateRowColor,
            alternateRowBackgroundColor
          },
        });
      } catch (e) {
        alert('json error: ' + e.message);
      }
    }
  };

  const handleParse = () => {
    try {
      let option;
      eval(`option = ${payload}`);
      let parseOption = option;
      if (sub && typeof parseOption === 'object') {
        setParsedData(parseOption);
        setParseError('');
        changeById(activeBox.boxid, {
          sub: {
            ...sub,
            payload: parseOption,
          },
        });

        setPayload(JSON.stringify(parseOption, null, 2));
      }
    } catch (e) {
      setParsedData(null);
      setParseError('解析错误: ' + e.message);
    }
  };

  useEffect(() => {
    if (activeBoxId && sub) {
      ppplog('subsub', sub);
      setPayload(JSON.stringify(sub.payload, null, 2));
      setBorderColor(sub.borderColor || '#000000');
      setAlternateRowColor(sub.alternateRowColor || false);
      setAlternateRowBackgroundColor(sub.alternateRowBackgroundColor || '#f0f0f0');
    }
  }, [sub, activeBoxId]);

  return (
    <Box my={2}>
      <DrawerEditLayout
        saveChange={saveChange}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        buttonText="编辑数据"
        title="Chartjs表格"
      >
        <Typography variant="h6" component="h6">
          数据
        </Typography>
        <Box>
          <AceEditor
            mode="json"
            theme="monokai"
            value={payload}
            onChange={setPayload}
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
          <Button variant="contained" color="primary" onClick={handleParse} style={{ marginTop: '10px' }}>
            解析
          </Button>
          <Box mt={2} p={2} border="1px solid #ddd" borderRadius="4px" bgcolor="#f9f9f9">
            <Typography variant="subtitle1">解析结果:</Typography>
            {parseError && (
              <Typography color="error">{parseError}</Typography>
            )}
            {parsedData && (
              <pre>{JSON.stringify(parsedData, null, 2)}</pre>
            )}
          </Box>
          <Box mt={2}>
            <TextField
              label="边框颜色"
              variant="outlined"
              fullWidth
              value={borderColor}
              onChange={(e) => setBorderColor(e.target.value)}
            />
          </Box>
          <Box mt={2}>
            <FormControlLabel
              control={<Switch checked={alternateRowColor} onChange={(e) => setAlternateRowColor(e.target.checked)} />}
              label="隔行变色"
            />
          </Box>
          {alternateRowColor && (
            <Box mt={2}>
              <TextField
                label="隔行背景颜色"
                variant="outlined"
                fullWidth
                value={alternateRowBackgroundColor}
                onChange={(e) => setAlternateRowBackgroundColor(e.target.value)}
              />
            </Box>
          )}
        </Box>
      </DrawerEditLayout>
    </Box>
  );
}
