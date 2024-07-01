import { useState, useEffect, useMemo } from 'react';  // 引入 useMemo
import {ANIMATE_TYPES, ppplog} from "../util/util";

function RenderAnimateContainer({ children, animation, animationDuration, animationInterval, animationTimingFunction }) {
  const [activeAnimation, setActiveAnimation] = useState(animation);
  const [lastAnimationTime, setLastAnimationTime] = useState(Date.now());

  useEffect(() => {
    let animationTimeoutId;
    let intervalId;

    ppplog('useEffect-animation', )
    if (animationInterval !== 0) {
      // Set a timeout to remove the animation after its duration
      animationTimeoutId = setTimeout(() => {
        setActiveAnimation('');
        setLastAnimationTime(Date.now());
      }, animationDuration * 1000);  // Convert to milliseconds

      // Set an interval to add the animation after the specified interval
      intervalId = setInterval(() => {
        const currentTime = Date.now();
        if (currentTime - lastAnimationTime >= animationInterval * 1000) {  // Convert to milliseconds
          setActiveAnimation(animation);
          clearTimeout(animationTimeoutId);
          animationTimeoutId = setTimeout(() => {
            setActiveAnimation('');
            setLastAnimationTime(Date.now());
          }, animationDuration * 1000);  // Convert to milliseconds
        }
      }, 1000);  // Check every second
    }

    // Clean up the timeout and interval on unmount
    return () => {
      if (animationTimeoutId) {
        clearTimeout(animationTimeoutId);
      }
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [animation, animationDuration, animationInterval, lastAnimationTime]);

  // 使用 useMemo 来优化 animationName 的计算
  const animationName = useMemo(() => {
    switch (activeAnimation) {
      case ANIMATE_TYPES.SCALE:
        return 'scale';
      case ANIMATE_TYPES.BLINKING:
        return 'blinking';
      case ANIMATE_TYPES.FADE_IN_OUT:
        return 'fadeInOut';
      case ANIMATE_TYPES.ROTATING:
        return 'rotating';
      default:
        return '';
    }
  }, [activeAnimation]);  // 只在 activeAnimation 改变时重新计算

  const style = {
    animationDuration: `${animationDuration}s`,
    animationIterationCount: 'infinite',
    animationTimingFunction: `${animationTimingFunction}`,
    animationName: animationName,
  };

  return <div style={style}>{children}</div>;
}

export default RenderAnimateContainer;
