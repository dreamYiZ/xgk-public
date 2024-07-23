import { useEffect, useState } from 'react';
import useBoxStore from '../store/useBo';
import Box from '@mui/material/Box';
import AceEditor from "react-ace";
import { useRef } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { getSubById, mergeSub, validApiUrl, canToBeNumber, safeNumberIfString } from "../util/util";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-monokai";
import useGlobalStore from '../store/useGlobal';

export default function () {

  const { boxArr, setBoxArr } = useBoxStore();
  const { api: gApi, setApi: gSetApi, setApiRateLimit, apiRateLimit } = useGlobalStore();
  const fileInput = useRef(null);  // 创建一个 ref 来引用文件输入元素
  const mergeFileInput = useRef(null);  // 创建一个 ref 来引用文件输入元素
  const [api, setApi] = useState(gApi);  // 创建一个状态来存储 API
  const [apiRateLimitLocal, setApiRateLimitLocal] = useState(apiRateLimit);  // 创建一个状态来存储 API

  const [option, setOption] = useState('');  // 新增的状态和处理函数

  useEffect(() => {
    if (Array.isArray(boxArr) && boxArr.length) {
      let _idSubArr = boxArr.map(
        box => {
          return {
            boxid: box.boxid,
            name: box.name,
            sub: {
              ...box.sub
            }
          }
        }
      )

      setOption(JSON.stringify(_idSubArr, null, 2));  // 将 idSubArr 转换为字符串并设置为 option
    }

  }, [boxArr])


  useEffect(() => {

    setApiRateLimitLocal(apiRateLimit);

    return () => {

    }
  }, [apiRateLimit])



  const handleClearApi = () => {
    setApi('');  // 清除 api 状态
    gSetApi('');
  };

  const handleSubmitApi = () => {
    // 在这里处理提交操作
    if (validApiUrl(api)) {
      gSetApi(api.trim());

      if (!canToBeNumber(apiRateLimitLocal)) {
        alert('请输入数字');
      }

      setApiRateLimit(safeNumberIfString(apiRateLimitLocal))
    }
  };

  const doMergeChange = (preBoxArr, newBoxArr) => {
    let mergedBoxArr = mergeSub(preBoxArr, newBoxArr);
    setOption(JSON.stringify(mergedBoxArr, null, 2));
    setBoxArr(
      boxArr.map(
        preBox => {
          return {
            ...preBox,
            sub: getSubById(mergedBoxArr, preBox.boxid)
          }
        }
      ));
  }

  const handleMergeFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        // 在这里处理上传的 merge 文件
        doMergeChange(JSON.parse(option), JSON.parse(event.target.result))
      };
      reader.readAsText(file);
    }
  };

  const saveChange = () => {
    try {
      let parsedBoxArr = JSON.parse(option)

      setBoxArr(boxArr.map(
        preBox => {
          const gotSub = getSubById(parsedBoxArr, preBox.boxid);
          if (gotSub) {
            return {
              ...preBox,
              sub: getSubById(parsedBoxArr, preBox.boxid)
            }
          }
          return null

        }
      ).filter(Boolean))
    } catch (e) {
      console.error(e);
    }
  }

  const handleApiRateLimitChange = (event) => {
    setApiRateLimitLocal(event.target.value);
  }



  return (
    <Box sx={{ padding: 2, display: 'flex', flexDirection: 'row', height: "calc( 100% - 100px )" }}>
      <Box sx={{ flex: 0.7, height: "100%" }}>
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
          height={"100%"}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true,
            showLineNumbers: true,
            tabSize: 2,
          }}
        />
      </Box>
      <Box sx={{ flex: 0.3 }} padding={2}>
        <Button variant="contained" color="primary" onClick={() => {
          // 创建一个 Blob 对象，然后使用 URL.createObjectURL 创建一个 URL
          const url = URL.createObjectURL(new Blob([option], { type: 'application/json' }));
          // 创建一个隐藏的 a 元素，设置 href 和 download 属性，然后模拟点击
          const a = document.createElement('a');
          a.href = url;
          a.download = 'data.json';
          a.style.display = 'none';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        }}>
          下载 JSON 文件
        </Button>
        <br />
        <br />



        <Button variant="contained" color="secondary" component="label" style={{ marginRight: '10px' }}>
          上传 JSON 文件
          <input ref={fileInput} type="file" hidden onChange={(event) => {
            const file = event.target.files[0];
            if (file) {
              const reader = new FileReader();
              reader.onload = (event) => {
                setOption(event.target.result);
              };
              reader.readAsText(file);
            }
          }} />
        </Button>

        <Button variant="contained" color="success" component="label">
          上传merge文件
          <input ref={mergeFileInput} type="file" hidden onChange={handleMergeFileChange} />
        </Button>

        <br />
        <br />
        <Button variant="outlined" color="error" onClick={saveChange}>
          保存变更
        </Button>

        <br />
        <br />


        <TextField
          label="获取数据API"
          value={api}
          onChange={(event) => setApi(event.target.value)}
          fullWidth
          multiline
        />

        <Box mb={1} />
        <TextField
          label="API调用频率"
          value={apiRateLimitLocal}
          onChange={handleApiRateLimitChange}
        />

        <br />
        <br />
        <Box component="span" marginRight={2}>
          <Button variant="outline" onClick={handleClearApi}>清除</Button>
        </Box>
        <Button variant="contained" color="primary" onClick={handleSubmitApi}>提交API</Button>
        <br />
      </Box>
    </Box >
  );


}
