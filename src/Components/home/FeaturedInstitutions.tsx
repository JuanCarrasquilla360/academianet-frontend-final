import React, { useState, useEffect } from "react";
import { Typography, Grid, Box, Skeleton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { InstitutionCard } from "../ui/InstitutionCard";
import { institutionService, InstitutionUI } from "../../services/institutionService";

export const FeaturedInstitutions: React.FC = () => {
  const navigate = useNavigate();
  const [institutions, setInstitutions] = useState<InstitutionUI[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInstitutions = async () => {
      try {
        setLoading(true);
        const response = await institutionService.getInstitutions({ limit: 10 });
        
        // Transform API response to UI model and set state
        const institutionsUI = response.institutions.map(inst => 
          institutionService.transformToUIModel(inst)
        );
        
        setInstitutions(institutionsUI);
        setError(null);
      } catch (err) {
        console.error("Error fetching institutions:", err);
        setError("No se pudieron cargar las instituciones. Por favor, intenta más tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchInstitutions();
  }, []);

  const handleInstitutionClick = (institutionId: string) => {
    // Navigate to the institution page
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

      {error && (
        <Typography color="error" align="center" sx={{ my: 2 }}>
          {error}
        </Typography>
      )}

      <Grid container spacing={3}>
        {loading
          ? Array.from(new Array(10)).map((_, index) => (
              <Grid item xs={12} sm={6} md={3} lg={2.4} key={index}>
                <Skeleton
                  variant="rectangular"
                  height={180}
                  sx={{ borderRadius: 1 }}
                />
              </Grid>
            ))
          : institutions.map((institution) => (
              <Grid item xs={12} sm={6} md={3} lg={2.4} key={institution.id}>
                <InstitutionCard
                  name={institution.nombre}
                  logoUrl={institution.logoUrl}
                  onClick={() => handleInstitutionClick(institution.id)}
                />
              </Grid>
            ))}
      </Grid>
    </Box>
  );
};
