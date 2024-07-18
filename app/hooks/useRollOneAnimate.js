import { useState, useRef, useEffect } from "react";
import { maybeNumberOr, ppplog, TIME_TYPE, MARQUEE_TYPE } from "../util/util";

export default function useRollOneAnimate(
  {
    timeDuration, data, perPage
  }
) {

  const TIME_BEFORE_MILLISECOND = 10;
  const TIME_BEFORE_CLEAR_MILLISECOND = 0;

  const animateTimeoutIdRef = useRef();
  const rmClassAnimateTimeoutIdRef = useRef();


  const [firstRowClass, setFirstRowClass] = useState();
  const [comeOnRowClass, setComeOnRowClass] = useState();
  const [restClass, setRestRowClass] = useState();



  useEffect(() => {
    if (data.length < perPage) {
      return null;
    }

    const doAnimation = () => {

      animateTimeoutIdRef.current = setTimeout(() => {
        setFirstRowClass('animate__animated animate__fadeOutUp')
        setRestRowClass('animate__animated animate__slideOutUp visible-important')
        setComeOnRowClass('animate__animated animate__slideOutUp visible-important')

        rmClassAnimateTimeoutIdRef.current = setTimeout(() => {

          setFirstRowClass('')
          setRestRowClass('')
          setComeOnRowClass('')
        }, timeDuration * 1000 - TIME_BEFORE_MILLISECOND - TIME_BEFORE_CLEAR_MILLISECOND)


        doAnimation();
      }, timeDuration * 1000 - TIME_BEFORE_MILLISECOND)



    }

    setComeOnRowClass('hidden-important')

    doAnimation();


    return () => {
      clearTimeout(animateTimeoutIdRef.current);
      clearTimeout(rmClassAnimateTimeoutIdRef.current);

    }

  }, []);


  const getClassAnimate = (idx) => {
    if (idx === 0) {
      return firstRowClass;
    }
    if (idx === perPage - 1) {
      return comeOnRowClass;
    }
    return restClass
  }

  return {

    firstRowClass,
    restClass,
    comeOnRowClass,
    getClassAnimate,
  }
}
