<template>
  <div>
    <div class="container-fluid py-7">
      <div class="row justify-content-center">
        <div class="col">
          <div class="card">
            <div class="card-body">
              <div class="row">
                <div class="col-12 mt-3">
                  <hr>
                  <h4>Información Administrativa</h4>
                  <viewFormTechnical :valueStatus="this.gethistory" />
                  <FormConsulter :valueStatus="this.gethistory" />
                </div>
                <div class="col-12 mt-3">
                  <hr>
                  <h4>Revisión por sistema</h4>
                  <viewFormSystemRevision :valueStatus="this.gethistory" />
                </div>
                <div class="col-12 mt-3">
                  <hr>
                  <h4>Examen físico</h4>
                  <viewFormPhysicalExam :valueStatus="this.gethistory" />
                </div>
                <div class="col-12 mt-3">
                  <hr>
                  <h4>Diagnosticos</h4>
                  <viewFormdiagnostic :valueStatus="this.gethistory" />
                </div>
                <div class="col-12 mt-3">
                  <hr>
                  <h4>Antecedentes</h4>
                  <viewFormorrocord :valueStatus="this.gethistory" />
                </div>
                <div class="col-12 mt-3">
                  <hr>
                  <h4>Recomendaciones laborales</h4>
                  <viewFormorjob :valueStatus="this.gethistory" />
                </div>
                <div class="col-12 mt-3">
                  <hr>
                  <h4>Vacunación</h4>
                  <FormVaccination :valueStatus="this.gethistory" />
                </div>
                <div class="col-12 mt-3">
                  <hr>
                  <h4>Ginecología</h4>
                  <FormGynecology :valueStatus="this.gethistory" />
                </div>
                <div class="col-12 mt-3">
                  <hr>
                  <h4>Ordenes</h4>
                  <viewFormorders :valueStatus="this.gethistory" />
                </div>
                <div class="col-12 mt-3">
                  <hr>
                  <h4>Evoluciones</h4>
                  <viewFormorevolution :valueStatus="this.gethistory" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { mapActions, mapGetters } from "vuex";
import viewFormTechnical from "./formTechnical.vue"
import viewFormSystemRevision from "./formSystemRevision.vue"
import viewFormPhysicalExam from "./formPhysicalExam.vue"
import viewFormdiagnostic from "./formdiagnosticparaclinical.vue"
import viewFormorrocord from "./formrecord.vue"
import viewFormorjob from "./formjobrecommendation.vue"
import FormVaccination from "../History/formvaccination.vue"
import FormGynecology from "../History/formgynecology.vue"
import viewFormorders from "./formOrders.vue"
import viewFormorevolution from "./formevolution.vue"
import FormConsulter from "../History/formconsulter.vue"
  //import Swal from 'sweetalert2'
  //import 'sweetalert2/src/sweetalert2.scss'

  export default {
  name: "formHistory",
  props: {
    viewkey: {
      type: Object,
    }
  },
  data() {
    return {
      fecha: new Date().toLocaleDateString(),
      showMenu: false,
      show: false,
      searchserviceOrder: this.viewkey.key_history,
      searchKeyPatient: this.viewkey.key_patient,
      viewContent: 0,
      keyHistory: '',
      keyPatient: '',
      KeyTypeCare: '',
      state: {
        status: ''
      }
    };
  },
  components: {
    viewFormTechnical,
    viewFormPhysicalExam,
    viewFormSystemRevision,
    viewFormdiagnostic,
    viewFormorrocord,
    viewFormorjob,
    FormVaccination,
    FormGynecology,
    viewFormorders,
    viewFormorevolution,
    FormConsulter,
  },
  async mounted() {
    if (this.viewkey.key_history) {
      await this.getStoreserviceOrder();
      //console.log("🚀 ~ mounted ~ this.viewkey :", this.viewkey )
      
    }
  },
  watch: {
    viewkey: {
      immediate: true,
     async handler() {
        if (this.viewkey.key_history) {
          await this.getStoreserviceOrder();
          //console.log("🚀 ~ mounted ~ this.viewkey :", this.viewkey )
        }
      }
    }
  },
  methods: {
    ...mapActions('History', 
    [
      "SearchOrder",
      "addTechnical", 
      "generatePdf", 
      "searchTechnical",
      "searchVaccination",
      "SearchRecord",
      "searchGynecology",
      "searchSystemRevision",
      "searchPhysicalExam",
      "searchDiagnostic",
      "SearchAnality",
      "getOrdersHistory",
      "searchProcedure",
      "searchIncapacities",
      "SearchJob",
      "searchevolution",
    ]),
    async getStoreserviceOrder() {
      const searchOrder = {
        keyHistory: this.viewkey.key_history,
        keyPatient: this.viewkey.key_patient
      };

      await Promise.all([
        this.SearchOrder(searchOrder),
        this.searchTechnical(searchOrder),
        this.searchVaccination(searchOrder),
        this.SearchRecord(searchOrder),
        this.searchGynecology(searchOrder),
        this.searchSystemRevision(searchOrder),
        this.searchPhysicalExam(searchOrder),
        this.searchDiagnostic(searchOrder),
        this.SearchAnality(searchOrder),
        this.getOrdersHistory(searchOrder),
        this.searchProcedure(searchOrder),
        this.searchIncapacities(searchOrder.keyHistory),
        this.SearchJob(searchOrder),
        this.searchevolution(searchOrder),
      ])

      //await this.SearchOrder(searchOrder);
    }
  },
  computed: {
    ...mapGetters('History', ['gethistory']),
  }
};
</script>