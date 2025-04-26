import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  IconButton,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { MainLayout } from "../layouts/MainLayout";
import { useTheme } from "../hooks/useTheme";
import { authService } from "../services/authService";

export const AdminVerificationPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme } = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  // Obtener el username de los parámetros de consulta
  const queryParams = new URLSearchParams(location.search);
  const username = queryParams.get("username") || "";

  // Estados para la UI
  const [verificationCode, setVerificationCode] = useState<string[]>(
    Array(6).fill("")
  );
  const [isLoading, setIsLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  // Referencias para los inputs de código
  const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(6).fill(null));

  // Efecto para enfocar automáticamente el primer input cuando se monta el componente
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  // Verificar que tengamos un username
  useEffect(() => {
    if (!username) {
      setError(
        "No se pudo identificar al usuario. Por favor vuelve al formulario de registro."
      );
    }
  }, [username]);

  // Manejar el cambio en los inputs del código
  const handleCodeChange = (index: number, value: string) => {
    // Verificar que el valor sea un número
    if (value && !/^\d+$/.test(value)) return;

    // Crear una copia del array actual
    const newCode = [...verificationCode];

    // Si hay más de un carácter (por ejemplo, al pegar), solo tomar el primero
    newCode[index] = value.substring(0, 1);
    setVerificationCode(newCode);

    // Si el usuario ingresó un número y no es el último input, mover al siguiente
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Manejar la tecla de retroceso para ir al input anterior
  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLDivElement>
  ) => {
    if (e.key === "Backspace" && !verificationCode[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Manejar pegar código
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text");

    // Verificar si solo son números
    if (!/^\d+$/.test(pastedData)) return;

    // Llenar los inputs con los valores pegados
    const pastedChars = pastedData.split("").slice(0, 6);
    const newCode = [...verificationCode];

    pastedChars.forEach((char, index) => {
      if (index < 6) {
        newCode[index] = char;
      }
    });

    setVerificationCode(newCode);

    // Enfocar el siguiente input vacío o el último si todos están llenos
    const nextEmptyIndex = newCode.findIndex((value) => !value);
    if (nextEmptyIndex !== -1) {
      inputRefs.current[nextEmptyIndex]?.focus();
    } else if (pastedChars.length < 6) {
      inputRefs.current[pastedChars.length]?.focus();
    } else {
      inputRefs.current[5]?.focus();
    }
  };

  // Verificar si el código está completo
  const isCodeComplete = verificationCode.every((digit) => digit !== "");

  // Manejar el envío del código
  const handleSubmit = async () => {
    if (!isCodeComplete || !username) return;

    try {
      setIsLoading(true);
      setError(null);

      const completeCode = verificationCode.join("");

      // Preparar el cuerpo del request
      const requestBody = {
        username,
        code: completeCode,
      };

      console.log("Enviando código de verificación:", requestBody);

      // Llamada real a la API para verificar el código
      await authService.verifyEmail(requestBody);

      setSuccess(true);

      // Redirigir al dashboard después de un breve retraso
      setTimeout(() => {
        navigate("/admin/dashboard");
      }, 2000);
    } catch (err) {
      console.error("Error al verificar el código:", err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Código inválido. Por favor intenta nuevamente.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Manejar el reenvío del código
  const handleResendCode = async () => {
    if (!username) {
      setError(
        "No se pudo identificar al usuario. Vuelve a iniciar el proceso de registro."
      );
      return;
    }

    try {
      setResendLoading(true);
      setError(null);

      // Llamada real a la API para reenviar el código
      await authService.resendVerificationCode(username);

      // Mostrar mensaje de éxito
      setError("Se ha enviado un nuevo código a tu correo electrónico.");
    } catch (err) {
      console.error("Error al reenviar el código:", err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(
          "No se pudo enviar un nuevo código. Por favor intenta más tarde."
        );
      }
    } finally {
      setResendLoading(false);
    }
  };

  // Manejar el botón de volver
  const handleBack = () => {
    navigate("/admin/registro");
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
          <Grid item xs={12} sm={10} md={8} lg={5}>
            <Paper
              elevation={3}
              sx={{
                p: 4,
                borderRadius: 2,
                backgroundColor: isDarkMode ? "#1E1E1E" : "white",
              }}
            >
              <Typography variant="caption" color="text.secondary" gutterBottom>
                Código de Verificación
              </Typography>

              <Typography
                variant="h4"
                component="h1"
                gutterBottom
                sx={{ fontWeight: "bold", mt: 1, mb: 1 }}
              >
                Solo un paso más...
              </Typography>

              <Typography variant="body1" paragraph sx={{ mb: 4 }}>
                Ingresa el código que enviamos a tu correo electrónico para
                empezar a gestionar tu institución
              </Typography>

              {error && (
                <Alert
                  severity={
                    error.includes("nuevo código") ? "success" : "error"
                  }
                  sx={{ mb: 3 }}
                >
                  {error}
                </Alert>
              )}

              {success && (
                <Alert severity="success" sx={{ mb: 3 }}>
                  Verificación exitosa. Redirigiendo al panel de
                  administración...
                </Alert>
              )}

              {/* Campos para el código de verificación */}
              <Box
                sx={{
                  mb: 4,
                  display: "flex",
                  justifyContent: "center",
                  gap: 1,
                }}
              >
                {verificationCode.map((digit, index) => (
                  <TextField
                    key={index}
                    inputRef={(el) => (inputRefs.current[index] = el)}
                    value={digit}
                    onChange={(e) => handleCodeChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={index === 0 ? handlePaste : undefined}
                    variant="outlined"
                    inputProps={{
                      maxLength: 1,
                      style: {
                        textAlign: "center",
                        fontSize: "1.5rem",
                        fontWeight: "bold",
                        width: "20px",
                        height: "40px",
                        padding: "8px",
                      },
                    }}
                    sx={{
                      width: "48px",
                      height: "56px",
                    }}
                  />
                ))}
              </Box>

              {/* Enlace para reenviar código */}
              <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
                <Button
                  onClick={handleResendCode}
                  disabled={resendLoading}
                  sx={{ textTransform: "none" }}
                >
                  {resendLoading ? (
                    <CircularProgress size={20} />
                  ) : (
                    "Enviar nuevo código"
                  )}
                </Button>
              </Box>

              {/* Botón para verificar el código */}
              <Button
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                disabled={!isCodeComplete || isLoading || success || !username}
                onClick={handleSubmit}
                sx={{
                  py: 1.5,
                  fontWeight: "bold",
                }}
              >
                {isLoading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Crear Cuenta"
                )}
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </MainLayout>
  );
};
