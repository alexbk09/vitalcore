<template>
  <div class="container-fluid py-7 ">
    <div class="card mt-5">
      <div class="card-body">
        <form action="" v-on:submit.prevent="sendFormserviceOrder()">
          <div class="stepper mb-5">
            <div v-for="(step, index) in steps" :key="index" class="step">
              <div class="circle" :class="{ 'active': viewContent === index, 'disabled': index > viewContent }"
                @click="changeStep(index)">
                {{ index + 1 }}
              </div>
              <p :class="{ 'active-text': viewContent === index }">{{ step }}</p>
            </div>
          </div>
          <div class="col-md-12 content mt-2" v-if="this.viewContent === 0">
            <div class="row">
              <div class="col-3">
                <BaseInput id="numeroIdentificacion" disabled label="COORDINADOR DE OPERACIÓN:" placeholder=""
                  :value="this.userValidate.name" />
              </div>
              <div class="col-3">
                <BaseInput id="numeroIdentificacion" disabled label="FECHA:" type="date" placeholder=""
                  :value="fecha" />
              </div>
              <div class="col-3">
                <BaseInput id="numeroIdentificacion" disabled label="Nº DE ORDEN:" placeholder=""
                  v-model="serviceOrderr.n_order" />
              </div>
              <div class="col-3">
                <BaseInput id="numeroIdentificacion" disabled label="ESTADO:" placeholder="" />
              </div>
            </div>
            <hr>
            <div class="row ">
              <div class="col-md-4">
                <BaseInput id="document" label="Nº DE IDENTIFICACIÓN:" @input="consulterPatient"
                  placeholder="Buscar paciente"
                  v-model="serviceOrderr.document"
                  :error="errors.document" type="number" />
                <!-- Lista de autocompletado -->
                <ul v-if="listPatients.length > 0" class="autocompletepatiente">
                  <li v-for="row in listPatients" :key="row.id" @click="selecClickpatient(row)">
                    <span class="text-busqueda">
                      {{ row.document }} {{ row.first_surname }} {{ row.second_surname }}
                      {{ row.firstname }} {{ row.middlename }}
                    </span>
                  </li>
                </ul>
              </div>
              <div class="col-md-4">
                <BaseSelect id="key_type_document" label="TIPO DE DOCUMENTO:" placeholder="SELECCIONE"
                  :options="listTypeDocuments" v-model="serviceOrderr.key_type_document" :error="errors.key_type_document" />
              </div>
              <div class="col-md-4">
                <BaseSelect id="genre" label="GÉNERO:" placeholder="SELECCIONE" :options="genderTypes"
                  v-model="serviceOrderr.genre" :error="errors.genre" />
              </div>
            </div>
            <div class="row ">
              <div class="col-md-3">
                <BaseInput id="first_surname" label="PRIMER APELLIDO:" placeholder="" v-model="serviceOrderr.first_surname" :error="errors.first_surname" />
              </div>
              <div class="col-md-3">
                <BaseInput id="second_surname" label="SEGUNDO APELLIDO:" placeholder=""
                  v-model="serviceOrderr.second_surname" :error="errors.second_surname" />
              </div>
              <div class="col-md-3">
                <BaseInput id="firstname" label="PRIMER NOMBRE:" placeholder=""
                  v-model="serviceOrderr.firstname" :error="errors.firstname" />
              </div>
              <div class="col-md-3">
                <BaseInput id="second_name_patient" label="OTROS NOMBRES:" placeholder=""
                  v-model="serviceOrderr.second_name_patient" :error="errors.second_name_patient" />
              </div>
            </div>
            <div class="row ">
              <div class="col-md-3">
                <BaseInput id="contact_phone" label="CELULAR:" placeholder="" type="tel"
                  v-model="serviceOrderr.contact_phone" :error="errors.contact_phone" />
              </div>
              <div class="col-md-3">
                <BaseInput id="patient_cell" label="TELÉFONO:" placeholder="" type="tel"
                  v-model="serviceOrderr.patient_cell" />
              </div>
              <div class="col-md-3">
                <BaseInput id="email" label="CORREO ELECTRÓNICO:" placeholder="" type="email"
                  v-model="serviceOrderr.email" :error="errors.email" />
              </div>
              <div class="col-md-3">
                <BaseInput id="companions_email" label="CORREO ACOMPAÑANTE:" placeholder="" type="email"
                  v-model="serviceOrderr.companions_email" :error="errors.companions_email" />
              </div>
            </div>
            <div class="row ">
              <div class="col-md-3">
                <BaseInput id="address" label="DIRECCIÓN:" placeholder=""
                  v-model="serviceOrderr.address" :error="errors.address" />
              </div>
              <div class="col-md-3">
                <BaseInput id="patient_ward" label="BARRIO:" placeholder="" v-model="serviceOrderr.patient_ward" :error="errors.patient_ward" />
              </div>
              <div class="col-md-3">
                <BaseSelect id="patient_campus" label="SEDE DE ATENCIÓN:" placeholder="SELECCIONE" :options="listSeat"
                  @change="consulterVehicle" v-model="serviceOrderr.patient_campus" :error="errors.patient_campus" />
              </div>
              <div class="col-md-3">
                <BaseInput id="eps" label="EPS:" placeholder="" v-model="serviceOrderr.eps" :error="errors.eps" />
              </div>
            </div>
            <div class="row ">
              <div class="col-md-3">
                <BaseSelect id="key_department" label="DEPARTAMENTO:" placeholder="SELECCIONE"
                  :options="listDepartaments" @change="consulter" v-model="serviceOrderr.key_department" :error="errors.key_department" />
              </div>
              <div class="col-md-3">
                <BaseSelect id="key_municipality" label="MUNICIPIO:" placeholder="SELECCIONE"
                  :options="listMunicipality" v-model="serviceOrderr.key_municipality" :error="errors.key_municipality" />
              </div>
              <div class="col-md-3" v-if="this.serviceOrderr.key_department == 5">
                <BaseSelect id="key_locality" label="LOCALIDAD:" placeholder="SELECCIONE" :options="listLocality"
                  v-model="serviceOrderr.key_locality" :error="errors.key_locality" />
              </div>
              <div class="col-md-3">
                <BaseSelect id="zone_patient" label="ZONA:" placeholder="SELECCIONE" :options="zonePatient"
                  v-model="serviceOrderr.zone_patient" :error="errors.zone_patient" />
              </div>
            </div>
            <div class="row ">
              <div class="col-md-12">
                <BaseTextarea id="causalSolicitud" label="CAUSAL DE SOLICITUD:" placeholder="" rows="3" v-model="serviceOrderr.patient_diagnosis" :error="errors.patient_diagnosis" />
              </div>
            </div>
          </div>
          <div class="col-md-12 content mt-2" v-if="this.viewContent === 1">
            <div class="row">
              <div class="col-md-6">
                <BaseSelect id="key_trade_agreement" label="ACUERDO COMERCIAL - PAGADOR:" placeholder="Seleccionar"
                  @change="consulterAgreement(serviceOrderr.key_trade_agreement)" :options="listAgreements" v-model="serviceOrderr.key_trade_agreement" :error="errors.key_trade_agreement" />
              </div>
              <div class="col-md-6">
                <BaseSelect id="contracted_id" label="Contrato:" placeholder="Seleccionar"
                  @change="ConsulterContract" :options="listContracted" v-model="serviceOrderr.contracted_id" :error="errors.contracted_id" />
              </div>
              <div class="col-md-12">
                <BaseSelect id="company_geolocation" label="GEOREFERENCIACIÓN:" placeholder="Seleccionar"
                  :options="listGeoreferencing" v-model="serviceOrderr.company_geolocation" :error="errors.company_geolocation" />
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <BaseSelect id="key_vehicle" label="VEHÍCULO:" placeholder="Seleccionar" :options="listVehicle"
                  v-model="serviceOrderr.key_vehicle" :error="errors.key_vehicle" />
              </div>
              <div class="col-md-6">
                <BaseSelect id="driver_apply" label="CONDUCTOR ASIGNADO:" placeholder="Seleccionar"
                  :options="listDriver" v-model="serviceOrderr.driver_apply" :error="errors.driver_apply" />
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <BaseSelect id="key_event_type" label="TIPO DE EVENTO:" placeholder="Seleccionar" :options="listEvents"
                  v-model="serviceOrderr.key_event_type" :error="errors.key_event_type" />
              </div>
              <div class="col-md-6">
                <BaseSelect id="key_request" label="TIPO DE SOLICITUD:" placeholder="Seleccionar"
                  :options="listRequest" v-model="serviceOrderr.key_request" :error="errors.key_request" />
              </div>
            </div>
          </div>
          <div class="col-md-12 content mt-2" v-if="this.viewContent === 2">
            <div class="row  align-items-end">
              <div class="col-md-4">
                <BaseSelect id="key_mission_company" label="EMPRESA EN MISIÓN:" placeholder="SELECCIONE"
                  :options="listMissionCompany" v-model="serviceOrderr.key_mission_company" :error="errors.key_mission_company" />
              </div>

              <div class="col-md-4">
                <BaseSelect id="services" label="TIPO EVALUACIÓN MÉDICA O PROCEDIMIENTO:"
                  placeholder="SELECCIONE" :options="listProduct" v-model="serviceOrderr.services" :error="errors.services" />
              </div>
              <div class="col-md-4">
                <BaseSelect id="id_user" label="PROFESIONAL ASIGNADO:" placeholder="SELECCIONE"
                  :options="listDoctor" v-model="serviceOrderr.id_user" :error="errors.id_user" />
              </div>
            </div>
            <div class="row ">
              <div class="col-md-3">
                <BaseInput id="reporting_user" label="NOMBRE DE QUIEN REPORTA:" placeholder=""
                  v-model="serviceOrderr.reporting_user" :error="errors.reporting_user" />
              </div>
              <div class="col-md-3">
                <BaseInput id="charge_report" label="CARGO:" placeholder="" v-model="serviceOrderr.charge_report" :error="errors.charge_report" />
              </div>
              <div class="col-md-2">
                <BaseInput id="user_phone" label="CELULAR:" placeholder="" type="tel"
                  v-model="serviceOrderr.user_phone" :error="errors.user_phone" />
              </div>
              <div class="col-md-2">
                <BaseInput id="user_phone_2" label="TELÉFONO:" placeholder="" type="tel"
                  v-model="serviceOrderr.user_phone_2" />
              </div>
              <div class="col-md-1 d-flex align-items-center">
                <div class="form-check form-switch mt-3">
                  <input class="form-check-input" type="checkbox" id="copagoSwitch">
                  <label class="form-check-label small text-secondary" for="copagoSwitch">COPAGO:</label>
                </div>
              </div>
              <div class="col-md-1">
                <BaseInput id="valorCopago" label="valor" placeholder="Valor" type="number" class="d-none d-md-block"
                  v-model="serviceOrderr.copago" :error="errors.copago" />
              </div>
            </div>
            <div class="row ">
              <div class="col-md-3">
                <BaseInput id="code_authorization" label="CÓDIGO DE AUTORIZACIÓN:" placeholder=""
                  v-model="serviceOrderr.code_authorization" :error="errors.code_authorization" />
              </div>
              <div class="col-md-3">
                <BaseInput id="who_authorizes" label="¿QUIÉN AUTORIZA?:" placeholder=""
                  v-model="serviceOrderr.who_authorizes" :error="errors.who_authorizes" />
              </div>
              <div class="col-md-3">
                <BaseSelect id="time" label="TIEMPO DE ESPERA:" placeholder="SELECCIONE" :options="timeOptions"
                  v-model="serviceOrderr.time" :error="errors.time" />
              </div>
              <div class="col-md-1 d-flex align-items-center">
                <div class="form-check form-switch mt-3">
                  <input class="form-check-input" type="checkbox" id="trasladoSwitch">
                  <label class="form-check-label small text-secondary" for="trasladoSwitch">TRASLADO:</label>
                </div>
              </div>
              <div class="col-md-2">
                <BaseInput id="transfer_code" label="CÓDIGO DE AUTORIZACIÓN" placeholder="Código Traslado"
                  class="d-none d-md-block" v-model="serviceOrderr.transfer_code" :error="errors.transfer_code" />
              </div>
            </div>
            <hr class="">
            <div class="row mb-3">
              <div class="col-md-12">
                <BaseTextarea id="observation_general" label="OBSERVACIONES:" placeholder="Escriba aquí..." rows="3"
                  v-model="serviceOrderr.observation_general" :error="errors.observation_general" />
              </div>
            </div>
          </div>
          <div class="row mt-4">
            <div class="col-md-12 d-flex justify-content-between">
              <!-- Botón ATRÁS: Solo visible en las etapas 1 y 2 -->
              <button
                v-if="viewContent === 1 || viewContent === 2"
                type="button"
                class="btn btn-secondary"
                @click="backContent()">
                ATRÁS
              </button>

              <!-- Botón SIGUIENTE: Solo visible en las etapas 0 y 1 -->
              <button
                v-if="viewContent === 0 || viewContent === 1"
                type="button"
                class="btn btn-primary"
                @click="nextContent()">
                SIGUIENTE
              </button>

              <!-- Botón GUARDAR: Solo visible en la etapa 2 -->
              <button
                v-if="viewContent === 2"
                type="button"
                class="btn btn-success"
                @click="validateAndSendForm">
                GUARDAR
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import ArgonButton from "./../../../components/ArgonButton.vue";
import { mapActions, mapGetters } from "vuex";
import ViewFormCompanyMission from "./../Agreements/formCompanyMission.vue";
import 'sweetalert2/src/sweetalert2.scss'
import Loading from '../Utils/Loading.vue';
import moment from "moment";
import BaseInput from "../utilsComponents/BaseInput.vue";
import BaseSelect from "../utilsComponents/BaseSelect.vue";
import BaseTextarea from "../utilsComponents/BaseTextarea.vue";
import { OrderServiceValidationsResponse } from "../../../infrastructure/validations/orderServiceValidations.ts";
import { AlertUtils } from "../../../utils/alert.ts";

