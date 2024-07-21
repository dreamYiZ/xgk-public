import RenderAnimateContainer from './renderAnimateContainer';
import useBeFactory from "../hooks/useBeFactory";

function SubRenderImage({ box, sub }) {

  const {
    onClickHandler,
  } = useBeFactory({ sub });

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
