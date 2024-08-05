import React, { memo, useCallback } from 'react';
import RenderAnimateContainer from './renderAnimateContainer';
import useBeFactory from "../hooks/useBeFactory";

const SubRenderImage = ({ box, sub }) => {
  const { onClickHandler } = useBeFactory({ sub });

  const handleDragStart = useCallback((event) => {
    event.preventDefault();
  }, []);

  return (
    <RenderAnimateContainer
      animation={sub.animation}
      animationDuration={sub.animationDuration}
      animationInterval={sub.animationInterval}
      animationTimingFunction={sub.animationTimingFunction}
    >
      <div>
        <img
          onClick={onClickHandler}
          width={box.width}
          height={box.height}
          src={sub.url}
          alt="sub.url"
          onDragStart={handleDragStart}
        />
      </div>
    </RenderAnimateContainer>
  );
}

export default memo(SubRenderImage);
