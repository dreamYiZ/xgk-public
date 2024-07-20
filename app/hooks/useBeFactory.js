import { useEffect, useCallback } from 'react';
import useBoxStore from "../store/useBo";
import useBeStore from "../store/useBe";
import { ppplog, CMD, SPRINT_STATUS, CMD_TIME } from "../util/util";
import { trimStringToIntOrNull } from "../util/numberUtil";
import usePageManager from "../hooks/usePageManager"
import useBe from "../store/useBe";



export default function useBeFactory() {


  const { addEvent, eventArr, addEventSortByTime } = useBe();


  const createBeBySubBe = (subBe) => {
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
  }



  return {
    createBeBySubBe,
  }
}
