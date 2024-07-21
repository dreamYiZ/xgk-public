import { ANIMATE_TYPES, ANIMATE_TYPES_DISPLAY } from "../util/util";
import RenderAnimateContainer from './renderAnimateContainer';
import useBe from "../store/useBe";
import useGlobalStore from "../store/useGlobal";
import useBoxStore from "../store/useBo";
import { useCallback, useEffect, useState } from "react";
import { ppplog, throttle, CMD_TIME } from "../util/util";
import useBeFactory from "../hooks/useBeFactory";

function SubRenderImage({ box, sub }) {

  const boxArr = useBoxStore((state) => state.boxArr);
  const [canClick, setCanClick] = useState(false);
  const [hasBe, setHasBe] = useState(true);

  const { getIsTestOrDisplay, mode } = useGlobalStore();
  const { addEvent, eventArr, addEventSortByTime } = useBe();
  const { createBeBySubBe } = useBeFactory();


  useEffect(() => {
    setCanClick(getIsTestOrDisplay());
  }, [mode])

  const addBeToBeStore = () => {
    const { be } = sub;
    createBeBySubBe(be);
  }

  const addBeToBeStoreThrottle = throttle(addBeToBeStore, 1000)

  const onClickHandler = useCallback(() => {

    if (!canClick || !hasBe) {
      return;
    }

    addBeToBeStoreThrottle();
  }, [canClick, hasBe])


  useEffect(() => {
    let _hasBe = false;
    if (sub?.be && sub?.be?.cmd) {
      _hasBe = true;
    }
    setHasBe(_hasBe)
  }, sub?.be)


  // useEffect(() => {
  //   ppplog('boxArr-from-sub-render-image:', boxArr)
  // }, [boxArr])


  // useEffect(() => {
  //   ppplog('eventArr-from-sub-render-image:', eventArr)
  // }, [eventArr])



  return (
    <RenderAnimateContainer
      animation={sub.animation}
      animationDuration={sub.animationDuration}
      animationInterval={sub.animationInterval}
      animationTimingFunction={sub.animationTimingFunction}
    >
      <div>
        <img onClick={onClickHandler} width={box.width} height={box.height} src={sub.url} alt="sub.url" onDragStart={event => event.preventDefault()} />
      </div>
    </RenderAnimateContainer>
  );
}

export default SubRenderImage;
