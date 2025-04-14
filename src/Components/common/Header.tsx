import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  useMediaQuery,
  alpha,
  Stack,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";
import { ThemeSwitcher } from "./ThemeSwitcher";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";

export const Header: React.FC = () => {
  const { theme } = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Definir colores para el header según el modo
  const headerBgColor =
    theme.palette.mode === "dark"
      ? "#151C35" // Un azul más oscuro para modo oscuro
      : "#2C3E7E"; // Un azul más claro para modo claro

  const headerTextColor = "#FFFFFF"; // Blanco para ambos modos

  return (
    <AppBar
      position="static"
      elevation={2}
      sx={{
        background: headerBgColor,
        borderBottom: 1,
        borderColor: alpha(theme.palette.common.white, 0.1),
      }}
    >
      <Toolbar
        sx={{
          minHeight: { xs: "64px", sm: "70px" },
          px: { xs: 2, sm: 3 },
        }}
      >
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{
            textDecoration: "none",
            color: headerTextColor,
            fontWeight: "bold",
            fontSize: { xs: "1.1rem", sm: "1.25rem" },
            letterSpacing: "0.5px",
            mr: 4,
          }}
        >
          Academia.net
        </Typography>

        {/* Navegación */}
        <Stack
          direction="row"
          spacing={1}
          sx={{
            flexGrow: 1,
            display: { xs: "none", md: "flex" },
          }}
        >
          <Button
            component={RouterLink}
            to="/"
            startIcon={<HomeIcon />}
            sx={{
              color: "white",
              "&:hover": {
                backgroundColor: alpha(theme.palette.common.white, 0.1),
              },
            }}
          >
            Inicio
          </Button>
          <Button
            component={RouterLink}
            to="/busqueda"
            startIcon={<SearchIcon />}
            sx={{
              color: "white",
              "&:hover": {
                backgroundColor: alpha(theme.palette.common.white, 0.1),
              },
            }}
          >
            Buscar Carreras
          </Button>
        </Stack>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          {/* Mostrar ícono de búsqueda en móvil */}
          {isMobile && (
            <Button
              component={RouterLink}
              to="/busqueda"
              sx={{
                minWidth: "auto",
                p: 1,
                color: "white",
                mr: 1,
              }}
            >
              <SearchIcon />
            </Button>
          )}

          <ThemeSwitcher />

          {/* <Button
            variant="contained"
            color="primary"
            component={RouterLink}
            to="/admin"
            sx={{
              ml: 2,
              bgcolor: alpha(theme.palette.primary.main, 0.85),
              "&:hover": {
                bgcolor: theme.palette.primary.main,
              },
              px: { xs: 2, sm: 3 },
              py: { xs: 0.8, sm: 1 },
            }}
          >
            {isMobile ? "Admin" : "Administrador"}
          </Button> */}
        </Box>
      </Toolbar>
    </AppBar>
  );
};
