import useGlobalStore from '../store/useGlobal';
import useBoxStore from "../store/useBo";
import usePageStore from "../store/usePage";
import { ppplog } from "../util/util";
import { v4 as uuidv4 } from 'uuid';
import { useCallback, useRef } from 'react';
import useBeStore from "../store/useBe";
import { AUTO_NEXT_PAGE_CUSTOM } from "../store/useAutoStore";

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
  const { addEventSortByTime } = useBeStore();

  const currentPageIndexRef = useRef(0);

  const changeCurrentPage = (id) => {
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
    const pageListLength = pageList.length;

    if (pageListLength <= 1) {
      return;
    }

    if (currentPage && currentPageId) {
      if (currentPageIndexRef.current < pageListLength - 1) {
        changeCurrentPage(pageList[++currentPageIndexRef.current].id);
      } else {
        changeCurrentPage(pageList[0].id);
        currentPageIndexRef.current = 0;
      }
    } else {
      changeCurrentPage(pageList[0].id);
    }
  };

  const rollNextPageWithCustomTime = () => {
    const pageListLength = pageList.length;

    if (pageListLength <= 1) {
      return;
    }

    if (currentPage && currentPageId) {
      if (currentPageIndexRef.current < pageListLength - 1) {
        changeCurrentPage(pageList[++currentPageIndexRef.current].id);

        setTimeout(() => {
          addEventSortByTime({
            ...AUTO_NEXT_PAGE_CUSTOM.be,
            time: +new Date() + pageList[currentPageIndexRef.current].nextTime * 1000,
          });
        }, 50)
      } else {
        changeCurrentPage(pageList[0].id);
        currentPageIndexRef.current = 0;

        setTimeout(() => {
          addEventSortByTime({
            ...AUTO_NEXT_PAGE_CUSTOM.be,
            time: +new Date() + pageList[0].nextTime * 1000,
          });
        }, 50)
      }
    } else {
      changeCurrentPage(pageList[0].id);
    }
  };

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
    rollNextPageWithCustomTime,
  };
}
