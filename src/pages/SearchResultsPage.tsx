import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  Paper,
  Divider,
  TextField,
  InputAdornment,
  Button,
  useTheme,
  Stack,
  Chip,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import FilterListIcon from "@mui/icons-material/FilterList";
import { MainLayout } from "../layouts/MainLayout";
import { useTheme as useCustomTheme } from "../hooks/useTheme";
import { SearchFilters } from "../Components/search/SearchFilters";
import { ProgramCard, Program } from "../Components/search/ProgramCard";
import { ChatButton } from "../Components/search/ChatButton";
import { ChatModal } from "../Components/search/ChatModal";

// Datos de ejemplo para los programas
const samplePrograms: Program[] = [
  {
    id: "1",
    title: "Desarrollo Web Full Stack",
    university: "Pontificia Universidad Javeriana de Bogotá",
    location: "Bogotá, Cundinamarca",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque nibh nibh.",
    logoUrl: "/src/assets/logos/javeriana.png",
    modality: ["Presencial"],
    duration: "Medio Plazo",
    level: "Intermedio",
  },
  {
    id: "2",
    title: "Ciencia de Datos",
    university: "Universidad de Antioquia",
    location: "Medellín, Antioquia",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque nibh nibh. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque nibh nibh.",
    logoUrl: "/src/assets/logos/udea.png",
    modality: ["Virtual"],
    duration: "Corto Plazo",
    level: "Avanzado",
  },
  {
    id: "3",
    title: "Ingeniería de Software",
    university: "Universidad Nacional de Colombia",
    location: "Bogotá, Cundinamarca",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue.",
    logoUrl: "/src/assets/logos/unal.png",
    modality: ["Presencial", "Virtual"],
    duration: "Largo Plazo",
    level: "Profesional",
  },
  {
    id: "4",
    title: "Diseño UX/UI",
    university: "Universidad EAFIT",
    location: "Medellín, Antioquia",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus.",
    logoUrl: "/src/assets/logos/eafit.png",
    modality: ["Virtual"],
    duration: "Medio Plazo",
    level: "Intermedio",
  },
];

