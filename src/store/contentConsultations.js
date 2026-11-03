
import { 
    getTypeDocuments,
    getDepartmentData,
    getMunicipalityData,
    getLocalityData,
    getSeatData,
    getVehicleData,
    getRequestData,
    getEventsData,
    getProductData,
    getDoctorData,
    getConsulterCupsData,
    getConsulterProData,
    getDriverData   
    } from '../infrastructure/services/contentConsultations.ts'
const ContentConsultations = {
    namespaced: true,
    state: {
        typeDocuments: [],
        departaments: [],
        municipality: [],
        locality: [],
        seat: [],
        vehicle: [],
        request: [],
        events: [],
        product: [],
        doctor: [],
        consulterProductOrCups: [],
        medicines: [],
        driver: [],
    },
    getters: {
        listTypeDocuments(state) {
            return state.typeDocuments;
        },
        listDepartaments(state) {
            return state.departaments;
        },
        listMunicipality(state) {
            return state.municipality;
        },
        listLocality(state) {
            return state.locality;
        },
        listSeat(state) {
            return state.seat;
        },
        listVehicle(state) {
            return state.vehicle;
        },
        listRequest(state) {
            return state.request;
        },
        listEvents(state) {
            return state.events;
        },
        listProduct(state) {
            return state.product;
        },
        listDoctor(state) {
            return state.doctor;
        },
        listConsulterProductOrCups(state) {
            return state.consulterProductOrCups;
        },
        listMedicines(state) {
            return state.medicines;
        },
        listDriver(state) {
            return state.driver;
        },
    },
    mutations: {
        setTypeDocuments(state, data) {
            if (data) {
                state.typeDocuments = data;
            }
        },
        setTypeDocumentsEmpty(state) {
            state.typeDocuments = [];
        },
        setDepartaments(state, data) {
            if (data) {
                state.departaments = data;
            }
        },
        setMunicipality(state, data) {
            if (data) {
                state.municipality = data;
            }
        },
        setLocality(state, data) {
            if (data) {
                state.locality = data;
            }
        },
        setSeat(state, data) {
            if (data) {
                state.seat = data;
            }
        },
        setVehicle(state, data) {
            if (data) {
                state.vehicle = data;
            }
        },
        setRequest(state, data) {
            if (data) {
                state.request = data;
            }
        },
        setEvents(state, data) {
            if (data) {
                state.events = data;
            }
        },
        setProduct(state, data) {
            if (data) {
                state.product = data;
            }
        },
        setDoctor(state, data) {
            if (data) {
                state.doctor = data;
            }
        },
        setConsulterProductOrCups(state, data) {
            if (data) {
                state.consulterProductOrCups = data;
            }
        },
        setMedicines(state, data) {
            if (data) {
                state.medicines = data;
            }
        },
        setDriver(state, data) {
            if (data) {
                state.driver = data;
            }
        },
    },
    actions: {
        async getTypeDocuments({ commit }, data) {
            try {
                const response = await getTypeDocuments(data);
                commit("setTypeDocuments", response);
                return response;
            } catch (error) {
                console.error("Error fetching permissions:", error);
            }
        },
        async getDepartaments({ commit }) {
            try {
                const response = await getDepartmentData();
                commit("setDepartaments", response);
            } catch (error) {
                console.error("Error fetching permissions:", error);
            }
        },
        async getMunicipality({ commit }, data) {
            try {
                const response = await getMunicipalityData(data);
                commit("setMunicipality", response);
            } catch (error) {
                console.error("Error fetching permissions:", error);
            }
        },
        async getLocality({ commit }, data) {
            try {
                const response = await getLocalityData(data);
                commit("setLocality", response);
            } catch (error) {
                console.error("Error fetching permissions:", error);
            }
        },
        async getSeat({ commit }, data) {
            try {
                const response = await getSeatData(data);
                commit("setSeat", response);
            } catch (error) {
                console.error("Error fetching permissions:", error);
            }
        },
        async getVehicle({ commit }, data) {
            try {
                const response = await getVehicleData(data);
                commit("setVehicle", response);
            } catch (error) {
                console.error("Error fetching permissions:", error);
            }
        },
        async getRequest({ commit }, data) {
            try {
                const response = await getRequestData(data);
                commit("setRequest", response);
            } catch (error) {
                console.error("Error fetching permissions:", error);
            }
        },
        async getEvents({ commit }, data) {
            try {
                const response = await getEventsData(data);
                commit("setEvents", response);
            } catch (error) {
                console.error("Error fetching permissions:", error);
            }
        },
        async getProduct({ commit }) {
            try {
                const response = await getProductData();
                commit("setProduct", response);
            } catch (error) {
                console.error("Error fetching permissions:", error);
            }
        },
        async getDoctor({ commit }, data) {
            try {
                const response = await getDoctorData(data);
                commit("setDoctor", response);
            } catch (error) {
                console.error("Error fetching permissions:", error);
            }
        },
        async getDriver({ commit }, data) {
            try {
                const response = await getDriverData(data);
                commit("setDriver", response);
            } catch (error) {
                console.error("Error fetching permissions:", error);
            }
        },
        async getConsulterProductOrCups({ commit }, data) {
            try {
                const response = await getConsulterCupsData(data);
                commit("setConsulterProductOrCups", response);
            } catch (error) {
                console.error("Error fetching permissions:", error);
            }
        },
        async getMedicines({ commit }, data) {
            try {
                const response = await getConsulterProData(data);
                commit("setMedicines", response);
            } catch (error) {
                console.error("Error fetching permissions:", error);
            }
        },
        
    },
}
export default ContentConsultations;