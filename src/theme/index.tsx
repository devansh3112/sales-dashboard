import React, { createContext, useState, useMemo, useContext } from 'react';
import { ThemeProvider as MUIThemeProvider, Theme, PaletteMode, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import dashboardTheme from './dashboardTheme';

// Create a dark mode version of the dashboard theme
const createDarkTheme = () => {
  return createTheme({
    ...dashboardTheme,
    palette: {
      ...dashboardTheme.palette,
      mode: 'dark',
      background: {
        default: '#111827',
        paper: '#1F2937',
      },
      text: {
        primary: '#F9FAFB',
        secondary: '#D1D5DB',
      },
      divider: 'rgba(255, 255, 255, 0.12)',
    },
  });
};

// Create context for theme mode
type ColorModeContextType = {
  toggleColorMode: () => void;
  mode: PaletteMode;
};

export const ColorModeContext = createContext<ColorModeContextType>({
  toggleColorMode: () => {},
  mode: 'light',
});

// Custom hook to use the color mode context
export const useColorMode = () => useContext(ColorModeContext);

// Theme provider component
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<PaletteMode>('light');

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
      mode,
    }),
    [mode]
  );

  const theme = useMemo(() => {
    return mode === 'light' ? dashboardTheme : createDarkTheme();
  }, [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default ThemeProvider; 