import { createRouter, createWebHashHistory } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Profile from "../views/Profile.vue";
import AddRol from "../views/components/Users/rols/addRol.vue";
import FormUser from "../views/components/Users/user/formUser.vue";
import Signin from "../views/Signin.vue";
import SeatList from "../views/components/Seat/seatList.vue";
import Formseat from "../views/components/Seat/formSeat.vue";
import UsersList from "../views/components/Users/user/userList.vue";
import Formuser from "../views/components//Users/user/formUser.vue";
import RolList from "../views/components/Users/rols/rolList.vue";
import Formrol from "../views/components//Users/rols/addRol.vue";
import VehicleList from "../views/components/Vehicle/vehicleList.vue";
import VehicleDestination from "../views/components/Vehicle/formDestination.vue";
import Formvehicle from "../views/components/Vehicle/formVehicle.vue";
import EventList from "../views/components/EventType/eventList.vue";
import Formevent from "../views/components/EventType/formEvent.vue";
import RequestList from "../views/components/Request/requestList.vue";
import Formrequest from "../views/components/Request/formRequest.vue";
import AttentiontList from "../views/components/Attention/attentionList.vue";
import Formattention from "../views/components/Attention/formAttention.vue";
import EvaluationList from "../views/components/Evaluation/evaluationList.vue";
import Formevaluation from "../views/components/Evaluation/formEvaluation.vue";
import AgreementsList from "../views/components/Agreements/agreementsList.vue";
import Formagreements from "../views/components/Agreements/formAgreements.vue";

import tradeAgreementsList from "../views/components/TradeAgreement/agreementList.vue";
import tradeAgreementsForm from "../views/components/TradeAgreement/formAgreement.vue";
import contracConfigList from "../views/components/TradeAgreement/contractList.vue";
import contracConfig from "../views/components/TradeAgreement/configContractDetails.vue";


import ServiceOrderList from "../views/components/ServiceOrder/serviceOrderList.vue";
import FormServiceOrder from "../views/components/ServiceOrder/formServiceOrder.vue";
import FormHistory from "../views/components/History/formHistory.vue";
import cupsList from "../views/components/Cups/cupsList.vue";
import ViewMaps from "../views/components/GoogleMaps/ViewMaps.vue";
import ViewTraffic from "../views/components/TrafficLight/trafficList.vue";
import Viewbillinglist from "../views/components/Reports/billing-list.vue";
import ViewRipsList from "../views/components/Reports/ripsList.vue";
import FormRips from "../views/components/Reports/formRips.vue";
import FormGenerateRips from "../views/components/Reports/formGenerateRips.vue";
import ViewHistorylist from "../views/components/Reports/history-list.vue";
import ViewWaittime from "../views/components/Reports/wait-time.vue";
import ViewGuide from "../views/components/Guide/guideList.vue";
import ViewBilling from "../views/components/Reports/billing.vue";
import DetailsBilling from "../views/components/Reports/billingDetails.vue";
import ViewHistory from "../views/components/History/historyList.vue";
/* import ViewProducts from "../views/components/Product/listProduc.vuet" */
/* import ViewProducts from "../views/components/Product/listProduct.vue" */
import FormProducts from "../views/components/Product/addProduct.vue";
import ViewCompany from "../views/components/Company/historyList.vue"
import ViewCategory from "../views/components/Inventory/formCategory.vue"
import ViewSuppliers from "../views/components/Inventory/formSuppliers.vue"
import ViewProducts from "../views/components/Inventory/formInventory.vue"

import ViewStore from "../views/components/Inventory/formStore.vue"
import ViewStoreProduct from "../views/components/Inventory/viewProductStore.vue"
import ViewProcedure from "../views/components/Procedure/fodicalized.vue"

import ViewErrors from "../views/components/Errors/ViewErrors.vue"
import ViewHistoryPDF from "../views/components/History/listHistoryPDF.vue";
import AgreementsConfigList from "../views/components/AdminAgreements/listAgreements.vue";

import CoverageConfigList from "../views/components/AdminAgreements/coverageConfigList.vue";
import ContractingConfigList from "../views/components/AdminAgreements/contractingConfigList.vue";
import ManualConfigList from "../views/components/AdminAgreements/manualConfigList.vue";

import ViewFormServiceOrder from "../views/components/ServicesOrders/formServiceOrder.vue";
import ViewlistQuotes from "../views/components/Quotes/quotesList.vue";
import ViewlistServiceOrder from "../views/components/ServicesOrders/servicesList.vue";




