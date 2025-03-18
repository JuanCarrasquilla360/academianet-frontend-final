import axios from "axios";

// Configuración base para las peticiones a la API
const API_BASE_URL =
  "https://hdvcvqqro4.execute-api.us-east-1.amazonaws.com/dev";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interfaz para los datos de registro
interface RegistrationData {
  nombre: string;
  apellido: string;
  nombreLegalInstitucion: string;
  abreviacionNombre: string;
  correoElectronico: string;
  contrasena: string;
}

// Interfaz para la respuesta de registro
interface RegistrationResponse {
  username: string;
  message: string;
  success: boolean;
}

// Interfaz para la verificación de código
interface VerificationData {
  username: string;
  code: string;
}

// Interfaz para la respuesta de verificación
interface VerificationResponse {
  message: string;
  success: boolean;
}

// Servicio de autenticación
export const authService = {
  // Registrar un nuevo administrador
  registerAdmin: async (
    data: RegistrationData
  ): Promise<RegistrationResponse> => {
    try {
      const response = await apiClient.post("/register", data);

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        // Devolver el mensaje de error de la API si existe
        throw new Error(error.response.data.message || "Error en el registro");
      }
      throw new Error("Error al conectar con el servidor");
    }
  },

  // Verificar el código enviado por correo
  verifyEmail: async (
    data: VerificationData
  ): Promise<VerificationResponse> => {
    try {
      const response = await apiClient.post("/verify-email", data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        // Devolver el mensaje de error de la API si existe
        throw new Error(
          error.response.data.message || "Error en la verificación"
        );
      }
      throw new Error("Error al conectar con el servidor");
    }
  },

  // Reenviar el código de verificación
  resendVerificationCode: async (
    username: string
  ): Promise<{ message: string }> => {
    try {
      const response = await apiClient.post("/resend-verification-code", { username });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(
          error.response.data.message || "Error al reenviar el código"
        );
      }
      throw new Error("Error al conectar con el servidor");
    }
  },
};
