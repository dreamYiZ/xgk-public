import { ANIMATE_TYPES, ANIMATE_TYPES_DISPLAY } from "../util/util";
import RenderAnimateContainer from './renderAnimateContainer';
import useAnimateNumber from './../hooks/useAnimateNumber';

function SubRenderText(sub) {
  const style = {
    fontSize: `${sub.fontSize}px`,
    fontWeight: sub.fontWeight,
    color: sub.color,
  };

  // Check if 'sub.content' is a number or a numeric string
  const isNumeric = !isNaN(parseFloat(sub.content)) && isFinite(sub.content);

  // Use 'useAnimateNumber' hook
  const [animatedNumber] = useAnimateNumber(
    isNumeric && sub.animation === ANIMATE_TYPES.NUMBER_GROWING
      ? parseFloat(sub.content)
      : sub.content,
    sub.animationDuration,
    sub.animationInterval
  );

  return (
    <RenderAnimateContainer
      animation={sub.animation}
      animationDuration={sub.animationDuration}
      animationInterval={sub.animationInterval}
    >
      <div style={style}>
        {isNumeric&&sub.animation === ANIMATE_TYPES.NUMBER_GROWING ? animatedNumber : sub.content}
      </div>
    </RenderAnimateContainer>
  );
}

export default SubRenderText;
