import React, { useState, useEffect } from 'react';
import useGlobal from "../store/useGlobal";
import { FRAMEWORK_ID_SELECTOR, FRAMEWORK_ID, ppplog } from "../util/util";

export default function () {
  const [show, setShow] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [keyPressTimeout, setKeyPressTimeout] = useState(null);
  const [keyUpHide, setKeyUpHide] = useState(true);

  const { showWhenEditing, mainDivLeft, mainDivTop,
    mouseXYColor
  } = useGlobal();

  const handleKeyDown = (event) => {
    if (event.key === 'v') {
      setKeyUpHide(false);
      setKeyPressTimeout(setTimeout(() => {
        setShow(true);
      }, 600));
    }
  };

  const handleKeyUp = (event) => {
    clearTimeout(keyPressTimeout);
    setKeyUpHide(true);
  };



  const handleMouseMove = (event) => {
    setCoords({ x: event.clientX, y: event.clientY });
  };


  useEffect(() => {
    if (showWhenEditing()) {

      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('keydown', handleKeyDown);
      window.addEventListener('keyup', handleKeyUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return (
    <>
      {showWhenEditing() && !keyUpHide && show && (
        <div style={{
          position: 'absolute',
          left: `${coords.x - 300 + document.querySelector(FRAMEWORK_ID_SELECTOR).scrollLeft - mainDivLeft}px`,
          top: `${coords.y + document.querySelector(FRAMEWORK_ID_SELECTOR).scrollTop - mainDivTop }px`,
          color: `${mouseXYColor}`
        }}>
          ==: {coords.x - 300 + document.querySelector(FRAMEWORK_ID_SELECTOR).scrollLeft}, {coords.y + document.querySelector(FRAMEWORK_ID_SELECTOR).scrollTop}
        </div>
      )}
    </>
  );


}
