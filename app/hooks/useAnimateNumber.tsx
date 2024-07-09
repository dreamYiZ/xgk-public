import { useState, useCallback, useLayoutEffect, useEffect } from "react";

function useAnimateNumber(
  oneNumber: any,
  animationDuration: number,
  animationInterval = 10,
  fps = 4
) {
  // Check if 'oneNumber' is a number or a numeric string
  const isNumeric = !isNaN(parseFloat(oneNumber)) && isFinite(oneNumber);

  const [localNumber, setLocalNumber] = useState<number>(0);

  const animate = useCallback(
    (thisOneNumber: number) => {
      let t = animationDuration;
      let FPS = fps;
      let start: any, previousTimeStamp: any;
      let lastUpdateTime = 0;

      const doRequestAnimationFrame = (timestamp: any) => {
        if (start === undefined) start = timestamp;
        const elapsed = timestamp - start;
        if (previousTimeStamp !== timestamp) {
          if (timestamp - lastUpdateTime >= 1000 / FPS) {
            setLocalNumber(
              Math.floor((thisOneNumber / (t * 1000)) * Math.floor(elapsed))
            );
            lastUpdateTime = timestamp;
          }
        }

        if (elapsed < t * 1000) {
          previousTimeStamp = timestamp;
          window.requestAnimationFrame(doRequestAnimationFrame);
        } else {
          setLocalNumber(thisOneNumber);
        }
      };

      window.requestAnimationFrame(doRequestAnimationFrame);
    },
    [animationDuration, fps]
  );

  useLayoutEffect(() => {
    if (oneNumber) {
      animate(oneNumber);
    }
  }, [oneNumber, animate]);

  useEffect(() => {

    let sto = setInterval(() => {
      setLocalNumber(0);
      animate(oneNumber);
    }, (+animationInterval + +animationDuration) * 1000);

    return () => {
      clearInterval(sto);
    };
  }, [animationInterval, oneNumber, animationDuration]);

  if (!isNumeric) {
    return [oneNumber];
  }
  return [localNumber];
}

export default useAnimateNumber;
