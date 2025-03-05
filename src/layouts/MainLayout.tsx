import React, { ReactNode } from "react";
import { Box, CssBaseline, Container } from "@mui/material";
import { Header } from "../Components/common/Header";
import { Footer } from "../Components/common/Footer";
import { useTheme } from "../hooks/useTheme";

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { theme } = useTheme();

  // Color del fondo del contenido principal según el modo
  const mainBgColor = theme.palette.mode === "dark" ? "#121212" : "#F8F9FA";
  const secondBgColor = theme.palette.mode === "dark" ? "#292525" : "#DDDDDD";

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        bgcolor: "red",
      }}
    >
      <CssBaseline />
      <Header />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 3,
          px: { xs: 1, sm: 2, md: 3 },
          bgcolor: mainBgColor,
          transition: "background-color 0.3s ease",
        }}
      >
        <Container
          maxWidth="xl"
          sx={{
            borderRadius: 2,
            overflow: "hidden",
            bgcolor: secondBgColor,
          }}
        >
          {children}
        </Container>
      </Box>
      <Footer />
    </Box>
  );
};
