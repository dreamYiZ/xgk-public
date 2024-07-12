import React, { useState, useEffect, useCallback } from 'react';
import { Box, Checkbox, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { SPRINT_STATUS, SPRINT_STATUS_DISPLAY } from "../util/util";

export default function ({
  setCurrentStatus,
  setEnabledStatus,
  enabledStatus,
  currentStatus,
}) {


  const [checked, setChecked] = useState({
    [SPRINT_STATUS.INITIAL]: false,
    [SPRINT_STATUS.RUNNING]: false,
    [SPRINT_STATUS.IDLE]: false,
    [SPRINT_STATUS.STARTING]: false,
    [SPRINT_STATUS.STOP]: false,
  });

  const [selectedValue, setSelectedValue] = useState('INITIAL');

  const updateEnabledStatus = (newChecked) => {
    let checkedStatus = Object.keys(newChecked).filter(e => newChecked[e]);
    setEnabledStatus(checkedStatus);
  }

  const handleCheckboxChange = (event) => {
    const newChecked = { ...checked, [event.target.name]: event.target.checked }
    setChecked(newChecked);
    updateEnabledStatus(newChecked)
    // setEnabledStatus([ ...enabledStatus, [event.target.name]: event.target.checked ]);
    // setTimeout(() => updateEnabledStatus(), 500);
  };

  const handleRadioChange = (event) => {
    setSelectedValue(event.target.value);
    setCurrentStatus(event.target.value);
  };

  useEffect(() => {
    let _checked = { ...checked };
    enabledStatus.forEach(e => {
      _checked[e] = true;
    })
    setChecked(_checked);
  }, [enabledStatus]);

  useEffect(() => {
    setSelectedValue(currentStatus);
  }, [currentStatus])




  return (
    <Box sx={{ my: 2 }}>
      {Object.keys(SPRINT_STATUS).map((status) => (
        <FormControlLabel
          key={SPRINT_STATUS[status]}
          control={
            <Checkbox
              checked={checked[SPRINT_STATUS[status]]}
              onChange={handleCheckboxChange}
              name={SPRINT_STATUS[status]}
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
            key={SPRINT_STATUS[status]}
            value={SPRINT_STATUS[status]}
            control={<Radio />}
            label={SPRINT_STATUS_DISPLAY[status]}  // Use Chinese labels
          />
        ))}
      </RadioGroup>
    </Box>
  );
}
