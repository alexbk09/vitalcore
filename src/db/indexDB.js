export const connectDB = () => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open("MiBaseDeDatos", 1);
        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains("miObjectStore")) {
                db.createObjectStore("miObjectStore", { keyPath: "id", autoIncrement: true });
            }
        };

        request.onsuccess = (event) => {
            resolve(event.target.result);
        };

        request.onerror = (event) => {
            console.error("Error al conectar a IndexedDB:", event.target.error);
            reject(event.target.error);
        };
    });
};

export const insertElements = async (data) => {
    try {
        const db = await connectDB();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction("miObjectStore", "readwrite");
            const objectStore = transaction.objectStore("miObjectStore");

            const request = objectStore.add(data);

            request.onsuccess = () => {
                console.log("Elemento insertado:", data);
                resolve();
            };

            request.onerror = (event) => {
                console.error("Error al insertar elemento:", event.target.error);
                reject(event.target.error);
            };
        });
    } catch (error) {
        console.error("Error en insertElements:", error);
        throw error;
    }
};

export const getTechnicalFormFromIndexDB = async () => {
    return new Promise((resolve, reject) => {
        const requestDB = indexedDB.open("MiBaseDeDatos", 1); 

        requestDB.onsuccess = (event) => {
            const db = event.target.result;
            const transaction = db.transaction("miObjectStore", "readonly");
            const objectStore = transaction.objectStore("miObjectStore");
            const index = objectStore.index("formId");
            const requestData = index.get("technicalForm"); 

            requestData.onsuccess = () => {
                if (requestData.result) {
                    resolve(requestData.result); 
                } else {
                    reject("No se encontró el formulario con formId 'technicalForm'");
                }
            };

            requestData.onerror = (event) => {
                console.error("Error al obtener datos de IndexedDB:", event.target.error);
                reject(event.target.error);
            };
        };

        requestDB.onerror = (event) => {
            console.error("Error al conectar a IndexedDB:", event.target.error);
            reject(event.target.error);
        };
    });
};
