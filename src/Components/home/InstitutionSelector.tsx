import React from "react";
import {
  Typography,
  Grid,
  // Select,
  // MenuItem,
  // FormControl,
  // InputLabel,
  // Button,
  Box,
} from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import { Formik, Form } from "formik";
// import * as Yup from "yup";

// Esquema de validación
// const validationSchema = Yup.object().shape({
//   carrera: Yup.string().required("Debes seleccionar una carrera"),
//   institucion: Yup.string().required("Debes seleccionar una institución"),
// });

// Lista de opciones para los selects (mock)
// const carreras = [
//   "Administración de Empresas",
//   "Ingeniería de Sistemas",
//   "Medicina",
//   "Derecho",
//   "Psicología",
//   "Arquitectura",
// ];

// const instituciones = [
//   "Universidad de los Andes",
//   "Universidad Nacional de Colombia",
//   "Universidad del Rosario",
//   "Universidad EAFIT",
//   "Universidad del Valle",
//   "Universidad de Antioquia",
// ];

export const InstitutionSelector: React.FC = () => {
  // const navigate = useNavigate();

  // const handleSubmit = (values: { carrera: string; institucion: string }) => {
  //   // Crear IDs simplificados basados en los nombres
  //   const institucionId = values.institucion
  //     .toLowerCase()
  //     .replace(
  //       /universidad\s+de\s+|universidad\s+|pontificia\s+universidad\s+/g,
  //       ""
  //     )
  //     .replace(/\s+/g, "-");

  //   // Redirigir a la página de la institución con la carrera como parámetro de consulta
  //   navigate(
  //     `/institucion/${institucionId}?carrera=${encodeURIComponent(
  //       values.carrera
  //     )}`
  //   );
  // };

  return (
    <Box
      sx={{
        py: { xs: 4, md: 6 },
        px: { xs: 2, md: 0 },
        textAlign: "left",
        backgroundImage: "url(/src/assets/background.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        borderRadius: 2,
        color: "white",
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(30, 55, 153, 0.7)", // Capa azul semi-transparente
          zIndex: 0,
        },
      }}
    >
      <Grid container spacing={3} sx={{ position: "relative", zIndex: 1 }} p={2}>
        <Grid item xs={12} md={12} sx={{ pl: { md: 4 } }}>
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: "bold",
              fontSize: { xs: "2rem", md: "2.5rem" },
            }}
          >
            Elige tu Institución Académica
          </Typography>
          <Typography variant="body1" paragraph>
            Elige la institución a la que deseas ingresar y accede a la
            plataforma para iniciar tu solicitud.
          </Typography>
        </Grid>
{/* 
        <Grid item xs={12} md={7}>
          <Formik
            initialValues={{ carrera: "", institucion: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, errors, touched, handleChange, isValid }) => (
              <Form>
                <Grid container spacing={2} justifyContent="center">
                  <Grid item xs={12} md={5}>
                    <FormControl
                      fullWidth
                      variant="outlined"
                      error={touched.carrera && Boolean(errors.carrera)}
                    >
                      <InputLabel
                        id="carrera-label"
                        sx={{
                          backgroundColor: (theme) =>
                            theme.palette.mode === "dark" ? "#2A2A2A" : "white",
                          px: 1,
                          borderRadius: 1,
                          color: (theme) =>
                            theme.palette.mode === "dark"
                              ? "#FFFFFF"
                              : undefined,
                        }}
                      >
                        Seleccionar Carrera
                      </InputLabel>
                      <Select
                        labelId="carrera-label"
                        id="carrera"
                        name="carrera"
                        value={values.carrera}
                        onChange={handleChange}
                        sx={{
                          bgcolor: (theme) =>
                            theme.palette.mode === "dark" ? "#2A2A2A" : "white",
                          borderRadius: 1,
                          color: (theme) =>
                            theme.palette.mode === "dark"
                              ? "#FFFFFF"
                              : undefined,
                          ".MuiSvgIcon-root": {
                            color: (theme) =>
                              theme.palette.mode === "dark"
                                ? "#FFFFFF"
                                : undefined,
                          },
                          ".MuiSelect-nativeInput": {
                            color: (theme) =>
                              theme.palette.mode === "dark"
                                ? "#FFFFFF"
                                : undefined,
                          },
                        }}
                      >
                        <MenuItem value="">
                          <em>Selecciona una carrera</em>
                        </MenuItem>
                        {carreras.map((carrera) => (
                          <MenuItem key={carrera} value={carrera}>
                            {carrera}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} md={5}>
                    <FormControl
                      fullWidth
                      variant="outlined"
                      error={touched.institucion && Boolean(errors.institucion)}
                    >
                      <InputLabel
                        id="institucion-label"
                        sx={{
                          backgroundColor: (theme) =>
                            theme.palette.mode === "dark" ? "#2A2A2A" : "white",
                          px: 1,
                          borderRadius: 1,
                          color: (theme) =>
                            theme.palette.mode === "dark"
                              ? "#FFFFFF"
                              : undefined,
                        }}
                      >
                        Seleccionar Institución
                      </InputLabel>
                      <Select
                        labelId="institucion-label"
                        id="institucion"
                        name="institucion"
                        value={values.institucion}
                        onChange={handleChange}
                        sx={{
                          bgcolor: (theme) =>
                            theme.palette.mode === "dark" ? "#2A2A2A" : "white",
                          borderRadius: 1,
                          color: (theme) =>
                            theme.palette.mode === "dark"
                              ? "#FFFFFF"
                              : undefined,
                          ".MuiSvgIcon-root": {
                            color: (theme) =>
                              theme.palette.mode === "dark"
                                ? "#FFFFFF"
                                : undefined,
                          },
                          ".MuiSelect-nativeInput": {
                            color: (theme) =>
                              theme.palette.mode === "dark"
                                ? "#FFFFFF"
                                : undefined,
                          },
                        }}
                      >
                        <MenuItem value="">
                          <em>Selecciona una institución</em>
                        </MenuItem>
                        {instituciones.map((institucion) => (
                          <MenuItem key={institucion} value={institucion}>
                            {institucion}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} md={2}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      fullWidth
                      size="large"
                      disabled={!isValid}
                      sx={{
                        height: "56px",
                        boxShadow: 3,
                      }}
                    >
                      Ingresar
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Grid> */}
      </Grid>
    </Box>
  );
};
