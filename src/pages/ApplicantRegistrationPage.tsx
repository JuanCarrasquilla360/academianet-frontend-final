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
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputAdornment,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { es } from "date-fns/locale";
import { useTheme } from "../hooks/useTheme";
import { MainLayout } from "../layouts/MainLayout";
import { useFormik } from "formik";
import * as Yup from "yup";

// Tipos de documento
const documentTypes = [
  { value: "cc", label: "Cédula de Ciudadanía" },
  { value: "ce", label: "Cédula de Extranjería" },
  { value: "ti", label: "Tarjeta de Identidad" },
  { value: "pasaporte", label: "Pasaporte" },
];

// Estados civiles
const civilStates = [
  { value: "soltero", label: "Soltero/a" },
  { value: "casado", label: "Casado/a" },
  { value: "divorciado", label: "Divorciado/a" },
  { value: "viudo", label: "Viudo/a" },
  { value: "unionLibre", label: "Unión Libre" },
];

// Géneros
const genders = [
  { value: "masculino", label: "Masculino" },
  { value: "femenino", label: "Femenino" },
  { value: "otro", label: "Otro" },
  { value: "noEspecifica", label: "Prefiero no especificar" },
];

// Países
const countries = [
  { value: "co", label: "Colombia" },
  { value: "ar", label: "Argentina" },
  { value: "mx", label: "México" },
  { value: "pe", label: "Perú" },
  { value: "cl", label: "Chile" },
  { value: "ec", label: "Ecuador" },
  { value: "ven", label: "Venezuela" },
];

// Ciudades de Colombia
const colombianCities = [
  { value: "bog", label: "Bogotá" },
  { value: "med", label: "Medellín" },
  { value: "cal", label: "Cali" },
  { value: "bar", label: "Barranquilla" },
  { value: "car", label: "Cartagena" },
  { value: "buc", label: "Bucaramanga" },
  { value: "per", label: "Pereira" },
  { value: "man", label: "Manizales" },
  { value: "pas", label: "Pasto" },
  { value: "iba", label: "Ibagué" },
];

// Esquema de validación
const validationSchema = Yup.object({
  documentType: Yup.string().required("El tipo de documento es requerido"),
  documentNumber: Yup.string().required("El número de documento es requerido"),
  firstName: Yup.string().required("El nombre es requerido"),
  lastName: Yup.string().required("Los apellidos son requeridos"),
  birthDate: Yup.date()
    .required("La fecha de nacimiento es requerida")
    .nullable(),
  civilState: Yup.string().required("El estado civil es requerido"),
  gender: Yup.string().required("El género es requerido"),
  phone: Yup.string(),
  mobile: Yup.string().required("El celular es requerido"),
  email: Yup.string().email("Email inválido").required("El email es requerido"),
  confirmEmail: Yup.string()
    .oneOf([Yup.ref("email")], "Los emails deben coincidir")
    .required("La confirmación de email es requerida"),
  country: Yup.string().required("El país es requerido"),
  city: Yup.string().required("La ciudad es requerida"),
  address: Yup.string().required("La dirección es requerida"),
});

