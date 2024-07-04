import { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { Box } from '@mui/material';

export default function EditPieShape({ shape, submitShape }) {
  const [formState, setFormState] = useState(shape);

  const handleChange = (event) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Submit your changes here
    console.log(formState);
    submitShape(formState);
  };


  return (
    <form onSubmit={handleSubmit}>
      <Box display="flex" flexWrap="wrap">
        <Box mb={2} mr={1}>
          <TextField name="innerRadius" value={formState.innerRadius} onChange={handleChange} label="内半径" />
        </Box>
        <Box mb={2} mr={1}>
          <TextField name="outerRadius" value={formState.outerRadius} onChange={handleChange} label="外半径" />
        </Box>
        <Box mb={2} mr={1}>
          <TextField name="paddingAngle" value={formState.paddingAngle} onChange={handleChange} label="填充角度" />
        </Box>
        <Box mb={2} mr={1}>
          <TextField name="cornerRadius" value={formState.cornerRadius} onChange={handleChange} label="角半径" />
        </Box>
        <Box mb={2} mr={1}>
          <TextField name="startAngle" value={formState.startAngle} onChange={handleChange} label="起始角度" />
        </Box>
        <Box mb={2} mr={1}>
          <TextField name="endAngle" value={formState.endAngle} onChange={handleChange} label="结束角度" />
        </Box>
        <Box mb={2} mr={1}>
          <TextField name="cx" value={formState.cx} onChange={handleChange} label="cx" />
        </Box>
        <Box mb={2} mr={1}>
          <TextField name="cy" value={formState.cy} onChange={handleChange} label="cy" />
        </Box>

        <Box mb={2} ml={2} display="flex" justifyContent="center">
          <Button color="secondary" variant="outlined" type="submit">提交</Button>
        </Box>
      </Box>
    </form>
  );
}
