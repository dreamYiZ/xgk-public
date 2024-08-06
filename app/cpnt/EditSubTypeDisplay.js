import React from 'react';
import { Box } from '@mui/material';
import { SUB_TYPE_DISPLAY } from '../util/util';
import { useActiveSub } from '../store/useActiveSub';

export default function EditSubTypeDisplay() {
  const { activeSub } = useActiveSub();

  return (
    <Box my={0.5}>
     类型： {activeSub ? SUB_TYPE_DISPLAY[activeSub.type] : 'No active sub type'}
    </Box>
  );
}
