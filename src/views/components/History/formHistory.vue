<template>
  <div>
    <div class="container-fluid py-7 px-1 px-md-3">
      <div class="row justify-content-center gx-1 gx-md-3">
        <!-- Menú lateral -->
        <div class="col-12 col-md-3 mb-2 mb-md-3">
          <div class="card menu-card">
            <div class="card-body p-2 p-md-3">
              <!-- Botón para expandir en móviles -->
              <button class="btn btn-light d-md-none w-100 text-start mb-2" @click="toggleAccordion">
                <i :class="isAccordionOpen ? 'fa fa-chevron-up' : 'fa fa-chevron-down'"></i> Menú
              </button>
              <!-- Contenido colapsable en móviles -->
              <div :class="isAccordionOpen ? 'd-block' : 'd-none d-md-block'">
                <div v-for="(value, index) in optionsHistory" :key="index" @click="toggleAccordion" class="sticky-mobile px-3">
                  <div v-if="validateShowTabs(listHistoryData.key_request, value.requestId)"
                    class="row contentState ps-2 ps-md-3 rounded py-1 mb-2 mb-md-3"
                    @click="assignamentContent(value.id)"
                    :class="viewContent === value.id ? 'bg-success' : 'bg-light'"
                    :style="listHistoryData.services != 2 ? 'display: block' : 'display: none'">
                    <div class="col-12 p-1 p-md-2">
                      <small :class="viewContent === value.id ? 'text-white' : ''" class="h6">
                        <b></b> {{ value.label }}
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Contenido principal -->
        <div class="col-12 col-md-9">
          <div v-if="loading" class="loading-spinner text-center card h-75">
            <p class="h1 mt-5">Cargando Historia...</p>
            <div class="loader"></div>
          </div>
          <div class="card main-card" v-else>
            <div class="w-100 text-center" v-for="(value) in status" :key="value.id">
              <span v-if="value.id == listHistoryData.key_status" class="badge w-100"
                style="line-height: 2; font-size: 13px;" :style="'background-color: ' + value.color">
                {{ value.label }}
              </span>
            </div>
            <!-- <div class="card-header py-2 px-2 px-md-3">
              <div class="row gx-1">
                <div v-for="(value, index) in optionsHistory" :key="index" class="col-12 text-center">
                  <p class="text-sm mb-1" v-if="viewContent === value.id">
                    {{ value.label }}
                  </p>
                </div>
                <div class="col-12 text-end" v-if="viewContent === 0 || viewContent === 5">
                  <div class="btn-group" role="group" aria-label="Basic example">
                    <button type="button" class="btn btn-danger btn-sm p-2 p-md-3" title="Anular Historia" @click="cancel"
                      v-if="listHistoryData.key_status != 5 && listHistoryData.key_status != 4">Anular</button>
                    <button type="button" class="btn btn-info btn-sm p-2 p-md-3" title="Finalizar Atención" @click="finish">Finalizar Atención</button>
                    <button type="button" class="btn btn-success btn-sm p-2 p-md-3" title="Aprobar Historia" @click="approve"
                      v-if="listHistoryData.key_status != 5 && listHistoryData.key_status != 4">Aprobar</button>
                  </div>
                </div>
              </div>
            </div> -->
            <div class="card-body py-7 px-3 px-md-4" style="overflow: auto; max-height: 75vh;">
              <div class="col-12 content" v-if="viewContent === 0">
                <viewFormTechnical :valueStatus="listHistoryData" @saved="updateHistory" />
              </div>
              <div class="col-12 content" v-if="viewContent === 1">
                <ul class="nav nav-tabs nav-fill" id="myTab" role="tablist">
                  <li class="nav-item" role="presentation">
                    <button class="nav-link active" id="consulter-tab" data-bs-toggle="tab"
                      data-bs-target="#consulter" type="button" role="tab" aria-controls="consulter"
                      aria-selected="true">Motivo Consulta y Enfermedad Actual</button>
                  </li>
                  <li class="nav-item" role="presentation">
                    <button class="nav-link" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button"
                      role="tab" aria-controls="home" aria-selected="false">Historia Antecedentes</button>
                  </li>
                  <li class="nav-item" role="presentation">
                    <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile"
                      type="button" role="tab" aria-controls="profile" aria-selected="false">Vacunación</button>
                  </li>
                  <li class="nav-item" role="presentation" v-if="listHistoryData.genre_Technical === 'F'">
                    <button class="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact"
                      type="button" role="tab" aria-controls="contact" aria-selected="false">Ginecología</button>
                  </li>
                </ul>
                <div class="tab-content mt-3" id="myTabContent">
                  <div class="tab-pane fade show active" id="consulter" role="tabpanel"
                    aria-labelledby="consulter-tab">
                    <FormConsulter :valueStatus="listHistoryData" @saved="updateHistory" />
                  </div>
                  <div class="tab-pane fade" id="home" role="tabpanel" aria-labelledby="home-tab">
                    <viewFormorrocord :valueStatus="listHistoryData" />
                  </div>
                  <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                    <FormVaccination :valueStatus="listHistoryData" />
                  </div>
                  <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
                    <FormGynecology :valueStatus="listHistoryData" />
                  </div>
                </div>
              </div>
              <div class="col-12 content" v-if="viewContent === 11">
                <ConsentValidate :valueStatus="listHistoryData" @saved="updateHistory"></ConsentValidate>
              </div>
              <div class="col-12 content" v-if="viewContent === 2">
                <viewFormPhysicalExam :valueStatus="listHistoryData" @saved="updateHistory" />
              </div>
              <div class="col-12 content" v-if="viewContent === 3">
                <viewFormdiagnostic :valueStatus="listHistoryData" @saved="updateHistory" />
                <viewanality :valueStatus="listHistoryData" @saved="updateHistory" />
              </div>
              <div class="col-12 content" v-if="viewContent === 4">
                <viewFormorjob :valueStatus="listHistoryData" @saved="updateHistory" />
              </div>
              <div class="col-12 content" v-if="viewContent === 5">
                <viewFormorders :valueStatus="listHistoryData" @saved="updateHistory" />
              </div>
              <div class="col-12 content" v-if="viewContent === 6">
                <viewFormorevolution :valueStatus="listHistoryData" />
              </div>
              <div class="col-12 content" v-if="viewContent === 7">
                <viewFormSystemRevision :valueStatus="listHistoryData" @saved="updateHistory" />
              </div>
              <div class="col-12 content" v-if="viewContent === 8">
                <FormVideo :valueStatus="listHistoryData" />
              </div>
              <div class="col-12 content" v-if="viewContent === 9">
                <FormDisclaimer :valueStatus="listHistoryData" />
              </div>
              <div class="col-12 content" v-if="viewContent === 12">
                <MedicoValidate></MedicoValidate>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="fixed-close-history-btn">
      <div v-show="tiempoTotal != 0 && listHistoryData.key_status == 3 && !listHistoryData.end_consultation">
        <ButtonControlCloseHistory
          :status="listHistoryData.key_status"
          :initStatus="3"
          :dateAttention="listHistoryData?.startappointment"
          :eventClick="finish"
          :totalDurationMinutes="tiempoTotal"
          :textButton="textButton" />
      </div>
      <div v-show="tiempoTotal != 0 && listHistoryData.key_status == 3 && listHistoryData.end_consultation">
        <ButtonControlCloseHistory
          :status="listHistoryData.key_status"
          :initStatus="3"
          :dateAttention="listHistoryData?.startappointment"
          :eventClick="approve"
          :totalDurationMinutes="0"
          :textButton="textButton" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { reactive, provide } from 'vue';
