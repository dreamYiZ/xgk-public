import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import DrawerTitle from "./drawerTitle";
import useBoxStore from "../store/useBo";
import usePageStore from "../store/usePage";
import { v4 as uuidv4 } from 'uuid';
import DisplayPageItem from "./DisplayPageItem";
import { ppplog } from "../util/util";
import useGlobalStore from '../store/useGlobal';
import usePageManager from "../hooks/usePageManager"
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, TextField, Tabs, Tab, Box, IconButton } from '@mui/material';
import useAutoStore from "../store/useAutoStore";


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
  const { bg, bgVideo, setBgVideo, setBg } = useGlobalStore();
  const { addCurrentToNewPage } = usePageManager();
  const [tabValue, setTabValue] = useState(0);

  const changeCurrentPage = (id) => {
    const { getPageById } = usePageStore.getState();
    const page = getPageById(id);
    usePageStore.setState({ currentPage: page, currentPageId: id });

    setBoxArr(page.bo);
    setBgVideo(page.bgVideo);
    setBg(page.bg);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const reorderedPageList = Array.from(pageList);
    const [movedPage] = reorderedPageList.splice(result.source.index, 1);
    reorderedPageList.splice(result.destination.index, 0, movedPage);
    updatePageOrder(reorderedPageList);
  };


  const saveToCurrentPage = () => {
    if (currentPageId) {
      updatePage(currentPageId, {
        bo: boxArr,
        bg: bg,
        bgVideo: bgVideo,
      });
    }
  };

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
                {pageList.map((page, index) => (
                  <DisplayPageItem
                    key={page.id}
                    page={page}
                    index={index}
                    changeCurrentPage={changeCurrentPage}
                    deletePageById={deletePageById}
                    updatePageName={updatePageName}
                    handleDragEnd={handleDragEnd}
                  />
                ))}
              </Box>

            </Box>


            <Box hidden={tabValue !== 0}>
                todo:
                添加mui的checkbox，用来改变
                (set, get) => ({
    autoList: [
      {
        be: {
          cmd: CMD.NEXT_PAGE
        },
        duration: 10,
        id: uuidv4(),
        disabled: true,
      }
    ],
  }),
  中cmd: CMD.NEXT_PAGE的元素的enabled值， label是是否自动换页

  添加一个输入框，用来编辑 duration: 10,
            </Box>
          </Box>
        </Drawer>
      )}
    </div>
  );
}
