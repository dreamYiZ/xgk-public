import { useRef, useEffect } from 'react';
import classes from "./box.module.sass";
import useBoxStore from '../store/useBo';

function Box({ boxid, width, height, position, opacity, children, groupid, x, y }) {
    const boxRef = useRef(null);
    const changeBoxById = useBoxStore((state) => state.changeById);

    useEffect(() => {
        const boxElement = boxRef.current;
        let offsetX = 0;
        let offsetY = 0;

        const onMouseDown = (e) => {
            console.log('mouseDown');
            offsetX = e.clientX - boxElement.getBoundingClientRect().left;
            offsetY = e.clientY - boxElement.getBoundingClientRect().top;
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        };

        const onMouseMove = (e) => {
            console.log('mouseMove');
            const newX = `${e.clientX - offsetX}px`;
            const newY = `${e.clientY - offsetY}px`;
            boxElement.style.left = newX;
            boxElement.style.top = newY;
            changeBoxById(boxid, { x: newX, y: newY });
        };

        const onMouseUp = () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };

        boxElement.addEventListener('mousedown', onMouseDown);

        return () => {
            boxElement.removeEventListener('mousedown', onMouseDown);
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };
    }, [boxid, changeBoxById]);

    const boxStyle = {
        width: width,
        height: height,
        position: position,
        opacity: opacity,
        left: x,
        top: y,
    };

    return <div ref={boxRef} style={boxStyle} className={classes.box}>{children}</div>;
}

export default Box;
