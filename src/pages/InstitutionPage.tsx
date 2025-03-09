import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
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
import { Institution } from "../types";
import { useTheme } from "../hooks/useTheme";

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
  "los-andes": {
    id: "los-andes",
    name: "Universidad de los Andes",
    logoUrl: "/src/assets/logos/uandes.png",
    description:
      "Universidad privada de investigación con excelencia académica, pluralista e independiente.",
    website: "https://uniandes.edu.co",
    city: "Bogotá",
    country: "Colombia",
    foundedYear: 1948,
  },
  "nacional-de-colombia": {
    id: "nacional-de-colombia",
    name: "Universidad Nacional de Colombia",
    logoUrl: "/src/assets/logos/unal.png",
    description:
      "La Universidad Nacional de Colombia es la universidad pública más importante y representativa del país por su tradición, prestigio, calidad y selectividad.",
    website: "https://unal.edu.co",
    city: "Bogotá",
    country: "Colombia",
    foundedYear: 1867,
  },
  "digital-antioquia": {
    id: "digital-antioquia",
    name: "IU Digital de Antioquia",
    logoUrl: "/src/assets/logos/iudigital.png",
    description:
      "Institución Universitaria Digital de Antioquia, enfocada en educación virtual de calidad.",
    website: "https://www.iudigital.edu.co",
    city: "Medellín",
    country: "Colombia",
    foundedYear: 2017,
  },
  rosario: {
    id: "rosario",
    name: "Universidad del Rosario",
    logoUrl: "/src/assets/logos/urosario.png",
    description:
      "La Universidad del Rosario es una universidad privada colombiana fundada en 1653.",
    website: "https://urosario.edu.co",
    city: "Bogotá",
    country: "Colombia",
    foundedYear: 1653,
  },
  eafit: {
    id: "eafit",
    name: "Universidad EAFIT",
    logoUrl: "/src/assets/logos/eafit.png",
    description:
      "EAFIT es una universidad privada colombiana con enfoque en negocios, administración y tecnología.",
    website: "https://www.eafit.edu.co",
    city: "Medellín",
    country: "Colombia",
    foundedYear: 1960,
  },
  javeriana: {
    id: "javeriana",
    name: "Pontificia Universidad Javeriana",
    logoUrl: "/src/assets/logos/javeriana.png",
    description:
      "La Pontificia Universidad Javeriana es una universidad privada colombiana de la Compañía de Jesús.",
    website: "https://www.javeriana.edu.co",
    city: "Bogotá",
    country: "Colombia",
    foundedYear: 1623,
  },
  "del-valle": {
    id: "del-valle",
    name: "Universidad del Valle",
    logoUrl: "/src/assets/logos/uvalle.png",
    description:
      "La Universidad del Valle es una universidad pública colombiana ubicada en Cali.",
    website: "https://www.univalle.edu.co",
    city: "Cali",
    country: "Colombia",
    foundedYear: 1945,
  },
  antioquia: {
    id: "antioquia",
    name: "Universidad de Antioquia",
    logoUrl: "/src/assets/logos/udea.png",
    description:
      "La Universidad de Antioquia es una universidad pública colombiana fundada en 1803.",
    website: "https://www.udea.edu.co",
    city: "Medellín",
    country: "Colombia",
    foundedYear: 1803,
  },
  "del-norte": {
    id: "del-norte",
    name: "Universidad del Norte",
    logoUrl: "/src/assets/logos/uninorte.png",
    description:
      "La Universidad del Norte es una universidad privada colombiana ubicada en Barranquilla.",
    website: "https://www.uninorte.edu.co",
    city: "Barranquilla",
    country: "Colombia",
    foundedYear: 1966,
  },
};