export default {
  name: "formserviceOrder",
  data() {
    return {
      searchServiceOrder: this.$route.params.id_order_services,
      searchPatient: this.$route.params.key_patient,
      serviceOrderr: {
        n_order: '',
        key_type_document: '',
        document: '',
        genre: '',
        first_surname: '',
        second_surname: '',
        firstname: '',
        second_name_patient: '',
        contact_phone: '',
        patient_cell: '',
        email: '',
        companions_email: '',
        address: '',
        patient_ward: '',
        patient_campus: '',
        eps: '',
        key_department: '',
        key_municipality: '',
        key_locality: '',
        zone_patient: '',
        patient_diagnosis: '',
        key_trade_agreement: '',
        contracted_id: '',
        company_geolocation: '',
        key_vehicle: '',
        driver_apply: '',
        key_event_type: '',
        key_request: '',
        key_mission_company: '',
        services: '',
        id_user: null,
        reporting_user: '',
        charge_report: '',
        user_phone: '',
        user_phone_2: '',
        copago: 0,
        code_authorization: '',
        who_authorizes: '',
        time: '',
        transfer_code: '',
        observation_general: '',
        id: '',
        key_status: '1',
        company_type: 0,
        description: 'Texto de la orden de servicio',
        quantity: '1',
        amount: '0',
        status: '1',
      },
      errors: {}, // Objeto para almacenar los errores de validación
      timeOptions: [
        { id: "", name: "Seleccione" },
        { id: "10", name: "10 Minutos" },
        { id: "30", name: "30 Minutos" },
        { id: "60", name: "60 Minutos" },
        { id: "90", name: "90 Minutos" },
        { id: "100", name: "100 Minutos" },
        { id: "110", name: "110 Minutos" },
        { id: "120", name: "120 Minutos" },
        { id: "130", name: "130 Minutos" },
        { id: "140", name: "140 Minutos" },
        { id: "150", name: "150 Minutos" },
        { id: "160", name: "160 Minutos" },
        { id: "170", name: "170 Minutos" },
        { id: "180", name: "180 Minutos" },
        { id: "190", name: "190 Minutos" },
        { id: "200", name: "200 Minutos" },
        { id: "210", name: "210 Minutos" },
        { id: "220", name: "220 Minutos" },
        { id: "230", name: "230 Minutos" },
        { id: "240", name: "240 Minutos" }
      ],
      genderTypes: [
        { id: "M", name: "Masculino" },
        { id: "F", name: "Femenino" },
        { id: "O", name: "Otro" }
      ],
      epsList: [
        { id: "1", name: "EPS 1" },
        { id: "2", name: "EPS 2" },
        { id: "3", name: "EPS 3" }
      ],
      conductorList: [
        { id: "1", name: "Conductor 1" },
        { id: "2", name: "Conductor 2" },
        { id: "3", name: "Conductor 3" }
      ],
      zonePatient: [
        { id: "2", name: "Urbano" },
        { id: "1", name: "Rural" }
      ],
      userValidate: {},
      fecha: new Date().toLocaleDateString(),
      showMenu: false,
      show: false,
      loadModalForm: false,
      keyHistory: '',
      keyPatient: '',
      checkboxActivado: false,
      checkboxTraslate: false,
      spiner: false,
      isLoading: true,
      title: 'Formulario',
      viewContent: 0, // Paso actual
      steps: [
        "Datos del paciente",
        "Datos del acuerdo",
        "Datos del registro",
      ],
    };
  },
  components: {
    ArgonButton,
    ViewFormCompanyMission,
    Loading,
    BaseInput,
    BaseSelect,
    BaseTextarea
  },
  watch: {
    listServiceOrderDetails: {
      handler(newVal) {
        console.log("🚀 ~ handler ~ newVal:", newVal)
        this.serviceOrderr = newVal;
      },
    },
  },
  async mounted() {
    if (this.searchServiceOrder) {
      await this.getOrderServiceDetails(this.searchServiceOrder);
      
      if (this.listServiceOrderDetails) {
        this.serviceOrderr = this.listServiceOrderDetails;
        await this.consulter()
        await this.consulterAgreement(this.serviceOrderr.key_trade_agreement)
        await this.getContracted(this.serviceOrderr.key_trade_agreement)
        await this.consulterVehicle()
        await this.ConsulterContract()

      }

    }
    this.$store.state.isAbsolute = true;
    this.getDepartaments();
    this.getTypeDocuments();
    this.getAgreementsSelect();
    this.getSeat();
    this.getRequest();
    this.getEvents();
    this.getProduct();
    this.getDoctor();
    this.getDriver(4)
  },
  computed: {
    ...mapGetters("OrderService", ["listPatients", "listServiceOrderDetails"]),
    ...mapGetters("ContentConsultations", ["listTypeDocuments", "listDriver", "listDepartaments", "listMunicipality", "listLocality", "listSeat", "listVehicle", "listRequest", "listEvents", "listProduct", "listDoctor"]),
    ...mapGetters("TradeAgreement", ["listContracted","listAgreements", "listGeoreferencing", "listMissionCompany"]),
  },
  methods: {
    ...mapActions("OrderService", ["getPatients", "clearPatientData", "saveOrderService", "getOrderServiceDetails"]),
    ...mapActions("ContentConsultations", [
      "getTypeDocuments",
      "getDepartaments",
      "getMunicipality",
      "getLocality",
      "getSeat",
      "getVehicle",
      "getRequest",
      "getEvents",
      "getProduct",
      "getDoctor",
      "getDriver"
    ]),
    ...mapActions("TradeAgreement", [
      "getAgreementsSelect",
      "getGeoreferencing",
      "getMissionCompanyToEntity",
      "getContracted"
    ]),

    changeStep(index) {
      // Permitir cambiar solo a pasos anteriores o al actual
      if (index <= this.viewContent) {
        this.viewContent = index;
      }
    },
    validateStep(step) {
      this.errors = {}; // Reinicia los errores
      let fieldsToValidate = [];

      switch (step) {
        case 0: // Primera etapa: Datos del paciente
          fieldsToValidate = [
            "key_type_document",
            "document",
            "genre",
            "first_surname",
            "second_surname",
            "firstname",
            "second_name_patient",
            "contact_phone",
            "email",
            "address",
            "key_department",
            "key_municipality",
            "zone_patient",
            "patient_ward",
            "patient_campus",
            "eps",
            "patient_diagnosis",
          ];
          break;
        case 1: // Segunda etapa: Datos del acuerdo
          fieldsToValidate = [
            "key_trade_agreement",
            "contracted_id",
            "company_geolocation",
            "key_vehicle",
            "driver_apply",
            "key_event_type",
            "key_request",
          ];
          break;
        case 2: // Tercera etapa: Datos del registro
          fieldsToValidate = [
            "key_mission_company",
            "services",
            "id_user",
            "reporting_user",
            "charge_report",
            "user_phone",
            "code_authorization",
            "who_authorizes",
            "time",
          ];
          break;
      }

      // Validar los campos requeridos
      for (const field of fieldsToValidate) {
        if (!this.serviceOrderr[field]) {
          this.errors[field] = true; // Marca el campo como inválido
        }
      }

      // Retorna true si no hay errores
      return Object.keys(this.errors).length === 0;
    },
    nextContent() {
      // Validar la etapa actual antes de avanzar
      if (this.validateStep(this.viewContent)) {
        if (this.viewContent < this.steps.length - 1) {
          this.viewContent++;
        }
      }
    },
    backContent() {
      // Retroceder al paso anterior si no es el primero
      if (this.viewContent > 0) {
        this.viewContent--;
      }
    },
    async loadModal() {
      this.loadModalForm = true
    },
    consulterPatient() {
      if (this.serviceOrderr.document.length > 6) {
        this.getPatients(this.serviceOrderr.document);
      }
    },
    selecClickpatient(row) {
      this.serviceOrderr.document = row.document;
      this.serviceOrderr.first_surname = row.first_surname;
      this.serviceOrderr.second_surname = row.second_surname;
      this.serviceOrderr.firstname = row.firstname;
      this.serviceOrderr.second_name_patient = row.middlename;
      this.serviceOrderr.key_type_document = row.key_type_document;
      this.serviceOrderr.genre = row.genre;
      this.serviceOrderr.contact_phone = row.contact_phone;
      this.serviceOrderr.patient_cell = row.phone;
      this.serviceOrderr.email = row.email;
      this.serviceOrderr.address = row.address;
      this.serviceOrderr.key_department = row.key_department;
      this.serviceOrderr.key_locality = row.key_locality;
      this.serviceOrderr.key_municipality = row.key_municipality;
      this.serviceOrderr.patient_ward = row.patient_ward;
      this.serviceOrderr.zone_patient = row.zone;

      // Limpia la lista de autocompletado después de seleccionar
      this.clearPatientData();
      this.consulter();
    },
    consulter() {
      if (this.serviceOrderr.key_department) {
        this.getMunicipality(this.serviceOrderr.key_department);
        if (this.serviceOrderr.key_department == 5) {
          this.getLocality(this.serviceOrderr.key_department);
        }
      }
    },
    consulterAgreement(id) {
      if (this.serviceOrderr.key_trade_agreement) {
        this.getContracted(id);
      }
    },
    ConsulterContract(){
      if (this.serviceOrderr.contracted_id) {
        this.getGeoreferencing(this.serviceOrderr.contracted_id);
        this.getMissionCompanyToEntity(this.serviceOrderr.contracted_id);
      }
    },
    consulterVehicle() {
      if (this.serviceOrderr.patient_campus) {
        this.getVehicle(this.serviceOrderr.patient_campus);
      }
    },
    async sendFormserviceOrder() {
      this.spiner = true;
      if (this.searchServiceOrder) {
        this.serviceOrderr.id = this.searchServiceOrder;
      }
      const response = await this.saveOrderService(this.serviceOrderr);
      console.log("🚀 ~ sendFormserviceOrder ~ response:", response)
      if (response) {
        AlertUtils.success({
          title: "Éxito",
          text: "Orden de servicio guardada correctamente.",
        });
        this.$router.push('/serviceOrder')
      } else {
        AlertUtils.error({
          title: "Error",
          text: "No se pudo guardar la orden de servicio.",
        });
      }
    },
    validateAndSendForm() {
      // Validar la tercera etapa
      if (this.validateStep(2)) {
        // Si todo está correcto, enviar el formulario
        this.sendFormserviceOrder();
      } else {
        console.warn("Errores en la validación de la tercera etapa:", this.errors);
      }
    },
  },
  
};
</script>

<style>
.autocompletepatiente {
  list-style: none;
  padding: 0;
  margin: 0;
  border: 1px solid #ccc;
  max-height: 200px;
  overflow-y: auto;
  background: #fff;
  position: absolute;
  z-index: 1000;
  width: 100%;
}

.autocompletepatiente li {
  padding: 10px;
  cursor: pointer;
}

.autocompletepatiente li:hover {
  background-color: #f0f0f0;
}

.text-busqueda {
  font-size: 14px;
}

.is-invalid {
  border: 1px solid red !important;
}
</style>