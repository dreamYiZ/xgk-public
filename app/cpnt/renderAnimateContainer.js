import { useState, useEffect, useMemo } from 'react';
import { ANIMATE_TYPES, ppplog } from "../util/util";

// Define a constant for the conversion factor
const MS_PER_S = 1000;

function RenderAnimateContainer({ children, animation, animationDuration, animationInterval, animationTimingFunction }) {
  const [activeAnimation, setActiveAnimation] = useState(animation);

  useEffect(() => {
    let tidAnimateStop;
    let tidAnimateStart

    if (+animationInterval !== 0) {
      let funcAnimateTimeout = () => {
        tidAnimateStop = setTimeout(() => {
          setActiveAnimation('');
        }, (+animationDuration) * MS_PER_S)

        tidAnimateStart = setTimeout(() => {
          setActiveAnimation(animation);
          funcAnimateTimeout();
        }, (+animationDuration + +animationInterval) * MS_PER_S)
      }

      funcAnimateTimeout();
    }

    return () => {
      clearTimeout(tidAnimateStop);
      clearTimeout(tidAnimateStart);
    }
  }, [animation, animationDuration, animationInterval])  // Add dependencies


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

  const style = useMemo(() => {
    return {
      animationDuration: `${animationDuration}s`,
      animationIterationCount: 'infinite',
      animationTimingFunction: `${animationTimingFunction}`,
      animationName: animationName,
    }
  }, [animationName]);

  return <div style={style}>{children}</div>;
}

export default RenderAnimateContainer;
