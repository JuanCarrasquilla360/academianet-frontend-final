import React from "react";
import {
  Box,
  Typography,
  Paper,
  Checkbox,
  FormControlLabel,
  FormGroup,
  IconButton,
  Tooltip,
  Button,
  Divider,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import { useTheme } from "../../hooks/useTheme";

interface FilterOptions {
  modality: {
    virtual: boolean;
    presencial: boolean;
  };
  duration: {
    corto: boolean;
    medio: boolean;
    largo: boolean;
  };
  level: {
    basico: boolean;
    intermedio: boolean;
    avanzado: boolean;
    profesional: boolean;
    especializacion: boolean;
    maestria: boolean;
  };
}

interface SearchFiltersProps {
  filters: FilterOptions;
  onFilterChange: (category: string, name: string, checked: boolean) => void;
  onClearFilters: () => void;
}

export const SearchFilters: React.FC<SearchFiltersProps> = ({
  filters,
  onFilterChange,
  onClearFilters,
}) => {
  const { theme } = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  // Verificar si hay algún filtro activo
  const hasActiveFilters = Object.entries(filters).some(
    ([_, categoryFilters]) =>
      Object.values(categoryFilters).some((value) => value)
  );

  return (
    <Paper
      elevation={2}
      sx={{
        p: 3,
        borderRadius: 2,
        height: "100%",
        backgroundColor: isDarkMode ? "#1E1E1E" : "white",
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
        <Typography variant="h6" component="h2" fontWeight="bold">
          Filtros
        </Typography>

        {hasActiveFilters && (
          <Button
            startIcon={<FilterAltOffIcon />}
            size="small"
            onClick={onClearFilters}
            color="primary"
            variant="text"
          >
            Limpiar
          </Button>
        )}
      </Box>

      <Divider sx={{ mb: 2 }} />

      {/* Filtro de Modalidad */}
      <Box sx={{ mt: 3 }}>
        <Typography variant="subtitle1" fontWeight="medium">
          Modalidad
        </Typography>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={filters.modality.virtual}
                onChange={(e) =>
                  onFilterChange("modality", "virtual", e.target.checked)
                }
              />
            }
            label="Virtual"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={filters.modality.presencial}
                onChange={(e) =>
                  onFilterChange("modality", "presencial", e.target.checked)
                }
              />
            }
            label="Presencial"
          />
        </FormGroup>
      </Box>

      {/* Filtro de Duración */}
      <Box sx={{ mt: 3 }}>
        <Typography variant="subtitle1" fontWeight="medium">
          Duración
        </Typography>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={filters.duration.corto}
                onChange={(e) =>
                  onFilterChange("duration", "corto", e.target.checked)
                }
              />
            }
            label={
              <Box sx={{ display: "flex", alignItems: "center" }}>
                Corto plazo
                <Tooltip title="Menos de 6 meses">
                  <IconButton size="small">
                    <InfoIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
            }
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={filters.duration.medio}
                onChange={(e) =>
                  onFilterChange("duration", "medio", e.target.checked)
                }
              />
            }
            label={
              <Box sx={{ display: "flex", alignItems: "center" }}>
                Medio plazo
                <Tooltip title="Entre 6 meses y 2 años">
                  <IconButton size="small">
                    <InfoIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
            }
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={filters.duration.largo}
                onChange={(e) =>
                  onFilterChange("duration", "largo", e.target.checked)
                }
              />
            }
            label={
              <Box sx={{ display: "flex", alignItems: "center" }}>
                Largo plazo
                <Tooltip title="Más de 2 años">
                  <IconButton size="small">
                    <InfoIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
            }
          />
        </FormGroup>
      </Box>

      {/* Filtro de Nivel */}
      <Box sx={{ mt: 3 }}>
        <Typography variant="subtitle1" fontWeight="medium">
          Nivel
        </Typography>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={filters.level.basico}
                onChange={(e) =>
                  onFilterChange("level", "basico", e.target.checked)
                }
              />
            }
            label="Básico"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={filters.level.intermedio}
                onChange={(e) =>
                  onFilterChange("level", "intermedio", e.target.checked)
                }
              />
            }
            label="Intermedio"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={filters.level.avanzado}
                onChange={(e) =>
                  onFilterChange("level", "avanzado", e.target.checked)
                }
              />
            }
            label="Avanzado"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={filters.level.profesional}
                onChange={(e) =>
                  onFilterChange("level", "profesional", e.target.checked)
                }
              />
            }
            label="Profesional"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={filters.level.especializacion}
                onChange={(e) =>
                  onFilterChange("level", "especializacion", e.target.checked)
                }
              />
            }
            label="Especialización"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={filters.level.maestria}
                onChange={(e) =>
                  onFilterChange("level", "maestria", e.target.checked)
                }
              />
            }
            label="Maestría"
          />
        </FormGroup>
      </Box>
    </Paper>
  );
};
