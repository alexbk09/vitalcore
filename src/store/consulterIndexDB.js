import store from "./index";

const getTechnicalFormFromIndexDB = async () => {
    return new Promise((resolve, reject) => {
        const requestDB = indexedDB.open("MiBaseDeDatos", 1); 

        requestDB.onsuccess = (event) => {
            const db = event.target.result;
            const transaction = db.transaction("miObjectStore", "readonly");
            const objectStore = transaction.objectStore("miObjectStore");
            const requestData = objectStore.getAll(); 
            requestData.onsuccess = () => {
                const formData = requestData.result.find(item => item.formId === 'technicalForm');
                resolve(formData); 
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

const ConsulterIndexDB = {
    namespaced: true,
    state: {},
    mutations: {},
    actions: {
        async fetchAndSendDataToServer({ commit }, data) {
            try {
                const formData = await getTechnicalFormFromIndexDB();
                if (formData) {
                    //await updateTechnical(formData, data); 
                    store.dispatch('history/updateTechnical', { formData, data });
                    //console.log("Datos enviados correctamente al servidor", formData);
                } else {
                    //console.log("No se encontró el formulario 'technicalForm' en IndexedDB");
                }
            } catch (error) {
                console.error("Error al obtener o enviar los datos:", error);
            }
        }
    },
    mutations: {},
    getters: {}
};

export default ConsulterIndexDB;