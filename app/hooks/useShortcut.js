import { useRef, useEffect, useState, useCallback } from 'react';
import useGlobalStore from '../store/useGlobal';
import { ppplog, pxToNumber, MAIN_ID_TO_RENDER_BOX, MIN_MAIN_SCALE, MAX_MAIN_SCALE, FRAMEWORK_ID_SELECTOR } from '../util/util';
import { debounce } from 'lodash';

export default function useShortcut() {
  const { mainScale, setMainScale, setMainDivLeft, mainDivLoadTime, setMainDivTop } = useGlobalStore();
  const [isDragging, setIsDragging] = useState(false);
  const startPosRef = useRef({ x: 0, y: 0 });

  const debouncedUpdatePosition = useCallback(
    debounce((deltaX, deltaY) => {
      setMainDivLeft(deltaX);
      setMainDivTop(deltaY);
    }, 10),
    [setMainDivLeft, setMainDivTop]
  );

  useEffect(() => {
    // ppplog('useShortcut');

    const frameworkEl = document.querySelector(FRAMEWORK_ID_SELECTOR);
    const mainRenderEl = document.querySelector(`#${MAIN_ID_TO_RENDER_BOX}`);
    if (!frameworkEl) {
      console.error(`Element with selector ${FRAMEWORK_ID_SELECTOR} not found.`);
      return;
    }

    const handleWheel = (event) => {
      // ppplog('handleWheel');
      if (event.metaKey || event.ctrlKey) { // Command key on Mac or Ctrl key on Windows
        // ppplog('metaKey');
        event.preventDefault();

        let newScale = mainScale - event.deltaY * 0.01; // Adjust scale factor as needed
        newScale = Math.max(MIN_MAIN_SCALE, Math.min(MAX_MAIN_SCALE, newScale));
        setMainScale(newScale);
      }
    };

    const handleKeyDown = (event) => {
      if (event.code === 'Space') {
        // ppplog('Space');
        frameworkEl.style.cursor = 'grab';
        mainRenderEl && (mainRenderEl.style.cursor = 'grab');
        event.preventDefault();
      }
    };

    const handleKeyUp = (event) => {
      // ppplog('Space up');
      if (event.code === 'Space') {
        frameworkEl.style.cursor = 'default';
        mainRenderEl && (mainRenderEl.style.cursor = 'default');
      }
      if (isDragging) {
        setIsDragging(false);
      }
    };

    const handleMouseDown = (event) => {
      if (event.button === 0 && frameworkEl.style.cursor === 'grab') {
        setIsDragging(true);
        startPosRef.current = { x: event.clientX, y: event.clientY }
        // setStartPos({ x: event.clientX, y: event.clientY });
      }
    };

    const handleMouseMove = (event) => {
      if (isDragging) {
        // ppplog('handleMouseMove-isDragging');
        const deltaX = event.clientX - startPosRef.current.x;
        const deltaY = event.clientY - startPosRef.current.y;


        // todo: 修改mainRenderEl的left 和 top， 来实现拖拽位置
        if (!mainRenderEl) {
          return;
        }

        mainRenderEl.style.left = `${pxToNumber(mainRenderEl.style.left || 0) + deltaX}px`;
        mainRenderEl.style.top = `${pxToNumber(mainRenderEl.style.top || 0) + deltaY}px`;
        // ppplog('mainRenderEl.style.left', mainRenderEl, mainRenderEl.style.left, mainRenderEl.style.top)

        debouncedUpdatePosition(pxToNumber(mainRenderEl.style.left), pxToNumber(mainRenderEl.style.top));
        // debouncedUpdatePosition(mainRenderEl.style.left, mainRenderEl.style.top);
        // setMainDivLeft(pxToNumber(mainRenderEl.style.left));
        // setMainDivTop(pxToNumber(mainRenderEl.style.top));
        // setStartPos({ x: event.clientX, y: event.clientY });

        startPosRef.current = { x: event.clientX, y: event.clientY };
      }
    };

    const handleMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
      }
    };

    frameworkEl.addEventListener('wheel', handleWheel);
    frameworkEl.addEventListener('mousedown', handleMouseDown);
    frameworkEl.addEventListener('mousemove', handleMouseMove);
    frameworkEl.addEventListener('mouseup', handleMouseUp);

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      frameworkEl.removeEventListener('wheel', handleWheel);
      frameworkEl.removeEventListener('mousedown', handleMouseDown);
      frameworkEl.removeEventListener('mousemove', handleMouseMove);
      frameworkEl.removeEventListener('mouseup', handleMouseUp);

      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [mainScale, setMainScale, mainDivLoadTime, isDragging, debouncedUpdatePosition]);

  return null; // No need to render anything
}
