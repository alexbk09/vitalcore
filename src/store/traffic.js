import auth from "./../auth/auth";
import { API_URL } from "./../config/global.js";
import { followUpGet, savefollowUp } from "../infrastructure/services/contentConsultations.ts"
import { getHistoryDataTraffic } from "../infrastructure/services/historyServices.ts"
import {AlertUtils} from "../utils/alert.ts"
const Traffic = {
  namespaced: true,
  state: {
    trafficType: [],
    trafficTypeId: [],
    followUp: [],
    doctor: [],
  },
  
  mutations: {
    settrafficType(state, data) {
      state.trafficType = data;
    },
    settrafficTypeEmpty(state) {
      state.trafficTypeId = [];
    },
    setDoctor(state, data) {
      if (data.status) {
        state.doctor = data.content;
      }
    },
    setFollowUp(state, followUpData) {
      if (followUpData && typeof followUpData === 'object') {
        state.followUp = followUpData;
      } else {
        console.error('Datos inválidos en setFollowUp:', followUpData);
      }
    },
    setFollowUpEmpty(state) {
      state.followUp = [];
    },
  },
  getters: {
    gettraffic(state) {
      return state.trafficType;
    },
    getDoctorData(state) {
      return state.doctor;
    },
    getFollow(state) {
      return state.followUp;
    },
  },
  actions: {
    async gettrafficFilters({ commit }, data) {
      try {
        const response = await getHistoryDataTraffic(data);
        console.log("🚀 ~ gettrafficFilters ~ response:", response)
        commit("settrafficType", response);
      } catch (error) {
        console.error("Error fetching permissions:", error);
      }
    },



    async searchDoctor({ commit }) {
      this.user = [];
      let config = {
        method: "GET",
        headers: {
          Authorization: "Bearer " + auth.getUserLogged(),
        },
      };
      const respuesta = await fetch(`${API_URL}get/doctor`, config);
      const datos = await respuesta.json();
      if (datos.status) {
        commit("setDoctor", datos);
        return;
      }
    },
    async updateHourBooking(_, params) {
      const { key_doctor, key_history, startDate } = params;
      let config = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.getUserLogged(),
        },
        body: JSON.stringify({
          key_doctor,
          key_history,
          startDate,
        }),
      };
      try {
        const response = await fetch(`${API_URL}update/history`, config);
        const data = await response.json();
        if (!data.status) {
          alert("Error al actualizar la hora de la cita");
        }
      } catch (error) {
        alert("Error al actualizar la hora de la cita");
      }
    },

    async addFollowUp(_object, data) {
      try {
        const result = await savefollowUp(data);
        
        AlertUtils.success("Éxito", "Operación exitosa");
        return result;
      } catch (error) {
        AlertUtils.error("Error!", error, "error");
        return null;
      } finally {
        this.show = false;
      }
    },
    async getFollowUp({ commit }, data) {
      try {
        const response = await followUpGet(data);
        commit("setFollowUp", response);
      } catch (error) {
        console.error("Error fetching permissions:", error);
      }
    },
  },
};

export default Traffic;