import React, { ReactNode } from "react";
import { Box, CssBaseline, Container } from "@mui/material";
import { Header } from "../Components/common/Header";
import { Footer } from "../Components/common/Footer";


interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <CssBaseline />
      <Header />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 3,
        }}
      >
        <Container maxWidth="xl">{children}</Container>
      </Box>
      <Footer />
    </Box>
  );
};
