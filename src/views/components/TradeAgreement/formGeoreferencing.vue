<template>
  <div class="container mt-4">
    <div class="">
      <h5 class="mb-3 text-secondary">GEOREFERENCIACIÓN</h5>
      <div class="row mb-3 align-items-end">
        <div class="col-md-3">
          <button class="btn btn-primary w-100 d-flex align-items-center justify-content-center" @click="alert()">
            <i class="bi bi-upload me-2"></i> Carga Masiva
          </button>
        </div>
        <div class="col-md-3">
          <button class="btn btn-outline-secondary w-100">ACTUALIZAR</button>
        </div>
      </div>
      <div class="row align-items-center">
        <div class="col-md-5">
          <BaseSelect id="sede_id" name="sede" label="SEDE:" v-model="dataGeo.sede_id" :options="listSeat"
            option-label="label" option-value="value" />
        </div>
        <div class="col-md-5">
          <BaseInput id="description" name="georeferenciacion" label="GEOREFERENCIACIÓN:" v-model="dataGeo.description"
            type="text" />
        </div>
        <div class="col-md-2 text-center">
          <button class="btn btn-primary btn-sm mt-4" @click="guardarGeoreferenciacion">AGREGAR</button>
        </div>
      </div>

      <table class="table table-borderless table-hover text-center">
        <thead class="text-white small bg-info">
          <tr>
            <th>SEDE</th>
            <th>GEOREFERENCIACIÓN</th>
            <th>OPCIONES</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in listGeoreferencingData" :key="index">
            <td>{{ getNameSeat(item.sede_id) }}</td>
            <td>{{ item.description }}</td>
            <td>
              <span class="icon" @click="deleteGeoreferenciacion(item.id)">
                <img src="../../../assets/img/eliminar.png" alt="Eliminar" width="20" class="hover-effect mr-2" />
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import BaseInput from "../utilsComponents/BaseInput.vue";
import BaseSelect from "../utilsComponents/BaseSelect.vue";
import { AlertUtils } from "../../../utils/alert.ts";
export default {
  components: {
    BaseInput,
    BaseSelect
  },
  props: {
    listContractId: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      contracted_id: this.$route.params.id,
      dataGeo: {
        sede_id: null,
        description: "",
        key_trade_agreement: this.listContractId.trade_agreement.id_transfer,
        id: '',
      }
    };
  },
  computed: {
    ...mapGetters("ContentConsultations", ["listSeat"]),
    ...mapGetters("TradeAgreement", ["listGeoreferencingData"]),
  },
  mounted() {
    // Aquí puedes cargar los datos iniciales si es necesario
    this.getSeat();
    this.getGeoreferencingData(this.contracted_id);
  },
  methods: {
    ...mapActions("ContentConsultations", ["getSeat",]),
    ...mapActions("TradeAgreement", ["saveGeoreferencing", "getGeoreferencingData","deleteGeoreferencingData"]),
    alert() {
      AlertUtils.info("Carga masiva de georeferenciación en desarrollo.");
    },
    async guardarGeoreferenciacion() {
      if (!this.dataGeo.sede_id || !this.dataGeo.description) {
        alert("Debe seleccionar una sede y diligenciar la georreferenciación.");
        return;
      }
      const newGeoreferencia = {
        sede_id: this.dataGeo.sede_id,
        description: this.dataGeo.description,
        contracted_id: this.contracted_id,
        key_trade_agreement: this.dataGeo.key_trade_agreement,
      };
      try {
        const response = await this.saveGeoreferencing(newGeoreferencia);
        // Si la respuesta es exitosa, recarga los datos
        this.getGeoreferencingData(this.contracted_id);
        // Limpia el formulario si lo deseas
        this.dataGeo.sede_id = null;
        this.dataGeo.description = "";
        AlertUtils.success("Georeferenciación guardada correctamente.");
      } catch (error) {
        AlertUtils.error("Error al guardar la georeferenciación.");
      }
    },
    getNameSeat(id) {
      const seatName = this.listSeat.find(seat => seat.id == id);
      return seatName ? seatName.name : "No disponible";
    },
    deleteGeoreferenciacion(id) {
      // Busca el registro a eliminar
      const item = this.listGeoreferencingData.find(item => item.id === id);
      // Obtén el nombre de la sede
      const nombreSede = this.getNameSeat(item ? item.sede_id : null);

      AlertUtils.confirm(
        "¿Eliminar georreferenciación?",
        `¿Está seguro de que desea eliminar la georreferenciación de la sede "${nombreSede}"?`
      ).then(result => {
        if (result.isConfirmed) {
          this.deleteGeoreferencingData(id)
            .then(() => {
              AlertUtils.success("Georeferenciación eliminada correctamente.");
              this.getGeoreferencingData(this.contracted_id);
            })
            .catch(() => {
              AlertUtils.error("Error al eliminar la georeferenciación.");
            });
        }
      });
    },
  },
};
</script>

<style scoped>
.btn-primary i {
  font-size: 1rem;
}
.icon:hover {
  cursor: pointer;
  color: #007bff;
  transition: color 0.3s;
}
</style>