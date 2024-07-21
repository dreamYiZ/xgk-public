import useGlobalStore from '../store/useGlobal';
import useBoxStore from "../store/useBo";
import usePageStore from "../store/usePage";
import { ppplog } from "../util/util";
import { v4 as uuidv4 } from 'uuid';
import { useCallback, useRef } from 'react';

export default function () {


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

  const currentPageIndexRef = useRef(0);

  ppplog('pageList', pageList, currentPageId)

  const changeCurrentPage = (id) => {
    ppplog('changeCurrentPage', id);
    // return;
    const { getPageById } = usePageStore.getState();
    const page = getPageById(id);
    usePageStore.setState({ currentPage: page, currentPageId: id });

    setBoxArr(page.bo);

    if (!page.notChangeBg) {
      if (page.bgVideo) {
        setBgVideo(page.bgVideo);
      }
      if (page.bg) {
        setBg(page.bg);
      }
    }

  };

  const rollNextPage = () => {
    ppplog('rollNextPage',)
    const pageListLength = pageList.length;

    if (pageListLength <= 1) {
      return;
    }

    ppplog('rollNextPage', 1)
    if (currentPage && currentPageId) {
      ppplog('rollNextPage', 2, currentPageIndexRef.current)

      // const currentPageIndex = pageList.findIndex(p => p.id === currentPageId);
      // ppplog('currentPageIndex', currentPageIndex, pageListLength)
      if (currentPageIndexRef.current < pageListLength - 1) {
        ppplog('rollNextPage', 3)

        changeCurrentPage(pageList[++currentPageIndexRef.current].id)
      } else {
        ppplog('rollNextPage', 4)

        changeCurrentPage(pageList[0].id)
        currentPageIndexRef.current = 0;
      }
    } else {
      ppplog('rollNextPage', 5)

      changeCurrentPage(pageList[0].id)
    }

  }


  const addCurrentToNewPage = () => {
    addPage({
      bo: boxArr,
      id: uuidv4(),
      name: `新页面${+new Date()}`,
      bg: bg,
      bgVideo: bgVideo,
    });
  };

  return {
    changeCurrentPage,
    addCurrentToNewPage,
    rollNextPage,
  }
}
