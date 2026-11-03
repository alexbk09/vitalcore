<template>
  <div>
    <div class="py-7 container-fluid">
      <div class="card">
        <div class="card-body">
          <form action="" v-on:submit.prevent="sendForm()">
            <div class="row">
              <div class="col-md-2">
                <label for="" class="">Desde</label>
                <input type="date" class="form-control form-control-sm" id="" v-model="dataHistory.start_date"
                  placeholder="" :class="{'is-invalid': msg_error.start_date}"  ref="start_date">
                  <b-alert v-if="msg_error.start_date" class="text-danger text-alert" variant="danger" show>{{
                            msg_error.start_date }}</b-alert>
              </div>
              <div class="col-md-2">
                <label for="" class="">Hasta</label>
                <input type="date" class="form-control form-control-sm" v-model="dataHistory.end_date" id=""
                  placeholder="" :class="{'is-invalid': msg_error.end_date}"  ref="end_date">
                  <b-alert v-if="msg_error.end_date" class="text-danger text-alert" variant="danger" show>{{
                            msg_error.end_date }}</b-alert>
              </div>
              <div class="col-md-2">
                <label for="" class="">Acuerdo Comercial</label>
                <select class="form-select form-select-sm" name="id_agreement" @change="SearchCompany()"
                  v-model="dataHistory.id_agreement">
                  <option v-for="row in getagreements" :key="row.id_transfer" :value="row.id_transfer">{{
            row.name_agreements }}</option>
                </select>
              </div>
              <div class="col-md-2">
                <label for="" class="">Empresa en mision</label>
                <select name="id_company" class="form-select form-select-sm" v-model="dataHistory.id_company">
                  <option :key="row.id" v-for="row in getCompanyData" :value="row.id">{{ row.name }} </option>
                </select>
              </div>
              <div class="col-md-2">
                <label for="" class="">Tipo de historia clinica</label>
                <select name="type_history" id="" class="form-select form-select-sm"
                  v-model="dataHistory.type_history">
                  <option :value="items.id" :key="items.id" v-for="items in getProducts">{{
                    items.description }}</option>
                </select>
              </div>
              <div class="col-md-1 mt-4 text-center">
                <button type="submit" class="btn btn-primary btn-sm">
                  Generar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      dataHistory: {
        id_agreement: null,
        id_company: null,
        start_date: null,
        end_date: null,
        type_history: null
      },
      msg_error:{
        id_agreement: null,
        id_company: null,
        start_date: null,
        end_date: null,
        type_history: null
      }
    }
  },
  async mounted() {
    await this.getagreement()
    await this.get()
  },
  methods: {
    ...mapActions('Agreements', ["getagreement", "getCompany", "getgeoreferencing"]),
    ...mapActions('Products', ["get", "destroy"]),
    ...mapActions('Record' , ["SendHistory"]),
    async SearchCompany() {
      await this.getCompany(this.dataHistory.id_agreement)
      await this.getgeoreferencing(this.dataHistory.id_agreement)
    },
    clearMsgError() {
      this.msg_error = {
        id_agreement: null,
        id_company: null,
        start_date: null,
        end_date: null,
        type_history: null
      }
    },
    sendForm() {
    this.clearMsgError()
    const data = {};
    if (this.dataHistory.id_agreement) {
        data.id_agreement = this.dataHistory.id_agreement;
    }
    if (this.dataHistory.id_company) {
        data.id_company = this.dataHistory.id_company;
    }
    if (this.dataHistory.start_date) {
        data.start_date = this.dataHistory.start_date;
    }
    if (this.dataHistory.end_date) {
        data.end_date = this.dataHistory.end_date;
    }
    if (this.dataHistory.type_history) {
        data.type_history = this.dataHistory.type_history;
    }
    if (!this.$validatePropertyEmpty(this.dataHistory.start_date)) {
          this.msg_error.start_date = 'Este campo es obligatorio';
          this.$refs.start_date.scrollIntoView({ behavior: 'smooth' });
          return false
        }
        if (!this.$validatePropertyEmpty(this.dataHistory.end_date)) {
          this.msg_error.end_date = 'Este campo es obligatorio';
          this.$refs.end_date.scrollIntoView({ behavior: 'smooth' });
          return false
        }
    this.SendHistory(data);
}

  },
  computed: {
    ...mapGetters('ServiceOrder', ['getserviceOrder', 'getDoctorData']),
    ...mapGetters('Agreements', ['getagreements', 'getCompanyData', 'getgeoreferencingData', 'getgeoreferencinglDataID']),
    ...mapGetters('Products', ['getProducts']),
  }
}
</script>

<style>
.is-invalid {
  border-color: red;
  }
</style>