export const SearchResultsPage: React.FC = () => {
  const muiTheme = useTheme();
  const { theme } = useCustomTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Estado para mostrar/ocultar filtros en móvil
  const [showFilters, setShowFilters] = useState(false);

  // Estados para los filtros y búsqueda
  const [programs] = useState<Program[]>(samplePrograms);
  const [filteredPrograms, setFilteredPrograms] =
    useState<Program[]>(samplePrograms);
  const [searchTerm, setSearchTerm] = useState("");

  const handleChatSearchRequest = (query: string) => {
    console.log(query)
    setSearchTerm(query);
    // Aquí podrías implementar lógica adicional para filtrar los resultados
    // basados en la consulta recibida del chatbot
  };


  // Filtros
  const [filters, setFilters] = useState({
    modality: {
      virtual: false,
      presencial: false,
    },
    duration: {
      corto: false,
      medio: false,
      largo: false,
    },
    level: {
      basico: false,
      intermedio: false,
      avanzado: false,
      profesional: false,
      especializacion: false,
      maestria: false,
    },
  });

  // Aplicar filtros cuando cambian
  useEffect(() => {
    let result = [...programs];

    // Filtrar por término de búsqueda
    if (searchTerm) {
      result = result.filter(
        (program) =>
          program.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          program.university.toLowerCase().includes(searchTerm.toLowerCase()) ||
          program.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtrar por modalidad
    const hasModalityFilter =
      filters.modality.virtual || filters.modality.presencial;
    if (hasModalityFilter) {
      result = result.filter((program) => {
        if (filters.modality.virtual && program.modality.includes("Virtual"))
          return true;
        if (
          filters.modality.presencial &&
          program.modality.includes("Presencial")
        )
          return true;
        return false;
      });
    }

    // Filtrar por duración
    const hasDurationFilter =
      filters.duration.corto ||
      filters.duration.medio ||
      filters.duration.largo;
    if (hasDurationFilter) {
      result = result.filter((program) => {
        if (filters.duration.corto && program.duration === "Corto Plazo")
          return true;
        if (filters.duration.medio && program.duration === "Medio Plazo")
          return true;
        if (filters.duration.largo && program.duration === "Largo Plazo")
          return true;
        return false;
      });
    }

    // Filtrar por nivel
    const hasLevelFilter =
      filters.level.basico ||
      filters.level.intermedio ||
      filters.level.avanzado ||
      filters.level.profesional ||
      filters.level.especializacion ||
      filters.level.maestria;
    if (hasLevelFilter) {
      result = result.filter((program) => {
        if (filters.level.basico && program.level === "Básico") return true;
        if (filters.level.intermedio && program.level === "Intermedio")
          return true;
        if (filters.level.avanzado && program.level === "Avanzado") return true;
        if (filters.level.profesional && program.level === "Profesional")
          return true;
        if (
          filters.level.especializacion &&
          program.level === "Especialización"
        )
          return true;
        if (filters.level.maestria && program.level === "Maestría") return true;
        return false;
      });
    }

    setFilteredPrograms(result);
  }, [searchTerm, filters, programs]);

  // Manejar cambios en los filtros
  const handleFilterChange = (
    category: string,
    name: string,
    checked: boolean
  ) => {
    setFilters((prev) => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [name]: checked,
      },
    }));
  };

  // Limpiar todos los filtros
  const handleClearFilters = () => {
    setFilters({
      modality: {
        virtual: false,
        presencial: false,
      },
      duration: {
        corto: false,
        medio: false,
        largo: false,
      },
      level: {
        basico: false,
        intermedio: false,
        avanzado: false,
        profesional: false,
        especializacion: false,
        maestria: false,
      },
    });
  };

  // Verificar si hay algún filtro activo
  const hasActiveFilters = Object.entries(filters).some(
    ([_, categoryFilters]) =>
      Object.values(categoryFilters).some((value) => value)
  );

  return (
    <MainLayout>
      <Box sx={{ py: 3 }}>
        {/* Hero section con campo de búsqueda */}
        <Box
          sx={{
            py: 5,
            px: 3,
            mb: 4,
            borderRadius: 2,
            background: "linear-gradient(135deg, #2C3E7E 0%, #4460F1 100%)",
            color: "white",
            position: "relative",
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            fontWeight="bold"
          >
            Encuentra tu carrera ideal
          </Typography>
          <Typography variant="body1" sx={{ maxWidth: "800px", mb: 3 }}>
            Elige la institución a la que deseas ingresar y accede a la
            plataforma para iniciar tu solicitud.
          </Typography>

          <TextField
            fullWidth
            placeholder="Buscar programas, universidades..."
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              maxWidth: "600px",
              backgroundColor: isDarkMode
                ? "rgba(255, 255, 255, 0.1)"
                : "rgba(255, 255, 255, 0.9)",
              borderRadius: 1,
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "transparent",
                },
                "&:hover fieldset": {
                  borderColor: "transparent",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "white",
                },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon
                    sx={{ color: isDarkMode ? "white" : "#2C3E7E" }}
                  />
                </InputAdornment>
              ),
            }}
          />
          <ChatButton onClick={() => setIsChatOpen(true)} />
          {/* Tags para mostrar los filtros activos */}
          {hasActiveFilters && (
            <Box sx={{ mt: 3, display: "flex", flexWrap: "wrap", gap: 1 }}>
              <Typography variant="body2" sx={{ mr: 1, alignSelf: "center" }}>
                Filtros activos:
              </Typography>

              {/* Mostrar chips para filtros de modalidad */}
              {filters.modality.virtual && (
                <Chip
                  label="Virtual"
                  size="small"
                  onDelete={() =>
                    handleFilterChange("modality", "virtual", false)
                  }
                  sx={{
                    bgcolor: "rgba(255, 255, 255, 0.2)",
                    color: "white",
                    "& .MuiChip-deleteIcon": {
                      color: "white",
                    },
                  }}
                />
              )}
              {filters.modality.presencial && (
                <Chip
                  label="Presencial"
                  size="small"
                  onDelete={() =>
                    handleFilterChange("modality", "presencial", false)
                  }
                  sx={{
                    bgcolor: "rgba(255, 255, 255, 0.2)",
                    color: "white",
                    "& .MuiChip-deleteIcon": {
                      color: "white",
                    },
                  }}
                />
              )}

              {/* Mostrar chips para filtros de duración */}
              {filters.duration.corto && (
                <Chip
                  label="Corto plazo"
                  size="small"
                  onDelete={() =>
                    handleFilterChange("duration", "corto", false)
                  }
                  sx={{
                    bgcolor: "rgba(255, 255, 255, 0.2)",
                    color: "white",
                    "& .MuiChip-deleteIcon": {
                      color: "white",
                    },
                  }}
                />
              )}
              {filters.duration.medio && (
                <Chip
                  label="Medio plazo"
                  size="small"
                  onDelete={() =>
                    handleFilterChange("duration", "medio", false)
                  }
                  sx={{
                    bgcolor: "rgba(255, 255, 255, 0.2)",
                    color: "white",
                    "& .MuiChip-deleteIcon": {
                      color: "white",
                    },
                  }}
                />
              )}
              {filters.duration.largo && (
                <Chip
                  label="Largo plazo"
                  size="small"
                  onDelete={() =>
                    handleFilterChange("duration", "largo", false)
                  }
                  sx={{
                    bgcolor: "rgba(255, 255, 255, 0.2)",
                    color: "white",
                    "& .MuiChip-deleteIcon": {
                      color: "white",
                    },
                  }}
                />
              )}

              {/* Botón para limpiar todos los filtros */}
              <Chip
                label="Limpiar filtros"
                size="small"
                onClick={handleClearFilters}
                sx={{
                  bgcolor: "rgba(255, 255, 255, 0.3)",
                  color: "white",
                  fontWeight: "bold",
                  "&:hover": {
                    bgcolor: "rgba(255, 255, 255, 0.4)",
                  },
                }}
              />
            </Box>
          )}
        </Box>

        {/* Contenido principal - Grid con filtros y resultados */}
        <Grid container spacing={3}>
          {/* Columna de filtros en desktop / Dialog en móvil */}
          <Grid
            item
            xs={12}
            md={3}
            sx={{
              display: { xs: showFilters ? "block" : "none", md: "block" },
            }}
          >
            <SearchFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
            />
          </Grid>

          {/* Columna de resultados */}
          <Grid item xs={12} md={9}>
            {/* Botón para mostrar/ocultar filtros en móvil */}
            <Box
              sx={{
                display: { xs: "flex", md: "none" },
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Button
                variant={showFilters ? "contained" : "outlined"}
                color="primary"
                startIcon={<FilterListIcon />}
                onClick={() => setShowFilters(!showFilters)}
                size="small"
              >
                {showFilters ? "Ocultar Filtros" : "Mostrar Filtros"}
              </Button>

              <Typography variant="subtitle2" color="text.secondary">
                {filteredPrograms.length} resultados
              </Typography>
            </Box>

            <Box
              sx={{
                bgcolor: isDarkMode
                  ? "rgba(255,255,255,0.05)"
                  : "rgba(0,0,0,0.03)",
                p: 2,
                borderRadius: 2,
              }}
            >
              <Box
                sx={{
                  display: { xs: "none", md: "flex" },
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Typography variant="h6" component="h2" fontWeight="medium">
                  Resultados ({filteredPrograms.length})
                </Typography>

                <Stack direction="row" spacing={2} alignItems="center">
                  <Button
                    variant="text"
                    startIcon={<TuneIcon />}
                    size="small"
                    onClick={() => {
                      /* Implementar ordenamiento */
                    }}
                  >
                    Ordenar
                  </Button>
                </Stack>
              </Box>

              {/* Listado de resultados */}
              {filteredPrograms.length > 0 ? (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                  {filteredPrograms.map((program) => (
                    <ProgramCard key={program.id} program={program} />
                  ))}
                </Box>
              ) : (
                <Paper
                  sx={{
                    p: 4,
                    textAlign: "center",
                    bgcolor: isDarkMode ? "rgba(255,255,255,0.05)" : "white",
                  }}
                >
                  <Typography variant="h6" color="text.secondary">
                    No se encontraron resultados para los filtros seleccionados
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 1 }}
                  >
                    Intenta con otros criterios de búsqueda
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ mt: 3 }}
                    onClick={handleClearFilters}
                  >
                    Limpiar filtros
                  </Button>
                </Paper>
              )}
            </Box>
          </Grid>
        </Grid>
        <ChatModal
          open={isChatOpen}
          onClose={() => setIsChatOpen(false)}
          onSearchRequest={handleChatSearchRequest}
        />

      </Box>
    </MainLayout>
  );
};
