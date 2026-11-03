<template>
  <div class="container-fluid py-7">
    <div class="card">
      <div class="card-body">
        <div class="row">
          <div class="col-12 col-md-4 align-self-center">
            <div class="input-group mb-3">
              <span class="input-group-text" id="basic-addon1"><i class="fas fa-search"></i></span>
              <input type="text" class="form-control" placeholder="Buscar por nombre o documento..." aria-label="Buscar"
                aria-describedby="basic-addon1" v-model="filters.search">
            </div>
          </div>
          <div class="col-12 col-md-8 text-end">
            <StatusButtons @status-change="handleStatusChange" />
          </div>
        </div>
        <div class="row">
          <div class="col-2">
            <BaseInput id="date" label="Fecha:" type="date" v-model="filters.date" />
          </div>
          <div class="col-2">
            <BaseSelect id="seat" label="Sede:" :options="listSeat" v-model="filters.seat" />
          </div>
          <div class="col-2">
            <label for="agreement" class="form-label">Acuerdo Comercial:</label>
            <select name="agreement" id="agreement" class="form-select" v-model="filters.agreement">
              <option value="" v-for="agreement in listAgreements" :key="agreement.id_transfer">
                {{ agreement.name_agreements }}
              </option>
            </select>
          </div>
          <div class="col-2 align-self-end">
            <div class="btn-group" role="group" aria-label="Acciones de búsqueda">
              <button type="button" class="btn btn-primary" @click="searchQuotes" aria-label="Buscar citas">
                <i class="fas fa-search"></i>
              </button>
              <button type="button" class="btn btn-secondary" @click="clearFilters" aria-label="Limpiar filtros">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </div>
          <div class="col-4 text-center align-self-end">
            <button class="btn btn-danger px-7 rounded-pill">CITAS POR VENCER</button>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <div class="table-responsive">
              <table class="table text-center tabla-citas">
                <thead>
                  <tr>
                    <th v-for="header in tableHeaders" :key="header.id">
                      <div class="table-header">{{ header.label }}</div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-if="!listQuotesConsult?.data?.length" class="text-center">
                    <td colspan="7">No hay citas disponibles</td>
                  </tr>
                  <tr v-else v-for="quote in listQuotesConsult.data" :key="quote?.id">
                    <td>
                      <div
                        class="quote-number"
                        :style="{
                          background: quote.status_history.color || '#183472',
                          color: (quote.status_history.color === '#fff' || quote.status_history.color === 'fff') ? '#183472' : 'white'
                        }"
                      >
                        {{ quote?.id_history || '-' }}
                      </div>
                    </td>
                    <td>
                      <div class="quote-date quote-text">
                        {{ quote?.startappointment || '-' }}
                      </div>
                    </td>
                    <td>
                      <div class="quote-document quote-text">
                        {{ quote?.patient.document || '-' }}
                      </div>
                    </td>
                    <td>
                      <PatientCard v-if="quote?.patient" :paciente="quote.patient" :quote="quote" @click="showPatient(quote)" />
                      <div v-else class="quote-document quote-text">-</div>
                    </td>
                    <td>
                      <QuoteCard v-if="quote" :quote="quote" @show-quote="showQuote" />
                      <div v-else class="quote-document quote-text">-</div>
                    </td>
                    <td>
                      <div class="observation-card" @click="showObservation(quote)">
                        <div class=" quote-text">
                          OBSERVACIONES:<br>
                          <span>{{ quote?.observaciones || 'Sin observaciones' }}</span>
                        </div>
                        <div class="observation-actions">
                          <i class="fas fa-eye"></i>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div class="other-actions">
                        <i class="fas fa-plus" @click="showOtherDataModal = true"></i>
                        <i class="fas fa-search"></i>
                        <i class="fas fa-paper-plane"></i>
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
    <viewPatients :isOpen="showPatientModal" :paciente="selectedPatient || {}" @close="showPatientModal = false" 
    :agreement="selectedAgreement || {}"
    :mission="selectedMission || {}" />
    <viewQuoteData :isOpen="showQuoteModal" :cita="selectedQuote || {}" @close="showQuoteModal = false" />
    <viewObservation :isOpen="showObservationModal" :observacion="selectedObservation || {}"  @close="showObservationModal = false" />
    <view-other-data :is-open="showOtherDataModal" @close="showOtherDataModal = false" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import BaseInput from '../utilsComponents/BaseInput.vue'
