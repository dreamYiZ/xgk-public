import React from 'react';
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, TextField } from '@mui/material';
import classes from "./sidePanel.module.sass"
import useGlobalStore from '../store/useGlobal';
import { MODE } from '../store/useGlobal';

function SidePanel() {
    const { mode, setMode, screenWidth, screenHeight, setScreenWidth, setScreenHeight } = useGlobalStore();

    const handleChange = (event) => {
        setMode(event.target.value);
    };

    const handleWidthChange = (event) => {
        setScreenWidth(event.target.value);
    };

    const handleHeightChange = (event) => {
        setScreenHeight(event.target.value);
    };

    return (
        <div className={classes['side-panel-view']}>
            <FormControl component="fieldset" className={classes.oneLine} row>
                <FormLabel  component="legend">模式</FormLabel>
                <RadioGroup row aria-label="mode" name="mode" value={mode} onChange={handleChange} className={classes['radio-group']}>
                    <FormControlLabel value={MODE.EDIT} control={<Radio />} label="编辑" />
                    <FormControlLabel value={MODE.TEST} control={<Radio />} label="测试" />
                    <FormControlLabel value={MODE.DISPLAY} control={<Radio />} label="展示" />
                </RadioGroup>
                <br />

                <TextField label="屏幕宽度" value={screenWidth} onChange={handleWidthChange} />
                <br />
                <TextField label="屏幕高度" value={screenHeight} onChange={handleHeightChange} />
            </FormControl>
        </div>
    );
}

export default SidePanel;
