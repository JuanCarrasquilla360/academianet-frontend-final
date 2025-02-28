import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  useMediaQuery,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";
import { ThemeSwitcher } from "./ThemeSwitcher";

export const Header: React.FC = () => {
  const { theme } = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <AppBar
      position="static"
      color="transparent"
      elevation={0}
      sx={{
        borderBottom: 1,
        borderColor: "divider",
        background: theme.palette.mode === "dark" ? "#1A1A1A" : "#FFFFFF",
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{
            textDecoration: "none",
            color: "inherit",
            flexGrow: 1,
            fontWeight: "bold",
          }}
        >
          Academia.net
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <ThemeSwitcher />

          <Button
            variant="contained"
            color="primary"
            component={RouterLink}
            to="/admin"
            sx={{ ml: 2 }}
          >
            {isMobile ? "Admin" : "Administrador"}
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
