import Box from '@mui/material/Box';

export default function ({ slowRow, sub }) {


  return <Box sx={{
    height: `${sub.rowHeight}px`, display: 'flex',
    alignItems: 'center' ,fontSize: `${sub.fontSize}px`,
  }}>
    <Box sx={{color: `${sub.color}`}}>{slowRow.text}</Box>
  </Box>
}
