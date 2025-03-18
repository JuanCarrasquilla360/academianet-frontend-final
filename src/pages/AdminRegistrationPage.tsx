import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  Link,
  IconButton,
  InputAdornment,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useFormik } from "formik";
import * as Yup from "yup";
import { MainLayout } from "../layouts/MainLayout";
import { useTheme } from "../hooks/useTheme";
import { authService } from "../services/authService";


// Esquema de validación para el formulario de registro
const validationSchema = Yup.object({
  nombre: Yup.string().required("El nombre es requerido"),
  apellido: Yup.string().required("El apellido es requerido"),
  nombreLegalInstitucion: Yup.string().required(
    "El nombre legal de la institución es requerido"
  ),
  abreviacionNombre: Yup.string().required(
    "La abreviación del nombre es requerida"
  ),
  correoElectronico: Yup.string()
    .email("Ingresa un correo electrónico válido")
    .required("El correo electrónico es requerido"),
  contrasena: Yup.string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "La contraseña debe contener al menos una letra mayúscula, una minúscula y un número"
    )
    .required("La contraseña es requerida"),
  confirmarContrasena: Yup.string()
    .oneOf([Yup.ref("contrasena")], "Las contraseñas deben coincidir")
    .required("Confirma tu contraseña"),
});

export const AdminRegistrationPage: React.FC = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  // Estados para la UI
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Formik para manejar el formulario
  const formik = useFormik({
    initialValues: {
      nombre: "",
      apellido: "",
      nombreLegalInstitucion: "",
      abreviacionNombre: "",
      correoElectronico: "",
      contrasena: "",
      confirmarContrasena: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        setError(null);

        // Preparamos el cuerpo del request para la API
        const requestBody = {
          nombre: values.nombre,
          apellido: values.apellido,
          nombreLegalInstitucion: values.nombreLegalInstitucion,
          abreviacionNombre: values.abreviacionNombre,
          correoElectronico: values.correoElectronico,
          contrasena: values.contrasena,
        };


        const response = await authService.registerAdmin(requestBody);

        navigate(`/admin/verificar?username=${response.username}`);
       
      } catch (err) {
        console.error("Error al registrar:", err);
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError(
            "Ha ocurrido un error durante el registro. Por favor intenta nuevamente."
          );
        }
      } finally {
        setIsLoading(false);
      }
    },
  });

  // Alternar visibilidad de la contraseña
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Alternar visibilidad de la confirmación de contraseña
  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // Manejar el botón de volver
  const handleBack = () => {
    navigate("/admin");
  };

  return (
    <MainLayout>
      <Box sx={{ py: 4, px: { xs: 2, md: 0 } }}>
        {/* Botón para volver atrás */}
        <IconButton
          onClick={handleBack}
          sx={{ mb: 2, position: "absolute", bottom: 20, left: 20 }}
          aria-label="volver"
        >
          <ArrowBackIcon />
        </IconButton>

        <Grid container justifyContent="center">
          <Grid item xs={12} sm={10} md={8} lg={6}>
            <Paper
              elevation={3}
              sx={{
                p: 4,
                borderRadius: 2,
                backgroundColor: isDarkMode ? "#1E1E1E" : "white",
              }}
            >
              <Typography variant="caption" color="text.secondary" gutterBottom>
                Registro de Administrador
              </Typography>

              <Typography
                variant="h4"
                component="h1"
                gutterBottom
                sx={{ fontWeight: "bold", mt: 1, mb: 1 }}
              >
                Completa el Formulario
              </Typography>

              {error && (
                <Alert severity="error" sx={{ mb: 3, mt: 2 }}>
                  {error}
                </Alert>
              )}

              <Box
                component="form"
                onSubmit={formik.handleSubmit}
                sx={{ mt: 4 }}
              >
                <Grid container spacing={3}>
                  {/* Nombre y Apellido */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      id="nombre"
                      name="nombre"
                      label="Nombre"
                      variant="outlined"
                      value={formik.values.nombre}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.nombre && Boolean(formik.errors.nombre)
                      }
                      helperText={formik.touched.nombre && formik.errors.nombre}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      id="apellido"
                      name="apellido"
                      label="Apellido"
                      variant="outlined"
                      value={formik.values.apellido}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.apellido &&
                        Boolean(formik.errors.apellido)
                      }
                      helperText={
                        formik.touched.apellido && formik.errors.apellido
                      }
                    />
                  </Grid>

                  {/* Nombre Legal de la Institución */}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="nombreLegalInstitucion"
                      name="nombreLegalInstitucion"
                      label="Nombre Legal de la Institución"
                      variant="outlined"
                      value={formik.values.nombreLegalInstitucion}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.nombreLegalInstitucion &&
                        Boolean(formik.errors.nombreLegalInstitucion)
                      }
                      helperText={
                        formik.touched.nombreLegalInstitucion &&
                        formik.errors.nombreLegalInstitucion
                      }
                    />
                  </Grid>

                  {/* Abreviación del Nombre */}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="abreviacionNombre"
                      name="abreviacionNombre"
                      label="Abreviación del nombre"
                      variant="outlined"
                      value={formik.values.abreviacionNombre}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.abreviacionNombre &&
                        Boolean(formik.errors.abreviacionNombre)
                      }
                      helperText={
                        formik.touched.abreviacionNombre &&
                        formik.errors.abreviacionNombre
                      }
                    />
                  </Grid>

                  {/* Correo Electrónico */}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="correoElectronico"
                      name="correoElectronico"
                      label="Correo Electrónico"
                      variant="outlined"
                      type="email"
                      value={formik.values.correoElectronico}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.correoElectronico &&
                        Boolean(formik.errors.correoElectronico)
                      }
                      helperText={
                        formik.touched.correoElectronico &&
                        formik.errors.correoElectronico
                      }
                    />
                  </Grid>

                  {/* Contraseña */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      id="contrasena"
                      name="contrasena"
                      label="Contraseña"
                      variant="outlined"
                      type={showPassword ? "text" : "password"}
                      value={formik.values.contrasena}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.contrasena &&
                        Boolean(formik.errors.contrasena)
                      }
                      helperText={
                        formik.touched.contrasena && formik.errors.contrasena
                      }
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleTogglePasswordVisibility}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOffIcon />
                              ) : (
                                <VisibilityIcon />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>

                  {/* Confirmar Contraseña */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      id="confirmarContrasena"
                      name="confirmarContrasena"
                      label="Confirmar Contraseña"
                      variant="outlined"
                      type={showConfirmPassword ? "text" : "password"}
                      value={formik.values.confirmarContrasena}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.confirmarContrasena &&
                        Boolean(formik.errors.confirmarContrasena)
                      }
                      helperText={
                        formik.touched.confirmarContrasena &&
                        formik.errors.confirmarContrasena
                      }
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle confirm password visibility"
                              onClick={handleToggleConfirmPasswordVisibility}
                              edge="end"
                            >
                              {showConfirmPassword ? (
                                <VisibilityOffIcon />
                              ) : (
                                <VisibilityIcon />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>

                  {/* Botón de Registro */}
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      fullWidth
                      size="large"
                      disabled={isLoading}
                      sx={{
                        py: 1.5,
                        mt: 2,
                        fontWeight: "bold",
                      }}
                    >
                      {isLoading ? (
                        <CircularProgress size={24} color="inherit" />
                      ) : (
                        "Registrar"
                      )}
                    </Button>
                  </Grid>

                  {/* Enlace a Login */}
                  <Grid item xs={12} sx={{ textAlign: "center" }}>
                    <Typography variant="body2" color="text.secondary">
                      ¿Ya tienes cuenta?{" "}
                      <Link
                        href="/admin"
                        underline="hover"
                        sx={{ fontWeight: "bold" }}
                      >
                        Inicia Sesión
                      </Link>
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </MainLayout>
  );
};
