import { useEffect, useRef } from 'react';
import useGlobalStore, { MODE } from "../store/useGlobal";
import useBoxStore from "../store/useBo";
import { validApiUrl, combineBoxAndSubArr } from "../util/util";

export default function useApiToRefreshData() {

  const { api, mode } = useGlobalStore();
  const { boxArr, setBoxArr } = useBoxStore();
  const boxArrRef = useRef(boxArr);  // 使用 useRef 来存储 boxArr 的值

  useEffect(() => {
    boxArrRef.current = boxArr;  // 当 boxArr 改变时，更新 boxArrRef 的值
  }, [boxArr]);

  useEffect(() => {
    const fetchApi = () => {
      // 只有当 mode 等于 MODE.TEST 或 MODE.DISPLAY 时才运行
      if (mode !== MODE.TEST && mode !== MODE.DISPLAY) {
        return;
      }

      if (validApiUrl(api)) {
        fetch(api)
          .then(response => response.json())
          .then(data => {
            if (data.bo) {
              const newBoxArr = combineBoxAndSubArr(boxArrRef.current, data.bo);
              setBoxArr(newBoxArr);
            }
          })
          .catch(error => console.error('Error:', error));
      }
    }

    // 立即执行一次 fetchApi
    fetchApi();

    // 每10秒执行一次 fetchApi
    const intervalId = setInterval(fetchApi, 10000);

    // 在组件卸载时清除定时器
    return () => clearInterval(intervalId);
  }, [api, mode, setBoxArr]);

}