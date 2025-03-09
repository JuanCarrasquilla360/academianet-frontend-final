import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Autocomplete,
  TextField,
  Button,
  Divider,
} from "@mui/material";
import { MainLayout } from "../layouts/MainLayout";
import { CustomAutocomplete } from "../Components/ui/CustomAutocomplete";

// Interfaces
interface Option {
  id: string | number;
  label: string;
}

// Datos de ejemplo
const universidades: Option[] = [
  { id: 1, label: "Universidad de los Andes" },
  { id: 2, label: "Universidad Nacional de Colombia" },
  { id: 3, label: "Universidad del Rosario" },
  { id: 4, label: "Universidad EAFIT" },
  { id: 5, label: "Universidad del Valle" },
  { id: 6, label: "Universidad de Antioquia" },
  { id: 7, label: "Pontificia Universidad Javeriana" },
  { id: 8, label: "Universidad del Norte" },
];

const carreras: Option[] = [
  { id: 1, label: "Administración de Empresas" },
  { id: 2, label: "Ingeniería de Sistemas" },
  { id: 3, label: "Medicina" },
  { id: 4, label: "Derecho" },
  { id: 5, label: "Psicología" },
  { id: 6, label: "Arquitectura" },
  { id: 7, label: "Economía" },
  { id: 8, label: "Ingeniería Industrial" },
];

export const AutocompleteExample: React.FC = () => {
  // Estado para los autocomplete estándar de MUI
  const [universidad, setUniversidad] = useState<Option | null>(null);
  const [carrera, setCarrera] = useState<Option | null>(null);

  // Estado para los autocomplete personalizados
  const [universidadCustom, setUniversidadCustom] = useState<Option | null>(
    null
  );
  const [carreraCustom, setCarreraCustom] = useState<Option | null>(null);

  return (
    <MainLayout>
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Ejemplos de Autocomplete en Modo Oscuro
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Grid container spacing={4}>
          {/* Autocomplete estándar de MUI */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h5" gutterBottom>
                Autocomplete Estándar de MUI
              </Typography>
              <Box sx={{ mb: 3 }}>
                <Autocomplete
                  options={universidades}
                  getOptionLabel={(option) => option.label}
                  value={universidad}
                  onChange={(_, newValue) => setUniversidad(newValue)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Seleccionar Universidad"
                      variant="outlined"
                      fullWidth
                    />
                  )}
                  sx={{ mb: 2 }}
                />

                <Autocomplete
                  options={carreras}
                  getOptionLabel={(option) => option.label}
                  value={carrera}
                  onChange={(_, newValue) => setCarrera(newValue)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Seleccionar Carrera"
                      variant="outlined"
                      fullWidth
                    />
                  )}
                  sx={{ mb: 2 }}
                />
              </Box>

              <Button
                variant="contained"
                color="primary"
                disabled={!universidad || !carrera}
                fullWidth
              >
                Continuar
              </Button>
            </Paper>
          </Grid>

          {/* Autocomplete personalizado */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h5" gutterBottom>
                Autocomplete Personalizado
              </Typography>
              <Box sx={{ mb: 3 }}>
                <CustomAutocomplete
                  options={universidades}
                  label="Seleccionar Universidad"
                  value={universidadCustom}
                  onChange={setUniversidadCustom}
                  placeholder="Buscar universidad..."
                />

                <CustomAutocomplete
                  options={carreras}
                  label="Seleccionar Carrera"
                  value={carreraCustom}
                  onChange={setCarreraCustom}
                  placeholder="Buscar carrera..."
                />
              </Box>

              <Button
                variant="contained"
                color="primary"
                disabled={!universidadCustom || !carreraCustom}
                fullWidth
              >
                Continuar
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </MainLayout>
  );
};
