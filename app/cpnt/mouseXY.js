import React, { useState, useEffect } from 'react';
import useGlobal from "../store/useGlobal";
import { FRAMEWORK_ID_SELECTOR, FRAMEWORK_ID } from "../util/util";

export default function App() {
  const [show, setShow] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [keyDownTime, setKeyDownTime] = useState(null);
  const [keyPressTimeout, setKeyPressTimeout] = useState(null);
  const [keyUpHide, setKeyUpHide] = useState(true);

  const { showWhenEditing } = useGlobal();

  const handleKeyDown = (event) => {
    if (event.key === 'v') {
      setKeyUpHide(false);
      setKeyPressTimeout(setTimeout(() => {
        setShow(true);
      }, 600));
    }
  };

  const handleKeyUp = (event) => {
    if (event.key === 'v') {
      clearTimeout(keyPressTimeout);
      setKeyUpHide(true);
    }
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
  }, [keyDownTime]);

  return (
    <>
      {showWhenEditing() && !keyUpHide && show && (
        <div style={{
          position: 'absolute',
          left: `${coords.x - 300 + document.querySelector(FRAMEWORK_ID_SELECTOR).scrollLeft}px`,
          top: `${coords.y}px`
        }}>
          ==: {coords.x - 300 + document.querySelector(FRAMEWORK_ID_SELECTOR).scrollLeft}, {coords.y}
        </div>
      )}
    </>
  );


}
