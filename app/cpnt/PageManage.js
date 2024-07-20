import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import DrawerTitle from "./drawerTitle";
import useBoxStore from "../store/useBo";
import usePageStore from "../store/usePage";
import { v4 as uuidv4 } from 'uuid';
import TextField from '@mui/material/TextField';
import DisplayPageItem from "./DisplayPageItem";
import { ppplog } from "../util/util";
import useGlobalStore from '../store/useGlobal';

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
  const { bg, bgVideo, setBgVideo, setBg } = useGlobalStore()

  const changeCurrentPage = (id) => {
    const { getPageById } = usePageStore.getState();
    const page = getPageById(id);
    usePageStore.setState({ currentPage: page, currentPageId: id });

    setBoxArr(page.bo);
    setBgVideo(page.bgVideo)
    setBg(page.bg);
  }

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const reorderedPageList = Array.from(pageList);
    const [movedPage] = reorderedPageList.splice(result.source.index, 1);
    reorderedPageList.splice(result.destination.index, 0, movedPage);
    updatePageOrder(reorderedPageList);
  }

  ppplog('pageList', pageList);

  const addCurrentToNewPage = () => {
    addPage({
      bo: boxArr,
      id: uuidv4(),
      name: `新页面${+new Date()}`,
      bg: bg,
      bgVideo: bgVideo,
    })
  }

  const saveToCurrentPage = () => {
    if (currentPageId) {
      updatePage(currentPageId, {
        bo: boxArr,
        bg: bg,
        bgVideo: bgVideo,
      });
    }
  }
  return (
    <div>
      {show && (
        <Drawer
          anchor="right"
          open={show}
          onClose={handleClose}
        >
          <Box sx={{ width: 600, padding: 2 }}>
            <DrawerTitle>页面管理</DrawerTitle>
            <Box>
              <Button onClick={addCurrentToNewPage}>添加到新页面</Button>

              {currentPageId && <Button variant='outlined' color='secondary' onClick={saveToCurrentPage}>保存到当前页面</Button>}
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
        </Drawer>
      )}
    </div>
  );
}
