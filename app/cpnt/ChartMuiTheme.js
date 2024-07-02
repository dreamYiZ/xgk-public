import * as React from 'react';
import { createTheme, useTheme, ThemeProvider } from '@mui/material/styles';
import useGlobalStore from '../store/useGlobal';


export default function MuiColorTemplate({ children }) {

  // 'light' ? 'dark'
  // const [colorMode, setColorMode] = React.useState(theme.palette.mode);
  const [colorMode, setColorMode] = React.useState('dark');
  const { themePaletteMode } = useGlobalStore();
  React.useEffect(() => {
    setColorMode(themePaletteMode||'dark')
  }, [themePaletteMode])

  const newTheme = createTheme({ palette: { mode: colorMode } });
  return (
    <ThemeProvider theme={newTheme}>
      {children}
    </ThemeProvider>
  );
}
