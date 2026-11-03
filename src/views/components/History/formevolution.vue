<template>
  <div>
    <Loading v-if="this.isLoading" :valuetitle="title" />
    <div class="container-fluid" v-else>
      <form action="" v-on:submit.prevent="sendFormsevolution()">
        <div class="row mb-4">
          <div class="col-md-12">
            <label for="example-text-input" class="form-control-label">Seguimiento:</label>
            <textarea name="description_evolution" v-model="evolution.description_evolution"
              class="form-control form-control-sm"
              :disabled="valueStatus.key_status == 5 || valueStatus.key_status == 4" id="" cols="30"
              rows="10"></textarea>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12 text-end" v-if="this.valueStatus.key_status === 3">
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
      <div class="row">
        <div class="col-md-12">
          <div class="table-responsive p-0 mt-5">
            <table class="table  mb-0">
              <thead>
                <tr>
                  <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Fecha</th>
                  <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Profesional
                    Asistencial
                  </th>
                  <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Evolución</th>
                </tr>
              </thead>
              <tbody>
                <tr :key="items.id" v-for="items in getevolution">
                  <td class="align-middle">
                    <span class="text-secondary text-xs font-weight-bold">{{
                      moment(items.created_at).format('DD/MM/YYYY')
                      }}</span>
                  </td>
                  <td class="align-middle">
                    <span class="text-secondary text-xs font-weight-bold">{{ this.userValidate.name }}</span>
                  </td>
                  <td class="align-middle">
                    <span class="text-secondary text-xs font-weight-bold">{{ items.description }}</span>
                  </td>
                </tr>
              </tbody>
            </table>
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

const body = document.getElementsByTagName("body")[0];

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
      evolution: {
        description_evolution: '',
        IDHistory: '',
        IDPatient: '',
      },
      msg_error: {
        description_evolution: '',
      },
      show: false,
      searchserviceOrder: this.valueStatus.id,
      searchKeyPatient: this.valueStatus.key_patient,
      keyHistory: '',
      spiner: false,
      keyPatient: '',
      KeyTypeCare: '',
      isLoading: true,
      title: 'Seguimiento',
    };

  },
  watch: {
    async getevolution() {
      this.isLoading = true
      if (this.valueStatus.id) {
        this.evolution = this.getevolution
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
    //this.getrequests()
    this.validateUser()
    if (this.searchserviceOrder !== '' && this.searchserviceOrder !== null && this.searchserviceOrder !== undefined) {
      await this.loadingActive()
    }
  },
  methods: {
    ...mapActions('History', ["SearchOrder", "addEvolution", "searchevolution", "updateevolution"]),

    async getStoreserviceOrder() {
      if (this.searchserviceOrder != undefined) {
        const searchOrder = {
          keyHistory: this.searchserviceOrder,
          keyPatient: this.searchKeyPatient
        }
        await this.searchevolution(searchOrder)
        this.evolution.description_evolution = ''
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
    async sendFormsevolution() {
      this.evolution.IDHistory = this.searchserviceOrder
      this.evolution.IDPatient = this.searchKeyPatient
      this.spiner = true
      const response = await this.addEvolution(this.evolution)
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
    ...mapGetters('History', ['gethistory', 'getevolution']),

  }
};
</script>