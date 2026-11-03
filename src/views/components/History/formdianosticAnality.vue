<template>
  <div>
    <form action="" v-on:submit.prevent="sendFormsAnalysis()">
      <div class="row mt-5">
        <hr>
        <div class="col-md-12">
          <label for="example-text-input" class="form-control-label">Análisis:</label>
          <textarea name="Analysis_diagnostic" id="" class="form-control" v-model="diagnostic.Analysis_diagnostic"
            :disabled="valueStatus.key_status == 5 || valueStatus.key_status == 4" rows="10"></textarea>
          <b-alert v-if="msg_error.Analysis_diagnostic" class="text-danger text-alert" variant="danger" show>{{
            msg_error.Analysis_diagnostic
          }}</b-alert>
        </div>
        <div class="col-md-6 col-xl-4 mb-5 mt-3" v-if="this.gethistory.key_event_type == 3">
          <label for="example-text-input" class="form-control-label">Fecha Control:</label>
          <input type="date" class="form-control form-control-sm" name="control_date" :min="getCurrentDate()"
            v-model="diagnostic.control_date" :disabled="valueStatus.key_status == 5 || valueStatus.key_status == 4" />
        </div>
        <div class="col-md-6 col-xl-4 mt-3">
          <label for="example-text-input" class="form-control-label">Confirmar Muerte:</label>
          <select name="confirmdeath_diagnostic" class="form-select form-select-sm"
            :disabled="valueStatus.key_status == 5 || valueStatus.key_status == 4" v-model="diagnostic.confirmdeath_diagnostic"
            id="">
            <option value="0">No Aplica</option>
            <option value="2">Falso</option>
            <option value="3">Confirmar</option>
          </select>
        </div>
        <div class="col-md-6 col-xl-4 mt-3" v-if="diagnostic.confirmdeath_diagnostic == 3">
          <label for="example-text-input" class="form-control-label">Fecha de muerte (°c):</label>
          <input type="date" class="form-control form-control-sm" v-model="diagnostic.deathdate_diagnostic"
            :disabled="valueStatus.key_status == 5 || valueStatus.key_status == 4" name="deathdate_diagnostic" />
        </div>
        <!--  {{this.valueStatus}} -->
        <div class="col-md-12 text-end mt-5" v-if="this.valueStatus.key_status === 3">
          <argon-button type="submit" color="success" :disabled="spiner === true" size="sm" class="ms-auto">
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
</template>
<script>
import ArgonButton from "@/components/ArgonButton.vue";
import { mapActions, mapGetters } from "vuex";
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'


const body = document.getElementsByTagName("body")[0];

export default {
  name: "formHistory",
  props: {
    valueStatus: String
  },
  data() {
    return {
      userValidate: {},
      fecha: new Date().toLocaleDateString(),
      showMenu: false,
      diagnostic: {
        Analysis_diagnostic: '',
        deathdate_diagnostic: 0,
        confirmdeath_diagnostic: '',
        control_date: null
      },
      msg_error: {
        Analysis_diagnostic: '',
        deathdate_diagnostic: '',
        confirmdeath_diagnostic: '',
        control_date: null
      },
      show: false,
      searchserviceOrder: this.valueStatus.id,
      searchKeyPatient: this.valueStatus.key_patient,
      spiner: false,
      keyHistory: '',
      keyPatient: '',
      KeyTypeCare: '',
      searchValue: ''
    };

  },
  components: {
    ArgonButton,
  },

  async mounted() {
    this.$store.state.isAbsolute = true;
    this.validateUser()
    if (this.searchserviceOrder !== '' && this.searchserviceOrder !== null && this.searchserviceOrder !== undefined) {
      //await this.getStoreserviceOrder()
      let struct = {
          Analysis_diagnostic: this.valueStatus?.analysis,
          deathdate_diagnostic: this.valueStatus?.death_date,
          confirmdeath_diagnostic: this.valueStatus?.death_confirmed,
          control_date: this.valueStatus?.control_date,
        };
       this.diagnostic = struct
    }
  },
  methods: {
    ...mapActions('History', ["SearchAnality", "addAnalysis", "searchDiagnostic", "searchCie10", "cleadCie10", "destroyCie10"]),
    async getStoreserviceOrder() {
      if (this.searchserviceOrder != undefined) {
        const searchOrder = {
          keyHistory: this.searchserviceOrder,
        }
        await this.SearchAnality(searchOrder)
      }
    },
    getCurrentDate() {
      const today = new Date();
      // Formatear la fecha actual en formato YYYY-MM-DD
      const formattedDate = today.toISOString().split('T')[0];
      return formattedDate;
    },
    validateUser() {
      this.userValidate = JSON.parse(localStorage.getItem('user'))
    },
    clearForm() {
      this.msg_error.Analysis_diagnostic = ''
      this.msg_error.confirmdeath_diagnostic = ''
      this.msg_error.control_date = ''
    },
    async sendFormsAnalysis() {
      this.diagnostic.IDHistory = this.valueStatus.id
      this.diagnostic.IDPatient = this.searchKeyPatient

      if (this.diagnostic.Analysis_diagnostic == '' || this.diagnostic.Analysis_diagnostic == null) {
        this.msg_error.Analysis_diagnostic = 'Este campo es requerido'
        return
      }
      /* if (this.diagnostic.control_date == '' || this.diagnostic.control_date == null) {
        this.msg_error.control_date = 'Este campo es requerido'
        return
      } */
      /* if (this.diagnostic.confirmdeath_diagnostic == '' || this.diagnostic.confirmdeath_diagnostic == null) {
        this.msg_error.confirmdeath_diagnostic = 'Este campo es requerido'
        return
      } */

      this.spiner = true
      const response = await this.addAnalysis(this.diagnostic)
      if (response) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Datos agregado con exito',
          showConfirmButton: false,
          timer: 1500
        })
        this.$emit('saved');
        this.spiner = false
      }
      if (response === false) {
        this.spiner = false
        Swal.fire({
          icon: 'error',
          title: 'Lo siento, los datos no se pudieron agregar',
          text: 'Intentalo de nuevo',
        })
      }
    },

  },
  computed: {
    ...mapGetters('History', ['gethistory', 'getDiagnostic', 'getCie10', 'getanality']),
  }
};
</script>