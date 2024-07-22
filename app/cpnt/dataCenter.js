import * as React from 'react';
import { useEffect } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import useGlobalStore from '../store/useGlobal';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';
import useBoxStore from '../store/useBo';
import DataCenterManager from "./DataCenterManager";


export default function DataCenter({ show, setShow }) {
  const { boxArr } = useBoxStore();


  useEffect(() => {
  }, [boxArr])

  return (
    <div>
      <Drawer
        anchor="right"
        open={show}
        onClose={() => setShow(false)}
      >
        <Box sx={{ width: 1250, padding: 2, height: "100%" }}>
          <Typography variant="h4" component="div" gutterBottom>
            数据管理中心
          </Typography>

          <Divider />
          {show && <DataCenterManager />}
        </Box>

      </Drawer>
    </div>
  );
}
