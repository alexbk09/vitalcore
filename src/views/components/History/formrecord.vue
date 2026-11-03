<template>
  <div>
    <Loading v-if="this.isLoading" :valuetitle="title" />
    <div class="" v-else>
      <form action="" v-on:submit.prevent="sendFormsrecord()">
        <div class="row">
          <div class="col-md-12 p-0">
            <div class="table-responsive p-0 ">
              <table class="table align-items-center mb-0">
                <thead>
                  <tr>
                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Antecedentes</th>
                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"></th>
                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr :key="items.id" v-for="items in getrecord">
                    <td class="align-middle">
                      <span class="text-secondary text-xs font-weight-bold">{{ items.name }}</span>
                    </td>
                    <td colspan="2" class="align-middle">
                      <input type="text" class="form-control " name="observation" v-model="items.value" :disabled=" valueStatus.key_status == 5 || valueStatus.key_status == 4" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="row" v-if="this.valueStatus.key_status === 3">
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
import Loading from '../Utils/Loading.vue';

const body = document.getElementsByTagName("body")[0];

export default {
  name: "formHistory",
  props:{
      valueStatus:Object
    },
  data() {
    return {
      userValidate: {},
      fecha: new Date().toLocaleDateString(),
      showMenu: false,
      record: {
        confirmed: "",
        observation: "",
        IDHistory: '',
        IDPatient: '',
      },
      msg_error: {

      },
      show: false,
      spiner: false,
      searchserviceOrder: this.valueStatus.id,
      searchKeyPatient: this.valueStatus.key_patient,
      keyHistory: '',
      keyPatient: '',
      KeyTypeCare: '',
      /* isLoading: true, */
      title: 'Historial de Antecedentes',
    };

  },
  watch: {
    async getrecord() {
      //console.log("🚀 ~ getrecord ~ this.getrecord:", this.getrecord);
      this.isLoading = true
      if (this.valueStatus.id !== '' && this.valueStatus.id !== null && this.valueStatus.id !== undefined) {
        this.record = this.getrecord
        this.isLoading = false
      }
      
    }
  },
  components: {
    ArgonButton,
    Loading
  },

  async mounted() {
    this.$store.state.isAbsolute = true;
    this.validateUser()
    if (this.searchserviceOrder !== '' && this.searchserviceOrder !== null && this.searchserviceOrder !== undefined) {
      await this.loadingActive()
      this.record = this.getrecord
    }
  },

  methods: {
    ...mapActions('History', ["SearchOrder", "addrecord", "SearchRecord"]),
    async getStoreserviceOrder() {
      if (this.searchserviceOrder != undefined) {
        const searchOrder = {
          keyHistory: this.searchserviceOrder,
          keyPatient: this.valueStatus.key_patient,
          IdPatient: localStorage.getItem('IdPatient'),
        }
        await this.SearchRecord(searchOrder)
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
    async sendFormsrecord() {

      this.record.IDHistory = this.searchserviceOrder
      this.record.IDPatient = this.searchKeyPatient

      var query = {
        histories: this.record,
        IdHistory: this.searchserviceOrder,
        keyPatient: this.searchKeyPatient,
        IdPatient: localStorage.getItem('IdPatient')
      }

      this.spiner = true
      const response = await this.addrecord(query)
      //console.log("🚀 ~ sendFormsrecord ~ response:", response)
      if (response === true) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Datos agregado con exito',
          showConfirmButton: false,
          timer: 1500
        })
        this.spiner = false
      }else{
        this.spiner = false
        Swal.fire({
          icon: 'error',
          title: 'Lo siento, los datos no se pudieron agregar',
          text: response, 
        })
      }
    },


  },
  computed: {
    ...mapGetters('History', ['gethistory', 'getrecord']),
  }
};
</script>
<style>
.form-check:not(.form-switch) .form-check-input[type=checkbox]:checked:after {
  opacity: 0 !important;
}
</style>