import { useEffect, useRef } from 'react';
import useGlobalStore, { MODE } from "../store/useGlobal";
import useBoxStore from "../store/useBo";
import usePageStore from "../store/usePage";
import useAutoStore from "../store/useAutoStore";
import useBeStore from "../store/useBe";
import { validApiUrl, combineBoxAndSubArr, mergePageBo } from "../util/util";

export default function useApiToRefreshData() {

  const { api, mode, setGlobal, getIsTestOrDisplay, apiRateLimit } = useGlobalStore();
  const { boxArr, setBoxArr } = useBoxStore();
  const { setPageList, pageList } = usePageStore();
  const { setAutoList } = useAutoStore();
  const { setEventArr, addEventSortByTime } = useBeStore();
  const boxArrRef = useRef(boxArr);  // 使用 useRef 来存储 boxArr 的值

  useEffect(() => {
    boxArrRef.current = boxArr;  // 当 boxArr 改变时，更新 boxArrRef 的值
  }, [boxArr]);

  useEffect(() => {
    const fetchApi = () => {
      // 只有当 mode 等于 MODE.TEST 或 MODE.DISPLAY 时才运行
      if (!getIsTestOrDisplay()) {
        return;
      }

      if (validApiUrl(api)) {
        fetch(api)
          .then(response => response.json())
          .then(data => {

            // boxArr,根据新的修改旧的，有才修改，没有就保留旧的，新增的不会修改
            if (data.boMerge) {
              const newBoxArr = combineBoxAndSubArr(boxArrRef.current, data.boMerge);
              setBoxArr(newBoxArr);
            }

            // boxArr,根据新的修改旧的，替换修改
            if (data.bo) {
              const newBoxArr = data.bo;
              setBoxArr(newBoxArr);
            }

            // page,根据新的修改旧的，替换修改
            if (data.page) {
              setPageList(data.page);
            }

            // page,根据新的修改旧的，迭代旧的，有才修改，没有就保留旧的，新增的不会修改，
            // bo采用替换方式
            if (data.pageBo) {
              const newPageList = mergePageBo(pageList, data.pageBo)
              setPageList(newPageList)
            }

            // page,根据新的修改旧的，迭代旧的，有才修改，没有就保留旧的，新增的不会修改，
            // bo采用merge修改，新的bo中有的才修改，旧的保留
            if (data.pageBoUpdate) {
              const newPageList = mergePageBoUpdate(pageList, data.pageBoUpdate)
              setPageList(newPageList)
            }

            // page,根据新的修改旧的，迭代旧的，有才修改，没有就保留旧的，新增的不会修改，
            // bo采用merge修改，新的bo中有的才修改，旧的保留
            // 同时更新boxArr
            if (data.pageBoUpdateAndSub) {
              const newPageList = mergePageBoUpdate(pageList, data.pageBoUpdate)
              setPageList(newPageList)

              setBoxArr(mergeSub(boxArr, pageBoUpdateAndSub))
            }

            // 更新全局配置，替换修改
            if (data.global) {
              setGlobal(data.global);
            }

            // 更新自动脚本，替换修改
            if (data.auto) {
              setAutoList(data.auto);
            }

            // 更新自动事件队列，替换修改
            if (data.be) {
              setEventArr(data.be);
            }

            // 更新自动事件队列，添加一个事件
            if (data.addBe) {
              addEventSortByTime(data.addBe);
            }


          })
          .catch(error => console.error('Error:', error));
      }
    }

    // 立即执行一次 fetchApi
    fetchApi();

    // 每10秒执行一次 fetchApi
    const intervalId = setInterval(fetchApi, apiRateLimit * 1000);

    // 在组件卸载时清除定时器
    return () => clearInterval(intervalId);
  }, [api, mode, setBoxArr, apiRateLimit]);

}
