import { useEffect, useCallback } from 'react';
import useBoxStore from "../store/useBo";
import useBeStore from "../store/useBe";
import { ppplog, CMD } from "../util/util";



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
  const { boxArr, setBoxArr } = useBoxStore();
  const { eventArr, consumeBe } = useBeStore();

  const consumeEv = useCallback((beItem) => {
    // Implement your event consumption logic here
    console.log("Consuming event: ", beItem);

    const {
      cmd, code, target, time
    } = beItem;

    if (cmd === CMD.CHANGE_SPRITE_STATE) {

    }

    // consumeBe(beItem);
  }, []);

  const _consumeEvIfGood = useCallback((eventArr) => {
    ppplog(eventArr);

    // Take the first event from the array
    const firstEvent = eventArr[0];

    // Check if the first event's time is earlier than the current time
    if (firstEvent && firstEvent.time < Date.now()) {
      consumeEv(firstEvent);
    }
  }, [eventArr, consumeEv]);

  useEffect(() => {
    let idSetTimeout = null;

    const consumeEvIfGood = () => {
      _consumeEvIfGood(eventArr)
      idSetTimeout = setTimeout(consumeEvIfGood, 1000);
    };

    consumeEvIfGood();
    return () => {
      clearTimeout(idSetTimeout)
    }
  }, [_consumeEvIfGood]);
}
