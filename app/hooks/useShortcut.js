import { useRef, useEffect, useState, useCallback } from 'react';
import useGlobalStore from '../store/useGlobal';
import useBoxStore from '../store/useBo';
import {
  MAIN_ID_TO_RENDER_BOX_CONTAINER, MAIN_ID_TO_RENDER_BOX_SELECTOR,
  ppplog, pxToNumber, MAIN_ID_TO_RENDER_BOX, MIN_MAIN_SCALE, MAX_MAIN_SCALE, FRAMEWORK_ID_SELECTOR
} from '../util/util';
import { debounce } from 'lodash';
import { useFabricContext } from "../context/FabricContext";

export default function useShortcut() {
  const {
    mainDivLeft, mainDivTop,
    mainScale, setMainScale, setMainDivLeft, mainDivLoadTime, setMainDivTop, showWhenEditing, mode,
    setIsMainDragging: setIsDraggingGlobal, isMainDragging, setIsSpacePress,
  } = useGlobalStore();

  const { activeBoxId, delById } = useBoxStore();
  const [isDragging, setIsDragging] = useState(false);
  const startPosRef = useRef({ x: 0, y: 0 });
  const isDraggingRef = useRef(false);
  const mainScaleRef = useRef(null);

  const { fabricCanvas } = useFabricContext();

  const lastScaleTimeRef = useRef(Date.now());

  useEffect(() => {
    mainScaleRef.current = mainScale
  }, [mainScale])

  useEffect(() => {
    setIsDraggingGlobal(isDragging);
  }, [isDragging, setIsDraggingGlobal]);

  const debouncedUpdatePosition = useCallback(
    debounce((x, y) => {
      setMainDivLeft(x);
      setMainDivTop(y);
      // }, 1000 / 60 / 2),
    }, 300),
    [setMainDivLeft, setMainDivTop]
  );

  const debouncedMouseMove = useCallback(
    debounce((gotMainEl, deltaX, deltaY) => {
      gotMainEl.style.left = `${pxToNumber(gotMainEl.style.left || 0) + deltaX}px`;
      gotMainEl.style.top = `${pxToNumber(gotMainEl.style.top || 0) + deltaY}px`;

      debouncedUpdatePosition(pxToNumber(gotMainEl.style.left), pxToNumber(gotMainEl.style.top));
    }, 50), // Adjust the debounce time as needed
    [debouncedUpdatePosition]
  );


  useEffect(() => {
    if (!showWhenEditing()) return;

    const frameworkEl = document.querySelector(FRAMEWORK_ID_SELECTOR);
    const mainRenderEl = document.querySelector(MAIN_ID_TO_RENDER_BOX_SELECTOR);
    const mainRenderElFn = () => document.querySelector(`#${MAIN_ID_TO_RENDER_BOX}`);
    const mainRenderContainerEl = document.querySelector(`#${MAIN_ID_TO_RENDER_BOX_CONTAINER}`);
    if (!frameworkEl) {
      console.error(`Element with selector ${FRAMEWORK_ID_SELECTOR} not found.`);
      return;
    }

    const handleWheel = (event) => {
      if (event.metaKey || event.ctrlKey) {
        event.preventDefault();

        const currentTime = Date.now();
        const timeElapsed = currentTime - lastScaleTimeRef.current;
        if (timeElapsed > 1000) { // 1 second threshold
          let newScale = mainScaleRef.current - Math.sign(event.deltaY) * 0.1; // Adjust scale step as needed
          newScale = Math.max(MIN_MAIN_SCALE, Math.min(MAX_MAIN_SCALE, newScale));
          setMainScale(newScale);
          lastScaleTimeRef.current = currentTime;
        }
      }
    };

    const handleKeyDown = (event) => {
      const activeElement = document.activeElement;
      const isInputField = activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA';

      if (event.code === 'Space' && !isInputField) {
        frameworkEl.style.cursor = 'grab';
        mainRenderEl && (mainRenderEl.style.cursor = 'grab');
        mainRenderContainerEl && (mainRenderContainerEl.style.cursor = 'grab');
        event.preventDefault();
        setIsSpacePress(true);
      }

      if (event.code === 'Delete') {
        if (activeBoxId && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
          if (fabricCanvas && fabricCanvas.getActiveObject()) {
            const confirmDelete = window.confirm('确认删除Fabric中的一个元素吗？');
            if (confirmDelete) {
              fabricCanvas.getActiveObject().remove();
            }
            return;
          }

          const confirmDelete = window.confirm('确认删除吗？');
          if (confirmDelete) {
            delById(activeBoxId);
          }
        }
      }
    };

    const handleKeyUp = (event) => {
      if (event.code === 'Space') {
        frameworkEl.style.cursor = 'default';
        mainRenderEl && (mainRenderEl.style.cursor = 'default');
        mainRenderContainerEl && (mainRenderContainerEl.style.cursor = 'default');
      }
      if (isDraggingRef.current) setIsDragging(false);
      if (isDraggingRef.current) isDraggingRef.current = false;
    };

    const handleMouseDown = (event) => {
      if (event.button === 0 && frameworkEl.style.cursor === 'grab') {
        setIsDragging(true);
        isDraggingRef.current = true;
        startPosRef.current = { x: event.clientX, y: event.clientY };

      }
    };

    const handleMouseMove = (event) => {
      // ppplog('isDragging', isDraggingRef.current, mainRenderEl, mainRenderElFn())
      if (isDraggingRef.current) {

        let gotMainEl = mainRenderElFn();


        ppplog('gotMainEl', gotMainEl)

        if (!gotMainEl) return;


        const deltaX = event.clientX - startPosRef.current.x;
        const deltaY = event.clientY - startPosRef.current.y;



        // debouncedMouseMove(gotMainEl, deltaX, deltaY);

        const newLeft = `${pxToNumber(mainDivLeft || 0) + deltaX}`;
        const newTop = `${pxToNumber(mainDivTop || 0) + deltaY}`;


        const matrix = getComputedStyle(gotMainEl).transform
        const matrixArray = matrix.replace("matrix(", "").split(",");
        const scaleX = parseFloat(matrixArray[0]);
        const scaleY = parseFloat(matrixArray[3]);

        const translateX = parseFloat(matrixArray[4]);
        const translateY = parseFloat(matrixArray[5]); // parseFloat

        const newTranslateX = translateX + deltaX;
        const newTranslateY = translateY + deltaY;
        ppplog('getComputedStyle', getComputedStyle(gotMainEl).transform)
        ppplog('getComputedStyle 123', newTranslateX, newTranslateY, scaleX)

        gotMainEl.style.transform = `scale(${scaleX}) translate(${newTranslateX / scaleX}px, ${newTranslateY / scaleY}px)`

        // gotMainEl.style.left = `${newLeft}px`;
        // gotMainEl.style.top = `${newTop}px`;

        // debouncedUpdatePosition(newLeft, newTop);

        debouncedUpdatePosition(newTranslateX / scaleX, newTranslateY / scaleY);
        // setMainDivLeft(newLeft);
        // setMainDivTop(newTop);

        startPosRef.current = { x: event.clientX, y: event.clientY };
      }
    };

    const handleMouseUp = () => {
      if (isDraggingRef.current) setIsDragging(false);
      isDraggingRef.current = false;
    };

    frameworkEl.addEventListener('wheel', handleWheel);
    frameworkEl.addEventListener('mousedown', handleMouseDown);
    frameworkEl.addEventListener('mouseup', handleMouseUp);
    frameworkEl.addEventListener('mousemove', handleMouseMove);

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      ppplog('frameworkEl remove!')
      frameworkEl.removeEventListener('wheel', handleWheel);
      frameworkEl.removeEventListener('mousedown', handleMouseDown);
      frameworkEl.removeEventListener('mousemove', handleMouseMove);
      frameworkEl.removeEventListener('mouseup', handleMouseUp);

      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [
    fabricCanvas, setMainScale, mainDivLeft, mainDivTop, mode, activeBoxId, mainDivLoadTime
  ]);

  return null; // No need to render anything
}
