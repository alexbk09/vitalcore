import { insertElements } from "../db/indexDB";

export const createElements = async (data) => {
    if (!data || typeof data !== "object") {
        console.error("Datos inválidos proporcionados a createElements:", data);
        throw new Error("El formato de datos es incorrecto.");
    }

    try {
        await insertElements(data);
        console.log("Datos insertados correctamente en IndexedDB.");
    } catch (error) {
        console.error("Error en createElements:", error);
        throw error; 
    }
};
