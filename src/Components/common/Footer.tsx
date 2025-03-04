import React from "react";
import { Box, Typography, Container, alpha } from "@mui/material";
import { useTheme } from "../../hooks/useTheme";

export const Footer: React.FC = () => {
  const { theme } = useTheme();
  const currentYear = new Date().getFullYear();

  // Colores del footer que combinan con el header
  const footerBgColor =
    theme.palette.mode === "dark"
      ? "#151C35" // Mismo color que el header en modo oscuro
      : "#2C3E7E"; // Mismo color que el header en modo claro

  const footerTextColor = alpha("#FFFFFF", 0.85); // Texto blanco ligeramente transparente

  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        mt: "auto",
        backgroundColor: footerBgColor,
        borderTop: 1,
        borderColor: alpha(theme.palette.common.white, 0.1),
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="body2"
          color={footerTextColor}
          align="center"
          sx={{
            fontWeight: 400,
            letterSpacing: "0.3px",
          }}
        >
          © {currentYear} Academia.net. Todos los derechos reservados.
        </Typography>
      </Container>
    </Box>
  );
};
