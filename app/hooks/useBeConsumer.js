import { useEffect, useCallback, useState } from 'react';
import useBoxStore from "../store/useBo";
import useBeStore from "../store/useBe";
import {
  isDev, ppplog, CMD,
  SPRINT_STATUS
} from "../util/util";
import { trimStringToIntOrNull } from "../util/numberUtil";
import usePageManager from "../hooks/usePageManager";
import useGlobalStore from "../store/useGlobal";
import callApiCommand from "../util/callApiCommand";

// cmd
// :
// "CHANGE_SPRITE_STATE"
// code
// :
// ""
// target
// :
// "b381577c-cd93-4d2f-ba2f-68325679d7b7"
// time
// :
// 1720823424462

export default function useBeCustomer() {
  const { getById, changeById, boxArr, setBoxArr } = useBoxStore();
  const {
    eventArr,
    consumeBe,
  } = useBeStore();

  const { getIsTestOrDisplay, mode } = useGlobalStore();


  const { changeCurrentPage, rollNextPage, rollNextPageWithCustomTime } = usePageManager()

  const [canConsume, setCanConsume] = useState(false);

  const consumeEv = useCallback(async (beItem) => {
    // Implement your event consumption logic here

    const {
      cmd, code, target, time
    } = beItem;

    if (cmd === CMD.CHANGE_SPRITE_STATE) {
      const targetBox = getById(target)


      const { sub: {
        enabled, status
      } } = targetBox;

      // enabled = ['initial', 'running', 'idle']
      // status =  'running'

      let newStatus = status;

      if (!trimStringToIntOrNull(code)) {
        if (enabled.length > 1) {
          const currentIndex = enabled.indexOf(status);
          newStatus = enabled[(currentIndex + 1) % enabled.length];
        }
      } else {
        // 根据code值来改变status
        if (enabled.length >= 1) {
          if (enabled[trimStringToIntOrNull(code)]) {
            newStatus = enabled[trimStringToIntOrNull(code)];
          }
        }
      }

      // Update the status of the targetBox
      changeById(target, {
        sub: {
          ...targetBox.sub,
          status: newStatus,
        },
      });
    }

    if (cmd === CMD.GOTO) {

      changeCurrentPage(target.id);
    }

    if (cmd === CMD.NEXT_PAGE) {
      rollNextPage()

    }

    if (cmd === CMD.NEXT_PAGE_CUSTOM) {
      rollNextPageWithCustomTime()
    }

    if (cmd === CMD.CALL_API) {
      try {
        await callApiCommand(code);
      } catch (e) {
      }
    }

    consumeBe(beItem);
  }, [getById, changeById]);


  const _consumeEvIfGood = useCallback((eventArr) => {

    if (isDev) {
      window.be = eventArr;
    }


    // Take the first event from the array
    const firstEvent = eventArr[0];

    // Check if the first event's time is earlier than the current time
    if (firstEvent && (firstEvent.time < Date.now() || !firstEvent.time)) {
      consumeEv(firstEvent);
    }
  }, [eventArr, consumeEv]);

  useEffect(() => {

    if (!canConsume) {
      return
    }
    let idSetTimeout = null;

    const consumeEvIfGood = () => {
      _consumeEvIfGood(eventArr)
      idSetTimeout = setTimeout(consumeEvIfGood, 1000);
    };

    consumeEvIfGood();
    return () => {
      clearTimeout(idSetTimeout)
    }
  }, [_consumeEvIfGood, canConsume]);


  useEffect(() => {
    setCanConsume(getIsTestOrDisplay());
  }, [mode])
}
