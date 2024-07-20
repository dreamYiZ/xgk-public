import React, { useRef } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useDrag, useDrop } from 'react-dnd';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import IconButton from '@mui/material/IconButton';

const DisplayPageItem = ({ page, index, changeCurrentPage, deletePageById, updatePageName, handleDragEnd }) => {
  const dragItem = useRef();
  const dropItem = useRef();

  const onDragStart = (e, index) => {
    dragItem.current = index;
    e.dataTransfer.effectAllowed = 'move';
  };

  const onDragOver = (e, index) => {
    e.preventDefault();
    dropItem.current = index;
  };

  const onDrop = (e) => {
    const dragIndex = dragItem.current;
    const dropIndex = dropItem.current;
    handleDragEnd({ source: { index: dragIndex }, destination: { index: dropIndex } });
  };

  const handleChangeName = (e) => {
    updatePageName(page.id, e.target.value);
  };

  return (
    <Box
      sx={{ display: 'flex', alignItems: 'center', mb: 2, p: 1, border: '1px solid #ccc', borderRadius: '4px' }}
      draggable
      onDragStart={(e) => onDragStart(e, index)}
      onDragOver={(e) => onDragOver(e, index)}
      onDrop={onDrop}
    >

      <IconButton >
        <SwapVertIcon sx={{ cursor: "pointer" }} />
      </IconButton>

      <TextField
        value={page.name}
        onChange={handleChangeName}
        variant="outlined"
        size="small"
        sx={{ flexGrow: 1, marginRight: 2 }}
      />
      <Box mr={1}>
        <Button variant="contained" color="primary" onClick={() => changeCurrentPage(page.id)}>切换</Button>
      </Box>
      <Button variant="contained" color="secondary" onClick={() => deletePageById(page.id)}>删除</Button>
    </Box>
  );
};

export default DisplayPageItem;
