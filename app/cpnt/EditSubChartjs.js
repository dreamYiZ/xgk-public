// EditSubChartjs
import useBoxStore from '../store/useBo';
import { useState, useMemo, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import DrawerEditLayout from "./DrawerEditLayout";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-monokai";
import { ppplog } from "../util/util";

export default function () {
  const boxArr = useBoxStore((state) => state.boxArr);
  const activeBoxId = useBoxStore((state) => state.activeBoxId);
  const activeBox = useMemo(() => boxArr.find((box) => box.boxid === activeBoxId), [boxArr, activeBoxId]);
  const sub = useMemo(() => activeBox?.sub, [activeBox, activeBoxId]);
  const changeById = useBoxStore(state => state.changeById);

  const [isOpen, setIsOpen] = useState(false);
  const [payload, setPayload] = useState('');
  const [parsedData, setParsedData] = useState(null);
  const [parseError, setParseError] = useState('');

  const saveChange = () => {
    if (sub) {
      try {
        let data = JSON.parse(payload);
        changeById(activeBox.boxid, {
          sub: {
            ...sub,
            payload: data,
          },
        });
      } catch (e) {
        alert('json error: ' + e.message);
      }
    }
  }

  const handleParse = () => {
    try {
      // Evaluate the code in the payload string
      let option;
      eval(`option = ${payload}`);  // Note: Be cautious with eval() as it can execute arbitrary code
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
  }

  useEffect(() => {
    if (activeBoxId && sub) {
      ppplog('subsub', sub)
      setPayload(JSON.stringify(sub.payload, null, 2));
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
        </Box>
      </DrawerEditLayout>
    </Box>
  );
}
