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
  CircularProgress,
  Alert,
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
import { useLocation } from "react-router-dom";
import { searchService } from "../services/searchService";

export const SearchResultsPage: React.FC = () => {
  const muiTheme = useTheme();
  const { theme } = useCustomTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const [isChatOpen, setIsChatOpen] = useState(false);
  const location = useLocation();

  // Show/hide filters on mobile
  const [showFilters, setShowFilters] = useState(false);

  // Search states
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPrograms, setFilteredPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Search filters state
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
      pregrado: false,
      especializacion: false,
      maestria: false,
      doctorado: false,
      tecnico: false,
      tecnologico: false,
    },
    location: {
      medellin: false,
      bogota: false,
      cali: false,
      barranquilla: false,
      cartagena: false,
    },
  });

  // Get any search query from URL params
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("q");
    if (query) {
      setSearchTerm(query);
    }
  }, [location.search]);

  // Load initial programs
  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        setLoading(true);
        setError(null);

        // Get programs from API
        const apiFilters = {
          searchTerm: searchTerm,
          modalidad: getSelectedModalities(),
          nivel: getSelectedLevels(),
          municipio: getSelectedLocations(),
        };

        const searchResults = await searchService.search(apiFilters);

        // Map programs to the format expected by ProgramCard
        let mappedPrograms = searchService.mapProgramsToSearchModel(searchResults.programs);

        // Enrich programs with institution data
        mappedPrograms = await searchService.enrichProgramsWithInstitutions(mappedPrograms);

        setFilteredPrograms(mappedPrograms);
      } catch (err) {
        console.error("Error fetching programs:", err);
        setError("No se pudieron cargar los programas. Por favor, intenta más tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchPrograms();
  }, [searchTerm, filters]);

  // Helper functions to extract selected filters
  const getSelectedModalities = (): string[] => {
    const result: string[] = [];
    if (filters.modality.virtual) result.push("Virtual");
    if (filters.modality.presencial) result.push("Presencial");
    return result;
  };

  const getSelectedLevels = (): string[] => {
    const result: string[] = [];
    if (filters.level.pregrado) result.push("pregrado");
    if (filters.level.especializacion) result.push("especialización");
    if (filters.level.maestria) result.push("maestría");
    if (filters.level.doctorado) result.push("doctorado");
    if (filters.level.tecnico) result.push("técnico");
    if (filters.level.tecnologico) result.push("tecnológico");
    return result;
  };

  const getSelectedLocations = (): string[] => {
    const result: string[] = [];
    if (filters.location.medellin) result.push("Medellín");
    if (filters.location.bogota) result.push("Bogotá");
    if (filters.location.cali) result.push("Cali");
    if (filters.location.barranquilla) result.push("Barranquilla");
    if (filters.location.cartagena) result.push("Cartagena");
    return result;
  };

  // Chat search handler
  const handleChatSearchRequest = (query: string) => {
    setSearchTerm(query);
  };

  // Filter change handler
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

  // Clear all filters
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
        pregrado: false,
        especializacion: false,
        maestria: false,
        doctorado: false,
        tecnico: false,
        tecnologico: false,
      },
      location: {
        medellin: false,
        bogota: false,
        cali: false,
        barranquilla: false,
        cartagena: false,
      },
    });
  };

  // Check if any filter is active
  const hasActiveFilters = Object.entries(filters).some(
    ([_, categoryFilters]) =>
      Object.values(categoryFilters).some((value) => value)
  );

  return (
    <MainLayout>
      <Box sx={{ py: 3 }}>
        {/* Hero section with search field */}
        <Box
          sx={{
            py: 5,
            px: 3,
            mb: 4,
            borderRadius: 2,
            backgroundImage: isDarkMode
              ? "linear-gradient(to right, #1A237E, #311B92)"
              : "linear-gradient(to right, #E3F2FD, #EDE7F6)",
          }}
        >
          <Typography variant="h3" component="h1" align="center" gutterBottom>
            Encuentra tu programa ideal
          </Typography>
          <Typography
            variant="h6"
            align="center"
            color="text.secondary"
            paragraph
            sx={{ maxWidth: 700, mx: "auto", mb: 4 }}
          >
            Explora nuestra base de datos de programas académicos para encontrar
            el que mejor se adapte a tus intereses y objetivos profesionales.
          </Typography>

          <Box
            component="form"
            sx={{ maxWidth: 600, mx: "auto" }}
            onSubmit={(e) => {
              e.preventDefault();
              // Trigger search
            }}
          >
            <TextField
              fullWidth
              placeholder="¿Qué quieres estudiar?"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <Button
                      variant="contained"
                      disableElevation
                      sx={{
                        borderRadius: "0 4px 4px 0",
                        px: 3,
                        py: 1.5,
                        position: "absolute",
                        right: 0,
                        top: 0,
                        height: "100%",
                      }}
                      type="submit"
                    >
                      Buscar
                    </Button>
                  </InputAdornment>
                ),
                sx: {
                  backgroundColor: theme.palette.background.paper,
                  borderRadius: 1,
                  "& fieldset": { border: "none" },
                },
              }}
              sx={{ boxShadow: muiTheme.shadows[4] }}
            />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center"}}>
            <ChatButton onClick={() => setIsChatOpen(true)} />
          </Box>
          {/* Chat button */}
        </Box>

        {/* Main content area */}
        <Grid container spacing={3} sx={{ px: 3 }}>
          {/* Filters column - Desktop */}
          <Grid item xs={12} md={3} sx={{ display: { xs: "none", md: "block" } }}>
            <Paper sx={{ p: 2, mb: 2 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <TuneIcon sx={{ mr: 1 }} />
                  <Typography variant="h6">Filtros</Typography>
                </Box>
                {hasActiveFilters && (
                  <Button size="small" onClick={handleClearFilters}>
                    Limpiar
                  </Button>
                )}
              </Box>
              <Divider sx={{ mb: 2 }} />
              <SearchFilters
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
              />
            </Paper>
          </Grid>

          {/* Filter button for mobile */}
          <Box
            sx={{
              display: { xs: "flex", md: "none" },
              position: "fixed",
              bottom: 80,
              right: 16,
              zIndex: 1000,
            }}
          >
            <Button
              variant="contained"
              color="primary"
              startIcon={<FilterListIcon />}
              onClick={() => setShowFilters(!showFilters)}
              sx={{
                borderRadius: 30,
                px: 3,
                py: 1.5,
                boxShadow: muiTheme.shadows[4],
              }}
            >
              Filtros {hasActiveFilters && `(${getSelectedModalities().length + getSelectedLevels().length + getSelectedLocations().length})`}
            </Button>
          </Box>

          {/* Filters for mobile */}
          {showFilters && (
            <Box
              sx={{
                display: { xs: "block", md: "none" },
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0,0,0,0.5)",
                zIndex: 1100,
                overflow: "auto",
              }}
            >
              <Paper
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "90%",
                  maxWidth: 400,
                  maxHeight: "80vh",
                  overflow: "auto",
                  p: 3,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  <Typography variant="h6">Filtros</Typography>
                  <Box>
                    {hasActiveFilters && (
                      <Button
                        size="small"
                        onClick={handleClearFilters}
                        sx={{ mr: 1 }}
                      >
                        Limpiar
                      </Button>
                    )}
                    <Button
                      variant="contained"
                      onClick={() => setShowFilters(false)}
                    >
                      Aplicar
                    </Button>
                  </Box>
                </Box>
                <Divider sx={{ mb: 2 }} />
                <SearchFilters
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  onClearFilters={handleClearFilters}
                />
              </Paper>
            </Box>
          )}

          {/* Search results column */}
          <Grid item xs={12} md={9}>
            {/* Active filters */}
            {hasActiveFilters && (
              <Box sx={{ mb: 3 }}>
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  {getSelectedModalities().map((modality) => (
                    <Chip
                      key={`filter-${modality}`}
                      label={modality}
                      onDelete={() =>
                        handleFilterChange(
                          "modality",
                          modality.toLowerCase(),
                          false
                        )
                      }
                      sx={{ mb: 1 }}
                    />
                  ))}
                  {getSelectedLevels().map((level) => (
                    <Chip
                      key={`filter-${level}`}
                      label={level}
                      onDelete={() =>
                        handleFilterChange(
                          "level",
                          level.toLowerCase(),
                          false
                        )
                      }
                      sx={{ mb: 1 }}
                    />
                  ))}
                  {getSelectedLocations().map((location) => (
                    <Chip
                      key={`filter-${location}`}
                      label={location}
                      onDelete={() => {
                        const locationKey = location.toLowerCase();
                        if (locationKey === "medellín") {
                          handleFilterChange("location", "medellin", false);
                        } else if (locationKey === "bogotá") {
                          handleFilterChange("location", "bogota", false);
                        } else {
                          handleFilterChange("location", locationKey, false);
                        }
                      }}
                      sx={{ mb: 1 }}
                    />
                  ))}
                </Stack>
              </Box>
            )}

            {/* Results info */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
              }}
            >
              {loading ? (
                <Typography>Cargando resultados...</Typography>
              ) : (
                <Typography>
                  {filteredPrograms.length}{" "}
                  {filteredPrograms.length === 1
                    ? "programa encontrado"
                    : "programas encontrados"}
                </Typography>
              )}
            </Box>

            {/* Loading state */}
            {loading && (
              <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
                <CircularProgress />
              </Box>
            )}

            {/* Error state */}
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            {/* Results */}
            {!loading && !error && filteredPrograms.length === 0 && (
              <Box sx={{ textAlign: "center", py: 5 }}>
                <Typography variant="h6" gutterBottom>
                  No se encontraron programas que coincidan con tu búsqueda
                </Typography>
                <Typography color="text.secondary">
                  Intenta con otros términos o ajusta los filtros
                </Typography>
              </Box>
            )}

            {/* Program cards */}
            <Grid container spacing={3}>
              {filteredPrograms.map((program) => (
                <Grid item xs={12} key={program.id}>
                  <ProgramCard program={program} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>



      {/* Chat modal */}
      <ChatModal
        open={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        onSearchRequest={handleChatSearchRequest}
      />
    </MainLayout>
  );
};