const routes = [
  {
    path: "/",
    name: "/",
    redirect: "/signin",
  },
  {
    path: "/home",
    name: "Inicio",
    component: Dashboard,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },
  {
    path: "/profile/:id",
    name: "Profile",
    component: Profile,
  },
  {
    path: "/rol",
    name: "Agregar Rol",
    component: AddRol,
    meta: {
      section: 'Administracion'
    }
  },
  {
    path: "/rol/:id",
    name: "Editar Rol",
    component: AddRol,
    meta: {
      section: 'Administracion'
    }
  },
  {
    path: "/user",
    name: "Agregar Usuario",
    component: FormUser,
    meta: {
      section: 'Administracion'
    }
  },
  {
    path: "/user/:id",
    name: "Editar Usuario",
    component: FormUser,
    meta: {
      section: 'Administracion'
    }
  },
  {
    path: "/signin",
    name: "Signin",
    component: Signin,
  },
  {
    path: "/seat",
    name: "Ver Sedes",
    component: SeatList,
    meta: {
      section: 'Administracion'
    }
  },
  {
    path: "/add/seat",
    name: "Agregar Sede",
    component: Formseat,
    meta: {
      section: 'Administracion'
    }
  },
  {
    path: "/add/seat/:id",
    name: "Editar Sede",
    component: Formseat,
    meta: {
      section: 'Administracion'
    }
  },
  {
    path: "/users",
    name: "Ver Usuarios",
    component: UsersList,
    meta: {
      section: 'Administracion'
    }
  },
  {
    path: "/add/user",
    name: "Agregar Usuario",
    component: Formuser,
    meta: {
      section: 'Administracion'
    }
  },
  {
    path: "/add/user/:id",
    name: "Editar Usuario",
    component: Formuser,
    meta: {
      section: 'Administracion'
    }
  },

  {
    path: "/rols",
    name: "Ver Roles",
    component: RolList,
    meta: {
      section: 'Administracion'
    }
  },
  {
    path: "/add/rol",
    name: "Agregar Rol",
    component: Formrol,
    meta: {
      section: 'Administracion'
    }
  },
  {
    path: "/add/rol/:id",
    name: "Editar Rol",
    component: Formrol,
    meta: {
      section: 'Administracion'
    }
  },
  {
    path: "/vehicle",
    name: "Ver Vehiculos",
    component: VehicleList,
    meta: {
      section: 'Administracion'
    }
  },

  {
    path: "/destination",
    name: "Destino del vehiculo",
    component: VehicleDestination,
    meta: {
      section: 'Administracion'
    }
  },

  {
    path: "/add/vehicle",
    name: "Agregar Vehiculo",
    component: Formvehicle,
    meta: {
      section: 'Administracion'
    }
  },
  {
    path: "/add/vehicle/:id",
    name: "Editar Vehiculo",
    component: Formvehicle,
    meta: {
      section: 'Administracion'
    }
  },
  {
    path: "/event",
    name: "Ver Eventos",
    component: EventList,
    meta: {
      section: 'Administracion'
    }
  },
  {
    path: "/add/event",
    name: "Agregar Evento",
    component: Formevent,
    meta: {
      section: 'Administracion'
    }
  },
  {
    path: "/add/event/:id",
    name: "Editar Evento",
    component: Formevent,
    meta: {
      section: 'Administracion'
    }
  },
  {
    path: "/request",
    name: "Ver Tipo de Solicitudes",
    component: RequestList,
    meta: {
      section: 'Administracion'
    }
  },
  {
    path: "/add/request",
    name: "Agregar Solicitud",
    component: Formrequest,
    meta: {
      section: 'Administracion'
    }
  },
  {
    path: "/add/request/:id",
    name: "Editar Solicitud",
    component: Formrequest,
    meta: {
      section: 'Administracion'
    }
  },
  {
    path: "/attention",
    name: "Ver Tipo de Atencion",
    component: AttentiontList,
    meta: {
      section: 'Administracion'
    }
  },
  {
    path: "/add/attention",
    name: "Agregar Atencion",
    component: Formattention,
    meta: {
      section: 'Administracion'
    }
  },
  {
    path: "/add/attention/:id",
    name: "Editar Atencion",
    component: Formattention,
    meta: {
      section: 'Administracion'
    }
  },
  {
    path: "/evaluation",
    name: "Ver Tipo de Evaluacion",
    component: EvaluationList,
    meta: {
      section: 'Administracion'
    }
  },
  {
    path: "/add/evaluation",
    name: "Agregar Evaluacion",
    component: Formevaluation,
    meta: {
      section: 'Administracion'
    }
  },
  {
    path: "/add/evaluation/:id",
    name: "Editar Evaluacion",
    component: Formevaluation,
    meta: {
      section: 'Administracion'
    }
  },
  {
    path: "/configurationAgreement",
    name: "Configuracion de Acuerdo Comercial",
    component: AgreementsConfigList,
    meta: {
      section: 'Administracion'
    }
  },
  {
    path: "/coverage",
    name: "COBERTURA O PLAN BENEFICIOS",
    component: CoverageConfigList,
    meta: {
      section: 'Administracion'
    }
  },
  {
    path: "/contracting",
    name: "MODALIDAD DE CONTRATACIÓN Y PAGO",
    component: ContractingConfigList,
    meta: {
      section: 'Administracion'
    }
  },
  {
    path: "/manual",
    name: "MANUALES",
    component: ManualConfigList,
    meta: {
      section: 'Administracion'
    }
  },
  {
    path: "/cups",
    name: "Ver Cups",
    component: cupsList,
    meta: {
      section: 'Administracion'
    }
  },
  {
    path: "/agreements",
    name: "Ver Acuerdos Comerciales",
    component: AgreementsList,
  },
  {
    path: "/add/agreements",
    name: "Agregar Acuerdo Comercial",
    component: Formagreements,
  },
  {
    path: "/add/agreements/:id",
    name: "Editar Acuerdo Comercial",
    component: Formagreements,
  },
  {
    path: "/tradeAgreement",
    name: "Ver contratos",
    component: tradeAgreementsList,
  },
  {
    path: "/tradeAgreement/add",
    name: "Acuerdo Comercial",
    component: tradeAgreementsForm,
  },
  {
    path: "/tradeAgreement/edit/:id",
    name: "Actualizar Acuerdo Comercial",
    component: tradeAgreementsForm,
  },
  {
    path: "/tradeAgreement/contract/:id",
    name: "Contratos Comerciales",
    component: contracConfigList,
  },
  {
    path: "/tradeAgreement/contract/config/:id",
    name: "Configuración del Contratos",
    component: contracConfig,
  },
  {
    path: "/serviceOrder",
    name: "Ver Ordenes de Servicios",
    component: ServiceOrderList,
  },
  {
    path: "/add/serviceOrder",
    name: "Agregar Orden de Servicio",
    component: FormServiceOrder,
  },
  {
    path: "/add/serviceOrder/:key_patient/:id/",
    name: "Editar Orden de Servicio",
    component: FormServiceOrder,
  },
  {
    path: "/add/formHistory/:id",
    name: "Historia Clínica",
    component: FormHistory,
  },
  {
    path: "/abulance/",
    name: "Ambulancias",
    component: ViewMaps,
  },
  {
    path: "/traffic/",
    name: "Semaforización",
    component: ViewTraffic,
  },
  {
    path: "/billing-list/",
    name: "Facturacion",
    component: Viewbillinglist,
  },
  {
    path: "/wait-time/",
    name: "Tiempo de Espera",
    component: ViewWaittime ,
  },
  {
    path: "/history-list/",
    name: "Historia Clinicas",
    component: ViewHistorylist,
  },

  {
    path: "/guide/",
    name: "Manual de Uso",
    component: ViewGuide,
  },
  {
    path: "/billing/",
    name: "Facturación",
    component: ViewBilling,
  },
  {
    path: "/details/billing/:key_patient/:id/",
    name: "Detalle Facturación",
    component: DetailsBilling,
  },
  {
    path: "/rips/",
    name: "Rips",
    component: ViewRipsList,
  },
  {
    path: "/rips/add/",
    name: "Agregar Rips",
    component: FormRips,
  },
  {
    path: "/rips/generate/",
    name: "Generar Rips",
    component: FormGenerateRips,
  },
  
  {
    path: "/history/",
    name: "Historia",
    component: ViewHistory,
  },
  {
    path: "/history-pdf/",
    name: "PDF Historia",
    component: ViewHistoryPDF,
  },
  {
    path: "/product/add/",
    name: "Agregar Producto",
    component: FormProducts,
    meta: {
      section: 'Administracion'
    }
  },
  {
    path: "/products/",
    name: "Productos",
    component: ViewProducts,
    meta: {
      section: 'Administracion'
    }
  },
  {
    path: "/product/add/:id/",
    name: "Editar Productos",
    component: FormProducts,
    meta: {
      section: 'Administracion'
    }
  },
  {
    path: "/company/history/",
    name: "Historia de Compañia",
    component: ViewCompany,
  },
  {
    path: "/category/",
    name: "Categorias",
    component: ViewCategory,
  },
  {
    path: "/suppliers/",
    name: "Proveedores",
    component: ViewSuppliers,
  },
  {
    path: "/products/",
    name: "Productos",
    component: ViewProducts,
  },
  {
    path: "/stores/",
    name: "Bodegas",
    component: ViewStore,
  },
  {
    path: "/storesView/:id",
    name: "Listado de Bodegas",
    component: ViewProducts,
  },
  {
    path: "/procedure/",
    name: "Procedimientos Focalizados",
    component: ViewProcedure,
  },
  {
    path: "/errors",
    name: "Panel de Errores",
    component: ViewErrors,
  },

  {
    path: "/ServiceOrder/add",
    name: "Formulario de Orden de Servicio",
    component: ViewFormServiceOrder,
  },
  {
    path: "/ServiceOrder/edit/:id_order_services/:key_patient",
    name: "Editar Orden",
    component: ViewFormServiceOrder,
  },
  {
    path: "/control-appointments",
    name: "Citas de Control",
    component: () => import('../views/components/Quotes/quotesList.vue'),
  },
  {
    path: "/telemedicine-appointments",
    name: "Calendario telemedicina",
    component: () => import('../views/components/Quotes/appointmentCalendar.vue'),
  },
  {
    path: "/in-person-appointments",
    name: "Calendario presencial",
    component: () => import('../views/components/Quotes/appointmentCalendar.vue'),
  },
  {
    path: "/ServiceOrder/list",
    name: "Orden de Servicio",
    component: ViewlistServiceOrder,
  },

  
];


const router = createRouter({
  history: createWebHashHistory(),
  routes:routes,
  /* linkActiveClass: "active",
  mode: "history" */
});

export default router;
