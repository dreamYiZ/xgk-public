import { useState, useEffect } from 'react';
import { Button, TextField, Box } from '@mui/material';

export default function ChartLabelEdit({ barLabels, setBarLabels }) {
  const [input, setInput] = useState('');
  const [localBarLabels, setLocalBarLabels] = useState(barLabels);

  useEffect(() => {
    setLocalBarLabels(barLabels);
  }, [barLabels]);

  const handleAdd = () => {
    setLocalBarLabels([...localBarLabels, input]);
    setInput('');
  };

  const handleEdit = (index, value) => {
    const newBarLabels = [...localBarLabels];
    newBarLabels[index] = value;
    setLocalBarLabels(newBarLabels);
  };

  const handleRemove = (index) => {
    setLocalBarLabels(localBarLabels.filter((_, i) => i !== index));
  };

  const _submit = () => {
    setBarLabels(localBarLabels);
  };

  return (
    <Box>
      {localBarLabels.map((label, index) => (
        <Box key={index} display="flex" alignItems="center" marginBottom={2}>
          <TextField value={label} variant="outlined" onChange={(e) => handleEdit(index, e.target.value)} />
          <Box marginLeft={1}>
            <Button onClick={() => handleRemove(index)} variant="contained" color="secondary">
              删除
            </Button>
          </Box>
        </Box>
      ))}
      <Box display="flex" alignItems="center" marginTop={2}>
        <TextField value={input} onChange={(e) => setInput(e.target.value)} variant="outlined" />
        <Box marginLeft={1}>
          <Button onClick={handleAdd} variant="contained" color="primary">
            添加
          </Button>
        </Box>
        <Box marginLeft={1}>
          <Button onClick={_submit} variant="outlined" color="secondary">
            提交
          </Button>
        </Box>

      </Box>
    </Box>
  );
}
