import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useTheme } from "../../hooks/useTheme";

export const ThemeSwitcher: React.FC = () => {
  const { mode, toggleColorMode } = useTheme();

  return (
    <Tooltip title={mode === "dark" ? "Modo claro" : "Modo oscuro"}>
      <IconButton onClick={toggleColorMode} color="inherit">
        {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </Tooltip>
  );
};
