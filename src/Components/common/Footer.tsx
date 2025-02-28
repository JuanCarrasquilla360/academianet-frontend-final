import React from "react";
import { Box, Typography, Container } from "@mui/material";
import { useTheme } from "../../hooks/useTheme";

export const Footer: React.FC = () => {
  const { theme } = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        mt: "auto",
        backgroundColor:
          theme.palette.mode === "light"
            ? theme.palette.grey[200]
            : theme.palette.grey[900],
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body2" color="text.secondary" align="center">
          © {currentYear} Academia.net. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};
