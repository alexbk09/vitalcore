import auth from "./../auth/auth";
import { API_URL } from "./../config/global.js";
import { AlertUtils } from "../utils/alert.ts";
import {
  getAgreementsData,
  getAgreementsConsultation,
  getGeoreferencingData,
  getMissionCompanyData,
  addAgreements,
  updateAgreements,
  updateContracted,
  addContracted,
  deleteContrated,
  getContractedData,
  getAgreementsIDData,
  addContractedSeat,
  updateContractedSeat,
  updateSeat,
  addSeat,
  getSeatContentData,
  addGeoreferencing,
  getContractedtData,
  getGeoreferencing,
  deleteGeoreferencing,
  addContact,
  getContact,
  deleteContact,
  addProduct,
  getProduct,
  deleteProduct,
  addMission,
  getMission,
  deleteMission,
  addDocuments,
  getDocuments,
  deleteDocuments,
  addPackages,
  updatePackages,
  getPackages,
  deletePackages,
} from "./../infrastructure/services/agreementsServices.ts";
const TradeAgreement = {
  namespaced: true,
  state: {
    selectedAgreement:
      JSON.parse(localStorage.getItem("selectedAgreement")) || null, // Restaurar desde localStorage
    agreements: [],
    georeferencing: [],
    missionCompany: [],
    contract: [],
    agreementsDetails: [],
    seat: [],
    contractId: [],
    georeferencing: [],
    contact: [],
    product: [],
    missionCompanies: [],
    documents: [],
    packages: [],
  },
  getters: {
    selectedAgreement: (state) => state.selectedAgreement,
    listAgreements: (state) => state.agreements,
    listGeoreferencing: (state) => state.georeferencing,
    listMissionCompany: (state) => state.missionCompany,
    listContracted: (state) => state.contract,
    listAgreementsDetails: (state) => state.agreementsDetails,
    listSeatData: (state) => state.seat,
    listContractId: (state) => state.contractId,
    listGeoreferencingData: (state) => state.georeferencing,
    listContact: (state) => state.contact,
    listProduct: (state) => state.product,
    listMissionC: (state) => state.missionCompanies,
    listDocuments: (state) => state.documents,
    listPackages: (state) => state.packages,
  },
  mutations: {
    SET_SELECTED_AGREEMENT(state, agreement) {
      state.selectedAgreement = agreement;
      localStorage.setItem("selectedAgreement", JSON.stringify(agreement)); // Guardar en localStorage
    },
    SET_AGREEMENTS(state, agreements) {
      state.agreements = agreements;
    },
    SET_AGREEMENTS_SELECT(state, agreements) {
      state.agreements = agreements;
    },
    SET_GEOREFERENCIN(state, georeferencing) {
      state.georeferencing = georeferencing;
    },
    SET_MISSIONCOMPANY(state, missionCompany) {
      state.missionCompany = missionCompany;
    },
    SET_CONTRACTED(state, contracted) {
      state.contract = contracted.data;
    },
    SET_AGREEMENTS_DETAILS(state, agreementsDetails) {
      state.agreementsDetails = agreementsDetails;
    },
    SET_SEAT(state, seat) {
        state.seat = seat;
    },
    SET_CONTRATED(state, contractId) {
      state.contractId = contractId;
    },
    SET_GEOREFERENCING(state, georeferencing) {
      state.georeferencing = georeferencing;
    },
    SET_CONTACT(state, contact) {
      state.contact = contact;
    },
    SET_PRODUCT(state, product) {
      state.product = product;
    },
    SET_MISSIONC(state, missionCompanies) {
      state.missionCompanies = missionCompanies;
    },
    SET_DOCUMENTS(state, documents) {
      state.documents = documents;
    },
    SET_PACKAGES(state, packages) {
      state.packages = packages;
    },
  },
  actions: {
    setSelectedAgreement({ commit }, agreement) {
      commit("SET_SELECTED_AGREEMENT", agreement);
    },
    async getAgreements({ commit }) {
      try {
        const response = await getAgreementsData();
        commit("SET_AGREEMENTS", response);
      } catch (error) {
        console.error("Error fetching permissions:", error);
      }
    },
    async SaveAgreements(_object, data) {
      try {
        let result;
        if (data.id_transfer) {
          result = await updateAgreements(data);
        } else {
          result = await addAgreements(data);
        }
        // Ya no mostramos alerta aquí, solo retornamos la respuesta
        return result;
      } catch (error) {
        // Retornamos el error para manejarlo en la vista
        return { error: true, message: error?.message || "Error desconocido" };
      } finally {
        this.show = false;
      }
    },
    async getAgreementsSelect({ commit }) {
      try {
        const response = await getAgreementsConsultation();
        commit("SET_AGREEMENTS_SELECT", response);
      } catch (error) {
        console.error("Error fetching permissions:", error);
      }
    },
    async getGeoreferencing({ commit }, data) {
      try {
        const response = await getGeoreferencingData(data);
        commit("SET_GEOREFERENCIN", response);
        return response;
      } catch (error) {
        console.error("Error fetching permissions:", error);
      }
    },
    async getMissionCompanyToEntity({ commit }, data) {
      try {
        const response = await getMissionCompanyData(data);
        commit("SET_MISSIONCOMPANY", response);
        return response;
      } catch (error) {
        console.error("Error fetching permissions:", error);
      }
    },
    async SaveContracted(_object, data) {
      try {
        let result;
        if (data.id) {
          result = await updateContracted(data);
        } else {
          result = await addContracted(data);
        }
        // Ya no mostramos alerta aquí, solo retornamos la respuesta
        return result;
      } catch (error) {
        // Retornamos el error para manejarlo en la vista
        return { error: true, message: error?.message || "Error desconocido" };
      } finally {
        this.show = false;
      }
    },
    async deleteContracted({ commit }, data) {
      try {
        const response = await deleteContrated(data);
        AlertUtils.success("Éxito", "Operación exitosa");
        return response;
      } catch (error) {
        AlertUtils.error("Error!", error, "error");
        return null;
      } finally {
        this.show = false;
      }
    },
    async getContracted({ commit }, data) {
      try {
        const response = await getContractedData(data);
        commit("SET_CONTRACTED", response);
      } catch (error) {
        console.error("Error fetching permissions:", error);
      }
    },
    async getAgreementsDetails({ commit }, data) {
      try {
        const response = await getAgreementsIDData(data);
        commit("SET_AGREEMENTS_DETAILS", response);
      } catch (error) {
        console.error("Error fetching permissions:", error);
      }
    },
    async SaveContractedSeat(_object, data) {
      try {
        let result;
        if (data.id) {
          result = await updateContractedSeat(data);
        } else {
          result = await addContractedSeat(data);
        }
        // Ya no mostramos alerta aquí, solo retornamos la respuesta
        return result;
      } catch (error) {
        // Retornamos el error para manejarlo en la vista
        return { error: true, message: error?.message || "Error desconocido" };
      } finally {
        this.show = false;
      }
    },
    async saveSeat(_object, data) {
      try {
        let result;
        if (data.contracted_id) {
          result = await updateSeat(data);
        } else {
          result = await addSeat(data);
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
    async getSeatData({ commit }, data) {
      try {
        const response = await getSeatContentData(data);
        commit("SET_SEAT", response);
        return response;
      } catch (error) {
        console.error("Error fetching permissions:", error);
      }
    },
    async getContractedtData({ commit }, data) {
      try {
        const response = await getContractedtData(data);
        commit("SET_CONTRATED", response);
        return response;
      } catch (error) {
        console.error("Error fetching permissions:", error);
      }
    },
    async saveGeoreferencing(_object, data) {
      try {
        let result = await addGeoreferencing(data);
        return result;
      } catch (error) {
        AlertUtils.error("Error!", error, "error");
        return null;
      } finally {
        this.show = false;
      }
    },
    async getGeoreferencingData({ commit }, data) {
        try {
          const response = await getGeoreferencing(data);
          commit("SET_GEOREFERENCING", response);
          return response;
        } catch (error) {
          console.error("Error fetching permissions:", error);
        }
    },
    async deleteGeoreferencingData({ commit }, data) {
      try {
        const response = await deleteGeoreferencing(data);
        AlertUtils.success("Éxito", "Operación exitosa");
        return response;
      } catch (error) {
        AlertUtils.error("Error!", error, "error");
        return null;
      } finally {
        this.show = false;
      }
    },
    async saveContact(_object, data) {
      try {
        let result = await addContact(data);
        return result;
      } catch (error) {
        AlertUtils.error("Error!", error, "error");
        return null;
      } finally {
        this.show = false;
      }
    },
    async getContactData({ commit }, data) {
        try {
          const response = await getContact(data);
          commit("SET_CONTACT", response);
          return response;
        } catch (error) {
          console.error("Error fetching permissions:", error);
        }
    },
    async deleteContactData({ commit }, data) {
      try {
        const response = await deleteContact(data);
        AlertUtils.success("Éxito", "Operación exitosa");
        return response;
      } catch (error) {
        AlertUtils.error("Error!", error, "error");
        return null;
      } finally {
        this.show = false;
      }
    },
    async saveProduct(_object, data) {
      try {
        let result = await addProduct(data);
        return result;
      } catch (error) {
        AlertUtils.error("Error!", error, "error");
        return null;
      } finally {
        this.show = false;
      }
    },
    async getProductData({ commit }, data) {
        try {
          const response = await getProduct(data);
          commit("SET_PRODUCT", response);
          return response;
        } catch (error) {
          console.error("Error fetching permissions:", error);
        }
    },
    async deleteProductData({ commit }, data) {
      try {
        const response = await deleteProduct(data);
        AlertUtils.success("Éxito", "Operación exitosa");
        return response;
      } catch (error) {
        AlertUtils.error("Error!", error, "error");
        return null;
      } finally {
        this.show = false;
      }
    },
    async saveMissionCompanies(_object, data) {
      try {
        let result = await addMission(data);
        return result;
      } catch (error) {
        AlertUtils.error("Error!", error, "error");
        return null;
      } finally {
        this.show = false;
      }
    },
    async getMissionCompaniesData({ commit }, data) {
        try {
          const response = await getMission(data);
          commit("SET_MISSIONC", response);
          return response;
        } catch (error) {
          console.error("Error fetching permissions:", error);
        }
    },
    async deleteMissionCompaniesData({ commit }, data) {
      try {
        const response = await deleteMission(data);
        AlertUtils.success("Éxito", "Operación exitosa");
        return response;
      } catch (error) {
        AlertUtils.error("Error!", error, "error");
        return null;
      } finally {
        this.show = false;
      }
    },
    async saveDocuments(_object, data) {
      try {
        let result = await addDocuments(data);
        return result;
      } catch (error) {
        AlertUtils.error("Error!", error, "error");
        return null;
      } finally {
        this.show = false;
      }
    },
    async getDocumentsData({ commit }, data) {
        try {
          const response = await getDocuments(data);
          commit("SET_DOCUMENTS", response);
          return response;
        } catch (error) {
          console.error("Error fetching permissions:", error);
        }
    },
    async deleteDocumentsData({ commit }, data) {
      try {
        const response = await deleteDocuments(data);
        AlertUtils.success("Éxito", "Operación exitosa");
        return response;
      } catch (error) {
        AlertUtils.error("Error!", error, "error");
        return null;
      } finally {
        this.show = false;
      }
    },

    async savePackages(_object, data) {
      try {
        let result;
        if (data.contracted_id) {
          result = await updatePackages(data);
        } else {
          result = await addPackages(data);
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
/*     async savePackages(_object, data) {
      try {
        let result = await addPackages(data);a

        return result;
      } catch (error) {
        AlertUtils.error("Error!", error, "error");
        return null;
      } finally {
        this.show = false;
      }
    }, */
    async getPackagesData({ commit }, data) {
        try {
          const response = await getPackages(data);
          commit("SET_PACKAGES", response);
          return response;
        } catch (error) {
          console.error("Error fetching permissions:", error);
        }
    },
    async deletePackagesData({ commit, state }, data) {
      try {
        const response = await deletePackages(data);
        if (response.status) {
          // Filtrar el paquete eliminado del estado actual
          const updatedPackages = state.packages.filter(pkg => pkg.id !== data.id);
          commit("SET_PACKAGES", updatedPackages);
          AlertUtils.success("Éxito", "Operación exitosa");
        }
        return response;
      } catch (error) {
        AlertUtils.error("Error!", error, "error");
        return null;
      } finally {
        this.show = false;
      }
    },
  },
};
export default TradeAgreement;
