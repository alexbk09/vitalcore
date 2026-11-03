import { createStore } from "vuex";
import Users from "./users";
import Rol from './rol';
import Permit from './permissions';
import Seat from './seat';
import Models from './models';
import Vehicle from './vehicle';
import EventType from './eventtype';
import Request from './request';
import Attention from './attention';

import Transfer from './transfer';
import Evaluation from './evaluation';
import Agreements from './agreements';
import Cups from './cups';
import ServiceOrder from './serviceOrder';
import PaymentMethod from './paymentMethod';
import DocumentType from './documentType';
import Municipality from './municipality';
import History from './history';
import Auth from './auth';
import State from './state';
import BillingStore from './billing';
import Products from "./products";
import Traffic from "./traffic";
import Record from "./record";
import Procedures from "./procedure"
import Inventory from "./inventory"
import Errors from "./errors"
import ConsulterIndexDB from "./consulterIndexDB"
import ConfigAgreements from "./configAgreements"
import TradeAgreement from "./tradeAgreement"
import OrderService from "./orderService"
import ContentConsultations from "./contentConsultations"
import HistoryData from "./historyData"
import Quotes from "./quotes"

export default createStore({   
  state: {
    hideConfigButton: false,
    isPinned: true,
    showConfig: false,
    sidebarType: "bg-white",
    isRTL: false,
    mcolor: "",
    darkMode: false,
    isNavFixed: false,
    isAbsolute: false,
    showNavs: true,
    showSidenav: true,
    showNavbar: true,
    showFooter: true,
    showMain: true,
    layout: "default",
    sidebarVisible: true,
    isMenuCollapsed: false
  },
  mutations: {
    toggleConfigurator(state) {
      state.showConfig = !state.showConfig;
    },
    navbarMinimize(state) {
      const sidenav_show = document.querySelector(".g-sidenav-show");
  
      if (sidenav_show) {
        if (sidenav_show.classList.contains("g-sidenav-hidden")) {
          sidenav_show.classList.remove("g-sidenav-hidden");
          sidenav_show.classList.add("g-sidenav-pinned");
          state.isPinned = true;
        } else {
          sidenav_show.classList.add("g-sidenav-hidden");
          sidenav_show.classList.remove("g-sidenav-pinned");
          state.isPinned = false;
        }
      } else {
        console.error('No se encontró el elemento con la clase "g-sidenav-show".');
      }
    },
    toggleSidebar(state) {
      state.sidebarVisible = !state.sidebarVisible;
    },
    toggleMenuCollapsed(state) {
      state.isMenuCollapsed = !state.isMenuCollapsed;
    },
    sidebarType(state, payload) {
      state.sidebarType = payload;
    },
    navbarFixed(state) {
      if (state.isNavFixed === false) {
        state.isNavFixed = true;
      } else {
        state.isNavFixed = false;
      }
    }
  },
  actions: {
    toggleSidebarColor({ commit }, payload) {
      commit("sidebarType", payload);
    }
  },
  getters: {},
  modules:{
    Users,
    Rol,
    Permit,
    Seat,
    Models,
    Vehicle,
    EventType,
    Request,
    Attention,
    Transfer,
    Evaluation,
    Agreements,
    Cups,
    ServiceOrder,
    PaymentMethod,
    DocumentType,
    Municipality,
    History,
    Auth,
    State,
    BillingStore,
    Products,
    Traffic,
    Record,
    Procedures,
    Inventory,
    Errors,
    ConsulterIndexDB,
    ConfigAgreements,
    TradeAgreement,
    OrderService,
    ContentConsultations,
    HistoryData,
    Quotes
  }
});
