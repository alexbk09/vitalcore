import auth from "./../auth/auth";
import { API_URL } from "./../config/global.js";
import {
  addBenefits,
  updateBenefits,
  getBenefits,
  deleteBenefits,
  addPayment,
  updatePayment,
  getPayment,
  deletePayment,
  addBilling,
  updateBilling,
  getBilling,
  deleteBilling,
} from "./../infrastructure/services/contentConsultations.ts";
import { AlertUtils } from "../utils/alert.ts"
const ConfigAgreements = {
  namespaced: true,
  state: {
    selectedAgreement: JSON.parse(localStorage.getItem("selectedAgreement")) || null, // Restaurar desde localStorage
    contentCoverage: [],
    contentContracting: [],
    contentManual: [],
  },
  getters: {
    selectedAgreement: (state) => state.selectedAgreement,
    listContentCoverage: (state) => state.contentCoverage,
    listContentContracting: (state) => state.contentContracting,
    listContentManual: (state) => state.contentManual,
  },
  mutations: {
    SET_SELECTED_AGREEMENT(state, agreement) {
      state.selectedAgreement = agreement;
      localStorage.setItem("selectedAgreement", JSON.stringify(agreement)); // Guardar en localStorage
    },
    SET_CONTENT_COVERAGE(state, contentCoverage) {
      console.log("🚀 ~ SET_CONTENT_COVERAGE ~ contentCoverage:", contentCoverage)
      state.contentCoverage = contentCoverage;
    },
    SET_CONTENT_CONTRACTING(state, contentContracting) {
      state.contentContracting = contentContracting;
    },
    SET_CONTENT_MANUAL(state, contentManual) {
      state.contentManual = contentManual;
    },
  },
  actions: {
    setSelectedAgreement({ commit }, agreement) {
      commit("SET_SELECTED_AGREEMENT", agreement);
    },
    // Configuración de Cobertura
    async getCoverage({ commit }) {
      try {
        const response = await getBenefits();
        commit("SET_CONTENT_COVERAGE", response);
      } catch (error) {
        console.error("Error fetching permissions:", error);
      }
    },
    async SaveCoverage(_object, data) {
      try {
        let result;
        if (data.id) {
          result = await updateBenefits(data);
        } else {
          result = await addBenefits(data);
        }
        AlertUtils.success("Éxito", "Operación exitosa");
        return result;
      } catch (error) {
        Swal.fire("Error!", error, "error");
        return null;
      } finally {
        this.show = false;
      }
    },
    async deleteCoverage({ commit }, id) {
      try {
        const response = await deleteBenefits(id);
        if (response) {
          AlertUtils.success("Éxito", "Operación exitosa");
          return true;
        } else {
          AlertUtils.error("Error", "No se pudo eliminar el registro");
          return false;
        }
      } catch (error) {
        AlertUtils.error("Error", "No se pudo eliminar el registro");
        console.error("Error al eliminar el registro:", error);
        return false;
      } finally {
        this.show = false;
      }
    },

    //Configuración de Contratación
    async getContracting({ commit }) {
      try {
        const response = await getPayment();
        commit("SET_CONTENT_CONTRACTING", response);
      } catch (error) {
        console.error("Error fetching permissions:", error);
      }
    },
    async SaveContracting(_object, data) {
      try {
        let result;
        if (data.id) {
          result = await updatePayment(data);
        } else {
          result = await addPayment(data);
        }
        AlertUtils.success("Éxito", "Operación exitosa");
        return result;
      } catch (error) {
        Swal.fire("Error!", error, "error");
        return null;
      } finally {
        this.show = false;
      }
    },
    async deleteContracting({ commit }, id) {
      try {
        const response = await deletePayment(id);
        if (response) {
          AlertUtils.success("Éxito", "Operación exitosa");
          return true;
        } else {
          AlertUtils.error("Error", "No se pudo eliminar el registro");
          return false;
        }
      } catch (error) {
        AlertUtils.error("Error", "No se pudo eliminar el registro");
        console.error("Error al eliminar el registro:", error);
        return false;
      } finally {
        this.show = false;
      }
    },

    //Configuración de Manual
    async getManual({ commit }) {
      try {
        const response = await getBilling();
        commit("SET_CONTENT_MANUAL", response);
      } catch (error) {
        console.error("Error fetching permissions:", error);
      }
    },
    async SaveManual(_object, data) {
      try {
        let result;
        if (data.id) {
          result = await updateBilling(data);
        } else {
          result = await addBilling(data);
        }
        AlertUtils.success("Éxito", "Operación exitosa");
        return result;
      } catch (error) {
        Swal.fire("Error!", error, "error");
        return null;
      } finally {
        this.show = false;
      }
    },
    async deleteManual({ commit }, id) {
      try {
        const response = await deleteBilling(id);
        if (response) {
          AlertUtils.success("Éxito", "Operación exitosa");
          return true;
        } else {
          AlertUtils.error("Error", "No se pudo eliminar el registro");
          return false;
        }
      } catch (error) {
        AlertUtils.error("Error", "No se pudo eliminar el registro");
        console.error("Error al eliminar el registro:", error);
        return false;
      } finally {
        this.show = false;
      }
    },

  },
};

export default ConfigAgreements;
