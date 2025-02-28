import React, {
  createContext,
  useState,
  useMemo,
  useEffect,
  ReactNode,
} from "react";
import {
  ThemeProvider as MUIThemeProvider,
  createTheme,
  PaletteMode,
} from "@mui/material";

type ThemeContextType = {
  mode: PaletteMode;
  toggleColorMode: () => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  mode: "light",
  toggleColorMode: () => {},
});

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [mode, setMode] = useState<PaletteMode>("light");

  useEffect(() => {
    // Check if user has a saved theme preference
    const savedMode = localStorage.getItem("themeMode") as PaletteMode;
    if (savedMode) {
      setMode(savedMode);
    }
  }, []);

  const colorMode = useMemo(
    () => ({
      mode,
      toggleColorMode: () => {
        const newMode = mode === "light" ? "dark" : "light";
        setMode(newMode);
        localStorage.setItem("themeMode", newMode);
      },
    }),
    [mode]
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: "#4460F1", // Color azul que se ve en el botón de ingreso
            contrastText: "#fff",
          },
          secondary: {
            main: "#f50057",
          },
          background: {
            default: mode === "light" ? "#F8F9FA" : "#121212",
            paper: mode === "light" ? "#FFFFFF" : "#1E1E1E",
          },
        },
        typography: {
          fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
          h1: {
            fontSize: "2.5rem",
            fontWeight: 600,
          },
          h2: {
            fontSize: "2rem",
            fontWeight: 600,
          },
          h3: {
            fontSize: "1.75rem",
            fontWeight: 600,
          },
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                borderRadius: "8px",
                textTransform: "none",
                fontWeight: 600,
              },
              containedPrimary: {
                "&:hover": {
                  backgroundColor: "#3651E3",
                },
              },
            },
          },
          MuiCard: {
            styleOverrides: {
              root: {
                borderRadius: "10px",
                boxShadow:
                  mode === "light"
                    ? "0px 2px 4px rgba(0, 0, 0, 0.1)"
                    : "0px 2px 4px rgba(0, 0, 0, 0.4)",
              },
            },
          },
          // Solución para el Autocomplete en modo oscuro
          MuiAutocomplete: {
            styleOverrides: {
              paper: {
                backgroundColor: mode === "dark" ? "#2A2A2A" : undefined,
                color: mode === "dark" ? "#FFFFFF" : undefined,
              },
              option: {
                "&:hover": {
                  backgroundColor: mode === "dark" ? "#3A3A3A" : undefined,
                },
                "&.Mui-focused": {
                  backgroundColor: mode === "dark" ? "#3A3A3A" : undefined,
                },
              },
              listbox: {
                backgroundColor: mode === "dark" ? "#2A2A2A" : undefined,
              },
              input: {
                color: mode === "dark" ? "#FFFFFF" : undefined,
              },
              inputRoot: {
                backgroundColor: mode === "dark" ? "#2A2A2A" : undefined,
                color: mode === "dark" ? "#FFFFFF" : undefined,
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor:
                    mode === "dark" ? "rgba(255, 255, 255, 0.23)" : undefined,
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor:
                    mode === "dark" ? "rgba(255, 255, 255, 0.4)" : undefined,
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#4460F1",
                },
              },
              endAdornment: {
                color: mode === "dark" ? "#FFFFFF" : undefined,
              },
            },
          },
          // También es importante personalizar los inputs comunes
          MuiOutlinedInput: {
            styleOverrides: {
              root: {
                backgroundColor: mode === "dark" ? "#2A2A2A" : undefined,
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor:
                    mode === "dark" ? "rgba(255, 255, 255, 0.23)" : undefined,
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor:
                    mode === "dark" ? "rgba(255, 255, 255, 0.4)" : undefined,
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#4460F1",
                },
              },
              input: {
                color: mode === "dark" ? "#FFFFFF" : undefined,
              },
            },
          },
          MuiInputLabel: {
            styleOverrides: {
              root: {
                color: mode === "dark" ? "rgba(255, 255, 255, 0.7)" : undefined,
                "&.Mui-focused": {
                  color: "#4460F1",
                },
              },
            },
          },
          MuiSelect: {
            styleOverrides: {
              icon: {
                color: mode === "dark" ? "rgba(255, 255, 255, 0.7)" : undefined,
              },
            },
          },
        },
      }),
    [mode]
  );

  return (
    <ThemeContext.Provider value={colorMode}>
      <MUIThemeProvider theme={theme}>{children}</MUIThemeProvider>
    </ThemeContext.Provider>
  );
};
