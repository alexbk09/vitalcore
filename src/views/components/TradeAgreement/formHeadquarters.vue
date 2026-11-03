<template>
  <div class="container-fluid mt-4">
    <div class="text-center ">
      <div class="row">
        <div class="col-6 offset-3">
          <h6 class="mb-3 text-black p-2" style="background-color: #CFFFE1;">SEDE</h6>
          <div class="d-flex flex-column">
            <div v-for="(sede, index) in listSeat" :key="index" class="d-flex align-items-center mb-2 px-4">
              <input type="checkbox" :id="'sede-' + index" v-model="selectedSedes" :value="sede.id"
                class="form-check-input bg-light  me-2" />
              <label :for="'sede-' + index" class="form-check-label me-4">{{ sede.name }}</label>
            </div>
          </div>
        </div>
      </div>
      <!-- Botón para guardar -->
      <div class="col text-end">
        <button class="btn btn-success mt-3" @click="saveSelectedSedes">Guardar Sedes</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { AlertUtils } from "../../../utils/alert.ts";
export default {
  props: {
    listContractId: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      selectedSedes: [], // Aquí se almacenarán las sedes seleccionadas
      contracted_id: this.$route.params.id,
    };
  },
  computed: {
    ...mapGetters("ContentConsultations", ["listSeat"]),
    ...mapGetters("TradeAgreement", [ "listSeatData"]),
  },
  watch: {
    listSeatData: {
      immediate: true,
      handler(newVal) {
        if (newVal && Array.isArray(newVal)) {
          this.selectedSedes = newVal.map(item => item.seat_id);
        }
      }
    }
  },
  mounted() {
    this.getSeat();
    this.getSeatData(this.contracted_id).then(() => {
      // Cuando listSeatData ya está cargado, inicializa los checkboxes seleccionados
      if (this.listSeatData && Array.isArray(this.listSeatData)) {
        this.selectedSedes = this.listSeatData.map(item => item.seat_id);
      }
    });
  },
  methods: {
    ...mapActions("ContentConsultations", [ "getSeat",]),
    ...mapActions("TradeAgreement", [ "saveSeat","getSeatData"]),
    saveSelectedSedes() {
      // Reemplaza estos valores según tu lógica o props
      const contracted_id = this.contracted_id;
      const trade_agreement_id = this.listContractId.trade_agreement.id_transfer;

      const payload = {
        seat_id: this.selectedSedes,
        contracted_id,
        trade_agreement_id,
      };
      response = this.saveSeat(payload);
      if(response){

      }
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 400px;
  /* Ajusta el ancho del contenedor si es necesario */
}

.me-2 {
  margin-right: 0.5rem;
}

.me-4 {
  margin-right: 1.5rem;
}

.mb-2 {
  margin-bottom: 0.5rem;
}
</style>