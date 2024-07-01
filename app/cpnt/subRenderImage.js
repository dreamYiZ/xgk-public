import { ANIMATE_TYPES, ANIMATE_TYPES_DISPLAY } from "../util/util";
import RenderAnimateContainer from './renderAnimateContainer';


function SubRenderImage({ box, ...sub }) {
  return (
    <RenderAnimateContainer
      animation={sub.animation}
      animationDuration={sub.animationDuration}
      animationInterval={sub.animationInterval}
      animationTimingFunction={sub.animationTimingFunction}
    >
      <div>
        <img width={box.width} height={box.height} src={sub.url} alt="sub.url" onDragStart={event => event.preventDefault()} />
      </div>
    </RenderAnimateContainer>
  );
}

export default SubRenderImage;
