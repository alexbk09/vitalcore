<template>
  <div class="container mt-4">
    <div v-if="ContentStatus" class="mt-4">
      <div class="row mb-3 align-items-end">
        <div class="col-12 text-center mb-3">
          <button class="btn btn-primary w-30">ISS</button>
        </div>
        <div class="col-md-2 offset-md-2">
          <button class="btn btn-primary" @click="alert()" type="button">
            CARGA MASIVA
          </button>
        </div>
        <div class="col-md-2">
          <button class="btn btn-success w-100">ACTUALIZAR</button>
        </div>
      </div>

      <!-- Formulario de insumo/producto -->
      <div class="row mb-3 g-3 align-items-center">
        <div class="col-12 position-relative">
          <div class="row">
            <div class="col-md-4">
              <BaseInput
                id="codigoInsumo"
                name="codigo"
                label="CÓDIGO:"
                v-model="formProducto.code"
                type="text"
                :error="errors.code"
                @input="buscarProducto"
              />
            </div>
            <div class="col-md-8">
              <BaseInput
                id="nombreInsumo"
                name="description"
                label="NOMBRE DEL PRODUCTO O SERVICIO:"
                v-model="formProducto.description"
                type="text"
                :error="errors.description"
                @input="buscarProducto"
              />
            </div>
          </div>
          <!-- Resultados flotantes -->
          <ul
            v-if="productosBuscados.length"
            class="buscador-dropdown "
          >
            <li
              v-for="(producto, idx) in productosBuscados"
              :key="idx"
              class="list-group-item list-group-item-action"
              @click="seleccionarProducto(producto)"
              style="cursor:pointer"
            >
              {{ producto.codigo || producto.code }} - {{ producto.nombre || producto.description }}
            </li>
          </ul>
        </div>
        <div class="col-md-4">
          <BaseInput
            id="precioInsumo"
            name="current_price"
            label="PRECIO:"
            v-model="formProducto.current_price"
            type="number"
            :error="errors.current_price"
          />
        </div>
        <div class="col-md-4">
          <BaseInput
            id="porcentajeInsumo"
            name="percentage"
            label="PORCENTAJE:"
            v-model="formProducto.percentage"
            type="number"
            :error="errors.percentage"
          />
        </div>
        <div class="col-md-4">
          <BaseInput
            id="valorPagarInsumo"
            name="amount"
            label="VALOR A PAGAR:"
            v-model="formProducto.amount"
            type="number"
            :error="errors.amount"
            disabled
          />
        </div>
        <div class="col-md-12 text-end mt-3">
          <button class="btn btn-success btn-sm" @click="guardarProducto">AGREGAR INSUMO</button>
        </div>
      </div>

      <div class="table-responsive">
        <table class="table text-center table-borderless table-hover">
        <thead class="text-white small bg-info">
          <tr>
            <th>CÓDIGO</th>
            <th>NOMBRE DEL PRODUCTO O SERVICIO</th>
            <th>PRECIO</th>
            <th>VALOR A PAGAR</th>
            <th>OPCIONES</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(insumo, index) in listProduct.data" :key="index">
            <td>{{ insumo.code }}</td>
            <td>{{ insumo.description.slice(0,50) }}</td>
            <td>{{ insumo.current_price }}</td>
            <td>{{ insumo.amount }}</td>
            <td>
              <span class="icon" @click="deleteProduct(insumo)">
                <img src="../../../assets/img/eliminar.png" alt="Eliminar" width="20" class="hover-effect mr-2" />
              </span>
            </td>
          </tr>
        </tbody>
      </table>
      </div>
    </div>
  </div>
</template>

