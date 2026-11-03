import auth from "./../auth/auth";
import { API_URL } from "./../config/global.js";
import {
  followUpGet,
  savefollowUp,
} from "../infrastructure/services/contentConsultations.ts";
import { getHistoryDataTraffic } from "../infrastructure/services/historyServices.ts";
import { AlertUtils } from "../utils/alert.ts";
import { getQuotesConsult,addQuoteHistory } from "../infrastructure/services/quotesServices.ts";
const Quotes = {
  namespaced: true,
  state: {
    quotesConsult: [],
  },
  mutations: {
    SET_QUOTES_CONSULT(state, quotesConsult) {
      state.quotesConsult = quotesConsult;
    },
  },
  getters: {
    listQuotesConsult(state) {
      return state.quotesConsult;
    },
  },
  actions: {
    async getQuotesConsult({ commit }, data) {
      const response = await getQuotesConsult(data);
      commit("SET_QUOTES_CONSULT", response);
    },
    async saveQuote(_object, data) {
      try {
        let result = await addQuoteHistory(data);
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

export default Quotes;
