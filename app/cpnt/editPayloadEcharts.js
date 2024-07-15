import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import useBoxStore from '../store/useBo';
import { useState, useMemo, useEffect } from 'react';
import SeriesRecordEdit from "./SeriesRecordEdit";
import ppplog from "ppplog";
import ChartEditorLayout from "./DrawerEditLayout";
import ChartColorEdit from "./ChartColorEdit";
import ChartLabelEdit from "./ChartLabelEdit";
import { BASIC_PAYLOAD_BAR_CHART } from "../util/util";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-monokai";

export default function EditChartPayload() {

  const boxArr = useBoxStore((state) => state.boxArr);
  const activeBoxId = useBoxStore((state) => state.activeBoxId);
  const activeBox = useMemo(() => boxArr.find((box) => box.boxid === activeBoxId), [boxArr, activeBoxId]);
  const sub = useMemo(() => activeBox?.sub, [activeBox, activeBoxId]);
  const changeById = useBoxStore(state => state.changeById);

  const [isOpen, setIsOpen] = React.useState(false);
  const [_option, setOption] = useState(JSON.stringify(sub.option, null, 2));

  const saveChange = () => {
    if (sub) {
      changeById(activeBox.boxid, {
        sub: {
          ...sub,
          option: JSON.parse(_option),
        },
      });
    }
  }

  const handleParse = () => {
    try {
      // Execute the code in the option string\

      let option;
      eval(_option);
      let parseOption = option;
      // After eval, the variable option should be defined in this scope
      // Assign its value to sub.option

      if (sub && typeof parseOption === 'object') {

        setOption(JSON.stringify(parseOption, null, 2));
        changeById(activeBox.boxid, {
          sub: {
            ...sub,
            option: parseOption,
          },
        });
      }
    } catch (error) {
      console.error('Failed to parse JSON:', error);
    }
  }


  return (
    <ChartEditorLayout saveChange={saveChange}
      isOpen={isOpen}
      setIsOpen={setIsOpen}>

      <Box>
        <Box>
          <AceEditor
            mode="json"
            theme="monokai"
            value={_option}
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
          <Box my={2}>
            <Button variant="contained" color="primary" onClick={handleParse}>解析JSON</Button>
          </Box>
        </Box>
      </Box>

    </ChartEditorLayout>
  );
}
