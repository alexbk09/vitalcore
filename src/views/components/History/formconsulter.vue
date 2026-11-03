<template>
  <div>
    <Loading v-if="this.isLoading" :valuetitle="title" />
    <div class="" v-else>
      <form action="" v-on:submit.prevent="sendFormsTechnical()">

        <div class="card-body">
          <div class="row justify-content-center mb-4 px-4">
            <div class="col-md-10 p-1">
              <label for="example-text-input" class="form-control-label">Motivo de consulta:</label>
              <textarea name="reasonConsultation_Technical" rows="6" class="form-control form-control-sm"
                :disabled="this.valueStatus.key_status === 5 || this.valueStatus.key_status === 4"
                v-model="technicalData.reasonConsultation_Technical"></textarea>
            </div>
            <div class="col-md-10 p-1">
              <label for="example-text-input" class="form-control-label">Enfermedad actual:</label>
              <textarea name="currentIllness_Technical" class="form-control form-control-sm" rows="6"
                :disabled="this.valueStatus.key_status === 5 || this.valueStatus.key_status === 4"
                v-model="technicalData.currentIllness_Technical"></textarea>
            </div>
            <div class="col-md-10">
              <label for="">¿EL PACIENTE REQUIERE PROCEDIMIENTOS?</label>
              <select
                name="technicalData.procedures_Technical"
                value="Select"
                class="form-select"
                v-model="technicalData.procedures_Technical"
                @change="changeTimeTotal($event);"
                :disabled="this.technicalData.procedures_Technical === 1 
                || this.technicalData.procedures_Technical === 0 
                || this.technicalData.procedures_Technical === false
                || this.technicalData.procedures_Technical === true"
              >
                <option value="Select" selected>Seleccione una opción</option>
                <option :value="true || 1">SI</option>
                <option :value="false || 0">NO</option>
              </select>
            </div>
          </div>
        </div>
        <div class="row" v-if="this.valueStatus.key_status === 3">
          <div class="col-md-12 text-end">
            <argon-button type="submit" color="success mt-4" :disabled="spiner === true" size="sm" class="ms-auto">
              <span v-if="spiner === false">Guardar</span>
              <div class="d-flex align-items-center" v-if="spiner === true">
                <strong class="me-2">Guardando Datos</strong>
                <div class="spinner-border ms-auto " role="status" aria-hidden="true"></div>
              </div>
            </argon-button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import ArgonButton from "@/components/ArgonButton.vue";
import { mapActions, mapGetters } from "vuex";
import moment from 'moment'
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'
import Loading from '../Utils/Loading.vue';


export default {
  name: "formHistory",
  props: {
    valueStatus: Object
  },
  data() {
    return {
      searchserviceOrder: this.valueStatus.id,
      searchKeyPatient: this.valueStatus.key_patient,
      procedimientosDisabled: false,
      technicalData: {
        reasonConsultation_Technical: "",
        currentIllness_Technical: "",
        procedures_Technical: "",
      },
      spiner: false,
    };

  },

  components: {
    ArgonButton,
    Loading
  },
  async mounted() {
    this.technicalData = this.valueStatus;
  },
  methods: {
    ...mapActions('HistoryData', ["saveTechnical"]),
    ...mapActions('History', ['incrementTotalDurationMinutes']),
    validateUser() {
      this.userValidate = JSON.parse(localStorage.getItem('user'))
    },
    changeTimeTotal(event) {
      if (event.target.value === "SI") {
        const totalMinutes = this.getTotalDurationMinutes;
        this.incrementTotalDurationMinutes(totalMinutes + 15);
        Swal.fire({
          icon: 'info',
          title: 'Tiempo adicional agregado',
          text: 'Se han sumado 15 minutos adicionales para la atención del paciente debido a la realización de procedimientos.',
          timer: 2500,
          showConfirmButton: false
        });
      } else {
        const totalMinutes = this.getTotalDurationMinutes;
        if (totalMinutes > 20) {
          this.incrementTotalDurationMinutes(totalMinutes - 15);
        }
      }
      this.procedimientosDisabled = true; // Deshabilita el select después de seleccionar
    },
    async sendFormsTechnical() {
      try {
        // Validación simple de campos obligatorios (puedes personalizar según tus necesidades)
        if (!this.technicalData.IDPatient_Technical || !this.technicalData.firstname_Technical) {
          this.$alert.error("Por favor complete los campos obligatorios.");
          return;
        }
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
          phone_Technical_2: this.technicalData.phone_Technical_2,
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
          reason_consultation: this.technicalData.reasonConsultation_Technical,
          current_disease: this.technicalData.currentIllness_Technical,
          procedures_time_date: this.technicalData.procedures_Technical,

        }
        const response = await this.saveTechnical(query);
        if (response.status && !response.error) {
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

  },
  computed: {
    ...mapGetters('History', ['gethistory', 'gettechnical', 'getTotalDurationMinutes']),
    ...mapGetters('Municipality', ['dataDepartaments', 'getLocalities', 'dataMunicipalities']),
    ...mapGetters('Request', ['getrequest']),
  }
};
</script>