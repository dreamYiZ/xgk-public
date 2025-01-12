import React, { useEffect, useState, useCallback } from 'react';
import {
  Box, Button, Drawer, Typography, Tabs, Tab, FormControlLabel, Checkbox, TextField
} from '@mui/material';
import useBoxStore from "../store/useBo";
import usePageStore from "../store/usePage";
import DisplayPageItem from "./DisplayPageItem";
import useGlobalStore from '../store/useGlobal';
import usePageManager from "../hooks/usePageManager";
import useAutoStore, { AUTO_NEXT_PAGE } from "../store/useAutoStore";
import { CMD, ppplog } from "../util/util";
import EditPageAutoNextCustom from "./EditPageAutoNextCustom";


export default function PageManage({ show, handleClose }) {
  const {
    pageList,
    currentPage,
    currentPageId,
    deletePageById,
    updatePageOrder,
    updatePageName,
    addPage,
    updatePage,
  } = usePageStore();

  const { boxArr, setBoxArr } = useBoxStore();
  const { bg, bgVideo, setBgVideo, setBg, setDelayIsUserDoingSomething, delayIsUserDoingSomething } = useGlobalStore();
  const { addCurrentToNewPage } = usePageManager();
  const [tabValue, setTabValue] = useState(0);
  const { autoList, setAutoList } = useAutoStore();

  const [selectedAutoIndex, setSelectedAutoIndex] = useState(0);
  const [autoDuration, setAutoDuration] = useState(autoList[selectedAutoIndex]?.duration || 10);
  const [isEnabled, setIsEnabled] = useState(autoList[selectedAutoIndex]?.disabled);

  const changeCurrentPage = useCallback((id) => {
    const { getPageById } = usePageStore.getState();
    const page = getPageById(id);
    usePageStore.setState({ currentPage: page, currentPageId: id });

    setBoxArr(page.bo);
    setBgVideo(page.bgVideo);
    setBg(page.bg);
  }, [setBoxArr, setBgVideo, setBg]);

  const handleDragEnd = useCallback((result) => {
    if (!result.destination) return;
    const reorderedPageList = Array.from(pageList);
    const [movedPage] = reorderedPageList.splice(result.source.index, 1);
    reorderedPageList.splice(result.destination.index, 0, movedPage);
    updatePageOrder(reorderedPageList);
  }, [pageList, updatePageOrder]);

  const saveToCurrentPage = useCallback(() => {
    if (currentPageId) {
      updatePage(currentPageId, {
        bo: boxArr,
        bg: bg,
        bgVideo: bgVideo,
      });
    }
  }, [currentPageId, boxArr, bg, bgVideo, updatePage]);

  const handleCheckboxChange = useCallback(() => {
    const updatedList = [...autoList];
    updatedList[selectedAutoIndex].disabled = !isEnabled;
    setAutoList(updatedList);
    setIsEnabled(!isEnabled);
  }, [autoList, selectedAutoIndex, isEnabled, setAutoList]);

  const handleDurationChange = useCallback((e) => {
    const newDuration = parseInt(e.target.value, 10);
    const updatedList = [...autoList];
    updatedList[selectedAutoIndex].duration = newDuration;
    setAutoList(updatedList);
    setAutoDuration(newDuration);
  }, [autoList, selectedAutoIndex, setAutoList]);

  const handleDelayChange = useCallback((e) => {
    const newDelay = parseInt(e.target.value, 10);
    setDelayIsUserDoingSomething(newDelay);
  }, [setDelayIsUserDoingSomething]);

  useEffect(() => {
    let _autoNextIndex = autoList.findIndex(autoItem => {
      return autoItem.be.cmd === CMD.NEXT_PAGE;
    });

    if (_autoNextIndex === -1) {
      _autoNextIndex = 0;
      setAutoList([AUTO_NEXT_PAGE, ...autoList]);
    }

    setSelectedAutoIndex(_autoNextIndex);
  }, [autoList, setAutoList]);

  return (
    <div>
      {show && (
        <Drawer
          anchor="right"
          open={show}
          onClose={handleClose}
        >
          <Box sx={{ width: 600, padding: 2 }}>
            <Tabs value={tabValue} onChange={(event, newValue) => setTabValue(newValue)} aria-label="simple tabs example">
              <Tab label="页面" />
              <Tab label="自动" />
              <Tab label="分时换页" />
            </Tabs>

            <Box mb={1} />
            <Box hidden={tabValue !== 0}>
              <Box mb={2}>
                <Typography variant="h6">
                  当前页面：{currentPage ? currentPage.name : '未选择页面'}
                </Typography>
              </Box>
              <Box>
                <Button onClick={addCurrentToNewPage}>添加到新页面</Button>
                {currentPageId && (
                  <Button variant='outlined' color='secondary' onClick={saveToCurrentPage}>
                    保存到当前页面
                  </Button>
                )}
              </Box>
              <Box mt={1}>
                <Box sx={{ width: "100%", textAlign: "right" }}>
                  <Box sx={{marginRight: "20%"}}>否切换背景</Box>
                </Box>
                {pageList.map((page, index) => (
                  <DisplayPageItem
                    key={page.id}
                    page={page}
                    index={index}
                    changeCurrentPage={changeCurrentPage}
                    deletePageById={deletePageById}
                    updatePageName={updatePageName}
                    handleDragEnd={handleDragEnd}
                    updatePage={updatePage}
                  />
                ))}
              </Box>
            </Box>

            <Box hidden={tabValue !== 1}>
              <Typography variant="h6">自动化设置</Typography>
              <Box mt={2}>
                <FormControlLabel
                  control={<Checkbox checked={!isEnabled} onChange={handleCheckboxChange} />}
                  label="自动换页"
                />
                <Box mt={1} />
                <TextField
                  label="持续时间"
                  type="number"
                  value={autoDuration}
                  onChange={handleDurationChange}
                  sx={{ mt: 1 }}
                />

                <Box mt={1} />
                <TextField
                  label="延迟触发"
                  type="number"
                  value={delayIsUserDoingSomething}
                  onChange={handleDelayChange}
                  sx={{ mt: 1 }}
                />
              </Box>
            </Box>

            <Box hidden={tabValue !== 2}>
              <EditPageAutoNextCustom />
            </Box>

          </Box>
        </Drawer>
      )}
    </div>
  );
}