<script>
import BaseInput from "../utilsComponents/BaseInput.vue";
import { mapActions, mapGetters } from "vuex";
import { AlertUtils } from "../../../utils/alert.ts";
export default {
  props: {
    listContractId: {
      type: Object,
      required: true
    }
  },
  components: { BaseInput },
  data() {
    return {
      ContentStatus: true,
      productosBuscados: [],
      insumos: [],
      formProducto: {
        code: "",
        description: "",
        current_price: "",
        amount: "",
        percentage: "",
        key_trade_agreement: this.listContractId.trade_agreement.id_transfer,
        contracted_id: this.$route.params.id,
        key_type: "cups",
      },
      errors: {
        code: false,
        description: false,
        current_price: false,
        amount: false,
        percentage: false,
        busquedaProducto: false,
      },
    };
  },
  computed: {
    ...mapGetters("ContentConsultations", ["listConsulterProductOrCups"]),
    ...mapGetters("TradeAgreement", ["listProduct"]),
  },
  watch: {
    'formProducto.current_price': 'calcularValorPagar',
    'formProducto.percentage': 'calcularValorPagar',
  },
  mounted() {
    this.getProductData(this.formProducto.contracted_id);
  },
  methods: {
    ...mapActions("ContentConsultations", ["getConsulterProductOrCups"]),
    ...mapActions("TradeAgreement", ["saveProduct", "getProductData", "deleteProductData"]),
    alert() {
      AlertUtils.info("Carga masiva de Productos Contratados en desarrollo.");
    },
    buscarProducto() {
      // Solo busca si hay algo en código o nombre
      if (!this.formProducto.code && !this.formProducto.description) {
        this.productosBuscados = [];
        return;
      }
      // Puedes enviar ambos campos como filtro
      const query = this.formProducto.code || this.formProducto.description;
      this.getConsulterProductOrCups(query).then(() => {
        this.productosBuscados = this.listConsulterProductOrCups || [];
      });
    },

    seleccionarProducto(producto) {
      this.formProducto.code = producto.codigo || producto.code || "";
      this.formProducto.description = producto.nombre || producto.description || "";
      this.formProducto.current_price = producto.precio || producto.current_price || "";
      this.formProducto.percentage = "";
      this.formProducto.amount = "";
      this.productosBuscados = [];
    },

    calcularValorPagar() {
      const precio = parseFloat(this.formProducto.current_price) || 0;
      const porcentaje = parseFloat(this.formProducto.percentage) || 0;
      this.formProducto.amount = (precio + (precio * porcentaje / 100)).toFixed(2);
    },

    guardarProducto() {
      this.errors = {
        code: !this.formProducto.code,
        description: !this.formProducto.description,
        current_price: !this.formProducto.current_price,
        amount: !this.formProducto.amount,
        percentage: !this.formProducto.percentage,
        busquedaProducto: false,
        
      };

      if (
        this.errors.code ||
        this.errors.description ||
        this.errors.current_price ||
        this.errors.amount ||
        this.errors.percentage
      ) {
        AlertUtils.error("Todos los campos son obligatorios.");
        return;
      }

      const nuevoProducto = {
        code: this.formProducto.code,
        description: this.formProducto.description,
        current_price: this.formProducto.current_price,
        amount: this.formProducto.amount,
        percentage: this.formProducto.percentage,
        key_trade_agreement: this.formProducto.key_trade_agreement,
        contracted_id: this.formProducto.contracted_id,
        key_type: "cups",
      };

      this.saveProduct(nuevoProducto)
        .then(() => {
          AlertUtils.success("Producto guardado exitosamente");
          this.getProductData(this.formProducto.contracted_id);
          this.formProducto.code = "";
          this.formProducto.description = "";
          this.formProducto.current_price = "";
          this.formProducto.amount = "";
          this.formProducto.percentage = "";
        })
        .catch(() => {
          AlertUtils.error("Error al guardar el producto");
        });
    },
    deleteProduct(data) {
     
      AlertUtils.confirm(
        "¿Eliminar producto?",
        `¿Está seguro de que desea eliminar el "${data.description}" del contrato?`
      ).then(result => {
        if (result.isConfirmed) {
          this.deleteProductData(data.id)
            .then(() => {
              AlertUtils.success("Georeferenciación eliminada correctamente.");
              this.getProductData(this.formProducto.contracted_id);
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
/* Estilos adicionales si es necesario */
.buscador-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 10;
  width: 100%;
  max-height: 220px;
  overflow-y: auto;
  background: #fff;
  border: 1px solid #d1d5db;
  border-radius: 0 0 8px 8px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.08);
}
.icon:hover {
  cursor: pointer;
  color: #007bff;
  transition: color 0.3s;
}
</style>