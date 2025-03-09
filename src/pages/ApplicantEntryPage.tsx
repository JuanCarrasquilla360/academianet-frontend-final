import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { useNavigate, useLocation, Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { MainLayout } from "../layouts/MainLayout";
import { useTheme } from "../hooks/useTheme";

// Tipos de documento
const documentTypes = [
  { value: "cc", label: "Cédula de Ciudadanía" },
  { value: "ce", label: "Cédula de Extranjería" },
  { value: "ti", label: "Tarjeta de Identidad" },
  { value: "pasaporte", label: "Pasaporte" },
];

// Periodos de inscripción
const enrollmentPeriods = [
  { value: "2025-1", label: "Primer Semestre 2025" },
  { value: "2025-2", label: "Segundo Semestre 2025" },
  { value: "2026-1", label: "Primer Semestre 2026" },
];

export const ApplicantEntryPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme } = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  // Estado para los campos del formulario
  const [formData, setFormData] = useState({
    institution: "",
    program: "",
    documentType: "",
    documentNumber: "",
    enrollmentPeriod: "",
  });

  // Estado para manejar el diálogo de confirmación
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogTitle, setDialogTitle] = useState("");

  // Obtener parámetros de la URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const institution = params.get("institution") || "";
    const program = params.get("program") || "";

    setFormData((prev) => ({
      ...prev,
      institution,
      program,
    }));
  }, [location.search]);

  // Manejar cambios en los campos del formulario
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name as string]: value,
    }));
  };

  // Validar formulario
  const isFormValid = () => {
    return (
      formData.documentType.trim() !== "" &&
      formData.documentNumber.trim() !== "" &&
      formData.enrollmentPeriod.trim() !== ""
    );
  };

  // Manejar envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Aquí normalmente haríamos una llamada a la API para verificar si el aspirante existe
    // Simulamos una verificación
    const applicantExists = Math.random() > 0.5; // 50% de probabilidad para simular

    if (applicantExists) {
      // Si el aspirante existe, lo inscribimos
      setDialogTitle("¡Inscripción Exitosa!");
      setDialogMessage(
        `Has sido inscrito correctamente al programa ${formData.program} en ${formData.institution} para el periodo ${formData.enrollmentPeriod}.`
      );
      setOpenDialog(true);
    } else {
      // Si el aspirante no existe, mostramos mensaje para que se registre
      setDialogTitle("Aspirante No Registrado");
      setDialogMessage(
        "No encontramos tus datos en nuestro sistema. Por favor regístrate primero para poder inscribirte."
      );
      setOpenDialog(true);
    }
  };

  // Cerrar el diálogo
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // Redirigir a la página de registro
  const handleRedirectToRegistration = () => {
    navigate(
      "/registro-aspirante" +
        `?institution=${encodeURIComponent(formData.institution)}` +
        `&program=${encodeURIComponent(formData.program)}` +
        `&documentType=${encodeURIComponent(formData.documentType)}` +
        `&documentNumber=${encodeURIComponent(formData.documentNumber)}` +
        `&enrollmentPeriod=${encodeURIComponent(formData.enrollmentPeriod)}`
    );
  };

  // Manejar el botón de volver
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <MainLayout>
      <Box sx={{ py: 4, px: { xs: 2, md: 0 } }}>
        {/* Botón para volver atrás */}
        <IconButton onClick={handleBack} sx={{ mb: 2 }} aria-label="volver">
          <ArrowBackIcon />
        </IconButton>

        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} md={8} lg={6}>
            <Paper
              elevation={3}
              sx={{
                p: 4,
                borderRadius: 2,
                backgroundColor: isDarkMode ? "#1E1E1E" : "white",
              }}
            >
              <Typography variant="caption" color="text.secondary" gutterBottom>
                Ingreso de Aspirante
              </Typography>

              <Typography
                variant="h4"
                component="h1"
                gutterBottom
                sx={{ fontWeight: "bold", mb: 3 }}
              >
                Da el Primer Paso Hacia tu Futuro!
              </Typography>

              <Typography variant="body1" paragraph>
                Completa los campos a continuación y prepárate para tu examen de
                ingreso.
              </Typography>

              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
                <Grid container spacing={3}>
                  {/* Institución (deshabilitada) */}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Institución"
                      variant="outlined"
                      value={formData.institution}
                      disabled
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>

                  {/* Programa (deshabilitado) */}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Programa"
                      variant="outlined"
                      value={formData.program}
                      disabled
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>

                  {/* Tipo de documento */}
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel id="document-type-label">Tipo</InputLabel>
                      <Select
                        labelId="document-type-label"
                        id="documentType"
                        name="documentType"
                        value={formData.documentType}
                        onChange={handleChange}
                        label="Tipo"
                        required
                      >
                        <MenuItem value="">
                          <em>Seleccione</em>
                        </MenuItem>
                        {documentTypes.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  {/* Número de documento */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Número"
                      variant="outlined"
                      name="documentNumber"
                      value={formData.documentNumber}
                      onChange={handleChange}
                      required
                    />
                  </Grid>

                  {/* Período de inscripción */}
                  <Grid item xs={12}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel id="enrollment-period-label">
                        Período de Inscripción
                      </InputLabel>
                      <Select
                        labelId="enrollment-period-label"
                        id="enrollmentPeriod"
                        name="enrollmentPeriod"
                        value={formData.enrollmentPeriod}
                        onChange={handleChange}
                        label="Período de Inscripción"
                        required
                      >
                        <MenuItem value="">
                          <em>Seleccione</em>
                        </MenuItem>
                        {enrollmentPeriods.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  {/* Botón de inscripción */}
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      size="large"
                      fullWidth
                      disabled={!isFormValid()}
                      sx={{
                        py: 1.5,
                        mt: 2,
                        fontWeight: "bold",
                      }}
                    >
                      Inscribirse
                    </Button>

                    {/* Texto para registro */}
                    <Box sx={{ textAlign: "center", mt: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        ¿No te has registrado aún?{" "}
                        <Link
                          to="/registro-aspirante"
                          style={{
                            color: theme.palette.primary.main,
                            textDecoration: "none",
                            fontWeight: "bold",
                          }}
                        >
                          Regístrate Ahora
                        </Link>
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        {/* Diálogo de confirmación o error */}
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{dialogTitle}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {dialogMessage}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            {dialogTitle.includes("Exitosa") ? (
              // Si fue exitoso, solo mostrar un botón de aceptar
              <Button onClick={handleCloseDialog} autoFocus>
                Aceptar
              </Button>
            ) : (
              // Si no fue exitoso, mostrar botones para registrarse o cancelar
              <>
                <Button onClick={handleCloseDialog}>Cancelar</Button>
                <Button
                  onClick={handleRedirectToRegistration}
                  variant="contained"
                  color="primary"
                  autoFocus
                >
                  Registrarme Ahora
                </Button>
              </>
            )}
          </DialogActions>
        </Dialog>
      </Box>
    </MainLayout>
  );
};
