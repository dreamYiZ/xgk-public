import Box from '@mui/material/Box';

export default function ({ slowRow, sub }) {


  return <Box sx={{
    height: `${sub.rowHeight}px`, display: 'flex',
    alignItems: 'center', fontSize: `${sub.fontSize}px`,
  }}>
    <Box sx={{ width: '100%', display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <Box sx={{ color: `${sub.color}` }}>{slowRow.text}</Box>
      <Box sx={{ color: `${sub.colorSecond}` }}>{slowRow.secondText}</Box>
    </Box>
  </Box>
}