import { createElements } from "../../../services/history.service";
import networkListener from "../../../mixins/networkListener";
import { optionsHistory } from "../../../db/optionsHistory";
import { status } from "../../../db/status";
import viewFormTechnical from "./formTechnical.vue"
import viewFormSystemRevision from "./formSystemRevision.vue"
import viewFormPhysicalExam from "./formPhysicalExam.vue"
import viewFormdiagnostic from "./formdiagnosticparaclinical.vue"
import viewFormorders from "./formOrders.vue"
import viewFormorjob from "./formjobrecommendation.vue"
import viewFormorevolution from "./formevolution.vue"
import viewFormorrocord from "./formrecord.vue"
import FormVideo from "../Video/formvideo.vue"
import FormVaccination from "../History/formvaccination.vue"
import FormGynecology from "../History/formgynecology.vue"
import FormDisclaimer from "../History/formdisclaimer.vue"
import FormConsulter from "../History/formconsulter.vue"
import ConsentValidate from "../History/consent.vue"
import MedicoValidate from "../History/signatureMedico.vue"
import viewanality from './formdianosticAnality'
import ButtonControlCloseHistory from './components/ButtonControlCloseHistory.vue'
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'
import { sassTrue } from "sass";

export default {
  name: "formHistory",
  data() {
    return {
      textButton: 'Finalizar Atención',
      fecha: new Date().toLocaleDateString(),
      showMenu: false,
      show: false,
      searchserviceOrder: this.$route.params.id,
      searchKeyPatient: this.$route.params.id_patient,
      viewContent: 0,
      keyHistory: '',
      keyPatient: '',
      KeyTypeCare: '',
      state: {
        status: '',
        id_history: ''
      },
      status: status,
      optionsHistory: optionsHistory,
      loading: false, // Estado para el cargador
      isAccordionOpen: false,
      progressPercent: 0, // 0 a 100
      timerInterval: null,
      tiempoTranscurrido: 0,
      atencionFinalizada: false,
      tiempoTotal: 20, // 90 minutos en segundos
    };
  },
  components: {
    viewFormTechnical,
    viewFormSystemRevision,
    viewFormPhysicalExam,
    FormConsulter,
    viewFormorrocord,
    FormVaccination,
    FormGynecology,
    viewFormdiagnostic,
    viewFormorjob,
    viewFormorders,
    viewFormorevolution,
    FormVideo,
    FormDisclaimer,
    ConsentValidate,
    MedicoValidate,
    viewanality,
    ButtonControlCloseHistory
  },
  async mounted() {
    await this.getStoreserviceOrder();
    await this.iniciate()
    this.$store.state.isAbsolute = true;
    if (this.listHistoryData.key_status === 3) {
      this.iniciarProgreso();
    }
    this.tiempoTotal = this.getTotalDurationMinutes;
  },
  watch: {
    'listHistoryData.key_status'(val) {
      if (val === 3) {
        this.iniciarProgreso();
      } else {
        this.detenerProgreso();
      }
    },
    'getTotalDurationMinutes'(val) {
      console.log("🚀 ~ watch ~ val:", val)
      this.tiempoTotal = val;
    },
    'listHistoryData.end_consultation'(val) {
      this.textButton = val ? 'Aprobar' : 'Finalizar Atención';
    }
  },
  methods: {
    ...mapActions('History', ["SearchOrder", "addTechnical", "generatePdf", "finishState", 'incrementTotalDurationMinutes']),
    ...mapActions('ServiceOrder', ["updateState"]),
    ...mapActions('OrderService', ["getHistoryDataDetails"]),
    toggleAccordion() {
      this.isAccordionOpen = !this.isAccordionOpen;

    },
    assignamentContent(id) {
      if (!this.listHistoryData.signature_patient) {
        Swal.fire({
          icon: 'error',
          title: 'Acceso denegado',
          text: 'No se puede acceder a este módulo sin la firma del paciente.',
        });
        return;
      }

      this.viewContent = id;
      //this.isAccordionOpen = false; // Cierra el acordeón al seleccionar una opción
    },
    iniciate() {
      if (this.listHistoryData.services_Technical != 2) {
        this.viewContent = 11
      } else {
        this.viewContent = 0
      }
    },
    async getStoreserviceOrder() {
      if (this.searchserviceOrder != undefined) {
        this.loading = true;

        await this.getHistoryDataDetails(this.searchserviceOrder);
        setTimeout(() => {
          this.loading = false;
        }, 2000);
      }
    },
    async updateHistory() {
      //console.log("🚀 ~ updateHistory ~ updateHistory");
      if (this.searchserviceOrder != undefined) {
        await this.getHistoryDataDetails(this.searchserviceOrder);
        setTimeout(() => {
          this.loading = false;
        }, 2000);
      }
    },
    async generar() {
      if (this.searchserviceOrder != undefined) {
        const searchHistory = {
          keyHistory: this.searchserviceOrder
        }
        await this.generatePdf(searchHistory)
      }
    },
    cancel() {
      Swal.fire({
        title: '¿Está seguro que deseas anular esta historia clinica?',
        text: "¡No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '¡Sí, anular!'
      }).then(async (result) => {
        if (result.isConfirmed) {
          this.state.id_history = this.searchserviceOrder
          this.state.state = 5
          const response = await this.updateState(this.state)
          if (!response) {
            Swal.fire(
              '¡Lo siento!',
              'La historia clinica no pudo ser anulada.',
              'error'
            )
            return
          }
          if (response) {
            Swal.fire(
              'Anulada!',
              'La historia clinica ha sido anulada.',
              'success'
            )
            location.reload();
          }
        }
      })
    },
    approve() {
      Swal.fire({
        title: '¿Está seguro que deseas aprobar esta historia clínica?',
        text: "¡No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '¡Sí, aprobar!'
      }).then(async (result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: 'Aprobando...',
            text: 'Por favor, espera mientras se aprueba la historia clínica.',
            allowOutsideClick: false,
            didOpen: () => {
              Swal.showLoading();
            }
          });

          this.state.id_history = this.listHistoryData.id_order_services;
          this.state.state = 4;
          try {
            const response = await this.updateState(this.state);
            if (!response) {
              Swal.fire(
                '¡Lo siento!',
                'La historia clínica no pudo ser aprobada.',
                'error'
              );
              return;
            }
            
            location.reload();
          } catch (error) {
            Swal.fire(
              '¡Error!',
              'No se pudo aprobar la historia clínica.',
              'error'
            );
          }
        }
      });
      this.detenerProgreso();
    },
    finish() {
      Swal.fire({
        title: '¿Está seguro que deseas finalizar la atención de esta historia clinica?',
        text: "¡No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '¡Sí, finalizar!'
      }).then(async (result) => {
        if (result.isConfirmed) {
          this.state.id_history = this.listHistoryData.id;
          const response = await this.finishState(this.state)
          if (!response) {
            Swal.fire(
              '¡Lo siento!',
              'La historia clinica no pudo ser finalizada.',
              'error'
            )
            return
          }
          if (response) {
            this.textButton = 'Aprobar';
            this.tiempoTotal = 0;
            this.incrementTotalDurationMinutes(0);

            Swal.fire(
              'Finalizado!',
              'La historia clinica ha sido finalizada.',
              'success'
            )
          }
        }
      })
    },
    hability() {
      Swal.fire({
        title: '¿Está seguro que deseas habilitar esta historia clinica?',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '¡Sí, habilitar!'
      }).then(async (result) => {
        if (result.isConfirmed) {
          this.state.id_history = this.searchserviceOrder;
          this.state.state = 3
          const response = await this.updateState(this.state)
          if (!response) {
            Swal.fire(
              '¡Lo siento!',
              'La historia clinica no pudo ser habilitada.',
              'error'
            )
            return
          }
          if (response) {
            Swal.fire(
              'Aprobado!',
              'La historia clinica ha sido habilitada.',
              'success'
            )
            location.reload();
          }
        }
      })
    },
    validateShowTabs(requestId, options) {
      if (requestId == null || options == null) return true;
      if (this.listHistoryData.signature_patient != '' && this.listHistoryData.signature_patient != null && this.listHistoryData.signature_patient != undefined) return false;
      return options.includes(requestId);
    },
    iniciarProgreso() {
      if (this.timerInterval) return;
      this.tiempoTranscurrido = 0;
      this.progressPercent = 0;
      this.atencionFinalizada = false;
      this.timerInterval = setInterval(() => {
        this.tiempoTranscurrido++;
        this.progressPercent = Math.min((this.tiempoTranscurrido / this.tiempoTotal) * 100, 100);
        if (this.tiempoTranscurrido >= this.tiempoTotal) {
          this.detenerProgreso();
        }
      }, 1000);
    },
    detenerProgreso() {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    },
    finalizarAtencion() {
      this.atencionFinalizada = true;
      this.detenerProgreso();
      this.finish();
    },
  },
  computed: {
    ...mapGetters('History', ['gethistory', 'getTotalDurationMinutes']),
    ...mapGetters('OrderService', ['listHistoryData']),
    circleColors() {
      // Cambia colores según el tiempo transcurrido
      if (this.tiempoTranscurrido < 45 * 60) {
        // 0-45 min
        return { border: '#00A73E', bg: '#CFFFE1' };
      } else if (this.tiempoTranscurrido < 60 * 60) {
        // 45-60 min
        return { border: '#F6D403', bg: '#FFF5B8' };
      } else if (this.tiempoTranscurrido < 90 * 60) {
        // 60-90 min
        return { border: '#FFAD3A', bg: '#FEDAA2' };
      } else {
        // >90 min
        return { border: '#E23333', bg: '#FED1D1' };
      }
    }
  },
  created() {
    const networkStatus = reactive({ isOnline: navigator.onLine });

    provide('networkStatus', networkStatus);

    window.addEventListener('online', () => {
      networkStatus.isOnline = sassTrue
    });
    window.addEventListener('offline', () => {
      networkStatus.isOnline = false
    });

    return {
      networkStatus,
    };
  },
  mixins: [networkListener],
  beforeUnmount() {
    this.detenerProgreso();
  },
};
</script>