import BaseSelect from '../utilsComponents/BaseSelect.vue'
import viewPatients from './viewPatients.vue'
import viewQuoteData from './viewQuoteData.vue'
import viewObservation from './viewObservation.vue'
import StatusButtons from './StatusButtons.vue'
import PatientCard from './PatientCard.vue'
import QuoteCard from './QuoteCard.vue'
import viewOtherData from './viewOtherData.vue'

export default {
  name: 'quotesList',
  components: {
    BaseInput,
    BaseSelect,
    viewPatients,
    viewQuoteData,
    viewObservation,
    StatusButtons,
    PatientCard,
    QuoteCard,
    viewOtherData
  },
  data() {
    return {
      quotes: [],
      filters: {
        date: null,
        seat: null,
        agreement: null,
        search: ''
      },
      tableHeaders: [
        { id: 'number', label: 'Nº ATENCIÓN' },
        { id: 'date', label: 'FECHA ATENCIÓN' },
        { id: 'document', label: 'DOCUMENTO' },
        { id: 'patient', label: 'DATOS PACIENTE' },
        { id: 'quote', label: 'DATOS CITA' },
        { id: 'observations', label: 'OBSERVACIONES' },
        { id: 'others', label: 'OTROS DATOS' }
      ],
      showPatientModal: false,
      selectedPatient: null,
      showQuoteModal: false,
      selectedQuote: null,
      showObservationModal: false,
      selectedObservation: null,
      selectedAgreement: null,
      selectedMission: null,
      showOtherDataModal: false
    }
  },
  computed: {
    ...mapGetters('TradeAgreement', ['listAgreements']),
    ...mapGetters("ContentConsultations", ["listSeat"]),
    ...mapGetters("Quotes", ["listQuotesConsult"]),
    filteredQuotes() {
      return this.listQuotesConsult || []
    }
  },
  mounted() {
    this.getAgreements()
    this.getSeat()
    this.getQuotesConsultFilters()
  },
  methods: {
    ...mapActions('TradeAgreement', ['getAgreements']),
    ...mapActions("ContentConsultations", ["getSeat"]),
    ...mapActions("Quotes", ["getQuotesConsult"]),
    handleStatusChange(status) {
      this.filters.agreement = status
      this.getQuotesConsultFilters()
    },
    searchQuotes() {
      this.getQuotesConsultFilters()
    },
    clearFilters() {
      this.filters = {
        date: null,
        seat: null, 
        agreement: null,
        search: ''
      }
      this.getQuotesConsultFilters()
    },
    showPatient(quote) {
      console.log('Quote recibido:', quote)
      this.selectedPatient = quote.patient
      this.selectedAgreement = quote.trade_agreement
      this.selectedMission = quote.mission_company 
      this.showPatientModal = true
    },
    showQuote(quote) {
      this.selectedQuote = quote
      this.showQuoteModal = true
    },
    showObservation(quote) {
      this.selectedObservation = quote
      this.showObservationModal = true
    },
    getQuotesConsultFilters() {
      const data = {
        startappointment: this.filters.date || null,
        contracted_id: this.filters.agreement || null,
        is_date_control: true,
        patient_campus: this.filters.seat || null,
      }
      this.getQuotesConsult(data)
    }
  }
}
</script>

<style scoped>
.tabla-citas {
  border-spacing: 15px;
  border-collapse: separate;
}

.tabla-citas th,
.tabla-citas td {
  width: 14.28%;
  min-width: 160px;
  max-width: 1fr;
  padding: 0;
}

.table-header {
  background-color: #183472;
  color: white;
  padding: 0.5rem;
  border-radius: 4px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.quote-number,
.quote-date,
.quote-document {
  border: 1px solid #d1d5db;
  border-radius: 12px;
  height: 48px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.quote-number {
  color: white;
  font-weight: bold;
}

.observation-card {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #0094FF;
  border-radius: 10px;
  height: 48px;
  width: 100%;
  padding: 4px 12px;
  box-sizing: border-box;
  cursor: pointer;
}

.observation-info {
  flex: 1;
  text-align: center;
  color: #183472;
  font-size: 14px;
  font-weight: bold;
  line-height: 1;
}

.observation-actions {
  font-size: 1rem;
  color: #183472;
  margin-left: 12px;
}

.other-actions {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #d1d5db;
  border-radius: 10px;
  height: 48px;
  width: 100%;
  padding: 4px 12px;
  box-sizing: border-box;
  background: #fff;
}

.other-actions i {
  font-size: 1.5rem;
  color: #183472;
  margin: 0 9px;
  cursor: pointer;
}

.quote-text{
  font-family: Inter;
  font-weight: 600;
  line-height: 100%;
  letter-spacing: 0%;
  text-align: center;
  vertical-align: middle;
  color: #183472;
}
</style>
