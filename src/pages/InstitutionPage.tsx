import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Skeleton,
  Alert,
  Breadcrumbs,
  Link as MuiLink,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { MainLayout } from "../layouts/MainLayout";
import { Institution } from "../types";

// Mock de datos para las instituciones (en un entorno real, estos datos vendrían de una API)
const institutionsData: Record<string, Institution> = {
  itm: {
    id: "itm",
    name: "Institución Universitaria ITM",
    logoUrl: "/src/assets/logos/itm.png",
    description:
      "El Instituto Tecnológico Metropolitano es una institución universitaria de carácter público y del orden municipal.",
    website: "https://www.itm.edu.co",
    city: "Medellín",
    country: "Colombia",
    foundedYear: 1944,
  },
  uandes: {
    id: "uandes",
    name: "Universidad de los Andes",
    logoUrl: "/src/assets/logos/uandes.png",
    description:
      "Universidad privada de investigación con excelencia académica, pluralista e independiente.",
    website: "https://uniandes.edu.co",
    city: "Bogotá",
    country: "Colombia",
    foundedYear: 1948,
  },
  unal: {
    id: "unal",
    name: "Universidad Nacional de Colombia",
    logoUrl: "/src/assets/logos/unal.png",
    description:
      "La Universidad Nacional de Colombia es la universidad pública más importante y representativa del país por su tradición, prestigio, calidad y selectividad.",
    website: "https://unal.edu.co",
    city: "Bogotá",
    country: "Colombia",
    foundedYear: 1867,
  },
  // Puedes agregar el resto de instituciones según sea necesario
};

export const InstitutionPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [institution, setInstitution] = useState<Institution | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulando una petición a API
    const fetchInstitution = async () => {
      setLoading(true);
      try {
        // En un entorno real, esto sería una llamada a una API
        setTimeout(() => {
          if (id && institutionsData[id]) {
            setInstitution(institutionsData[id]);
            setError(null);
          } else {
            setError("Institución no encontrada");
            setInstitution(null);
          }
          setLoading(false);
        }, 800); // Simulando tiempo de carga
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError("Error al cargar los datos de la institución");
        setLoading(false);
      }
    };

    fetchInstitution();
  }, [id]);

  const handleBack = () => {
    navigate("/");
  };

  return (
    <MainLayout>
      <Box sx={{ my: 2 }}>
        {/* Breadcrumbs para navegación */}
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
          <MuiLink
            underline="hover"
            color="inherit"
            onClick={handleBack}
            sx={{ cursor: "pointer" }}
          >
            Inicio
          </MuiLink>
          <Typography color="text.primary">
            {loading ? (
              <Skeleton width={120} />
            ) : (
              institution?.name || "Institución"
            )}
          </Typography>
        </Breadcrumbs>

        {/* Botón para volver atrás */}
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={handleBack}
          sx={{ mb: 3 }}
        >
          Volver a la lista
        </Button>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {loading ? (
          // Skeleton para mostrar mientras carga
          <Box>
            <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
              <Skeleton
                variant="rectangular"
                width={120}
                height={120}
                sx={{ mr: 3 }}
              />
              <Box>
                <Skeleton variant="text" width={300} height={60} />
                <Skeleton variant="text" width={200} />
              </Box>
            </Box>
            <Skeleton variant="rectangular" height={200} />
          </Box>
        ) : institution ? (
          // Contenido cuando la institución existe
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Card>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    p: 3,
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      width: { xs: "100%", md: 200 },
                      height: { xs: 160, md: 200 },
                      objectFit: "contain",
                      mb: { xs: 2, md: 0 },
                      mr: { md: 3 },
                    }}
                    image={institution.logoUrl}
                    alt={institution.name}
                  />
                  <CardContent sx={{ flex: "1 0 auto", p: { xs: 0, md: 2 } }}>
                    <Typography variant="h4" component="h1" gutterBottom>
                      {institution.name}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      paragraph
                    >
                      {institution.city}, {institution.country} • Fundada en{" "}
                      {institution.foundedYear}
                    </Typography>
                    <Typography variant="body1" paragraph>
                      {institution.description}
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      href={institution.website!}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Visitar sitio web
                    </Button>
                  </CardContent>
                </Box>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h5" component="h2" gutterBottom>
                Proceso de admisión
              </Typography>
              <Card>
                <CardContent>
                  <Typography variant="body1" paragraph>
                    Para iniciar tu proceso de admisión en {institution.name},
                    completa el formulario de solicitud online y adjunta los
                    documentos requeridos.
                  </Typography>
                  <Button variant="contained" color="primary">
                    Iniciar solicitud
                  </Button>
                </CardContent>
              </Card>
            </Grid>

            {/* Aquí podrías agregar más secciones como programas académicos, 
                requisitos de admisión, costos, etc. */}
          </Grid>
        ) : null}
      </Box>
    </MainLayout>
  );
};
