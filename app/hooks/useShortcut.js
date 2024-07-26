import { useRef, useEffect, useState, useCallback } from 'react';
import useGlobalStore from '../store/useGlobal';
import useBoxStore from '../store/useBo';
import {
  MAIN_ID_TO_RENDER_BOX_CONTAINER,
  ppplog, pxToNumber, MAIN_ID_TO_RENDER_BOX, MIN_MAIN_SCALE, MAX_MAIN_SCALE, FRAMEWORK_ID_SELECTOR
} from '../util/util';
import { debounce } from 'lodash';
import { useFabricContext } from "../context/FabricContext";

export default function useShortcut() {
  const { mainScale, setMainScale, setMainDivLeft, mainDivLoadTime, setMainDivTop, showWhenEditing, mode,

    setIsMainDragging: setIsDraggingGlobal, isMainDragging, setIsSpacePress,
  } = useGlobalStore();
  const { activeBoxId, delById } = useBoxStore();
  const [isDragging, setIsDragging] = useState(false);
  const startPosRef = useRef({ x: 0, y: 0 });

  const { fabricCanvas } = useFabricContext();

  useEffect(() => {
    setIsDraggingGlobal(isDragging);
  }, [isDragging])

  const debouncedUpdatePosition = useCallback(
    debounce((x, y) => {
      setMainDivLeft(x);
      setMainDivTop(y);
    }, 1000),
    [setMainDivLeft, setMainDivTop]
  );

  useEffect(() => {
    if (!showWhenEditing()) {
      return () => { };
    }

    // ppplog('useShortcut');

    const frameworkEl = document.querySelector(FRAMEWORK_ID_SELECTOR);
    const mainRenderEl = document.querySelector(`#${MAIN_ID_TO_RENDER_BOX}`);
    const mainRenderContainerEl = document.querySelector(`#${MAIN_ID_TO_RENDER_BOX_CONTAINER}`);
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
        mainRenderContainerEl && (mainRenderContainerEl.style.cursor = 'grab');
        event.preventDefault();
        // setIsDragging(true);

        setIsSpacePress(true);
      }

      // Handle Delete key
      if (event.code === 'Delete') {
        if (activeBoxId && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {

          if (fabricCanvas && fabricCanvas.getActiveObject()) {

            const confirmDelete = window.confirm('确认删除Fabric中的一个元素吗？');
            if (confirmDelete) {
              fabricCanvas.getActiveObject().remove();
            }
            return
          }


          const confirmDelete = window.confirm('确认删除吗？');
          if (confirmDelete) {
            delById(activeBoxId);
          }
        }
      }
    };

    const handleKeyUp = (event) => {
      // ppplog('Space up');
      if (event.code === 'Space') {
        frameworkEl.style.cursor = 'default';
        mainRenderEl && (mainRenderEl.style.cursor = 'default');
        mainRenderContainerEl && (mainRenderContainerEl.style.cursor = 'default');
      }

      if (isDragging) {
        setIsDragging(false);
      }
    };

    const handleMouseDown = (event) => {
      if (event.button === 0 && frameworkEl.style.cursor === 'grab') {
        setIsDragging(true);
        startPosRef.current = { x: event.clientX, y: event.clientY }
      }
    };

    const handleMouseMove = (event) => {
      if (isDragging) {
        // ppplog('handleMouseMove-isDragging');
        const deltaX = (event.clientX - startPosRef.current.x);
        const deltaY = (event.clientY - startPosRef.current.y);

        if (!mainRenderEl) {
          return;
        }

        mainRenderEl.style.left = `${pxToNumber(mainRenderEl.style.left || 0) + deltaX}px`;
        mainRenderEl.style.top = `${pxToNumber(mainRenderEl.style.top || 0) + deltaY}px`;

        debouncedUpdatePosition(pxToNumber(mainRenderEl.style.left), pxToNumber(mainRenderEl.style.top));

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
  }, [fabricCanvas, mainScale, setMainScale, mainDivLoadTime, isDragging, debouncedUpdatePosition, mode, activeBoxId, delById, showWhenEditing]);

  return null; // No need to render anything
}
