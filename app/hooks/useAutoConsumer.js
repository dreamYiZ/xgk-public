import { useRef, useState, useEffect, useCallback } from 'react';
import useAutoStore from "../store/useAutoStore";
import { CMD, ppplog } from "../util/util";
import usePageStore from "../store/usePage";
import useBoxStore from "../store/useBo";
import useBeStore from "../store/useBe";
import useGlobalStore from "../store/useGlobal";

// Custom hook to process automation commands
export default function useAutoConsumer() {
  const { autoList, setAutoList } = useAutoStore();
  const { addEventSortByTime } = useBeStore();

  const [enabledAutoList, setEnabledAutoList] = useState([]);
  const { getIsTestOrDisplay, mode } = useGlobalStore();

  const timeoutIdArrayRef = useRef([]);

  useEffect(() => {
    const _enabledAutoList = autoList.filter(e => !e?.disabled)

    ppplog('autoList-useEffect', autoList, _enabledAutoList)
    setEnabledAutoList(_enabledAutoList)
  }, [autoList])


  useEffect(() => {
    ppplog('getIsTestOrDisplay()', getIsTestOrDisplay(), enabledAutoList)
    if (!getIsTestOrDisplay()) {
      return
    }

    enabledAutoList.forEach(enabledAuto => {

      const addAutoTimeout = () => {
        const timeoutId = setTimeout(() => {
          ppplog('addEvent')
          addEventSortByTime({
            ...enabledAuto.be,
            time: +new Date(),
          })
          addAutoTimeout();
        }, 1000 * enabledAuto.duration)

        timeoutIdArrayRef.current.push(timeoutId)
      }

      addAutoTimeout()
    })

    return () => {
      timeoutIdArrayRef.current.forEach(timeoutId => {
        clearTimeout(timeoutId)
      })

      timeoutIdArrayRef.current = [];
    }
  }, [enabledAutoList, mode])

}
