<template>
  <div>
    <Loading v-if="isLoading" :valuetitle="title" />
    <div class="container-fluid" v-else>
      <form @submit.prevent="sendFormsjobrecommendation">
        <div class="row">
          <div class="col-md-12">
            <div class="table-container">
              <div class="table-row header">
                <div class="table-cell">RECOMENDACIONES GENERALES</div>
                <div class="table-cell">CHECK</div>
                <div class="table-cell">OBSERVACIÓN</div>
              </div>
              <div class="table-row" v-for="items in contentJob" :key="items.id">
                <div class="table-cell d-flex align-items-center justify-content-between">
                  <span class="text-secondary text-xs font-weight-bold">{{ items.title }}</span>
                  <span class="ms-3" @click="viewJob(items)"
                    data-bs-toggle="modal" data-bs-target="#infoJobModal" style="cursor: pointer;">
                    <i class="fa fa-eye text-primary" aria-hidden="true"></i>
                  </span>
                </div>
                <div class="table-cell">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" name="confirmed"
                      :disabled="valueStatus.key_status == 5 || valueStatus.key_status == 4"
                      :checked="items.confirmed === 1" @change="items.confirmed = $event.target.checked ? 1 : 0">
                  </div>
                </div>
                <div class="table-cell">
                  <BaseInput
                    :disabled="valueStatus.key_status == 5 || valueStatus.key_status == 4"
                    name="observation"
                    v-model="items.observation"
                    class="form-control-sm"
                    placeholder="Observación"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row" v-if="valueStatus.key_status === 3">
          <div class="col-md-12 text-end">
            <argon-button type="submit" color="success" :disabled="spiner" size="sm" class="ms-auto">
              <span v-if="!spiner">Guardar</span>
              <div class="d-flex align-items-center" v-else>
                <strong class="me-2">Guardando Datos</strong>
                <div class="spinner-border ms-auto" role="status" aria-hidden="true"></div>
              </div>
            </argon-button>
          </div>
        </div>
      </form>
    </div>
    <div class="modal fade" id="infoJobModal" tabindex="-1" aria-labelledby="infoJob" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5 text-center" id="infoJob">{{ jobContent.title }}</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p class="text-justify" v-html="formattedDescription"></p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
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
import Loading from '../Utils/Loading.vue';
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
      jobrecommendation: {
        confirmed: "",
        observation: "",
        IDHistory: '',
        IDPatient: '',
      },
      msg_error: {},
      show: false,
      searchserviceOrder: this.valueStatus.id,
      searchKeyPatient: this.valueStatus.key_patient,
      keyHistory: '',
      spiner: false,
      keyPatient: '',
      KeyTypeCare: '',
      title: 'Recomendaciones Laborales',
      jobContent: {
        title: '',
        description: ''
      },
      contentJob: {}
    };
  },
  components: {
    ArgonButton,
    Loading,
    BaseInput
  },
  async mounted() {
    this.$store.state.isAbsolute = true;
    this.validateUser()
    if (this.searchserviceOrder) {
      await this.getStoreserviceOrder()
      if (this.valueStatus.get_job_recommendation.length === 0) {
        this.contentJob = this.getjobrecommendation
        this.jobrecommendation = this.getjobrecommendation
      } else {
        this.contentJob = this.valueStatus.get_job_recommendation
        this.jobrecommendation = this.valueStatus.get_job_recommendation
      }
    }
  },
  methods: {
    ...mapActions('History', ["SearchOrder", "addjobrecommendation", "SearchJob"]),
    async getStoreserviceOrder() {
      if (this.searchserviceOrder != undefined) {
        const searchOrder = {
          keyHistory: this.searchserviceOrder,
          keyPatient: this.searchKeyPatient
        }
        await this.SearchJob(searchOrder)
      }
    },
    formatText(input) {
      return input
        .replace(/\\n/g, "<br>")
        .replace(/\n/g, "<br>")
        .replace(/\n/g, " ")
        .replace(/(\d+)(?!\s?(?:\d|a))/g, "<strong>$1</strong>")
        .trim();
    },
    viewJob(data) {
      this.jobContent = data
    },
    validateUser() {
      this.userValidate = JSON.parse(localStorage.getItem('user'))
    },
    async loadingActive() {
      this.isLoading = true
      await this.getStoreserviceOrder()
      this.isLoading = false
    },
    async sendFormsjobrecommendation() {
      this.jobrecommendation.IDHistory = this.searchserviceOrder
      this.jobrecommendation.IDPatient = this.searchKeyPatient
      var query = {
        recommendation: this.jobrecommendation,
        IdHistory: this.searchserviceOrder,
        IdPatient: this.searchKeyPatient
      }
      this.spiner = true
      const response = await this.addjobrecommendation(query)
      if (response) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Datos agregado con exito',
          showConfirmButton: false,
          timer: 1500
        })
        this.spiner = false
        this.$emit('saved');
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
    ...mapGetters('History', ['gethistory', 'getjobrecommendation']),
    formattedDescription() {
      return this.jobContent.description ? this.formatText(this.jobContent.description) : '';
    }
  }
};
</script>

<style>
.form-check:not(.form-switch) .form-check-input[type=checkbox]:checked:after {
  opacity: 0 !important;
}
th,
td {
  font-size: 12px;
}
.table-container {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.table-row {
  display: flex;
  flex-wrap: wrap;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
}
.table-row.header {
  font-weight: bold;
}
.table-cell {
  flex: 1;
  padding: 10px;
  min-width: 150px;
  display: flex !important;
  flex-direction: column;
}
@media (max-width: 768px) {
  .table-row {
    flex-direction: column;
    border-bottom: 8px solid #f3f3f3;
    margin-bottom: 10px;
    border-radius: 8px;
    background: #f8f9fa;
    box-shadow: 0 2px 8px #0001;
  }
  .table-cell {
    width: 100%;
    min-width: unset;
    padding: 8px 6px;
    border-bottom: none;
  }
  .table-cell:first-child {
    font-weight: bold;
  }
}
.fa-question-circle {
  cursor: pointer;
}
</style>