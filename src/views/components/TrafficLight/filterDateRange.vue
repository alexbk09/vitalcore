<template>
  <div>
    <div class="row">
      <div class="col-3">
        <label for="inputPassword2" class="">Fecha</label>
        <input type="date" class="form-control form-control-sm" name="date" v-model="filters.startdate" @change="onDateChange" />
      </div>
      <div class="col-3">
        <label for="inputPassword2" class="">Sede</label>
        <select class="form-select form-select-sm" name="seat" v-model="filters.seat" id="inlineFormCustomSelectPref">
          <option value="">Seleccione</option>
          <option :value="items.id_seat" :key="items.id_seat" v-for="items in getseat">{{
            items.name_seat }}</option>
        </select>
      </div>

      <div class="col-3">
        <label for="inputPassword2" class="">Doctor</label>
        <select class="form-select form-select-sm" name="doctor" v-model="filters.doctor">
          <option :value="items.id" :key="items.id" v-for="items in getDoctorData" class="px-5">{{
            items.name + ' ' + items.last_name }}</option>
        </select>
      </div>
      <div class="col-3 btn-group">
        <button type="button" @click="SearchFilters()" class="btn btn-primary mt-4 btn-sm"><i class="fa fa-search"
            aria-hidden="true"></i></button>
        <button type="button" @click="clearFilters()" class="btn btn-secondary mt-4 btn-sm ms-2"><i
            class="fa fa-trash"></i></button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import moment from "moment";
export default {
  name: "filterDateRange",
  data() {
    return {
      date: new Date(),
      filters: {
        seat: '',
        doctor: '',
        startdate: moment(this.date).format('YYYY-MM-DD'),
      }
    };
  },
  async mounted() {
    this.searchDoctor();
    this.getpanel();
    this.SearchFilters();
  },
  methods: {
    ...mapActions('Traffic', ["gettrafficDate", "gettrafficFilters"]),
    ...mapActions('ServiceOrder', ["searchDoctor"]),
    ...mapActions('Seat', ["getpanel"]),
    SearchFilters() {
      // Filtra solo las propiedades que tienen valores
      const activeFilters = Object.fromEntries(
        Object.entries(this.filters).filter(([key, value]) => value !== '' && value !== null)
      );

      // Envía solo los filtros activos
      this.gettrafficFilters(activeFilters);
    },
    clearFilters() {
      this.filters = {
        key_trade_agreement: '',
        key_mission_company: '',
        num_order: '',
        name: '',
        first_surname: '',
        doctor: '',
        startdate: ''
      };
      this.SearchFilters();
    },
    onDateChange(event) {
      const selectedDate = event.target.value;
      this.$emit('date-change', selectedDate);
    }
  },
  computed: {
    ...mapGetters('Traffic', ['gettraffic']),
    ...mapGetters('ServiceOrder', ['getDoctorData']),
    ...mapGetters('Agreements', ['getagreements', 'getCompanyData', 'getgeoreferencingData', 'getgeoreferencinglDataID']),
    ...mapGetters('Seat', ['getseat']),
  }

}
</script>