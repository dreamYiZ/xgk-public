import { useRef, useState, useEffect } from 'react';
import useAutoStore from "../store/useAutoStore";
import { ppplog } from "../util/util";
import useBeStore from "../store/useBe";
import useGlobalStore from "../store/useGlobal";

// Custom hook to process automation commands
export default function useAutoConsumer() {
  const { autoList } = useAutoStore();
  const { addEventSortByTime } = useBeStore();
  const [enabledAutoList, setEnabledAutoList] = useState([]);
  const { getIsTestOrDisplay, isUserDoingSomething, setIsUserDoingSomething } = useGlobalStore();
  const timeoutIdArrayRef = useRef([]);

  useEffect(() => {
    const _enabledAutoList = autoList.filter(e => !e?.disabled);
    setEnabledAutoList(_enabledAutoList);
  }, [autoList]);

  useEffect(() => {
    if (!getIsTestOrDisplay()) {
      return;
    }

    enabledAutoList.forEach(enabledAuto => {
      const addAutoTimeout = () => {
        let timeoutIdForDoingSomething;
        const timeoutId = setTimeout(() => {
          ppplog('addEvent');

          if (!isUserDoingSomething) {
            addEventSortByTime({
              ...enabledAuto.be,
              time: +new Date(),
            });
          } else {
            timeoutIdForDoingSomething = setTimeout(() => {
              setIsUserDoingSomething(false);
            }, 1000 * enabledAuto.duration);
          }

          addAutoTimeout();
        }, 1000 * enabledAuto.duration);

        timeoutIdArrayRef.current.push(timeoutId);
        if (timeoutIdForDoingSomething) {
          timeoutIdArrayRef.current.push(timeoutIdForDoingSomething);
        }
      };

      addAutoTimeout();
    });

    return () => {
      timeoutIdArrayRef.current.forEach(timeoutId => {
        clearTimeout(timeoutId);
      });

      timeoutIdArrayRef.current = [];
    };
  }, [enabledAutoList, getIsTestOrDisplay, isUserDoingSomething, addEventSortByTime, setIsUserDoingSomething]);

  useEffect(() => {
    const handleUserActivity = () => {
      if (!isUserDoingSomething) {
        setIsUserDoingSomething(true);
      }
      timeoutIdArrayRef.current.forEach(timeoutId => clearTimeout(timeoutId));
      timeoutIdArrayRef.current = [];

      let timeoutId = setTimeout(() => setIsUserDoingSomething(false), 30 * 1000);
      timeoutIdArrayRef.current.push(timeoutId);
    };

    window.addEventListener('mousemove', handleUserActivity);
    window.addEventListener('keydown', handleUserActivity);

    return () => {
      window.removeEventListener('mousemove', handleUserActivity);
      window.removeEventListener('keydown', handleUserActivity);
    };
  }, [setIsUserDoingSomething, isUserDoingSomething]);
}
