<template>
  <div>
    <Loading v-if="this.isLoading" :valuetitle="title" />
    <div class="" v-else>
      <form action="" v-on:submit.prevent="sendFormsTechnical()">
        <div class="row py-4">
          <div class="col-12">
            <BaseInput name="date_Technical" v-model="technicalData.date_Technical" label="Fecha:" type="text" disabled />
          </div>
          <div class="col-md-12 col-lg-6">
            <BaseSelect id="department_Technical" label="DEPARTAMENTO:" placeholder="Seleccionar" :options="listDepartaments"
                v-model="technicalData.department_Technical" :error="errors.department_Technical" disabled />
          </div>
          <div class="col-md-12 col-lg-6">
            <BaseSelect id="patient_municipality" label="MUNICIPIO:" placeholder="Seleccionar" :options="listMunicipality"
                  v-model="technicalData.patient_municipality" :error="errors.patient_municipality" disabled />
          </div>
          <div class="col-md-12 col-lg-6" v-if="technicalData.department_Technical === 5">
            <BaseSelect id="patient_location" label="LOCALIDAD:" placeholder="Seleccionar" :options="listLocality"
                  v-model="technicalData.patient_location" :error="errors.patient_location" disabled />
          </div>
          <div class="col-md-12 col-lg-6">
            <BaseInput id="geolocation_Technical" label="GEOREFERENCIACIÓN:" placeholder="Seleccionar" 
                  v-model="technicalData.geolocation_Technical" :error="errors.geolocation_Technical" disabled />
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <BaseInput name="services_name" v-model="technicalData.services_name" label="Tipo Evaluación médica o Procedimiento:" type="text" disabled />
          </div>
          <div class="col-12">
            <BaseInput disabled name="agreement_Technical" v-model="technicalData.agreement_Technical" label="ACUERDO COMERCIAL - PAGADOR:" type="text" />
          </div>
          <div class="col-12">
            <BaseInput disabled name="mision_Technical" v-model="technicalData.mision_Technical" label="Empresa donde labora, laborará o laboró:" type="text" />
          </div>
          <div class="col-12">
            <BaseSelect id="listRequest" label="Tipo de solicitud:" placeholder="Seleccionar" :options="listRequest"
                  v-model="technicalData.key_request" :error="errors.key_request" :disabled="this.valueStatus.key_request_order === 2 || this.valueStatus.key_status === 5 || this.valueStatus.key_status === 4" />
          </div>
        </div>
        <div class="row">
          <div class="col-md-12 col-lg-6">
            <BaseSelect id="typeID_Technical" label="TIPO DE DOCUMENTO:" placeholder="Seleccionar" :options="listTypeDocuments"
                  v-model="technicalData.typeID_Technical" :error="errors.typeID_Technical" :disabled="this.valueStatus.key_request_order === 2 || this.valueStatus.key_status === 5 || this.valueStatus.key_status === 4" />
          </div>
          <div class="col-md-12 col-lg-6">
            <BaseInput
              :disabled="this.valueStatus.key_request_order === 2 || this.valueStatus.key_status === 5 || this.valueStatus.key_status === 4"
              name="IDPatient_Technical" v-model="technicalData.IDPatient_Technical" label="Nº DE IDENTIFICACIÓN:" :error="errors.IDPatient_Technical"  type="text" />
          </div>
          <div class="col-md-12 col-lg-6">
            <BaseInput
              :disabled="this.valueStatus.key_request_order === 2 || this.valueStatus.key_status === 5 || this.valueStatus.key_status === 4"
              name="first_surname_Technical" v-model="technicalData.first_surname_Technical" :error="errors.first_surname_Technical" label="PRIMER APELLIDO:" type="text" />
          </div>
          <div class="col-md-12 col-lg-6">
            <BaseInput
              :disabled="this.valueStatus.key_request_order === 2 || this.valueStatus.key_status === 5 || this.valueStatus.key_status === 4"
              name="second_surname_Technical" v-model="technicalData.second_surname_Technical" :error="errors.second_surname_Technical" label="SEGUNDO APELLIDO:" type="text" />
          </div>
          <div class="col-md-12 col-lg-6">
            <BaseInput
              :disabled="this.valueStatus.key_request_order === 2 || this.valueStatus.key_status === 5 || this.valueStatus.key_status === 4"
              name="firstname_Technical" v-model="technicalData.firstname_Technical" :error="errors.firstname_Technical" label="PRIMER NOMBRE:" type="text" />
          </div>
          <div class="col-md-12 col-lg-6">
            <BaseInput
              :disabled="this.valueStatus.key_request_order === 2 || this.valueStatus.key_status === 5 || this.valueStatus.key_status === 4"
              name="middlename_Technical" v-model="technicalData.middlename_Technical" :error="errors.middlename_Technical" label="OTROS NOMBRES:" type="text" />
          </div>
          <div class="col-md-12 col-lg-6">
            <BaseSelect id="genre_Technical" label="GÉNERO:" placeholder="Seleccionar" :options="genderTypes"
                  v-model="technicalData.genre_Technical" :error="errors.genre_Technical" :disabled="this.valueStatus.key_request_order === 2 || this.valueStatus.key_status === 5 || this.valueStatus.key_status === 4"  />
          </div>
          <div class="col-md-12 col-lg-6">
            <BaseSelect id="civilStatus_Technical" label="ESTADO CIVIL:" placeholder="Seleccionar" :options="civilStatusypes"
                  v-model="technicalData.civilStatus_Technical" :error="errors.civilStatus_Technical" />
          </div>
          <div class="col-md-12 col-lg-6">
            <BaseInput
              :disabled="this.valueStatus.key_request_order === 2 || this.valueStatus.key_status === 5 || this.valueStatus.key_status === 4"
              name="birthDate_Technical" v-model="technicalData.birthDate_Technical" :error="errors.birthDate_Technical" label="FECHA DE NACIMIENTO:" type="date" />
          </div>
          <div class="col-md-12 col-lg-6">
            <BaseInput
              disabled
              name="age_Technical" v-model="technicalData.age_Technical" :error="errors.age_Technical"  label="EDAD:" type="text" />
          </div>
          <div class="col-md-12 col-lg-6">
            <BaseInput
              :disabled="this.valueStatus.key_request_order === 2 || this.valueStatus.key_status === 5 || this.valueStatus.key_status === 4"
              name="phone_Technical" v-model="technicalData.phone_Technical" :error="errors.phone_Technical" label="TELÉFONO:" type="text" />
          </div>
          <div class="col-md-12 col-lg-6">
            <BaseInput
              :disabled="this.valueStatus.key_request_order === 2 || this.valueStatus.key_status === 5 || this.valueStatus.key_status === 4"
              name="companions_phone_Technical" v-model="technicalData.companions_phone_Technical"  label="OTRO TELÉFONO:" type="text" />
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <BaseInput
              :disabled="this.valueStatus.key_request_order === 2 || this.valueStatus.key_status === 5 || this.valueStatus.key_status === 4"
              name="email_Technical" v-model="technicalData.email_Technical" :error="errors.email_Technical" label="CORREO ELECTRÓNICO DEL PACIENTE:" type="text" />
          </div>
          <div class="col-12">
            <BaseInput
              :disabled="this.valueStatus.key_request_order === 2 || this.valueStatus.key_status === 5 || this.valueStatus.key_status === 4"
              name="patient_address" v-model="technicalData.patient_address" :error="errors.patient_address" label="DIRECCIÓN DE RESIDENCIA:" type="text" />
          </div>
          <div class="col-12">
            <BaseInput
              :disabled="this.valueStatus.key_request_order === 2 || this.valueStatus.key_status === 5 || this.valueStatus.key_status === 4"
              name="authorizationCode_Technical" v-model="technicalData.authorizationCode_Technical" :error="errors.authorizationCode_Technical" label="CÓDIGO DE AUTORIZACIÓN:" type="text" />
          </div>
          <div class="col-12">
            <BaseInput
              :disabled="this.valueStatus.key_request_order === 2 || this.valueStatus.key_status === 5 || this.valueStatus.key_status === 4"
              name="workAddress_Technical" v-model="technicalData.workAddress_Technical" :error="errors.workAddress_Technical"  label="DIRECCIÓN DE TRABAJO:" type="text" />
          </div>
          <div class="col-12">
            <BaseInput
              :disabled="this.valueStatus.key_request_order === 2 || this.valueStatus.key_status === 5 || this.valueStatus.key_status === 4"
              name="charge_Technical" v-model="technicalData.charge_Technical" label="CARGO:" :error="errors.charge_Technical" type="text" />
          </div>
          <div class="col-12">
            <BaseInput
              :disabled="this.valueStatus.key_request_order === 2 || this.valueStatus.key_status === 5 || this.valueStatus.key_status === 4"
              name="jobFunctions_Technical" v-model="technicalData.jobFunctions_Technical" :error="errors.jobFunctions_Technical" label="FUNCIONES DEL CARGO:" type="text" />
          </div>
          <div class="col-12">
            <BaseInput
              :disabled="this.valueStatus.key_request_order === 2 || this.valueStatus.key_status === 5 || this.valueStatus.key_status === 4"
              name="companyTime_Technical" v-model="technicalData.companyTime_Technical" :error="errors.companyTime_Technical" label="TIEMPO DE SERVICIO EN LA EMPRSA:" type="text" />
          </div>
          <div class="col-12">
            <BaseInput
              :disabled="this.valueStatus.key_request_order === 2 || this.valueStatus.key_status === 5 || this.valueStatus.key_status === 4"
              name="initialDate_Technical" v-model="technicalData.initialDate_Technical" :error="errors.initialDate_Technical" label="FECHA DE ATENCIÓN INICIAL:" type="text" />
          </div>
          <div class="col-12">
            <BaseInput
              :disabled="this.valueStatus.key_request_order === 2 || this.valueStatus.key_status === 5 || this.valueStatus.key_status === 4"
              name="copago" v-model="technicalData.copago" label="COPAGO:"  type="text" />
          </div>
          <div class="col-12">
            <BaseInput
              :disabled="this.valueStatus.key_request_order === 2 || this.valueStatus.key_status === 5 || this.valueStatus.key_status === 4"
              name="diagnosis_Technical" v-model="technicalData.diagnosis_Technical" :error="errors.diagnosis_Technical" label="CAUSAL DE SOLICITUD:" type="text" />
          </div>
          <div class="col-12">
            <BaseInput
              :disabled="this.valueStatus.key_request_order === 2 || this.valueStatus.key_status === 5 || this.valueStatus.key_status === 4"
              name="companionsName_Technical" v-model="technicalData.companionsName_Technical"  label="NOMBRE DEL ACOMPAÑANTE:" type="text" />
          </div>
        </div>
        <div class="row">
          <div class="col-md-12 col-lg-6">
            <BaseInput
              :disabled="this.valueStatus.key_request_order === 2 || this.valueStatus.key_status === 5 || this.valueStatus.key_status === 4"
              name="relationship_Technical" v-model="technicalData.relationship_Technical"  label="PARENTESCO:" type="text" />
          </div>
          <div class="col-md-12 col-lg-6">
            <BaseInput
              :disabled="this.valueStatus.key_request_order === 2 || this.valueStatus.key_status === 5 || this.valueStatus.key_status === 4"
              name="passengerPhone_Technical" v-model="technicalData.passengerPhone_Technical"  label="TELÉFONO DEL ACOMPAÑANTE:" type="text" />
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <BaseSelect id="typeCare_Technical" label="TIPO DE ATENCIÓN:"  placeholder="Seleccionar" :options="injuryTypes"
                  v-model="technicalData.typeCare_Technical" :error="errors.typeCare_Technical" :disabled="this.valueStatus.key_request_order === 2 || this.valueStatus.key_status === 5 || this.valueStatus.key_status === 4" />
          </div>
        </div>

        <!-- Botón de guardado al final del formulario -->
        <div class="row mt-4">
          <div class="col-12 text-end">
            <button
              type="submit"
              class="btn btn-primary"
              :disabled="this.valueStatus.key_request_order === 2 || this.valueStatus.key_status === 5 || this.valueStatus.key_status === 4"
            >
              Guardar
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import BaseInput from "../utilsComponents/BaseInput.vue";
import BaseSelect from "../utilsComponents/BaseSelect.vue";
import BaseTextarea from "../utilsComponents/BaseTextarea.vue";
import Swal from 'sweetalert2'
import { mapActions, mapGetters } from "vuex";

