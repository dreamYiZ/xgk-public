import { useEffect, useCallback, useState } from 'react';
import useBoxStore from "../store/useBo";
import useBeStore from "../store/useBe";
import {
  isDev, ppplog, CMD,
  SPRINT_STATUS
} from "../util/util";
import { CONSUME_BE_TIME_MS } from "../util/cfg";
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
  const { getById, changeById,
    hideBoxById, showBoxById, toggleShowHideBoxById,
    boxArr, setBoxArr } = useBoxStore();
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

    if (cmd === CMD.HIDE) {

      hideBoxById(target);
    }
    if (cmd === CMD.SHOW) {
      showBoxById(target);
    }
    if (cmd === CMD.TOGGLE) {
      ppplog('cmd === CMD.TOGGLE', target);
      toggleShowHideBoxById(target);
    }

    consumeBe(beItem);
  }, [getById, changeById]);


  const _consumeEvIfGood = useCallback((eventArr) => {

    if (isDev) {
      window.be = eventArr;
    }


    // 消费所有过期事件
    // Iterate through the event array
    for (let i = 0; i < eventArr.length; i++) {
      const event = eventArr[i];

      // Check if the event's time is earlier than the current time
      if (event && (event.time < Date.now() || !event.time)) {
        consumeEv(event);
      } else {
        // Stop the loop if the condition is not met
        break;
      }
    }




  }, [eventArr, consumeEv]);

  useEffect(() => {

    if (!canConsume) {
      return
    }
    let idSetTimeout = null;

    const consumeEvIfGood = () => {
      _consumeEvIfGood(eventArr)
      idSetTimeout = setTimeout(consumeEvIfGood, 150);
    };

    consumeEvIfGood();
    return () => {
      clearTimeout(idSetTimeout)
    }
  }, [_consumeEvIfGood, canConsume]);


  // 当测试、展示模式下，事件可以消费
  useEffect(() => {
    setCanConsume(getIsTestOrDisplay());
  }, [mode])

}