<style>
/* General */
.menu-card {
  min-height: 0;
}

.main-card {
  min-height: 60vh;
}

/* Reduce paddings y márgenes en móvil */
@media (max-width: 767px) {
  .container-fluid {
    padding-left: 2px !important;
    padding-right: 2px !important;
  }

  .card,
  .main-card,
  .menu-card {
    border-radius: 8px;
    margin-bottom: 8px;
    padding: 0 !important;
  }

  .card-header,
  .card-body {
    padding: 8px !important;
  }

  .contentState {
    margin-bottom: 6px !important;
    padding: 4px 6px !important;
  }

  .btn-group .btn {
    padding: 6px 8px !important;
    font-size: 13px !important;
  }

  .nav-tabs .nav-link {
    padding: 6px 8px !important;
    font-size: 13px !important;
  }

  .tab-content {
    margin-top: 10px !important;
  }

  .content {
    padding: 2px !important;
  }

  .card-body {
    max-height: 80vh !important;
  }
}

/* Tabs y botones */
/* .nav-tabs .nav-link.active,
.nav-tabs .nav-item.show .nav-link {
  color: #fff;
  background-color: #1976d2;
  border-color: #dee2e6 #dee2e6 #fff;
} */
.nav-tabs .nav-link.active,
.nav-tabs .nav-item.show .nav-link {
  background-color: #2FCEBF !important;
  color: white !important;
  border-color: #dee2e6 #dee2e6 #fff;
}

h6 {
  font-size: 11px;
}

.loader {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
  margin: 0 auto;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.fixed-close-history-btn {
  position: fixed;
  top: 250px;
  right: 30px;
  z-index: 3000;
}

@media (max-width: 767px) {
  .fixed-close-history-btn {
    top: 20vh;
    /* Más abajo en móvil */
    right: 10px;
  }
}
</style>
