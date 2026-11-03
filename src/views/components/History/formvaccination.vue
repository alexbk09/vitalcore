<template>
  <div>
    <Loading v-if="this.isLoading" :valuetitle="title" />
    <div class="" v-else>
      <form action="" v-on:submit.prevent="sendFormsVaccination()">
        <div class="row justify-content-center ">
          <div class="col-12 col-md-10">
            <div class="row ">
              <div class="col-md-6 col-xl-6">
                <BaseSelect label="BCG:" :options="Options" v-model="vaccination.bcg" :error="errors.bcg"
                  :disabled="valueStatus.key_status == 5 || valueStatus.key_status == 4" name="bcg" />
              </div>
              <div class="col-md-6 col-xl-6">
                <BaseSelect label="Hetatitis A:" :options="Options" v-model="vaccination.hepatitis_a" :error="errors.hepatitis_a"
                  :disabled="valueStatus.key_status == 5 || valueStatus.key_status == 4" name="hepatitis_a" />
              </div>
              <div class="col-md-6 col-xl-6">
                <BaseSelect label="Neumococo:" :options="Options" v-model="vaccination.neumococo" :error="errors.neumococo"
                  :disabled="valueStatus.key_status == 5 || valueStatus.key_status == 4" name="neumococo" />
              </div>
              <div class="col-md-6 col-xl-6">
                <BaseSelect label="Pentavalente:" :options="Options" v-model="vaccination.pentavalente" :error="errors.pentavalente"
                  :disabled="valueStatus.key_status == 5 || valueStatus.key_status == 4" name="pentavalente" />
              </div>
              <div class="col-md-6 col-xl-6">
                <BaseSelect label="Polio:" :options="Options" v-model="vaccination.polio" :error="errors.polio"
                  :disabled="valueStatus.key_status == 5 || valueStatus.key_status == 4" name="polio" />
              </div>
              <div class="col-md-6 col-xl-6">
                <BaseSelect label="Rotavirus:" :options="Options" v-model="vaccination.rotavirus" :error="errors.rotavirus"
                  :disabled="valueStatus.key_status == 5 || valueStatus.key_status == 4" name="rotavirus" />
              </div>
              <div class="col-md-6 col-xl-6">
                <BaseSelect label="TD o TT Mujeres en edad Fertil 15 a 19 Años:" :options="Options" v-model="vaccination.td_tt_woman"
                  :error="errors.td_tt_woman" :disabled="valueStatus.key_status == 5 || valueStatus.key_status == 4" name="td_tt_woman" />
              </div>
              <div class="col-md-6 col-xl-6">
                <BaseSelect label="Virus del papiloma humano (VPH):" :options="Options" v-model="vaccination.vph" :error="errors.vph"
                  :disabled="valueStatus.key_status == 5 || valueStatus.key_status == 4" name="vph" />
              </div>
              <div class="col-md-6 col-xl-6">
                <BaseSelect label="Esquema adecuado para la edad:" :options="[
                  { id: 'SI', name: 'SI' },
                  { id: 'NO', name: 'NO' },
                  { id: 'NO REFIERE', name: 'NO REFIERE' }
                ]" v-model="vaccination.schema_year" :error="errors.schema_year"
                  :disabled="valueStatus.key_status == 5 || valueStatus.key_status == 4" name="schema_year" />
              </div>
              <div class="col-md-6 col-xl-6">
                <BaseSelect label="Covid:" :options="Options" v-model="vaccination.covid" :error="errors.covid"
                  :disabled="valueStatus.key_status == 5 || valueStatus.key_status == 4" name="covid" />
              </div>
              <div class="col-md-12 col-xl-4" v-if="vaccination.covid != 0 && vaccination.covid != 11 && vaccination.covid != '0'">
                <BaseInput label="Nombre de la vacuna:" :error="errors.name_vaccine"
                  :disabled="valueStatus.key_status == 5 || valueStatus.key_status == 4" name="name_vaccine"
                  v-model="vaccination.name_vaccine" ref="name_vaccine" />
              </div>
            </div>
          </div>
        </div>
        <div class="row" v-if="valueStatus.key_status === 3">
          <div class="col-md-12 text-end">
            <argon-button type="submit" color="success " :disabled="spiner === true" size="sm" class="ms-auto">
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
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'
import moment from 'moment'
import Loading from '../Utils/Loading.vue';

