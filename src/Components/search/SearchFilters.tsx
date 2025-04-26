import React from "react";
import {
  Box,
  Typography,
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

export interface FilterOptions {
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
    pregrado: boolean;
    especializacion: boolean;
    maestria: boolean;
    doctorado: boolean;
    tecnico: boolean;
    tecnologico: boolean;
  };
  location: {
    medellin: boolean;
    bogota: boolean;
    cali: boolean;
    barranquilla: boolean;
    cartagena: boolean;
  };
}

interface SearchFiltersProps {
  filters: FilterOptions;
  onFilterChange: (category: string, name: string, checked: boolean) => void;
  onClearFilters?: () => void;
}

export const SearchFilters: React.FC<SearchFiltersProps> = ({
  filters,
  onFilterChange,
  onClearFilters,
}) => {

  // Verificar si hay algún filtro activo
  const hasActiveFilters = Object.entries(filters).some(
    ([_, categoryFilters]) =>
      Object.values(categoryFilters).some((value) => value)
  );

  return (
    <Box sx={{ height: "100%" }}>
      {onClearFilters && hasActiveFilters && (
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
          <Button
            startIcon={<FilterAltOffIcon />}
            size="small"
            onClick={onClearFilters}
            color="primary"
            variant="text"
          >
            Limpiar filtros
          </Button>
        </Box>
      )}

      {/* Filtro de Modalidad */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
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

      <Divider sx={{ my: 2 }} />

      {/* Filtro de Duración */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
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

      <Divider sx={{ my: 2 }} />

      {/* Filtro de Nivel */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
          Nivel Académico
        </Typography>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={filters.level.pregrado}
                onChange={(e) =>
                  onFilterChange("level", "pregrado", e.target.checked)
                }
              />
            }
            label="Pregrado"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={filters.level.tecnico}
                onChange={(e) =>
                  onFilterChange("level", "tecnico", e.target.checked)
                }
              />
            }
            label="Técnico"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={filters.level.tecnologico}
                onChange={(e) =>
                  onFilterChange("level", "tecnologico", e.target.checked)
                }
              />
            }
            label="Tecnológico"
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
          <FormControlLabel
            control={
              <Checkbox
                checked={filters.level.doctorado}
                onChange={(e) =>
                  onFilterChange("level", "doctorado", e.target.checked)
                }
              />
            }
            label="Doctorado"
          />
        </FormGroup>
      </Box>

      <Divider sx={{ my: 2 }} />


    </Box>
  );
};
