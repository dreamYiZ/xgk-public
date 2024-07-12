import React, { useState } from 'react';
import { Box, Checkbox, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { SPRINT_STATUS, SPRINT_STATUS_DISPLAY } from "../util/util";

export default function ({
  setCurrentStatus,
  setEnabledStatus,
  enabledStatus,
  currentStatus,
}) {
  const [checked, setChecked] = useState({
    INITIAL: false,
    RUNNING: false,
    IDLE: false,
    STARTING: false,
    STOP: false,
  });

  const [selectedValue, setSelectedValue] = useState('INITIAL');

  const handleCheckboxChange = (event) => {
    setChecked({ ...checked, [event.target.name]: event.target.checked });
  };

  const handleRadioChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <Box sx={{ my: 2 }}>
      {Object.keys(SPRINT_STATUS).map((status) => (
        <FormControlLabel
          key={status}
          control={
            <Checkbox
              checked={checked[status]}
              onChange={handleCheckboxChange}
              name={status}
            />
          }
          label={SPRINT_STATUS_DISPLAY[status]}  // Use Chinese labels
        />
      ))}
      <RadioGroup
        aria-label="sprint status"
        value={selectedValue}
        onChange={handleRadioChange}
      >
        {Object.keys(SPRINT_STATUS).map((status) => (
          <FormControlLabel
            key={status}
            value={status}
            control={<Radio />}
            label={SPRINT_STATUS_DISPLAY[status]}  // Use Chinese labels
          />
        ))}
      </RadioGroup>
    </Box>
  );
}


在radio变化的时候，调用setCurrentStatus
在check变化的时候，调用setEnabledStatus
在挂载的时候，将获取到的enabledStatus,
currentStatus,展示在check和radio中