// Mock de datos para programas académicos
const programsData = [
  {
    id: 1,
    name: "Administración de Empresas",
    level: "Pregrado",
    duration: "10 semestres",
    modalidad: "Presencial",
  },
  {
    id: 2,
    name: "Ingeniería de Sistemas",
    level: "Pregrado",
    duration: "10 semestres",
    modalidad: "Presencial/Virtual",
  },
  {
    id: 3,
    name: "Medicina",
    level: "Pregrado",
    duration: "12 semestres",
    modalidad: "Presencial",
  },
  {
    id: 4,
    name: "Derecho",
    level: "Pregrado",
    duration: "10 semestres",
    modalidad: "Presencial",
  },
  {
    id: 5,
    name: "Psicología",
    level: "Pregrado",
    duration: "10 semestres",
    modalidad: "Presencial/Virtual",
  },
  {
    id: 6,
    name: "Arquitectura",
    level: "Pregrado",
    duration: "10 semestres",
    modalidad: "Presencial",
  },
  {
    id: 7,
    name: "Economía",
    level: "Pregrado",
    duration: "9 semestres",
    modalidad: "Presencial",
  },
  {
    id: 8,
    name: "Ingeniería Industrial",
    level: "Pregrado",
    duration: "10 semestres",
    modalidad: "Presencial",
  },
  {
    id: 9,
    name: "Desarrollo Web",
    level: "Especialización",
    duration: "3 semestres",
    modalidad: "Virtual",
  },
  {
    id: 10,
    name: "Gestión Empresarial",
    level: "Especialización",
    duration: "2 semestres",
    modalidad: "Virtual",
  },
];

