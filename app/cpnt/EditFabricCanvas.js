import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import useBoxStore from '../store/useBo';
import DrawerEditLayout from "./DrawerEditLayout";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-monokai";
import { MAIN_ID_TO_RENDER_BOX, ppplog } from "../util/util";
import Button from '@mui/material/Button';
import useGlobalStore from "../store/useGlobal";
import { useDropzone } from 'react-dropzone';
import { useFabricContext } from "../context/FabricContext";
import * as fabric from 'fabric'; // v6

export default function EditFabricCanvas() {
  const boxArr = useBoxStore((state) => state.boxArr);
  const activeBoxId = useBoxStore((state) => state.activeBoxId);
  const activeBox = useMemo(() => boxArr.find((box) => box.boxid === activeBoxId), [boxArr, activeBoxId]);
  const sub = useMemo(() => activeBox?.sub, [activeBox, activeBoxId]);
  const changeById = useBoxStore(state => state.changeById);
  const { mainScale } = useGlobalStore();
  const [isOpen, setIsOpen] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  const [option, setOption] = useState('');
  const mainRef = useRef(null);
  const { fabricCanvas } = useFabricContext();
  const [uploadFiles, setUploadFiles] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      mainRef.current = document.querySelector(`#${MAIN_ID_TO_RENDER_BOX}`)
    }, 800);
  }, []);


  useEffect(() => {
    if (!fabricCanvas) return;
    var path = new fabric.Path('M 0 0 L 200 100 L 170 200 z');
    path.set({ left: 120, top: 120 });
    fabricCanvas.add(path);


    fabric.FabricImage.fromURL('/upload/images.png', function(oImg) {
      fabricCanvas.add(oImg);
    });

  }, [fabricCanvas])

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    const formData = new FormData();
    formData.append('file', file);

    fetch('/api/uploadImage', {
      method: 'POST',
      body: formData,
    })
      .then(res => res.json())
      .then(response => {
        if (response.status === 'success') {
          const imageUrl = `/upload/${response.url}`;
          ppplog('Image URL:', imageUrl, fabricCanvas);

          if (fabricCanvas) {
            ppplog('2 fabricCanvas initialized', fabricCanvas)
            fabric.Image.fromURL(imageUrl, (img) => {
              if (img) {
                ppplog('3 fabric.Image loaded', img);
                img.scaleToWidth(150);
                img.scaleToHeight(150);
                const canvasCenter = fabricCanvas.getCenter();
                img.set({
                  left: canvasCenter.left - (img.getScaledWidth() / 2),
                  top: canvasCenter.top - (img.getScaledHeight() / 2)
                });
                fabricCanvas.add(img);
                fabricCanvas.renderAll();
              } else {
                ppplog('3 fabric.Image not loaded', img);
              }
            }, { crossOrigin: 'anonymous' }); // Ensure cross-origin is set if needed
          } else {
            ppplog('4 Fabric canvas not initialized');
          }
        } else {
          console.error(response.error);
        }
      })
      .catch(error => {
        console.error('Error uploading image:', error);
      });
  }, [fabricCanvas]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  useEffect(() => {
    fetch('/api/listupload', {
      method: 'POST',
    })
      .then(res => res.json())
      .then(response => {
        if (response.status === 'success') {
          setUploadFiles(response.files);
        } else {
          console.error(response.error);
        }
      });
  }, []);

  const handleClickFullMain = () => {
    const rect = mainRef.current.getBoundingClientRect();
    changeById(activeBox.boxid, {
      width: rect.width / mainScale,
      height: rect.height / mainScale,
      x: 0,
      y: 0,
    });
  };

  const saveChange = () => {
    if (sub) {
      changeById(activeBox.boxid, {
        sub: {
          ...sub,
        },
      });
    }
  };

  useEffect(() => {
    if (activeBoxId && sub) {
      setOption(JSON.stringify(sub.data, null, 2));
    }
  }, [sub, activeBoxId]);

  return (
    <Box my={2}>
      <DrawerEditLayout
        saveChange={saveChange}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        buttonText="编辑数据"
        title="Fabric 画布"
      >
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabIndex} onChange={(event, newValue) => setTabIndex(newValue)} aria-label="fabricjs 画布">
            <Tab label="样式" />
            <Tab label="数据" />
          </Tabs>
        </Box>

        <Box mt={1}></Box>

        <Box sx={{}} hidden={tabIndex !== 1}>
          <Box mt={2}></Box>
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
          <Box mt={1}></Box>
        </Box>

        <Box sx={{}} hidden={tabIndex !== 0}>
          <Box mt={2}></Box>
          <Button onClick={handleClickFullMain} variant="outlined">铺满</Button>
          <Box mt={2}></Box>

          <Box sx={{ height: "60px", border: "1px solid #AAAAAA", }} {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>上传图片 ...</p>
            ) : (
              <p>拖拽图片文件到此可以上传</p>
            )}
          </Box>
        </Box>
      </DrawerEditLayout>
    </Box>
  );
}