import BaseSelect from "../utilsComponents/BaseSelect.vue";
import BaseInput from "../utilsComponents/BaseInput.vue";
export default {
  name: "formHistory",
  props: {
    valueStatus: Object
  },
  data() {
    return {
      userValidate: {},
      fecha: new Date().toLocaleDateString(),
      showMenu: false,
      vaccination: {
        bcg: '',
        hepatitis_a: '',
        covid: '',
        neumococo: '',
        pentavalente: '',
        polio: '',
        rotavirus: '',
        td_tt_woman: '',
        vph: '',
        schema_year: '',
        patient_id: '',
        name_vaccine: '',
      },
      errors: {
        bcg: false,
        hepatitis_a: false,
        neumococo: false,
        pentavalente: false,
        polio: false,
        rotavirus: false,
        td_tt_woman: false,
        vph: false,
        schema_year: false,
        covid: false,
      },
      Options: [
        { id: 0, name: 'NO APLICA' },
        { id: 1, name: 'PRIMERA DOSIS' },
        { id: 2, name: 'SEGUNDA DOSIS' },
        { id: 3, name: 'TERCERA DOSIS' },
        { id: 4, name: 'CUATRO DOSIS' },
        { id: 5, name: 'CINCO DOSIS' },
        { id: 6, name: 'NO SE ADMINISTRA POR UNA TRADICIÓN' },
        { id: 7, name: 'NO SE ADMINISTRA POR UNA CONDICIÓN DE SALUD' },
        { id: 8, name: 'NO SE ADMINISTRA POR NEGACIÓN DEL USUARIO' },
        { id: 9, name: 'NO SE ADMINISTRA POR TENER DATOS DE CONTACTO DEL USUARIO NO ACTUALIZADOS' },
        { id: 10, name: 'NO SE ADMINISTRA POR OTRAS RAZONES' },
        { id: 11, name: 'SIN DATO' },
      ],
      msg_error: {

      },
      show: false,
      searchserviceOrder: this.valueStatus.id,
      searchKeyPatient: this.valueStatus.key_patient,
      keyHistory: '',
      spiner: false,
      keyPatient: '',
      KeyTypeCare: '',
      isLoading: true,
      title: 'Vacunación',
    };

  },
  components: {
    ArgonButton,
    Loading,
    BaseSelect,
    BaseInput
  },
  watch: {
    'vaccination.covid'(newVal) {
      if (newVal === 0 || newVal === 11) {
        this.vaccination.name_vaccine = "";
      }
    },
    async getVaccination() {
      this.isLoading = true
      if (this.valueStatus.id !== '' && this.valueStatus.id !== null && this.valueStatus.id !== undefined) {
        this.vaccination = this.getVaccination
        this.isLoading = false
      }
    }
  },
  async mounted() {
    if (this.vaccination.bcg === '') {
      this.vaccination.bcg = 0;
    }
    if (this.vaccination.hepatitis_a == '' && this.vaccination.hepatitis_a == null && this.vaccination.hepatitis_a == undefined) {
      this.vaccination.hepatitis_a = 0;
    }
    this.$store.state.isAbsolute = true;
    this.validateUser()
    if (this.searchserviceOrder !== '' && this.searchserviceOrder !== null && this.searchserviceOrder !== undefined) {
      await this.loadingActive()
      this.vaccination = this.getVaccination
    }
  },
  methods: {
    ...mapActions('History', ["addVaccination", "searchVaccination", "updateVaccination"]),
    async getStoreserviceOrder() {
      if (this.searchserviceOrder != undefined) {
        const searchOrder = {
          keyHistory: this.valueStatus.id,
          keyPatient: this.valueStatus.key_patient
        }
        await this.searchVaccination(searchOrder)
      }
    },
    async loadingActive() {
      this.isLoading = true
      await this.getStoreserviceOrder()
      this.isLoading = false
    },
    validateUser() {
      this.userValidate = JSON.parse(localStorage.getItem('user'))
    },
    validateFormVaccination() {
      this.errors = {};
      let isValid = true;
      // Lista de campos requeridos
      const requiredFields = [
        "bcg",
        "hepatitis_a",
        "neumococo",
        "pentavalente",
        "polio",
        "rotavirus",
        "td_tt_woman",
        "vph",
        "schema_year",
        "covid"
      ];

      requiredFields.forEach(field => {
        if (
          this.vaccination[field] === "" ||
          this.vaccination[field] === null ||
          this.vaccination[field] === undefined ||
          this.vaccination[field] === "0"
        ) {
          this.errors[field] = true;
          isValid = false;
        }
      });

      // Validar name_vaccine solo si covid es distinto de 0
      if (this.vaccination.covid != 0 && (!this.vaccination.name_vaccine || this.vaccination.name_vaccine === "" || this.vaccination.name_vaccine != 11)) {
        this.errors.name_vaccine = true;
        isValid = false;
      }

      return isValid;
    },
    async sendFormsVaccination() {
      this.vaccination.patient_id = this.searchKeyPatient;

      if (!this.validateFormVaccination()) {
        Swal.fire({
          icon: 'error',
          title: 'Campos obligatorios',
          text: 'Por favor, complete todos los campos requeridos.',
        });
        return;
      }

      const response = this.vaccination.bcg
        ? await this.updateVaccination(this.vaccination)
        : await this.addVaccination(this.vaccination);

      if (response === true) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Vacunación ' + (this.vaccination.bcg ? 'actualizada' : 'agregada') + ' con éxito',
          showConfirmButton: false,
          timer: 1500
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Lo siento, los datos no se pudieron ' + (this.vaccination.bcg ? 'actualizar' : 'agregar'),
          text: response,
        });
      }
    },
    moment,

  },
  computed: {
    ...mapGetters('History', ['getVaccination']),
  }
};
</script>