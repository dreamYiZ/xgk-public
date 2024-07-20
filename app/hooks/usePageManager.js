import useGlobalStore from '../store/useGlobal';
import useBoxStore from "../store/useBo";
import usePageStore from "../store/usePage";
import { ppplog } from "../util/util";

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


  const changeCurrentPage = (id) => {
    // ppplog('changeCurrentPage', id);
    // return;
    const { getPageById } = usePageStore.getState();
    const page = getPageById(id);
    usePageStore.setState({ currentPage: page, currentPageId: id });

    setBoxArr(page.bo);
    setBgVideo(page.bgVideo);
    setBg(page.bg);
  };

  return {
    changeCurrentPage
  }
}