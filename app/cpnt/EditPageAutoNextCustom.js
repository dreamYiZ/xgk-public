import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import EditAutoCustomItem from './EditAutoCustomItem';
import usePageStore from '../store/usePage'; // Make sure to import the correct hook
import useAutoStore, { AUTO_NEXT_PAGE, AUTO_NEXT_PAGE_CUSTOM } from "../store/useAutoStore";
import { Snackbar, Alert } from '@mui/material';
import { CMD } from "../util/util";

export default function EditPageAutoNextCustom() {
  const {
    pageList,
    currentPage,
    currentPageId,
    deletePageById,
    updatePageOrder,
    updatePageName,
    addPage,
    updatePage,
  } = usePageStore();

  const { autoList, setAutoList, disableAutoNextPage, enableAutoNextPageCustom,
    disableAutoNextPageCustom,
  } = useAutoStore();

  const [isEnabled, setIsEnabled] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleCheckboxChange = (e) => {
    const allPagesHaveNextTime = pageList.every(page => page.nextTime !== undefined && page.nextTime !== null && page.nextTime);

    if (e.target.checked && !allPagesHaveNextTime) {
      setShowAlert(true);
      setIsEnabled(false);
    } else {
      setIsEnabled(e.target.checked);
    }

    if (!e.target.checked) {
      disableAutoNextPageCustom();
    }
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  useEffect(() => {
    if (isEnabled) {
      disableAutoNextPage();
      enableAutoNextPageCustom();
    }
  }, [isEnabled]);

  useEffect(() => {
    const isAutoNextPageCustomEnabled = autoList.some(item => item.be.cmd === CMD.NEXT_PAGE_CUSTOM && !item.disabled);
    setIsEnabled(isAutoNextPageCustomEnabled);
  }, [autoList]);

  return (
    <Box mt={1}>
      <Box>
        <FormControlLabel
          control={<Checkbox checked={isEnabled} onChange={handleCheckboxChange} />}
          label="分时换页"
        />
      </Box>
      <Box>
        {pageList.map((page, index) => (
          <EditAutoCustomItem
            key={page.id}
            page={page}
            index={index}
            deletePageById={deletePageById}
            updatePageName={updatePageName}
            updatePage={updatePage}
          />
        ))}
      </Box>
      <Snackbar open={showAlert} autoHideDuration={6000} onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} severity="warning">
          必须所有的页面设置分时参数，才可以启用分时换页。
        </Alert>
      </Snackbar>
    </Box>
  );
}
