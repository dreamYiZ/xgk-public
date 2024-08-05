import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';

const DisplayPageItem = ({ page, index, changeCurrentPage, deletePageById, updatePageName, handleDragEnd, updatePage }) => {


  const handleNextTimeChange = (e) => {
    const updatedPage = { ...page, nextTime: e.target.value };
    updatePage(page.id, updatedPage);
  };

  return (
    <Box
      sx={{ display: 'flex', alignItems: 'center', mb: 2, p: 1, border: '1px solid #ccc', borderRadius: '4px' }}
    >
      <TextField
        value={page.name}
        variant="outlined"
        size="small"
        sx={{ flexGrow: 1, marginRight: 2 }}
        InputProps={{
          readOnly: true,
        }}
      />
      <TextField
        value={page.nextTime}
        onChange={handleNextTimeChange}
        variant="outlined"
        size="small"
        type="number"
        sx={{ width: 100, marginRight: 2 }}
      />

    </Box>
  );
};

export default DisplayPageItem;
