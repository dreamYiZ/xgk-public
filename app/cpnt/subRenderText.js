import { ANIMATE_TYPES, ppplog } from "../util/util";
import RenderAnimateContainer from './renderAnimateContainer';
import useAnimateNumber from './../hooks/useAnimateNumber';
import { useState, useEffect, useCallback, memo } from "react";
import useBoxStore from "../store/useBo";
import useGlobalStore from "../store/useGlobal";
import TextField from '@mui/material/TextField';

const SubRenderText = ({ sub, box }) => {
  const { changeById } = useBoxStore();
  const { boxid, isEditing } = box;
  const { mode, getIsTestOrDisplay } = useGlobalStore();

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
  const [editContent, setEditContent] = useState(sub.content);

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

  const handleDoubleClick = useCallback(() => {
    if (!getIsTestOrDisplay()) {
      ppplog('handleDoubleClick');
      changeById(boxid, { isEditing: true });
    }
  }, [boxid, changeById, getIsTestOrDisplay]);

  const handleChange = useCallback((e) => {
    setEditContent(e.target.value);
  }, []);

  const handleBlur = useCallback(() => {
    changeById(boxid, { isEditing: false, sub: { ...sub, content: editContent } });
  }, [boxid, changeById, editContent, sub]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleBlur();
    }
  }, [handleBlur]);

  const handleMouseDown = useCallback((e) => {
    e.stopPropagation();
    return false;
  }, []);

  return (
    <RenderAnimateContainer
      animation={sub.animation}
      animationDuration={sub.animationDuration}
      animationInterval={sub.animationInterval}
    >
      <style>
        {fontFace}
      </style>
      {isEditing && !getIsTestOrDisplay() ? (
        <TextField
          multiline
          value={editContent}
          onChange={handleChange}
          onBlur={handleBlur}
          fullWidth
          onKeyDown={handleKeyDown}
          onMouseDown={handleMouseDown}
          InputProps={{
            style
          }}
          autoFocus
        />
      ) : (
        <div style={style} onDoubleClick={handleDoubleClick}>
          {isNumeric && sub.animation === ANIMATE_TYPES.NUMBER_GROWING ? animatedNumber : sub.content}
        </div>
      )}
    </RenderAnimateContainer>
  );
}

export default memo(SubRenderText);