export default {
  name: "formTechnical",
  components: {
    BaseInput,
    BaseSelect,
    BaseTextarea
  },
  props: {
    title: {
      type: String,
      default: "Formulaire technique"
    },
    isLoading: {
      type: Boolean,
      default: false
    },
    valueStatus: Object
  },
  data() {
    return {
      formTechnical: {
        // Define your form fields here
      },
      searchserviceOrder: this.valueStatus.id,
      searchKeyPatient: this.valueStatus.key_patient,
      technicalData: {
        date_Technical: '',
        department_Technical: '',
        patient_municipality: '',
        patient_location: '',
        geolocation_Technical: '',
        services_name: '',
        agreement_Technical: '',
        mision_Technical: '',
        key_request: '',
        typeID_Technical: '',
        IDPatient_Technical: '',
        first_surname_Technical: '',
        second_surname_Technical: '',
        firstname_Technical: '',
        middlename_Technical: '',
        genre_Technical: '',
        civilStatus_Technical: '',
        birthDate_Technical: '',
        age_Technical: '',
        phone_Technical: '',
        companions_phone_Technical: '',
        email_Technical: '',
        patient_address: '',
        authorizationCode_Technical: '',
        workAddress_Technical: '',
        charge_Technical: '',
        jobFunctions_Technical: '',
        companyTime_Technical: '',
        initialDate_Technical: '',
        copago: '',
        diagnosis_Technical: '',
        companionsName_Technical: '',
        relationship_Technical: '',
        passengerPhone_Technical: '',
        typeCare_Technical: '',
        residenceAddress_Technical: '',
        id_technical: '',
        // Si tienes más campos, agrégalos aquí
      },
      errors: {},
      genderTypes: [
        { id: "M", name: "Masculino" },
        { id: "F", name: "Femenino" },
        { id: "O", name: "Otro" }
      ],
      civilStatusypes: [
        { id: "Soltero/a", name: "Soltero/a" },
        { id: "Casado/a", name: "Casado/a" },
        { id: "Divorciado/a", name: "Divorciado/a" },
        { id: "Viudo/a", name: "Viudo/a" }
      ],
      injuryTypes: [
      { id: "", name: "Seleccionar..." },
      { id: "ENFERMEDAD GENERAL", name: "ENFERMEDAD GENERAL" },
      { id: "ENFERMEDAD PROFESIONAL", name: "ENFERMEDAD PROFESIONAL" },
      { id: "1", name: "ACCIDENTE TRABAJO" },
      { id: "2", name: "ACCIDENTE TRANSITO" },
      { id: "3", name: "ACCIDENTE OFIDICO" },
      { id: "4", name: "ACCIDENTE RABICO" },
      { id: "5", name: "EVENTO CATASTROFICO" },
      { id: "6", name: "LESION AGRESION" },
      { id: "7", name: "LESION AUTO INFLINGIDA" },
      { id: "8", name: "SOSPECHA ABUSO SEXUAL" },
      { id: "9", name: "SOSPECHA MALTRATO EMOCIONAL" },
      { id: "10", name: "SOSPECHA MALTRATO FISICO" },
      { id: "11", name: "SOSPECHA VIOLENCIA SEXUAL" },
      { id: "12", name: "OTRA" },
      { id: "13", name: "OTRO TIPO ACCIDENTE" }
    ]
    };
  },
  mounted() {
    this.technicalData = this.valueStatus;
    this.consulterAgreement();
    this.consulter();
    this.getDepartaments();
    this.getRequest();
    this.getTypeDocuments();
    this.calculateAge(); // Llama a la función para calcular la edad al montar el componente
  },
  methods: {
    ...mapActions('History', ["SearchOrder"]),
    ...mapActions('HistoryData', ["saveTechnical"]),
    ...mapActions('Municipality', ["getDepartaments", "getLocalitiesType", "getMunicipalities"]),
    ...mapActions('Request', ["getrequests"]),
    ...mapActions("TradeAgreement", [
      "getAgreementsSelect",
      "getGeoreferencing",
      "getMissionCompanyToEntity",
    ]),
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
    ]),

    async sendFormsTechnical() {
      if (!this.validateForm()) {
        Swal.fire({
          icon: 'error',
          title: 'Campos obligatorios',
          text: 'Por favor, complete todos los campos requeridos.',
        });
        return;
      }
      try {
        // Llama a la acción de Vuex para guardar
        const query = {
          date_Technical: this.technicalData.date_Technical,
          key_department: this.technicalData.department_Technical,
          patient_municipality: this.technicalData.patient_municipality,
          key_locality: this.technicalData.patient_location,
          geolocation_Technical: this.technicalData.geolocation_Technical,
          services_name: this.technicalData.services_name,
          agreement_Technical: this.technicalData.agreement_Technical,
          mision_Technical: this.technicalData.mision_Technical,
          key_request: this.technicalData.key_request,
          key_type_document: this.technicalData.typeID_Technical,
          document: this.technicalData.IDPatient_Technical,
          first_surname: this.technicalData.first_surname_Technical,
          second_surname: this.technicalData.second_surname_Technical,
          firstname: this.technicalData.firstname_Technical,
          middlename: this.technicalData.middlename_Technical,
          genre: this.technicalData.genre_Technical,
          marital_status: this.technicalData.civilStatus_Technical,
          birthdate: this.technicalData.birthDate_Technical,
          age: this.technicalData.age_Technical,
          phone_Technical: this.technicalData.phone_Technical,
          email: this.technicalData.email_Technical,
          email_confirm: this.technicalData.email_Technical,
          patient_address: this.technicalData.patient_address,
          address_of_residence: this.technicalData.patient_address,
          authorizationCode_Technical: this.technicalData.authorizationCode_Technical,
          work_address: this.technicalData.workAddress_Technical,
          charge: this.technicalData.charge_Technical,
          job_functions: this.technicalData.jobFunctions_Technical,
          time_of_service: this.technicalData.companyTime_Technical,
          initialDate_Technical: this.technicalData.initialDate_Technical,
          copago: this.technicalData.copago,
          patient_diagnosis: this.technicalData.diagnosis_Technical,
          name_accompanying: this.technicalData.companionsName_Technical,
          relationship: this.technicalData.relationship_Technical,
          companion_phone: this.technicalData.passengerPhone_Technical,
          type_of_attention: this.technicalData.typeCare_Technical,
          category_type_attention: 'AYTEC00',
          key_municipality: this.technicalData.patient_municipality,
          key_request: this.technicalData.key_request,
          key_history: this.searchserviceOrder,
          key_patient: this.searchKeyPatient,
          id: this.technicalData.id_technical,
          companions_phone: this.technicalData.companions_phone_Technical,
        }
        const response = await this.saveTechnical(query);
        if (response) {
          Swal.fire({
                position: 'top-center',
                icon: 'success',
                title: 'Datos se actualizaron con éxito',
                showConfirmButton: false,
                timer: 1500
            });
            this.spiner = false;
            this.$emit('saved');
        } else {
          this.spiner = false;
            Swal.fire({
                icon: 'error',
                title: 'Lo siento, los datos no se pudieron actualizar',
                text: response, 
            });
        }
      } catch (error) {
        //this.$alert.error("Error al guardar.");
        console.error(error);
      }
    },

    validateForm() {
      this.errors = {};
      let isValid = true;
      // Lista de campos requeridos
      const requiredFields = [
        /* "date_Technical",
        "department_Technical",
        "patient_municipality",
        //"patient_location",
        "geolocation_Technical",
        "services_name",
        "agreement_Technical",
        "mision_Technical",
        "key_request",
        "typeID_Technical",
        "IDPatient_Technical",
        "first_surname_Technical",
        "second_surname_Technical",
        "firstname_Technical",
        "genre_Technical",
        "civilStatus_Technical",
        "birthDate_Technical",
        "age_Technical",
        "phone_Technical",
        "email_Technical",
        "patient_address",
        "authorizationCode_Technical",
        "workAddress_Technical",
        "charge_Technical",
        "jobFunctions_Technical",
        "companyTime_Technical",
        "initialDate_Technical",
        "copago",
        "diagnosis_Technical",
        "typeCare_Technical" */
      ];
      requiredFields.forEach(field => {
        if (!this.technicalData[field] || this.technicalData[field].toString().trim() === "") {
          this.errors[field] = "Este campo es obligatorio";
          isValid = false;
        }
      });
      return isValid;
    },

    consulterAgreement() {
      if (this.technicalData.key_agreement) {
        this.getGeoreferencing(this.technicalData.key_agreement);
        this.getMissionCompanyToEntity(this.technicalData.key_agreement);
      }
    },
    consulter() {
      if (this.technicalData.department_Technical) {
        this.getMunicipality(this.technicalData.department_Technical);
        if (this.technicalData.department_Technical == 5) {
          this.getLocality(this.technicalData.department_Technical);
        }
      }
    },
    calculateAge() {
      const birthDate = this.technicalData.birthDate_Technical;
      if (!birthDate) {
        this.technicalData.age_Technical = '';
        return;
      }

      const today = new Date();
      const birth = new Date(birthDate);
      let age = today.getFullYear() - birth.getFullYear();
      const monthDiff = today.getMonth() - birth.getMonth();

      // Ajustar si el cumpleaños aún no ha ocurrido este año
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--;
      }

      this.technicalData.age_Technical = `${age} años de edad`;
    }
  },
  computed: {
    ...mapGetters('History', ['gethistory', 'gettechnical']),
    ...mapGetters('Municipality', ['dataDepartaments', 'getLocalities', 'dataMunicipalities']),
    ...mapGetters('Request', ['getrequest']),
    ...mapGetters("TradeAgreement", ["listAgreements", "listGeoreferencing", "listMissionCompany"]),
    ...mapGetters("ContentConsultations", [
      "listTypeDocuments", 
      "listDepartaments", 
      "listMunicipality", 
      "listLocality", 
      "listSeat", 
      "listVehicle", 
      "listRequest", 
      "listEvents", 
      "listProduct", 
      "listDoctor"
    ]),
  },
  watch: {
    'technicalData.birthDate_Technical': function (newVal) {
      this.calculateAge(); // Recalcula la edad cuando cambia la fecha de nacimiento
    }
  }
}
</script>