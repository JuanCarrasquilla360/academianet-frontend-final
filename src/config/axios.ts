import axios from 'axios';

// Creamos una instancia de axios con configuración predeterminada
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Interceptor para manejar tokens de autenticación
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar respuestas y errores
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    // Aquí podrías manejar el refresh token si es necesario
    if (error.response?.status === 401 && !originalRequest._retry) {
      // Implementar lógica de refresh token
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;