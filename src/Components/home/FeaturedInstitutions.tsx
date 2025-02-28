import React from "react";
import { Typography, Grid, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { InstitutionCard } from "../ui/InstitutionCard";

// Definiendo la interfaz para una institución
interface Institution {
  id: string;
  name: string;
  logoUrl: string;
}

// Mock de datos para las instituciones destacadas
const featuredInstitutions: Institution[] = [
  {
    id: "itm",
    name: "Institución Universitaria ITM",
    logoUrl: "/src/assets/logos/itm.png",
  },
  {
    id: "uandes",
    name: "Universidad de los Andes",
    logoUrl: "/src/assets/logos/uandes.png",
  },
  {
    id: "unal",
    name: "Universidad Nacional de Colombia",
    logoUrl: "/src/assets/logos/unal.png",
  },
  {
    id: "iudigital",
    name: "IU Digital de Antioquia",
    logoUrl: "/src/assets/logos/iudigital.png",
  },
  {
    id: "javeriana",
    name: "Pontificia Universidad Javeriana",
    logoUrl: "/src/assets/logos/javeriana.png",
  },
  {
    id: "urosario",
    name: "Universidad del Rosario",
    logoUrl: "/src/assets/logos/urosario.png",
  },
  {
    id: "eafit",
    name: "Universidad EAFIT",
    logoUrl: "/src/assets/logos/eafit.png",
  },
  {
    id: "uvalle",
    name: "Universidad del Valle",
    logoUrl: "/src/assets/logos/uvalle.png",
  },
  {
    id: "udea",
    name: "Universidad de Antioquia",
    logoUrl: "/src/assets/logos/udea.png",
  },
  {
    id: "uninorte",
    name: "Universidad del Norte",
    logoUrl: "/src/assets/logos/uninorte.png",
  },
];

export const FeaturedInstitutions: React.FC = () => {
  const navigate = useNavigate();

  const handleInstitutionClick = (institutionId: string) => {
    navigate(`/institucion/${institutionId}`);
  };

  return (
    <Box sx={{ mt: 6, mb: 4 }}>
      <Typography
        variant="h4"
        component="h2"
        align="center"
        gutterBottom
        sx={{
          fontWeight: "bold",
          mb: 1,
        }}
      >
        Instituciones Destacadas
      </Typography>

      <Typography
        variant="body1"
        align="center"
        color="text.secondary"
        sx={{ mb: 4 }}
      >
        Estas instituciones te ayudarán a alcanzar tus metas académicas
      </Typography>

      <Grid container spacing={3}>
        {featuredInstitutions.map((institution) => (
          <Grid item xs={12} sm={6} md={3} lg={2.4} key={institution.id}>
            <InstitutionCard
              name={institution.name}
              logoUrl={institution.logoUrl}
              onClick={() => handleInstitutionClick(institution.id)}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
