import { ANIMATE_TYPES } from "../util/util";

function RenderAnimateContainer({ children, animation, animationDuration, animationInterval, animationTimingFunction }) {
  const style = {
    animationDuration: `${animationDuration}s`,
    animationIterationCount: 'infinite',
    animationDelay: `${animationInterval}s`,
    animationTimingFunction: `${animationTimingFunction}`,
  };

  switch (animation) {
    case ANIMATE_TYPES.SCALE:
      style.animationName = 'scale';
      break;
    case ANIMATE_TYPES.BLINKING:
      style.animationName = 'blinking';
      break;
    case ANIMATE_TYPES.FADE_IN_OUT:
      style.animationName = 'fadeInOut';
      break;
    case ANIMATE_TYPES.ROTATING:
      style.animationName = 'rotating';
      break;

    default:
      break;
  }

  return <div style={style}>
    {children}
  </div>
}

export default RenderAnimateContainer;
