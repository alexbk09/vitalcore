import { AlertUtils } from "../utils/alert.ts";
import {
  addVaccination,
  updateVaccination,
  getVaccination,
  getRecord,
  addRecord,
  addTechnical,
  updateTechnical,
  
} from "./../infrastructure/services/historyServices.ts";
const HistoryData = {
  namespaced: true,
  state: {
    vaccination: [],
    record: [],
  },
  getters: {
    listVaccination(state) {
      return state.vaccination;
    },
    listRecord(state) {
      return state.record;
    },
  },
  mutations: {
    setVacucination(state, payload) {
      state.vaccination = payload;
    },
    setRecord(state, payload) {
      console.log("🚀 ~ setRecord ~ payload:", payload)
      state.record = payload;
    },
  },
  actions: {
    async saveVaccine(_object, data) {
      try {
        let result;
        if (data.id) {
          result = await updateVaccination(data);
        } else {
          result = await addVaccination(data);
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
    async getVaccineDetails({ commit }, data) {
      try {
        const response = await getVaccination(data);
        commit("setVacucination", response);
      } catch (error) {
        console.error("Error al obtener la información:", error);
      }
    },

    addRecord(_object, data) {
      try {
        const response = addRecord(data);
        AlertUtils.success("Éxito", "Operación exitosa");
        return response;
      } catch (error) {
        AlertUtils.error("Error!", error, "error");
        return null;
      } finally {
        this.show = false;
      }
    },
    async getRecordDetails({ commit }, data) {
      try {
        const response = await getRecord(data);
        commit("setRecord", response);
      } catch (error) {
        console.error("Error al obtener la información:", error);
      }
    },
    async saveTechnical(_object, data) {
      try {
        let result;
        if (data.id) {
          result = await updateTechnical(data);
        } else {
          result = await addTechnical(data);
        }
        console.log("🚀 ~ saveTechnical ~ result:", result)
        AlertUtils.success("Éxito", "Operación exitosa");
        return result;
      } catch (error) {
        AlertUtils.error("Error!", error, "error");
        return null;
      } finally {
        this.show = false;
      }
        
    },
  },
};
export default HistoryData;
