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
  Paper,
  List,
  ListItem,
  ListItemText,
  Chip,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SchoolIcon from "@mui/icons-material/School";
import { MainLayout } from "../layouts/MainLayout";
import { useTheme } from "../hooks/useTheme";
import { institutionService, InstitutionUI } from "../services/institutionService";
import { programService, ProgramUI } from "../services/programService";

export const InstitutionPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const { theme } = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  const [institution, setInstitution] = useState<InstitutionUI | null>(null);
  const [programs, setPrograms] = useState<ProgramUI[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [programsLoading, setProgramsLoading] = useState<boolean>(false);

  // Get career from query string


  // Fetch institution data
  useEffect(() => {
    const fetchInstitution = async () => {
      if (!id) return;
      
      setLoading(true);
      try {
        // Get all institutions and find the one with matching ID
        const response = await institutionService.getInstitutions();
        const institutionData = response.institutions.find(inst => inst.id === id);
        
        if (institutionData) {
          // Transform to UI model
          const institutionUI = institutionService.transformToUIModel(institutionData);
          console.log(institutionUI);
          
          setInstitution(institutionUI);
          setError(null);
          
          // After setting institution, fetch programs for this institution
          fetchPrograms(institutionData.id);
        } else {
          setError("Institución no encontrada");
        }
      } catch (err) {
        console.error("Error fetching institution:", err);
        setError("No se pudo cargar la información de la institución");
      } finally {
        setLoading(false);
      }
    };

    const fetchPrograms = async (institutionId: string) => {
      setProgramsLoading(true);
      try {
        const response = await programService.getPrograms({ 
          institucionId: institutionId,
          limit: 3300
        });
        
        // Transform programs to UI model
        const programsUI = response.programs.map(prog => 
          programService.transformToUIModel(prog)
        );
        
        setPrograms(programsUI);
      } catch (err) {
        console.error("Error fetching programs:", err);
        // We don't set error state here to keep showing the institution data
      } finally {
        setProgramsLoading(false);
      }
    };

    fetchInstitution();
  }, [id]);

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <MainLayout>
        <Box sx={{ p: 3 }}>
          <Skeleton variant="rectangular" height={200} sx={{ mb: 2 }} />
          <Skeleton variant="text" height={60} sx={{ mb: 1 }} />
          <Skeleton variant="text" height={30} sx={{ mb: 2 }} width="60%" />
          <Grid container spacing={3}>
            {Array.from(new Array(6)).map((_, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Skeleton variant="rectangular" height={120} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </MainLayout>
    );
  }

  if (error || !institution) {
    return (
      <MainLayout>
        <Box sx={{ p: 3 }}>
          <Alert severity="error" sx={{ mb: 2 }}>
            {error || "No se encontró la institución especificada."}
          </Alert>
          <Button
            startIcon={<ArrowBackIcon />}
            variant="contained"
            onClick={handleBack}
          >
            Volver
          </Button>
        </Box>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Box sx={{ p: { xs: 2, md: 3 } }}>
        {/* Breadcrumbs */}
        <Breadcrumbs sx={{ mb: 2 }}>
          <MuiLink
            underline="hover"
            color="inherit"
            sx={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            Inicio
          </MuiLink>
          <Typography color="text.primary">{institution.nombre}</Typography>
        </Breadcrumbs>

        {/* Institution Header */}
        <Paper
          elevation={2}
          sx={{
            mb: 4,
            p: 3,
            backgroundColor: isDarkMode ? "#1E1E1E" : "#f9f9f9",
          }}
        >
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} sm={4} md={3} lg={2}>
              <CardMedia
                component="img"
                image={institution.logoUrl}
                alt={`Logo de ${institution.nombre}`}
                sx={{
                  height: "auto",
                  maxHeight: 150,
                  objectFit: "contain",
                  mx: "auto",
                  mb: { xs: 2, sm: 0 },
                }}
              />
            </Grid>

            <Grid item xs={12} sm={8} md={9} lg={10}>
              <Typography variant="h4" component="h1" gutterBottom>
                {institution.nombre}
              </Typography>

              <Typography variant="body1" paragraph>
                {institution.description}
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={3}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Ciudad
                  </Typography>
                  <Typography variant="body2">{institution.ciudad}</Typography>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Tipo de Institución
                  </Typography>
                  <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
                    {institution.tipoInstitucion}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Página Web
                  </Typography>
                  <MuiLink href={institution.website} target="_blank" rel="noopener">
                    Visitar sitio web
                  </MuiLink>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Código Institucional
                  </Typography>
                  <Typography variant="body2">
                    {institution.codigoInstitucion}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>

        {/* Programs Section */}
        <Box>
          <Typography
            variant="h5"
            component="h2"
            gutterBottom
            sx={{ display: "flex", alignItems: "center", mb: 3 }}
          >
            <SchoolIcon sx={{ mr: 1 }} /> Programas Académicos
          </Typography>

          {programsLoading ? (
            <Grid container spacing={3}>
              {Array.from(new Array(6)).map((_, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Skeleton variant="rectangular" height={150} />
                </Grid>
              ))}
            </Grid>
          ) : programs.length > 0 ? (
            <Grid container spacing={3}>
              {programs.map((program) => (
                <Grid item xs={12} sm={6} md={4} key={program.id}>
                  <Card
                    elevation={1}
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      transition: "transform 0.2s, box-shadow 0.2s",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: 4,
                      },
                    }}
                  >
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="h6" component="h3" gutterBottom>
                        {program.name}
                      </Typography>
                      <Divider sx={{ my: 1.5 }} />
                      <List dense disablePadding>
                        <ListItem disableGutters>
                          <ListItemText
                            primary="Nivel"
                            secondary={program.level}
                          />
                        </ListItem>
                        <ListItem disableGutters>
                          <ListItemText
                            primary="Duración"
                            secondary={program.duration}
                          />
                        </ListItem>
                        <ListItem disableGutters>
                          <ListItemText
                            primary="Modalidad"
                            secondary={program.modalidad}
                          />
                        </ListItem>
                        <ListItem disableGutters>
                          <ListItemText
                            primary="Créditos"
                            secondary={program.credits}
                          />
                        </ListItem>
                      </List>

                      <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
                        <Chip
                          label={program.estado}
                          color={program.estado === "Activo" ? "success" : "default"}
                          size="small"
                        />
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Alert severity="info">
              No se encontraron programas académicos para esta institución.
            </Alert>
          )}
        </Box>

        <Box sx={{ mt: 4 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            variant="contained"
            onClick={handleBack}
          >
            Volver
          </Button>
        </Box>
      </Box>
    </MainLayout>
  );
};
