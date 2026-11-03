<template>
  <div>
    <Loading v-if="this.isLoading" :valuetitle="title" />
    <div class="" v-else>
      <form action="" v-on:submit.prevent="sendFormsdisclaimer()">
        <div class="row justify-content-center mb-4">
          <div class="col-md-10" v-if="valueStatus.key_status === 5">
            <label for="">Tipo de cancelación</label>
            <select class="form-select form-select-sm" name="key_request" v-model="disclaimer.key_request" id=""
              :disabled="valueStatus.key_status !== 5 && valueStatus.key_status !== 4">
              <option v-for="item in filteredRequest" :key="item.id_request" :value="item.id_request">
                {{ item.name_request }}
              </option>
            </select>
          </div>
          <div class="col-md-10 mt-4" v-if="this.getDisclaimer">
            <table class="table table-striped">
              <thead style="background-color: #C8E4FF;">
                <tr >
                <th>Fecha de Creacion</th>
                <th>Observación</th>
                <th>Hora</th>
              </tr>
              </thead>
              <tbody>
                <tr v-for="disclaimer in getDisclaimer" :key="disclaimer.id_disclaimer">
                <td>{{ moment(disclaimer.created_at).format('DD/MM/YYYY') }}</td>
                <td>{{ disclaimer.disclaimer }}</td>
                <td>{{ moment(disclaimer.created_at).format('hh:mm') }}</td>
              </tr>
              </tbody>
            </table>
          </div>
          <div class="col-md-10">
            <label for="example-text-input" class="form-control-label">Descripción:</label>
            <textarea name="disclaimer" cols="30" rows="10" v-model="disclaimer.disclaimer"
              class="form-control form-control-sm"
              :disabled="valueStatus.key_status !== 5 && valueStatus.key_status !== 4" id=""></textarea>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12 text-end" >
            <argon-button type="submit" color="success"
              :disabled="spiner === true || (valueStatus.key_status !== 4 && valueStatus.key_status !== 5)" size="sm"
              class="ms-auto">
              <span v-if="spiner === false">Guardar</span>
              <div class="d-flex align-items-center" v-if="spiner === true">
                <strong class="me-2">Guardando Datos</strong>
                <div class="spinner-border ms-auto" role="status" aria-hidden="true"></div>
              </div>
            </argon-button>
          </div>
        </div>
      </form>
      <div class="mt-3" v-if="this.StatusOrders == true">
        <ul class="nav nav-tabs nav-fill flex-nowrap" id="myTab" role="tablist" style="overflow-x: auto;">
        <li class="nav-item" role="presentation">
          <button class="nav-link active" id="focused-tab" data-bs-toggle="tab" data-bs-target="#focused"
            type="button" role="tab" aria-controls="focused" aria-selected="true">Medicamentos <br> focalizado</button>
        </li>
        <li class="nav-item" role="presentation">
          <button class="nav-link" id="procedureFocused-tab" data-bs-toggle="tab" data-bs-target="#procedureFocused"
            type="button" role="tab" aria-controls="procedureFocused" aria-selected="true">Procedimientos <br> focalizado</button>
        </li>
        <li class="nav-item" role="presentation">
          <button class="nav-link" id="drugsupplies-tab" data-bs-toggle="tab" data-bs-target="#drugsupplies" type="button"
            role="tab" aria-controls="drugsupplies" aria-selected="false">Medicamentos <br> en farmacia</button>
        </li>
        <li class="nav-item" role="presentation">
          <button class="nav-link" id="cups-tab" data-bs-toggle="tab" data-bs-target="#cups" type="button"
            role="tab" aria-controls="cups" aria-selected="false">Ordenes <br> procedimientos</button>
        </li>
        <li class="nav-item" role="presentation">
          <button class="nav-link" id="procedures-tab" data-bs-toggle="tab" data-bs-target="#procedures" type="button"
            role="tab" aria-controls="procedures" aria-selected="false">Orden <br> consentimiento</button>
        </li>
        <li class="nav-item" role="presentation">
          <button class="nav-link" id="disabilities-tab" data-bs-toggle="tab" data-bs-target="#disabilities" type="button"
            role="tab" aria-controls="disabilities" aria-selected="false">Ordenes <br> incapacidades</button>
        </li>
      </ul>
        <div class="tab-content mt-5" id="myTabContent">
          <!-- <div class="tab-pane fade show active" id="medicines" role="tabpanel" aria-labelledby="medicines-tab">
          <viewFormmedicides :valueStatus="valueStatus" :valuetitle="medicines" />
        </div> -->
          <div class="tab-pane fade show active" id="focused" role="tabpanel" aria-labelledby="focused-tab">
            <viewFormfocused :valueStatus="valueStatus" :disclaimer="statusActive" :valuetitle="medicinesFoc" />
          </div>
          <div class="tab-pane fade" id="procedureFocused" role="tabpanel" aria-labelledby="procedureFocused-tab">
            <procedureFormfocused :valueStatus="valueStatus" :disclaimer="statusActive" :valuetitle="ProFoc" />
          </div>
          <div class="tab-pane fade" id="drugsupplies" role="tabpanel" aria-labelledby="drugsupplies-tab">
            <viewFormmedicides :valueStatus="valueStatus" :disclaimer="statusActive" :valuetitle="medicines" />
          </div>
          <div class="tab-pane fade" id="cups" role="tabpanel" aria-labelledby="cups-tab">
            <viewCups :valueStatus="valueStatus" :disclaimer="statusActive" :valuetitle="cups" />
          </div>
          <div class="tab-pane fade" id="procedures" role="tabpanel" aria-labelledby="procedures-tab">
            <viewProcedures :valueStatus="valueStatus" :disclaimer="statusActive" :valuetitle="procedures" />
          </div>
          <div class="tab-pane fade" id="disabilities" role="tabpanel" aria-labelledby="disabilities-tab">
            <viewImcapacities :valueStatus="valueStatus" :disclaimer="statusActive" />
          </div>
        </div>
      </div>
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
import viewFormmedicides from "./orders/formMedicines.vue"
import viewImcapacities from "./orders/formimcapacities.vue"
import viewProcedures from "./orders/formprocedure.vue"
import procedureFormfocused from "./orders/formProcedureFocused.vue"
import viewFormfocused from "./orders/formfocused.vue"
import viewCups from "./orders/formcups.vue"

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
      disclaimer: {
        disclaimer: '',
        key_history: '',
        key_patient: '',
        key_request: '',
        key_status: '',
      },
      msg_error: {
        disclaimer: '',
      },
      show: false,
      keyHistory: '',
      spiner: false,
      keyPatient: '',
      KeyTypeCare: '',
      isLoading: true,
      title: 'Nota Aclaratoria',
      medicinesFoc: 'MEDFOC',
      medicines: 'MED',
      drugsupplies: 'SUM',
      procedures: 'PROC',
      cups: 'PROC',
      disabilities: 'INCAP',
      focused: 'FOC',
      ProFoc: 'PROFOC',
      searchservicHistory: this.valueStatus.id,
      searchKeyPatient: this.valueStatus.key_patient,
      StatusOrders: false,
      statusActive: this.valueStatus.key_status,
    };

  },
  components: {
    ArgonButton,
    Loading,
    viewFormmedicides,
    viewImcapacities,
    viewProcedures,
    viewCups,
    viewFormfocused,
    procedureFormfocused
  },

  async mounted() {
    this.$store.state.isAbsolute = true;
    this.getrequests()
    this.validateUser()
    if (this.searchservicHistory !== '' && this.searchservicHistory !== null && this.searchservicHistory !== undefined) {
      await this.loadingActive()
      this.disclaimer = this.getDisclaimer
    }
  },
  methods: {
    ...mapActions('History', ["SearchOrder", "addDisclaimer", "searchDisclaimer", "updateevolution"]),
    ...mapActions('Request', ["getrequests"]),
    async getStoreserviceOrder() {
      if (this.searchservicHistory != undefined) {
        const searchOrder = {
          key_history: this.searchservicHistory,
          key_patient: this.searchKeyPatient
        }
        await this.searchDisclaimer(searchOrder)
      }
    },
    async loadingActive() {
      this.isLoading = true
      if (this.disclaimer != '') {
        await this.getStoreserviceOrder()
      }
      this.isLoading = false
    },
    validateUser() {
      this.userValidate = JSON.parse(localStorage.getItem('user'))
    },
    async sendFormsdisclaimer() {
      this.disclaimer.key_history = this.searchservicHistory
      this.disclaimer.key_patient = this.searchKeyPatient
      this.disclaimer.key_status = this.valueStatus.status
      this.spiner = true
      const response = await this.addDisclaimer(this.disclaimer)
      if (response) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Datos agregado con exito',
          showConfirmButton: false,
          timer: 1500
        })
        this.spiner = false
        this.getStoreserviceOrder()

        Swal.fire({
          title: "¿Esta nota aclaratoria requiere algun tipo de orden?",
          showDenyButton: true,
          confirmButtonText: "Si",
          denyButtonText: "No"
        }).then((result) => {
          if (result.isConfirmed) {
            this.StatusOrders = true
          } else if (result.isDenied) {
            this.StatusOrders = false
          }
        });
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
    moment,

  },
  computed: {
    ...mapGetters('History', ['gethistory', 'getDisclaimer']),
    ...mapGetters('Request', ['getrequest']),

    filteredRequest() {
      return this.getrequest ? this.getrequest.filter(item => item.id_request !== 1 && item.id_request !== 2 && item.id_request !== 3) : [];
    }
  }
};
</script>