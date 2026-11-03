import axios from "axios";
import Swal from "sweetalert2";
import { API_URL } from "./globalConst";

axios.defaults.baseURL = API_URL;


axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("apiKey");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      // Error de respuesta del servidor
      switch (error.response.status) {
        case 401:
          localStorage.removeItem("apiKey");
          // Aquí necesitaríamos acceso al router para redirigir
          window.location.href = "/login";
          return Promise.reject("Sesión expirada, por favor inicia sesión nuevamente");
        case 403:
          return Promise.reject("No tienes permisos para realizar esta acción");
        case 404:
          return Promise.reject("Recurso no encontrado");
        case 405:
          return Promise.reject("El metodo no esta permitido");
        case 429:
          return Promise.reject("Demasiadas solicitudes, por favor, intenta nuevamente más tarde");
        case 413:
          return Promise.reject("El tamaño de la solicitud excede el límite permitido");
        case 500:
          return Promise.reject("Error interno del servidor");
        case 502:
          return Promise.reject("Error en la conexión. Por favor, verifica tu conexión.");
        case 422:
          if (error.response.data) {
            const validationErrors = error.response.data.error || error.response.data.errors;
            const errorMessages = Object.values(validationErrors).flat();
            return Promise.reject(errorMessages.join(', '));
          }
          return Promise.reject("Error en la validación de los datos");
        default:
          return Promise.reject(`Error: ${error.response.statusText}`);
      }
    } else if (error.request) {
      // Error de red
      return Promise.reject("Error en la conexión. Por favor, verifica tu conexión.");
    } else {
      // Error en la configuración
      return Promise.reject("Error en la solicitud");
    }
  }
);

export class CrudServices {

  static async get(url: string, params: any = {}, headers: any = {}) {
    try {
      const response = await axios.get(url, { params, headers });
      return response.data;
    } catch (error) {
      console.error(error);
      ErrorsCrudServices.getErrors(error);
      return null;
    }
  }

  static async post(url: string, data: any = {}, headers: any = {}) {
    try {
      const response = await axios.post(url, data, { headers });
      return response.data;
    } catch (error) {
      console.error(error);
      ErrorsCrudServices.getErrors(error);
      return null;
    }
  }

  static async put(url: string, data: any = {}, headers: any = {}) {
    try {
      const response = await axios.put(url, data, { headers });
      return response.data;
    } catch (error) {
      console.error(error);
      ErrorsCrudServices.getErrors(error);
      return null;
    }
  }

  static async delete(url: string, headers: any = {}) {
    try {
      const response = await axios.delete(url, { headers });
      return response;
    } catch (error) {
      console.error(error);
      ErrorsCrudServices.getErrors(error);
      return null;
    }
  }
}

export class ErrorsCrudServices {
  static async getErrors(error: any) {
    Swal.fire("Tenemos el siguiente error!", error, "error");
    return error;
  }
}