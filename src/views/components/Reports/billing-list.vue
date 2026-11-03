<template>
  <div>
    <div class="py-7 container-fluid">
      <div class="card">
        <div class="card-body">
          <form action="" v-on:submit.prevent="sendForm()">
            <div class="row">
              <div class="col-md-2">
                <label for="" class="">Desde</label>
                <input type="date" class="form-control form-control-sm" id="" v-model="dataRecord.start_date"
                  placeholder="" :class="{'is-invalid': msg_error.start_date}"  ref="start_date">
                  <b-alert v-if="msg_error.start_date" class="text-danger text-alert" variant="danger" show>{{
                            msg_error.start_date }}</b-alert>
              </div>
              <div class="col-md-2">
                <label for="" class="">Hasta</label>
                <input type="date" class="form-control form-control-sm" v-model="dataRecord.end_date" id=""
                  placeholder="" :class="{'is-invalid': msg_error.end_date}"  ref="end_date">
                  <b-alert v-if="msg_error.end_date" class="text-danger text-alert" variant="danger" show>{{
                            msg_error.end_date }}</b-alert>
              </div>
              <div class="col-md-2">
                <label for="" class="">Acuerdo Comercial</label>
                <select class="form-select form-select-sm" name="id_agreement" @change="SearchCompany()"
                  v-model="dataRecord.id_agreement">
                  <option v-for="row in getagreements" :key="row.id_transfer" :value="row.id_transfer">{{ row.name_agreements }}</option>
                </select>
              </div>
              <div class="col-md-2">
                <label for="" class="">Empresa en mision</label>
                <select name="id_company" class="form-select form-select-sm" v-model="dataRecord.id_company">
                  <option :key="row.id" v-for="row in getCompanyData" :value="row.id">{{ row.name }} </option>
                </select>
              </div>
              <div class="col-md-2">
                <label for="" class="">Georeferenciacion</label>
                <select class="form-select form-select-sm" v-model="dataRecord.id_georeferencing">
                  <option :value="items.id" :key="items.id" v-for="items in getgeoreferencingData">{{ items.description
                    }}
                  </option>
                </select>
              </div>
              <div class="col-md-2 mt-4 text-center">
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
      dataRecord: {
        id_agreement: null,
        id_company: null,
        id_georeferencing: null,
        start_date: null,
        end_date: null
      },
      msg_error:{
        id_agreement: null,
        id_company: null,
        id_georeferencing: null,
        start_date: null,
        end_date: null
      }
    }
  },
  async mounted() {
    await this.searchDoctor()
    await this.getagreement()
  },
  methods: {
    ...mapActions('ServiceOrder', ['get', "AggserviceOrder", "SearchOrder", "updateServiceOrder", "searchDoctor"]),
    ...mapActions('Agreements', ["getagreement", "getCompany", "getgeoreferencing"]),
    ...mapActions('Record' , ["SendBilling"]),
    async SearchCompany() {
      //console.log("🚀 ~ SearchCompany ~ this.dataRecord.id_agreement:", this.dataRecord.id_agreement)
      await this.getCompany(this.dataRecord.id_agreement)
      await this.getgeoreferencing(this.dataRecord.id_agreement)
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
        if (this.dataRecord.id_agreement) {
            data.id_agreement = this.dataRecord.id_agreement;
        }
        if (this.dataRecord.id_company) {
            data.id_company = this.dataRecord.id_company;
        }
        if (this.dataRecord.id_georeferencing) {
            data.id_georeferencing = this.dataRecord.id_georeferencing;
        }
        if (this.dataRecord.start_date) {
            data.start_date = this.dataRecord.start_date;
        }
        if (this.dataRecord.end_date) {
            data.end_date = this.dataRecord.end_date;
        }
        if (!this.$validatePropertyEmpty(this.dataRecord.start_date)) {
          this.msg_error.start_date = 'Este campo es obligatorio';
          this.$refs.start_date.scrollIntoView({ behavior: 'smooth' });
          return false
        }
        if (!this.$validatePropertyEmpty(this.dataRecord.end_date)) {
          this.msg_error.end_date = 'Este campo es obligatorio';
          this.$refs.end_date.scrollIntoView({ behavior: 'smooth' });
          return false
        }
        this.SendBilling(data);
    }

  },
  computed: {
    ...mapGetters('ServiceOrder', ['getserviceOrder', 'getDoctorData']),
    ...mapGetters('Agreements', ['getagreements', 'getCompanyData', 'getgeoreferencingData', 'getgeoreferencinglDataID']),
  }
}
</script>

<style>
.is-invalid {
  border-color: red;
  }
</style>