import React, { useRef, useEffect, useState } from "react";
import {
  createMarketList, createMarketTemplates, ppplog, MAP_TYPE_FACTORY,
  getRelativePosX,
  getRelativePosY,
  FRAMEWORK_ID_SELECTOR,
  debounce,
} from "../util/util";
import useMarket from "../store/useMarket";
import useBoxStore from "../store/useBo";
import { List, ListItem, ListItemText, TextField, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditTabContainer from "./editTabContainer";
import { Snackbar } from '@mui/material';
import Alert from '@mui/material/Alert';
import DifferenceIcon from '@mui/icons-material/Difference';
import DragCreate from "./dragCreate";
import OpenWithIcon from '@mui/icons-material/OpenWith';
import Box from '@mui/material/Box';


export default function ({ marketItem, setOpen }) {

  const [doingCreate, setDoingCreate] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const coordsRef = useRef({ x: 0, y: 0 });



  const debounceMove = debounce(({
    newX, newY
  }) => {
    setCoords({ x: newX, y: newY })

    // changeBoxById(boxid, { x: newX, y: newY })
  }, 5)



  const addNewBoxDrag = ({ type, x, y }) => {
    if (typeof MAP_TYPE_FACTORY[type] === 'function') {
      const newBox = MAP_TYPE_FACTORY[type]();
      newBox.x = x;
      newBox.y = y;
      useBoxStore.getState().add(newBox);
    } else {
      setOpen(true);
      console.error(`No factory function found for type "${type}"`);
    }
  };

  const onMouseDownHandlerDragCreate = () => {
    setDoingCreate(true);
    // ppplog('onMouseDownHandlerDragCreate')
  }

  const handleKeyUp = (event) => {
    if (event.key === 'v') {
      clearTimeout(keyPressTimeout);
      setKeyUpHide(true);
    }
  };


  const handleMouseUp = (event) => {
    const _coords = coordsRef.current

    // ppplog('handleMouseUp', _coords, {
    //   x: getRelativePosX(_coords.x),
    //   y: getRelativePosY(_coords.y),
    // }, event)

    const frameworkEl = document.querySelector(FRAMEWORK_ID_SELECTOR);
    const frameworkElPos = frameworkEl.getBoundingClientRect();

    // ppplog('frameworkElPos', frameworkElPos)


    if (frameworkElPos.left < event.x && frameworkElPos.right > event.x
      && frameworkElPos.top < event.y && frameworkElPos.bottom > event.y) {
      addNewBoxDrag(
        {
          type: marketItem.type,
          x: getRelativePosX(_coords.x),
          y: getRelativePosY(_coords.y),
        }
      )
    }


    setDoingCreate(false);
  }

  const handleMouseMove = (event) => {
    coordsRef.current = { x: event.clientX, y: event.clientY };

    debounceMove({
      newX: event.clientX,
      newY: event.clientY,
    })
    // setCoords({ x: event.clientX, y: event.clientY })
  };


  useEffect(() => {
    if (doingCreate) {

      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);


    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);

    }

  }, [doingCreate])

  return <div>
    <IconButton onMouseDown={onMouseDownHandlerDragCreate}>
      <DifferenceIcon />
    </IconButton>
    {doingCreate && <Box style={{
      position: "fixed",
      left: `${coords.x}px`,
      top: `${coords.y}px`,
    }}>
      <OpenWithIcon />
    </Box>}
  </div>
}
