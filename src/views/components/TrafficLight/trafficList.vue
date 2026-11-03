<template>
  <div class="container-fluid py-7">
    <div class="card">
      <div class="card-body">
        <div class="row">
          <div class="col-8">
            <filterDateRange @date-change="handleDateChange" />
          </div>
          <div class="col-4 pt-2 px-0">
            <buttonStatus />
          </div>
        </div>
        <div class="row mt-5">
          <div class="col align-self-center">
            <div class="table-responsive" @scroll="handleScroll" style="max-height: 500px; overflow-y: auto;">
              <table class="table table-borderless text-center">
                <thead>
                  <tr>
                    <th><div class="content-thead">Nº ORDEN</div></th>
                    <th><div class="content-thead">FECHA</div></th>
                    <th><div class="content-thead">SEDE</div></th>
                    <th><div class="content-thead">DOCTOR</div></th>
                    <th><div class="content-thead">PACIENTE</div></th>
                    <th><div class="content-thead">DOCUMENTO</div></th>
                    <th><div class="content-thead">INFORMACIÓN</div></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in gettraffic" :key="index">
                    <td>
                      <div class="contentTraffic" :style="getStatusStyle(item.key_status)">
                        <span class="text-content-traffic">
                          {{ item.id }}
                        </span>
                      </div>
                    </td>
                    <td>
                      <div class="contentTraffic" :style="getStatusStyle(item.key_status)">
                        <span class="text-content-traffic">
                          {{ moment(item.created_at).format('DD/MM/YYYY') }}
                        </span>
                      </div>
                    </td>
                    <td>
                      <div class="contentTraffic" :style="getStatusStyle(item.key_status)">
                        <span class="text-content-traffic">
                          {{ getSeatName(item.patient_campus) }}
                        </span>
                      </div>
                    </td>
                    <td>
                      <div class="contentTraffic" :style="getStatusStyle(item.key_status)">
                        <span class="text-content-traffic">
                          {{ getDoctorName(item.key_doctor) }}
                        </span>
                      </div>
                    </td>
                    <td>
                      <div class="contentTraffic" :style="getStatusStyle(item.key_status)">
                        <span class="text-content-traffic">
                          {{ item.patient?.firstname }} {{ item.patient?.first_surname }}
                        </span>
                      </div>
                    </td>
                    <td>
                      <div class="contentTraffic" :style="getStatusStyle(item.key_status)">
                        <span class="text-content-traffic">
                          {{ item.patient?.document }}
                        </span>
                      </div>
                    </td>
                    <td>
                      <div @click="viewPatient(item)" class="contentTraffic" data-bs-toggle="modal"
                        data-bs-target="#viewDetails" :style="getStatusStyle(item.key_status)">
                        <span class="text-content-traffic"><i class="fa fa-plus"></i></span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="viewDetails" tabindex="-1" aria-labelledby="viewDetailsLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <p class="modal-title" id="exampleModalLabel">Ventana Informativa</p>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <form action="" v-on:submit.prevent="sendFollowUp()">
            <div class="modal-body">
              <div class="row" v-if="this.patientInfo != ''">
                <div class="col-5">
                  <BaseInput type="text" readonly
                    :value="this.patientInfo.patient.middlename + ' ' + this.patientInfo.patient.firstname + ' ' + this.patientInfo.patient.second_surname + ' ' + this.patientInfo.patient.first_surname"
                    disabled placeholder="Nombre del paciente" label="Nombre del paciente" />
                </div>
                <div class="col-3">
                  <BaseInput type="text" readonly :value="this.patientInfo.patient.document" disabled placeholder="Documento" labe="Documento" />
                </div>
                <div class="col-4">
                  <BaseInput type="text" readonly :value="this.patientInfo.patient.age" disabled placeholder="Edad" label="Edad" />
                </div>
                <div class="col-3">
                  <BaseInput type="text" readonly :value="this.patientInfo.patient.marital_status" disabled
                    placeholder="Estado Civil" label="Estado Civil" />
                </div>
                <div class="col-3">
                  <BaseInput type="text" readonly :value="this.patientInfo.user_phone" disabled placeholder="Celular" label="Celular" />
                </div>
                <div class="col-3">
                  <BaseInput type="text" readonly :value="this.patientInfo.patient.email" disabled
                    placeholder="Correo Electrónico" label="Correo Electrónico" />
                </div>
                <div class="col-3">
                  <BaseInput type="text" readonly :value="this.patientInfo.patient.address" disabled
                    placeholder="Dirección" label="Dirección" />
                </div>
                <div class="col-12">
                  <BaseInput type="text" readonly v-if="this.patientInfo.services == 1"
                    :value="'EXTRAMURAL DOMICILIARIA'" disabled placeholder="Tipo Evaluación médica o Procedimiento" label="Tipo Evaluación médica o Procedimiento" />
                  <BaseInput type="text" readonly v-if="this.patientInfo.services == 2"
                    :value="'TELEMEDICINA INTERACTIVA'" disabled placeholder="Tipo Evaluación médica o Procedimiento" label="Tipo Evaluación médica o Procedimiento" />
                </div>
                <div class="col-12 col-md-4 col-xl-3">
                  <BaseInput type="text" readonly :value="this.patientInfo.startdate" disabled
                    placeholder="Fecha de Orden" label="Fecha de Orden" />
                </div>
                <div class="col-12 col-md-4 col-xl-3" v-if="this.patientInfo.key_status != 1">
                  <BaseInput type="text" readonly :value="this.patientInfo.startappointment" disabled
                    placeholder="Llegada" label="Llegada" />
                </div>
                <div class="col-12 col-md-4 col-xl-3"
                  v-if="this.patientInfo.key_status != 1 && this.patientInfo.key_status != 2">
                  <BaseInput type="text" readonly :value="this.patientInfo.agenda_process_date" disabled
                    placeholder="Apertura" label="Apertura" />
                </div>
                <div class="col-12 col-md-4 col-xl-3" v-if="this.patientInfo.end_consultation != null">
                  <BaseInput type="text" readonly :value="this.patientInfo.end_consultation" disabled
                    placeholder="Finalización" label="Finalización" />
                </div>
                <div class="col-12 col-md-43 col-xl-3"
                  v-if="this.patientInfo.key_status == 4 || this.patientInfo.key_status == 5">
                  <BaseInput type="text" readonly :value="this.patientInfo.endappointment" disabled
                    :placeholder="this.patientInfo.key_status == 4 ? 'Aprobado' : 'Fallida'" label="Finalización"  />
                </div>
                <div class="col-12"
                  v-if="this.patientInfo.codeTraslate != 0 && this.patientInfo.codeTraslate != null && this.patientInfo.codeTraslate != ''">
                  <BaseInput type="text" readonly :value="this.patientInfo.codeTraslate" disabled
                    placeholder="Código de Traslado" label="Código de Traslado" />
                </div>
                <div class="col-12">
                  <BaseInput type="textarea" readonly :value="this.patientInfo.observations" disabled
                    placeholder="Observación" label="Observación" />
                </div>
                <div class="col-12">
                  <BaseTextarea name="conversation" id="conversation" v-model="follow.conversation" placeholder="Comentario" label="Comentario" />
                </div>
                <div class="col-12 mt-3 mb-3">
                  <div class="table-responsive" style="overflow-y: scroll; max-height: 100px;">
                    <table class="table table-striped border text-center">
                      <thead>
                        <tr>
                          <th>Comentarios</th>
                          <th>Fecha y hora</th>
                          <th>Responsable</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(item, index) in getFollow" :key="index">
                          <td>{{ item.conversation }}</td>
                          <td>{{ moment(item.created_at).format('DD/MM/YYYY hh:mm A') }}</td>
                          <td>{{ item.user?.name || 'Sin asignar' }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
              <button type="submit" class="btn btn-primary">Agregar Comentario</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <!-- {{ gettraffic }} -->
  </div>
</template>

<script>
import buttonStatus from './buttonStatus.vue';
import BaseInput from "../utilsComponents/BaseInput.vue";
import BaseSelect from "../utilsComponents/BaseSelect.vue";
import filterDateRange from './filterDateRange.vue';
import { mapActions, mapGetters } from "vuex";
import moment from 'moment';
import BaseTextarea from '../utilsComponents/BaseTextarea.vue';
export default {
  name: "Semaforo",
  components: {
    buttonStatus,
    filterDateRange,
    BaseInput,
    BaseSelect,
    BaseTextarea
  },
  data() {
    return {
      patientInfo: {
        id: '',
        document: '',
        patient: {
          firstname: '',
          first_surname: '',
          second_surname: '',
          middlename: '',
          age: '',
          marital_status: '',
          email: '',
          address: ''
        },
        status: '',
        user_phone: '',
        startdate: '',
        startappointment: '',
        endappointment: '',
        end_consultation: null,
        agenda_process_date: null,
        key_status: 0,
        services: 0,
      },
      timeInfo: '',
      date: new Date(),
      follow: {
        conversation: '',
        key_history: ''
      },
      isLoading: false, // Para evitar múltiples solicitudes simultáneas
      currentPage: 1, // Página actual
      totalPages: 1, // Total de páginas disponibles
    };
  },
  mounted() {
    this.searchDoctor()
  },
  methods: {
    ...mapActions('Traffic', ["gettrafficFilters", "searchDoctor", "gettrafficDate", "getFollowUp", "addFollowUp"]),
    ...mapActions('Seat', ["get"]),
    moment,
    getRowColor(index) {
      const colors = ['bg-warning', 'bg-orange', 'bg-success', 'bg-danger'];
      return colors[index % colors.length];
    },
    getStatusStyle(keyStatus) {
      switch (keyStatus) {
        case 1:
          return 'background-color: #FFCB00; color: white; font-weight: 500 !important'; // Pendiente
        case 2:
          return 'background-color: #FEAB3D; color: white; font-weight: 500 !important'; // Atender Paciente
        case 3:
          return 'background-color: rgb(255, 196, 0); color: white; font-weight: 500 !important'; // Atender Paciente
        case 4:
          return 'background-color: rgb(67, 160, 71); color: white; font-weight: 500 !important'; // Visualizar Historia
        case 5:
          return 'background-color: rgb(229, 57, 53); color: white; font-weight: 500 !important'; // Visualizar Historia
        default:
          return ''; // Sin estilo
      }
    },
    viewPatient(data) {
      console.log("🚀 ~ viewPatient ~ data:", data)
      this.patientInfo = data
      this.getFollowUp(this.patientInfo.id)
    },
    handleDateChange(date) {
      const filters = { startdate: date };
      this.date = new Date(date + ' 00:00:00');
      this.gettrafficFilters(filters)
    },
    consultationCitas() {
      const filters = { startdate: this.date };
      this.gettrafficDate(filters);
    },
    getDoctorName(keyDoctor) {
      const doctor = this.getDoctorData.find(doc => doc.id === keyDoctor);
      return doctor ? doctor.name : 'Sin asignar';
    },
    getSeatName(patientCampus) {
      const seat = this.getseat.find(seat => String(seat.id_seat) === String(patientCampus));
      return seat ? seat.name_seat : 'Sin asignar';
    },
    async sendFollowUp() {
      this.follow.key_history = this.patientInfo.id;
      await this.addFollowUp(this.follow);
      this.follow.conversation = '';
      await this.getFollowUp(this.patientInfo.id);
    },
    async handleScroll(event) {
      const { scrollTop, scrollHeight, clientHeight } = event.target;

      // Verifica si el usuario llegó al final del scroll
      if (scrollTop + clientHeight >= scrollHeight - 10 && !this.isLoading && this.currentPage < this.totalPages) {
        this.isLoading = true;
        await this.loadMoreData();
        this.isLoading = false;
      }
    },
    async loadMoreData() {
      try {
        // Incrementa la página actual
        this.currentPage++;

        // Llama a la acción de Vuex para obtener más datos
        const newTrafficData = await this.$store.dispatch('Traffic/gettraffic', { page: this.currentPage });

        // Agrega los nuevos datos a la lista existente
        this.$store.commit('Traffic/appendTraffic', newTrafficData);
      } catch (error) {
        console.error('Error al cargar más datos:', error);
      }
    },
  },
  computed: {
    ...mapGetters('Traffic', ['gettraffic', 'getDoctorData', 'getFollow']),
    ...mapGetters('Seat', ['getseat']),
  },
  mutations: {
    appendTraffic(state, newTrafficData) {
      state.traffic = [...state.traffic, ...newTrafficData];
    },
  },
}
</script>

<style scoped>
.bg-warning {
  background-color: #ffc107 !important;
  color: black !important;
}

.bg-orange {
  background-color: #fd7e14 !important;
  color: white !important;
}

.contentTraffic {
  border-radius: 8px;
  padding: 15px;
  width: 100%;
}

.text-content-traffic {
  font-size: 12px;
  font-weight: 500;
  color: white
}

.content-thead {
  background-color: rgba(24, 52, 114, 1);
  padding: 10px;
  color: white;
  border-radius: 8px;
}

thead>tr th {
  padding: 5px;
}

.table-responsive {
  max-height: 400px;
  overflow-y: auto;
}
</style>