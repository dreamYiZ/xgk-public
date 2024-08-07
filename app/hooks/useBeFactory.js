import useBoxStore from "../store/useBo";
import useBeStore from "../store/useBe";
import { trimStringToIntOrNull } from "../util/numberUtil";
import usePageManager from "../hooks/usePageManager"
import useBe from "../store/useBe";
import useGlobalStore from "../store/useGlobal";
import { useCallback, useEffect, useState } from "react";
import { ppplog, throttle, CMD_TIME } from "../util/util";


export default function useBeFactory(
  { sub }
) {


  const [hasBe, setHasBe] = useState(true);
  const { getIsTestOrDisplay, mode } = useGlobalStore();

  const { addEvent, eventArr, addEventSortByTime } = useBe();
  const [canClick, setCanClick] = useState(false);

  const createBeBySubBe = (subBeList) => {

    subBeList.forEach(subBe => {

      const { time, ...restBe } = subBe;
      let _time = +new Date();

      if (time === CMD_TIME.NOW) {

      }

      if (time === CMD_TIME.AFTER_3S) {
        _time = +new Date() + 3000;
      }

      // 如果传入的time是时间戳，就保留时间戳
      if ((new Date(Number(time))).getTime() > 0) {
        _time = time
      }

      let newBe = {
        ...restBe,
        time: _time,
      }

      addEventSortByTime(newBe);
    })

  }


  useEffect(() => {
    let _hasBe = false;
    if (sub?.be && sub?.be.length > 0) {
      _hasBe = true;
    }
    setHasBe(_hasBe)
  }, sub?.be)

  useEffect(() => {
    setCanClick(getIsTestOrDisplay());
  }, [mode])

  const addBeToBeStore = () => {
    const { be } = sub;
    createBeBySubBe(be);
  }

  const addBeToBeStoreThrottle = throttle(addBeToBeStore, 100)



  const onClickHandler = useCallback(() => {

    if (!canClick || !hasBe) {
      return;
    }

    addBeToBeStoreThrottle();
  }, [canClick, hasBe])




  return {
    hasBe,
    canClick,
    createBeBySubBe,
    addBeToBeStoreThrottle,
    onClickHandler
  }
}
