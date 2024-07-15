import { ANIMATE_TYPES, ANIMATE_TYPES_DISPLAY } from "../util/util";
import RenderAnimateContainer from './renderAnimateContainer';
import useAnimateNumber from './../hooks/useAnimateNumber';
import localFont from 'next/font/local'
import { useState, useEffect } from "react";


function SubRenderText({ sub }) {
  const style = {
    fontSize: `${sub.fontSize}px`,
    fontWeight: sub.fontWeight,
    color: sub.color,
  };

  if (sub.font) {
    style.fontFamily = sub?.font?.split('.')[0];
  }

  const [customFont, setCustomFont] = useState();

  const [fontFace, setFontFace] = useState('');



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




  // only woff2 font support test
  useEffect(() => {

    if (sub.font !== null && sub.font !== '') {
      setFontFace(`
      @font-face {
        font-family: "${sub?.font?.split('.')[0]}";
        src: url("font/${sub.font}") format("${sub?.font?.split('.')[1]}");
      }
    `);
    }
  }, [sub]);



  return (
    <RenderAnimateContainer
      animation={sub.animation}
      animationDuration={sub.animationDuration}
      animationInterval={sub.animationInterval}
    >
      <style>
        {fontFace}
      </style>
      <div style={style}>
        {isNumeric && sub.animation === ANIMATE_TYPES.NUMBER_GROWING ? animatedNumber : sub.content}
      </div>
    </RenderAnimateContainer>
  );
}

export default SubRenderText;
