import { useState } from 'react';
import useBoxStore from '../store/useBo';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { HexColorPicker } from 'react-colorful';  // 引入颜色选择器
import { ANIMATE_TYPES, ANIMATE_TYPES_DISPLAY } from "../util/util";
import RenderAnimateContainer from './renderAnimateContainer';

function SubRenderText(sub) {
  const style = {
    fontSize: `${sub.fontSize}px`,
    fontWeight: sub.fontWeight,
    color: sub.color,
  };

  return (
    <RenderAnimateContainer
      animation={sub.animation}
      animationDuration={sub.animationDuration}
      animationInterval={sub.animationInterval}
    >
      <div style={style}>
        {sub.content}
      </div>
    </RenderAnimateContainer>
  );
}

export default SubRenderText;