export const InstitutionPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { theme } = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  const [institution, setInstitution] = useState<Institution | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null);

  // Obtener la carrera del query string
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const carrera = params.get("carrera");
    setSelectedProgram(carrera);
  }, [location.search]);

  useEffect(() => {
    // Simulando una petición a API
    const fetchInstitution = async () => {
      setLoading(true);
      try {
        // En un entorno real, esto sería una llamada a una API
        setTimeout(() => {
          // Intentar encontrar la institución por ID directo
          if (id && institutionsData[id]) {
            setInstitution(institutionsData[id]);
            setError(null);
          } else {
            // Buscar por coincidencia parcial
            const foundInstitution = Object.values(institutionsData).find(
              (inst) =>
                inst.id.includes(id || "") ||
                inst.name.toLowerCase().includes((id || "").toLowerCase())
            );

            if (foundInstitution) {
              setInstitution(foundInstitution);
              setError(null);
            } else {
              console.error(`Institución no encontrada para ID: ${id}`);
              setError("Institución no encontrada");
              setInstitution(null);
            }
          }
          setLoading(false);
        }, 800); // Simulando tiempo de carga
      } catch (err) {
        console.error("Error al cargar los datos de la institución:", err);
        setError("Error al cargar los datos de la institución");
        setLoading(false);
      }
    };

    fetchInstitution();
  }, [id]);

  const handleBack = () => {
    navigate("/");
  };

  // Filtrar programas que coincidan con el programa seleccionado o mostrar todos
  const programsToShow = selectedProgram
    ? programsData
        .filter((program) => program.name === selectedProgram)
        .slice(0, 4)
    : programsData;

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
                      href={institution.website}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Visitar sitio web
                    </Button>
                  </CardContent>
                </Box>
              </Card>
            </Grid>

            {/* Sección de programas */}
            <Grid item xs={12} md={8}>
              <Paper sx={{ p: 3, height: "100%" }}>
                <Typography variant="h5" component="h2" gutterBottom>
                  {selectedProgram ? (
                    <>
                      Programa Seleccionado: <strong>{selectedProgram}</strong>
                    </>
                  ) : (
                    "Programas Académicos Disponibles"
                  )}
                </Typography>

                {programsToShow.length > 0 ? (
                  <List>
                    {programsToShow.map((program) => (
                      <ListItem
                        key={program.id}
                        divider
                        sx={{
                          borderRadius: 1,
                          mb: 1,
                          bgcolor:
                            selectedProgram === program.name
                              ? isDarkMode
                                ? "rgba(68, 96, 241, 0.1)"
                                : "rgba(68, 96, 241, 0.05)"
                              : "transparent",
                          border:
                            selectedProgram === program.name
                              ? `1px solid ${
                                  isDarkMode
                                    ? "rgba(68, 96, 241, 0.3)"
                                    : "rgba(68, 96, 241, 0.2)"
                                }`
                              : "none",
                          "&:hover": {
                            bgcolor: isDarkMode
                              ? "rgba(255, 255, 255, 0.05)"
                              : "rgba(0, 0, 0, 0.02)",
                            cursor: "pointer",
                          },
                        }}
                        onClick={() => {
                          // Al hacer clic en un programa, actualizar la URL para incluir el programa seleccionado
                          navigate(
                            `/institucion/${
                              id || ""
                            }?carrera=${encodeURIComponent(program.name)}`
                          );
                        }}
                      >
                        <ListItemText
                          primary={
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              <SchoolIcon
                                fontSize="small"
                                sx={{
                                  mr: 1,
                                  color:
                                    selectedProgram === program.name
                                      ? "#4460F1"
                                      : "inherit",
                                }}
                              />
                              <Typography
                                variant="h6"
                                component="span"
                                sx={{
                                  fontWeight:
                                    selectedProgram === program.name
                                      ? "bold"
                                      : "medium",
                                  color:
                                    selectedProgram === program.name
                                      ? "#4460F1"
                                      : "inherit",
                                }}
                              >
                                {program.name}
                              </Typography>
                            </Box>
                          }
                          secondary={
                            <Box sx={{ mt: 1 }}>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                paragraph
                              >
                                Este programa tiene una duración de{" "}
                                {program.duration} en modalidad{" "}
                                {program.modalidad}.
                              </Typography>
                              <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                                <Chip
                                  label={program.level}
                                  size="small"
                                  sx={{
                                    bgcolor: isDarkMode ? "#1E3229" : "#E8F5E9",
                                    color: isDarkMode ? "#81C784" : "#2E7D32",
                                  }}
                                />
                                <Chip
                                  label={program.modalidad}
                                  size="small"
                                  sx={{
                                    bgcolor: isDarkMode ? "#1A3A7D" : "#E3F2FD",
                                    color: isDarkMode ? "#90CAF9" : "#1565C0",
                                  }}
                                />
                              </Box>
                            </Box>
                          }
                        />
                      </ListItem>
                    ))}
                  </List>
                ) : (
                  <Alert severity="info" sx={{ mt: 2 }}>
                    No se encontraron programas académicos que coincidan con su
                    búsqueda.
                  </Alert>
                )}
              </Paper>
            </Grid>

            {/* Sección de admisión */}
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 3, height: "100%" }}>
                <Typography variant="h5" component="h2" gutterBottom>
                  Proceso de admisión
                </Typography>
                {selectedProgram ? (
                  <Typography variant="body1" paragraph>
                    Para iniciar tu proceso de admisión en {institution.name}
                    {selectedProgram &&
                      ` para el programa de ${selectedProgram}`}
                    , completa el formulario de solicitud y adjunta los
                    documentos requeridos.
                  </Typography>
                ) : (
                  <Typography variant="body1" paragraph>
                    Para iniciar tu proceso de admisión en {institution.name},
                    primero selecciona un programa académico de la lista
                    disponible y luego completa el formulario de solicitud.
                  </Typography>
                )}
                <Box sx={{ mt: 3 }}>
                  <Typography
                    variant="subtitle1"
                    gutterBottom
                    fontWeight="medium"
                  >
                    Requisitos:
                  </Typography>
                  <ul>
                    <li>Documento de identidad</li>
                    <li>Diploma o acta de grado de bachiller</li>
                    <li>Resultados de las pruebas Saber 11</li>
                    <li>Foto tipo documento</li>
                  </ul>
                </Box>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 3 }}
                  disabled={!selectedProgram}
                >
                  {selectedProgram
                    ? "Iniciar solicitud"
                    : "Selecciona un programa"}
                </Button>
              </Paper>
            </Grid>
          </Grid>
        ) : null}
      </Box>
    </MainLayout>
  );
};
