import { 
  getHistoryDataFilter,
  updateOrderService,
  addOrderService,
  getIDOrderService 
} from "../infrastructure/services/orderService_services.ts";
import { getHistoryService } from "../infrastructure/services/historyServices.ts";
import { getPatientsData } from "../infrastructure/services/patientServices.ts";
import { AlertUtils } from "../utils/alert.ts"; // Importación nombrada
const OrderService = {
  namespaced: true,
  state: {
    serviceOrder: [],
    patientData: [],
    serviceOrderDetails: [],
    historyData: [],
  },
  getters: {
    getServiceOrder(state) {
      return state.serviceOrder;
    },
    listPatients(state) {
      return state.patientData;
    },
    listServiceOrderDetails(state) {
      return state.serviceOrderDetails;
    },
    listHistoryData(state) {
      return state.historyData;
    },
  },
  mutations: {
    setOrderService(state, data) {
        if (data) {
            state.serviceOrder = data;
        }
    },
    setPatientData(state, data) {
      if (data) {
        state.patientData = data;
      }
    },
    setOrderServiceData(state, data) {
      if (data) {
        state.serviceOrderDetails = data;
      }
    },
    setHistoryData(state, data) {
      if (data) {
        state.historyData = data;
      }
    },
  },
  actions: {
    async getOrderServiceFilters({ commit }, data) {
      try {
        const response = await getHistoryDataFilter(data);
        commit("setOrderService", response);
      } catch (error) {
        console.error("Error al obtener la información:", error);
      }
    },
    async getPatients({ commit }, data) {
      try {
        const response = await getPatientsData(data);
        commit("setPatientData", response);
      } catch (error) {
        console.error("Error al obtener la información:", error);
      }
    },
    clearPatientData({ commit }) {
      commit("setPatientData", []);
    },
    async saveOrderService(_object, data) {
      try {
        let result;
        if (data.id) {
          result = await updateOrderService(data);
        } else {
          result = await addOrderService(data);
        }
        AlertUtils.success("Éxito", "Operación exitosa");
        return result;
      } catch (error) {
        AlertUtils.error("Error!", error, "error");
        return null;
      } finally {
        this.show = false;
      }
    },
    async getOrderServiceDetails({ commit }, data) {
      try {
        const response = await getIDOrderService(data);
        commit("setOrderServiceData", response);
      } catch (error) {
        console.error("Error al obtener la información:", error);
      }
    },
    async getHistoryDataDetails({ commit }, data) {
      try {
        const response = await getHistoryService(data);
        commit("setHistoryData", response);
      } catch (error) {
        console.error("Error al obtener la información:", error);
      }
    },
  },
};

export default OrderService;