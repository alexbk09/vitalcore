<template>
      <div class="py-7 container-fluid">
          <div class="card">
              <div class="card-body">
                <form v-on:submit="handleSubmit()">
                  <div class="d-flex">
                      <div>
                        <label for="">
                          Nombre del Acuerdo Comercial, Contrato o Convenio
                          <select name="trade_id" id="trade_id" class="form-control" v-model="trade">
                            <option value="">Seleccione una opción</option>
                            <option v-for="trade in traders" v-bind:key="trade.id_transfer" :value="trade.id_transfer">{{ trade.name_agreements }}</option>
                          </select>
                        </label>
                      </div>
                      <div>
                        <label for="">
                          Nombre de la Empresa en Misión
                          <select name="trade" id="trade" class="form-control" v-model="company">
                            <option value="">Seleccione una opción</option>
                            <option v-for="company in companies" v-bind:key="company.id" :value="company.id">{{ company.name }}</option>
                          </select>
                        </label>
                      </div>
                      <div>
                        <label for="">
                          Georeferencia
                          <select name="trade" id="trade" class="form-control" v-model="company">
                            <option value="">Seleccione una opción</option>
                            <option v-for="geoReference in geoReferences" v-bind:key="geoReference.id" :value="geoReference.id">{{ geoReference.description }}</option>
                          </select>
                        </label>
                      </div>
                      <div>
                        <label for="">
                          Fecha Desde
                          <input type="date" class="form-control">
                        </label>
                      </div>
                      <div>
                        <label for="">
                          Fecha Hasta
                          <input type="date" class="form-control">
                        </label>
                      </div>
                      <div class="flex-end search">
                        <button class="btn btn-primary btn-sm" type="submit">Buscar</button>
                      </div>
                  </div>
                </form>
              </div>
          </div>
      </div>
</template>
<style>
  label {
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
  }
  input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 0.25rem;
  }
  .d-flex {
    display: flex;
    gap: 1rem;
  }
  .search > button{
    display: flex;
    align-items: center;
    margin-top: 20px;
  }
</style>
<script>
import { mapGetters } from 'vuex';

  export default {
    name: "FormFilter",
    data() {
      return {
        traders: [],
        trade: '',
        companies: [],
        company: '',
        geoReferences: [],
        geoReference: '',
        dateFrom: '',
        dateTo: ''
      }
    },
    methods: {
      handleSubmit() {
        //console.log('Form submitted')
      },
      async tradeCommercial(){
        await this.$store.dispatch('Agreements/get')
        this.traders = this['Agreements/getagreements']
        //console.log("🚀 ~ tradeCommercial ~ this.traders:", this.traders)
      },
      getDetailTrade(){
        this.trade = this.traders.find(trade => trade.id_transfer === this.trade)
        this.geoReferences = this.trade.georefence
        this.companies = this.trade.mission_company
      }
    },
    actions: {
      
    },
    computed: {
      ...mapGetters(['Agreements/getagreements'])
    },
    mounted() {
      this.tradeCommercial()
    },
  }
  //import { computed } from 'vue'
  //import { useStore } from 'vuex'

  //const trade = ref([])
  /* const company = ref([])
  const georeference = ref([])
  const dateFrom = ref('')
  const dateTo = ref('') */

  //const store = useStore()
  //trade.value = store.state.agreements.agreements

  //computed(() => store.getters['Agreements/getagreements'])


  
</script>