import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { useTheme as useMuiTheme } from '@mui/material/styles';

export const useTheme = () => {
  const context = useContext(ThemeContext);
  const theme = useMuiTheme();
  
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return {
    theme,
    ...context
  };
};