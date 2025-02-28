import React from "react";
import { Box } from "@mui/material";
import { MainLayout } from "../layouts/MainLayout";
import { InstitutionSelector } from "../Components/home/InstitutionSelector";
import { FeaturedInstitutions } from "../Components/home/FeaturedInstitutions";


export const HomePage: React.FC = () => {
  return (
    <MainLayout>
      <Box sx={{ my: 2 }}>
        <InstitutionSelector />
        <FeaturedInstitutions />
      </Box>
    </MainLayout>
  );
};