export const ApplicantRegistrationPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme } = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  // Estado para el diálogo
  const [openDialog, setOpenDialog] = useState(false);

  // Inicializar datos del formulario desde la URL
  const params = new URLSearchParams(location.search);
  const initialDocType = params.get("documentType") || "";
  const initialDocNumber = params.get("documentNumber") || "";
  const institution = params.get("institution") || "";
  const program = params.get("program") || "";

  // Formik para manejar el formulario
  const formik = useFormik({
    initialValues: {
      documentType: initialDocType,
      documentNumber: initialDocNumber,
      firstName: "",
      lastName: "",
      birthDate: null,
      civilState: "",
      gender: "",
      phone: "",
      mobile: "",
      email: "",
      confirmEmail: "",
      country: "co", // Por defecto Colombia
      city: "",
      address: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("Formulario enviado:", values);
      // Aquí irían las llamadas a la API para registrar al aspirante

      // Mostrar diálogo de confirmación
      setOpenDialog(true);
    },
  });

  // Manejar el botón de volver
  const handleBack = () => {
    navigate(-1);
  };

  // Cerrar el diálogo y redirigir
  const handleCloseDialog = () => {
    setOpenDialog(false);

    // Redirigir a la página de ingreso de aspirante con los parámetros
    navigate(
      `/ingreso-aspirante?institution=${encodeURIComponent(
        institution
      )}&program=${encodeURIComponent(
        program
      )}&documentType=${encodeURIComponent(
        formik.values.documentType
      )}&documentNumber=${encodeURIComponent(formik.values.documentNumber)}`
    );
  };

  return (
    <MainLayout>
      <Box sx={{ py: 4, px: { xs: 2, md: 0 } }}>
        {/* Botón para volver atrás */}
        <IconButton onClick={handleBack} sx={{ mb: 2 }} aria-label="volver">
          <ArrowBackIcon />
        </IconButton>

        <Grid container justifyContent="center">
          <Grid item xs={12} md={10} lg={8}>
            <Paper
              elevation={3}
              sx={{
                p: 4,
                borderRadius: 2,
                backgroundColor: isDarkMode ? "#1E1E1E" : "white",
              }}
            >
              <Typography variant="caption" color="text.secondary" gutterBottom>
                Inscripción de Aspirante
              </Typography>

              <Typography
                variant="h4"
                component="h1"
                gutterBottom
                sx={{ fontWeight: "bold", mb: 3 }}
              >
                Completa el Formulario
              </Typography>

              <Box
                component="form"
                onSubmit={formik.handleSubmit}
                sx={{ mt: 4 }}
              >
                <Grid container spacing={3}>
                  {/* SECCIÓN DE DOCUMENTO */}
                  <Grid item xs={12}>
                    <Typography
                      variant="subtitle1"
                      fontWeight="medium"
                      gutterBottom
                    >
                      Documento
                    </Typography>
                  </Grid>

                  {/* Tipo de documento */}
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel id="document-type-label">Tipo</InputLabel>
                      <Select
                        labelId="document-type-label"
                        id="documentType"
                        name="documentType"
                        value={formik.values.documentType}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        label="Tipo"
                        error={
                          formik.touched.documentType &&
                          Boolean(formik.errors.documentType)
                        }
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
                      {formik.touched.documentType &&
                        formik.errors.documentType && (
                          <Typography variant="caption" color="error">
                            {formik.errors.documentType}
                          </Typography>
                        )}
                    </FormControl>
                  </Grid>

                  {/* Número de documento */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      id="documentNumber"
                      name="documentNumber"
                      label="Número"
                      variant="outlined"
                      value={formik.values.documentNumber}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.documentNumber &&
                        Boolean(formik.errors.documentNumber)
                      }
                      helperText={
                        formik.touched.documentNumber &&
                        formik.errors.documentNumber
                      }
                    />
                  </Grid>

                  {/* SECCIÓN DE DATOS PERSONALES */}
                  <Grid item xs={12} sx={{ mt: 2 }}>
                    <Typography
                      variant="subtitle1"
                      fontWeight="medium"
                      gutterBottom
                    >
                      Datos Personales
                    </Typography>
                  </Grid>

                  {/* Nombres */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      id="firstName"
                      name="firstName"
                      label="Nombres"
                      variant="outlined"
                      value={formik.values.firstName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.firstName &&
                        Boolean(formik.errors.firstName)
                      }
                      helperText={
                        formik.touched.firstName && formik.errors.firstName
                      }
                    />
                  </Grid>

                  {/* Apellidos */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      id="lastName"
                      name="lastName"
                      label="Apellidos"
                      variant="outlined"
                      value={formik.values.lastName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.lastName &&
                        Boolean(formik.errors.lastName)
                      }
                      helperText={
                        formik.touched.lastName && formik.errors.lastName
                      }
                    />
                  </Grid>

                  {/* Fecha de nacimiento */}
                  <Grid item xs={12}>
                    <LocalizationProvider
                      dateAdapter={AdapterDateFns}
                      adapterLocale={es}
                    >
                      <DatePicker
                        label="Fecha de Nacimiento"
                        value={formik.values.birthDate}
                        onChange={(date) =>
                          formik.setFieldValue("birthDate", date)
                        }
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            variant: "outlined",
                            error:
                              formik.touched.birthDate &&
                              Boolean(formik.errors.birthDate),
                            helperText:
                              formik.touched.birthDate &&
                              (formik.errors.birthDate as string),
                          },
                        }}
                      />
                    </LocalizationProvider>
                  </Grid>

                  {/* Estado civil */}
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel id="civil-state-label">
                        Estado Civil
                      </InputLabel>
                      <Select
                        labelId="civil-state-label"
                        id="civilState"
                        name="civilState"
                        value={formik.values.civilState}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        label="Estado Civil"
                        error={
                          formik.touched.civilState &&
                          Boolean(formik.errors.civilState)
                        }
                      >
                        <MenuItem value="">
                          <em>Seleccione</em>
                        </MenuItem>
                        {civilStates.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                      {formik.touched.civilState &&
                        formik.errors.civilState && (
                          <Typography variant="caption" color="error">
                            {formik.errors.civilState}
                          </Typography>
                        )}
                    </FormControl>
                  </Grid>

                  {/* Género */}
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel id="gender-label">Género</InputLabel>
                      <Select
                        labelId="gender-label"
                        id="gender"
                        name="gender"
                        value={formik.values.gender}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        label="Género"
                        error={
                          formik.touched.gender && Boolean(formik.errors.gender)
                        }
                      >
                        <MenuItem value="">
                          <em>Seleccione</em>
                        </MenuItem>
                        {genders.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                      {formik.touched.gender && formik.errors.gender && (
                        <Typography variant="caption" color="error">
                          {formik.errors.gender}
                        </Typography>
                      )}
                    </FormControl>
                  </Grid>

                  {/* SECCIÓN DE TELÉFONO */}
                  <Grid item xs={12} sx={{ mt: 2 }}>
                    <Typography
                      variant="subtitle1"
                      fontWeight="medium"
                      gutterBottom
                    >
                      Teléfono
                    </Typography>
                  </Grid>

                  {/* Teléfono fijo */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      id="phone"
                      name="phone"
                      label="Teléfono"
                      variant="outlined"
                      value={formik.values.phone}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.phone && Boolean(formik.errors.phone)
                      }
                      helperText={formik.touched.phone && formik.errors.phone}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">+57</InputAdornment>
                        ),
                      }}
                    />
                  </Grid>

                  {/* Teléfono celular */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      id="mobile"
                      name="mobile"
                      label="Celular"
                      variant="outlined"
                      value={formik.values.mobile}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.mobile && Boolean(formik.errors.mobile)
                      }
                      helperText={formik.touched.mobile && formik.errors.mobile}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">+57</InputAdornment>
                        ),
                      }}
                    />
                  </Grid>

                  {/* SECCIÓN DE CORREO ELECTRÓNICO */}
                  <Grid item xs={12} sx={{ mt: 2 }}>
                    <Typography
                      variant="subtitle1"
                      fontWeight="medium"
                      gutterBottom
                    >
                      Correo Electrónico
                    </Typography>
                  </Grid>

                  {/* Email */}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="email"
                      name="email"
                      label="Correo"
                      type="email"
                      variant="outlined"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.email && Boolean(formik.errors.email)
                      }
                      helperText={formik.touched.email && formik.errors.email}
                    />
                  </Grid>

                  {/* Confirmar Email */}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="confirmEmail"
                      name="confirmEmail"
                      label="Confirmar Correo"
                      type="email"
                      variant="outlined"
                      value={formik.values.confirmEmail}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.confirmEmail &&
                        Boolean(formik.errors.confirmEmail)
                      }
                      helperText={
                        formik.touched.confirmEmail &&
                        formik.errors.confirmEmail
                      }
                    />
                  </Grid>

                  {/* SECCIÓN DE DIRECCIÓN */}
                  <Grid item xs={12} sx={{ mt: 2 }}>
                    <Typography
                      variant="subtitle1"
                      fontWeight="medium"
                      gutterBottom
                    >
                      Dirección
                    </Typography>
                  </Grid>

                  {/* País */}
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel id="country-label">País</InputLabel>
                      <Select
                        labelId="country-label"
                        id="country"
                        name="country"
                        value={formik.values.country}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        label="País"
                        error={
                          formik.touched.country &&
                          Boolean(formik.errors.country)
                        }
                      >
                        {countries.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                      {formik.touched.country && formik.errors.country && (
                        <Typography variant="caption" color="error">
                          {formik.errors.country}
                        </Typography>
                      )}
                    </FormControl>
                  </Grid>

                  {/* Ciudad */}
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel id="city-label">Ciudad</InputLabel>
                      <Select
                        labelId="city-label"
                        id="city"
                        name="city"
                        value={formik.values.city}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        label="Ciudad"
                        error={
                          formik.touched.city && Boolean(formik.errors.city)
                        }
                      >
                        <MenuItem value="">
                          <em>Seleccione</em>
                        </MenuItem>
                        {colombianCities.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                      {formik.touched.city && formik.errors.city && (
                        <Typography variant="caption" color="error">
                          {formik.errors.city}
                        </Typography>
                      )}
                    </FormControl>
                  </Grid>

                  {/* Dirección detallada */}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="address"
                      name="address"
                      label="Dirección Detallada"
                      variant="outlined"
                      value={formik.values.address}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.address && Boolean(formik.errors.address)
                      }
                      helperText={
                        formik.touched.address && formik.errors.address
                      }
                    />
                  </Grid>

                  {/* Botón de inscripción */}
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
                      Inscribirse
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        {/* Diálogo de confirmación de registro */}
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Registro completado</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              ¡Tu registro ha sido completado exitosamente! Ahora podrás iniciar
              el proceso de inscripción a tu programa académico.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleCloseDialog}
              variant="contained"
              color="primary"
              autoFocus
            >
              Continuar
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </MainLayout>
  );
};
