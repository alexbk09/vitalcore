import Toastify from "toastify-js";
import { Router } from "vue-router";

const showToast = (message: string, type: "error" | "success") => {
  Toastify({
    text: message,
    duration: 3000,
    gravity: "top",
    position: "right",
    backgroundColor: type === "error" ? "#e74c3c" : "#27ae60",
    stopOnFocus: true,
  }).showToast();
};

export const fetchWithAuth = async (
  url: string,
  config: RequestInit = {},
  router: Router,
): Promise<any | null> => {
  const token = localStorage.getItem("apiKey");

  // Añadir el token de autenticación en el encabezado de la solicitud
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  try {
    const response = await fetch(url, config);

    // Verificar si la sesión ha expirado
    if (response.status === 401) {
      localStorage.removeItem("apiKey");
      showToast("Sesión expirada, por favor inicia sesión nuevamente", "error");
      router.push({ name: "login" });
      return null;
    }

    // Manejo de errores HTTP genéricos
    if (!response.ok) {
      showToast(`Error: ${response.statusText}`, "error");
      return null;
    }

    // Si la respuesta es correcta, intentar devolver el JSON
    try {
      return await response.json();
    } catch (jsonError) {
      showToast("Error al procesar la respuesta del servidor", "error");
      return null;
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
    showToast(
      "Error en la solicitud. Por favor, verifica tu conexión.",
      "error",
    );
    return null;
  }

};
