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
import { SUB_TYPE } from "../util/util";
import useGlobalStore from "../store/useGlobal";

export default function ({ marketItem, setOpen }) {
  const [doingCreate, setDoingCreate] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const { mainDivLeft, mainDivTop, mainScale } = useGlobalStore();

  const coordsRef = useRef({ x: 0, y: 0 });

  const debounceMove = debounce(({
    newX, newY
  }) => {
    setCoords({ x: newX, y: newY });
  }, 5);

  const addNewBoxDrag = ({ type, x, y }) => {
    if (typeof MAP_TYPE_FACTORY[type] === 'function') {
      const newBox = MAP_TYPE_FACTORY[type]();
      newBox.x = x;
      newBox.y = y;
      if (newBox.sub.type === SUB_TYPE.FABRIC_CANVAS) {
        if (
          useBoxStore.getState().boxArr.find(i => i.sub.type === SUB_TYPE.FABRIC_CANVAS)
        ) {
          alert("已存在Fabric画布");
        } else {
          useBoxStore.getState().add(newBox);
        }
      } else {
        useBoxStore.getState().add(newBox);
      }
    } else {
      setOpen(true);
      console.error(`No factory function found for type "${type}"`);
    }
  };

  const onMouseDownHandlerDragCreate = () => {
    setDoingCreate(true);
  };

  const handleMouseUp = (event) => {
    const _coords = coordsRef.current;

    const frameworkEl = document.querySelector(FRAMEWORK_ID_SELECTOR);
    const frameworkElPos = frameworkEl.getBoundingClientRect();

    if (frameworkElPos.left < event.x && frameworkElPos.right > event.x
      && frameworkElPos.top < event.y && frameworkElPos.bottom > event.y) {
      addNewBoxDrag({
        type: marketItem.type,
        x: (getRelativePosX(_coords.x) - mainDivLeft),
        y: (getRelativePosY(_coords.y) - mainDivTop),
      });
    }

    setDoingCreate(false);
  };

  const handleMouseMove = (event) => {
    coordsRef.current = { x: event.clientX, y: event.clientY };

    debounceMove({
      newX: event.clientX,
      newY: event.clientY,
    });
  };

  useEffect(() => {
    if (doingCreate) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [doingCreate]);

  return (
    <div>
      <IconButton onMouseDown={onMouseDownHandlerDragCreate}>
        <DifferenceIcon />
      </IconButton>
      {doingCreate && (
        <Box style={{
          position: "fixed",
          left: `${coords.x + 10}px`, // Adjusted position
          top: `${coords.y + 10}px`,  // Adjusted position
        }}>
          <OpenWithIcon />
        </Box>
      )}
    </div>
  );
}
