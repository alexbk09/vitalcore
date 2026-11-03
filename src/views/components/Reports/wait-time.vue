<template>
  <div>
    <div class="py-7 container-fluid">
      <div class="card">
        <div class="card-body">
          <form action="" v-on:submit.prevent="sendForm()">
            <div class="row">
              <div class="col-md-6 col-xl-2">
                <label for="" class="">Desde</label>
                <input type="date" class="form-control form-control-sm" v-model="dataWaitTime.start_date" id=""
                  placeholder="" :class="{'is-invalid': msg_error.start_date}"  ref="start_date">
                  <b-alert v-if="msg_error.start_date" class="text-danger text-alert" variant="danger" show>{{
                            msg_error.start_date }}</b-alert>
              </div>
              <div class="col-md-6 col-xl-2">
                <label for="" class="">Hasta</label>
                <input type="date" class="form-control form-control-sm" v-model="dataWaitTime.end_date" id=""
                  placeholder="" :class="{'is-invalid': msg_error.end_date}"  ref="end_date">
                  <b-alert v-if="msg_error.end_date" class="text-danger text-alert" variant="danger" show>{{
                            msg_error.end_date }}</b-alert>
              </div>
              <div class="col-md-6 col-xl-4">
                <label for="" class="">Acuerdo Comercial</label>
                <select class="form-select form-select-sm" name="id_agreement" @change="SearchCompany()"
                  v-model="dataWaitTime.id_agreement">
                  <option v-for="row in getagreements" :key="row.id_transfer" :value="row.id_transfer">{{
            row.name_agreements }}</option>
                </select>
              </div>
              <div class="col-md-6 col-xl-4">
                <label for="" class="">Empresa en mision</label>
                <select name="id_company" class="form-select form-select-sm" v-model="dataWaitTime.id_company">
                  <option :key="row.id" v-for="row in getCompanyData" :value="row.id">{{ row.name }} </option>
                </select>
              </div>
              <div class="col-md-6 col-xl-4">
                <label for="" class="">Tipo de solicitud</label>
                <select class="form-select form-select-sm" name="id_request" v-model="dataWaitTime.id_request" id="">
                  <option :value="items.id_request" :key="items.id_request" v-for="items in getrequest">{{
            items.name_request }}</option>
                </select>
              </div>
              <div class="col-md-6 col-xl-4">
                <label for="" class="">Georeferenciacion</label>
                <select class="form-select form-select-sm" v-model="dataWaitTime.id_georeferencing">
                  <option :value="items.id" :key="items.id" v-for="items in getgeoreferencingData">{{ items.description
                    }}
                  </option>
                </select>
              </div>
              <div class="col-md-6 col-xl-3">
                <label for="" class="">Tipo de historia clinica</label>
                <select name="type_history" id="" class="form-select form-select-sm"
                  v-model="dataWaitTime.type_history">
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
      dataWaitTime: {
        id_agreement: null,
        id_company: null,
        id_georeferencing: null,
        start_date: null,
        end_date: null,
        id_request: null,
        type_history: null
      },
      msg_error: {
        id_agreement: null,
        id_company: null,
        id_georeferencing: null,
        start_date: null,
        end_date: null,
        id_request: null,
        type_history: null
      }
    }
  },
  async mounted() {
    await this.getrequests();
    await this.get();
    await this.getagreement();
  },
  methods: {
    ...mapActions('Agreements', ["getagreement", "getCompany", "getgeoreferencing"]),
    ...mapActions('Request', ["getrequests"]),
    ...mapActions('Products', ["get", "destroy"]),
    ...mapActions('Record' , ["SendWaitTime"]),
    async SearchCompany() {
      await this.getCompany(this.dataWaitTime.id_agreement)
      await this.getgeoreferencing(this.dataWaitTime.id_agreement)
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
      if (this.dataWaitTime.id_agreement) {
          data.id_agreement = this.dataWaitTime.id_agreement;
      }
      if (this.dataWaitTime.id_company) {
          data.id_company = this.dataWaitTime.id_company;
      }
      if (this.dataWaitTime.id_request) {
          data.id_request = this.dataWaitTime.id_request;
      }
      if (this.dataWaitTime.id_georeferencing) {
          data.id_georeferencing = this.dataWaitTime.id_georeferencing;
      }
      if (this.dataWaitTime.start_date) {
          data.start_date = this.dataWaitTime.start_date;
      }
      if (this.dataWaitTime.end_date) {
          data.end_date = this.dataWaitTime.end_date;
      }
      if (this.dataWaitTime.type_history) {
          data.type_history = this.dataWaitTime.type_history;
      }
      if (!this.$validatePropertyEmpty(this.dataWaitTime.start_date)) {
          this.msg_error.start_date = 'Este campo es obligatorio';
          this.$refs.start_date.scrollIntoView({ behavior: 'smooth' });
          return false
        }
        if (!this.$validatePropertyEmpty(this.dataWaitTime.end_date)) {
          this.msg_error.end_date = 'Este campo es obligatorio';
          this.$refs.end_date.scrollIntoView({ behavior: 'smooth' });
          return false
        }
        this.SendWaitTime(data);
    }
  },
  computed: {
    ...mapGetters('ServiceOrder', ['getserviceOrder', 'getDoctorData']),
    ...mapGetters('Agreements', ['getagreements', 'getCompanyData', 'getgeoreferencingData', 'getgeoreferencinglDataID']),
    ...mapGetters('Request', ['getrequest']),
    ...mapGetters('Products', ['getProducts']),
  }
}
</script>

<style>
.is-invalid {
  border-color: red;
  }
</style>