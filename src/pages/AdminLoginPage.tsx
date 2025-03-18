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
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useFormik } from "formik";
import * as Yup from "yup";
import { MainLayout } from "../layouts/MainLayout";
import { useTheme } from "../hooks/useTheme";

// Esquema de validación
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Ingresa un correo electrónico válido")
    .required("El correo electrónico es requerido"),
  password: Yup.string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .required("La contraseña es requerida"),
});

export const AdminLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  // Estado para mostrar/ocultar contraseña
  const [showPassword, setShowPassword] = useState(false);

  // Estado para mensaje de error de autenticación
  const [authError, setAuthError] = useState<string | null>(null);

  // Formik para manejar el formulario
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Aquí irían las llamadas a la API para autenticar al administrador
      console.log("Iniciando sesión:", values);

      // Simulación de validación de credenciales
      if (
        values.email === "admin@example.com" &&
        values.password === "admin123"
      ) {
        // Autenticación exitosa, redireccionar al panel de administración
        navigate("/admin/dashboard");
      } else {
        // Autenticación fallida, mostrar mensaje de error
        setAuthError(
          "Credenciales inválidas. Por favor verifica tu correo y contraseña."
        );
      }
    },
  });

  // Alternar visibilidad de la contraseña
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Manejar el botón de volver
  const handleBack = () => {
    navigate("/");
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
          <Grid item xs={12} sm={8} md={6} lg={5} xl={4}>
            <Paper
              elevation={3}
              sx={{
                p: 4,
                borderRadius: 2,
                backgroundColor: isDarkMode ? "#1E1E1E" : "white",
              }}
            >
              <Typography variant="caption" color="text.secondary" gutterBottom>
                Ingreso de Administrador
              </Typography>

              <Typography
                variant="h4"
                component="h1"
                gutterBottom
                sx={{ fontWeight: "bold", mt: 1, mb: 2 }}
              >
                Ingresa tus Credenciales
              </Typography>

              <Typography variant="body1" paragraph sx={{ mb: 4 }}>
                Inicia sesión con tu correo y contraseña para administrar el
                sistema institucional.
              </Typography>

              {/* Mensaje de error de autenticación */}
              {authError && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  {authError}
                </Alert>
              )}

              <Box component="form" onSubmit={formik.handleSubmit}>
                <Grid container spacing={3}>
                  {/* Correo Electrónico */}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="email"
                      name="email"
                      label="Correo Electrónico"
                      variant="outlined"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.email && Boolean(formik.errors.email)
                      }
                      helperText={formik.touched.email && formik.errors.email}
                      placeholder="ejemplo@institucion.edu.co"
                    />
                  </Grid>

                  {/* Contraseña */}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="password"
                      name="password"
                      label="Contraseña"
                      type={showPassword ? "text" : "password"}
                      variant="outlined"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.password &&
                        Boolean(formik.errors.password)
                      }
                      helperText={
                        formik.touched.password && formik.errors.password
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

                  {/* Botón de ingreso */}
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      size="large"
                      fullWidth
                      sx={{
                        py: 1.5,
                        mt: 2,
                        fontWeight: "bold",
                      }}
                    >
                      Ingresar
                    </Button>
                  </Grid>

                  {/* Enlace para registro */}
                  <Grid item xs={12} sx={{ textAlign: "center" }}>
                    <Typography variant="body2" color="text.secondary">
                      ¿No tienes cuenta?{" "}
                      <Link
                        href="/admin/registro"
                        underline="hover"
                        sx={{ fontWeight: "bold" }}
                      >
                        Regístrate Ahora
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
