import axios, { AxiosError, AxiosResponse } from "axios";
import { ApiResponse, Institution } from "../types";

// Configuración base de Axios
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 segundos
});

// Interceptor para agregar token de autenticación si existe
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para manejar respuestas y errores
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Token expirado o inválido
      localStorage.removeItem("auth_token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// Función genérica para procesar respuestas
const handleResponse = <T>(response: AxiosResponse): ApiResponse<T> => {
  return {
    success: true,
    data: response.data,
  };
};

// Función genérica para procesar errores
const handleError = (error: any): ApiResponse<any> => {
  const errorMsg =
    error.response?.data?.message || error.message || "Error desconocido";
  return {
    success: false,
    error: errorMsg,
  };
};

// Servicios específicos de la API
export const api = {
  // Instituciones
  institutions: {
    getAll: async (): Promise<ApiResponse<Institution[]>> => {
      try {
        const response = await apiClient.get("/institutions");
        return handleResponse(response);
      } catch (error) {
        return handleError(error);
      }
    },

    getById: async (id: string): Promise<ApiResponse<Institution>> => {
      try {
        const response = await apiClient.get(`/institutions/${id}`);
        return handleResponse(response);
      } catch (error) {
        return handleError(error);
      }
    },

    search: async (query: string): Promise<ApiResponse<Institution[]>> => {
      try {
        const response = await apiClient.get("/institutions/search", {
          params: { q: query },
        });
        return handleResponse(response);
      } catch (error) {
        return handleError(error);
      }
    },
  },

  // Programas académicos
  programs: {
    getByInstitution: async (
      institutionId: string
    ): Promise<ApiResponse<any[]>> => {
      try {
        const response = await apiClient.get(
          `/institutions/${institutionId}/programs`
        );
        return handleResponse(response);
      } catch (error) {
        return handleError(error);
      }
    },
  },

  // Solicitudes de admisión
  applications: {
    create: async (data: any): Promise<ApiResponse<any>> => {
      try {
        const response = await apiClient.post("/applications", data);
        return handleResponse(response);
      } catch (error) {
        return handleError(error);
      }
    },
  },
};
