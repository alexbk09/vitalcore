<template>
  <div>
    <Loading v-if="isLoading" :valuetitle="title" />
    <div class="container-fluid" v-else>
      <form @submit.prevent="sendFormsDiagnostic" @keydown.enter.prevent>
        <!-- Vista de escritorio -->
        <div class="d-none d-md-block">
          <div class="row">
            <div class="col-md-12">
              <div class="table-responsive p-0">
                <table class="table text-center mb-0">
                  <thead>
                    <tr>
                      <th style="width: 10%;">Fecha</th>
                      <th style="width: 200px;">CIE 10</th>
                      <th style="width: 300px;">Diagnóstico</th>
                      <th>Origen</th>
                      <th>Tipo</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="row in valueStatus.get_diagnostic_history" :key="row.id">
                      <td>{{ moment(row.created_at).format('DD/MM/YYYY') }}</td>
                      <td>{{ row.code }}</td>
                      <td>{{ row.description.slice(0, 20) }}</td>
                      <td>{{ row.origin }}</td>
                      <td>{{ row.type }}</td>
                      <td>
                        <button
                          type="button"
                          class="btn btn-sm p-1 btn-outline-danger mt-2 me-2"
                          @click="deleteCie10(row.id)"
                          title="Eliminar"
                        >
                          <i class="fa fa-trash" aria-hidden="true"></i>
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>
                        <BaseInput
                          autocomplete="off"
                          :disabled="isDisabled"
                          @input="searchCieCodeDebounced"
                          name="code_diagnostic"
                          v-model="diagnostic.code_diagnostic"
                          :error="msg_error.code_diagnostic"
                          ref="code_diagnostic"
                          @blur="handleBlur('cie10')"
                          placeholder="Código"
                        />
                        <ul class="autocompletecode" v-if="cie10Results.length">
                          <li
                            v-for="row in cie10Results"
                            :key="row.id"
                            @mousedown="isSelecting = true"
                            @click="selectCie10(row.id, row.code, row.description)"
                          >
                            <span class="text-busqueda">{{ row.code }} {{ row.description.slice(0, 50) }}...</span>
                          </li>
                        </ul>
                      </td>
                      <td>
                        <BaseInput
                          autocomplete="off"
                          :disabled="isDisabled"
                          @input="searchDiagnosticDebounced"
                          name="value_diagnostic"
                          v-model="diagnostic.value_diagnostic"
                          :error="msg_error.value_diagnostic"
                          ref="value_diagnostic"
                          @blur="handleBlur('diagnostic')"
                          placeholder="Descripción"
                        />
                        <ul class="autocompletedescription" v-if="diagnosticResults.length">
                          <li
                            v-for="row in diagnosticResults"
                            :key="row.id"
                            @mousedown="isSelecting = true"
                            @click="selectDiagnostic(row.id, row.code, row.description)"
                          >
                            <span class="text-busqueda">{{ row.code }} {{ row.description.slice(0, 50) }}...</span>
                          </li>
                        </ul>
                      </td>
                      <td>
                        <BaseSelect
                          :disabled="isDisabled"
                          name="origin_diagnostic"
                          v-model="diagnostic.origin_diagnostic"
                          :options="originOptions"
                          :error="msg_error.origin_diagnostic"
                          ref="origin_diagnostic"
                          placeholder="Seleccionar..."
                        />
                      </td>
                      <td>
                        <BaseSelect
                          :disabled="isDisabled"
                          name="type_diagnostic"
                          v-model="diagnostic.type_diagnostic"
                          :options="typeOptions"
                          :error="msg_error.type_diagnostic"
                          ref="type_diagnostic"
                          placeholder="Seleccionar..."
                        />
                      </td>
                      <td v-if="valueStatus.key_status === 3">
                        <argon-button
                          type="submit"
                          color="success"
                          :disabled="spiner"
                          class="ms-auto mt-3"
                        >
                          <span v-if="!spiner">Guardar</span>
                          <div class="d-flex align-items-center" v-else>
                            <strong class="me-2">Guardando Datos</strong>
                            <div class="spinner-border ms-auto" role="status" aria-hidden="true"></div>
                          </div>
                        </argon-button>
                      </td>
                    </tr>
                    <tr>
                      <td colspan="5" class="align-middle text-center">
                        <ul class="autocompletedescription">
                          <li
                            v-for="row in getCie10"
                            :key="row.id"
                            @mousedown="isSelecting = true"
                            @click="selecClickdescription(row.id, row.code, row.description)"
                          >
                            <span class="text-busqueda">{{ row.code }} {{ row.description.slice(0, 50) }}...</span>
                          </li>
                        </ul>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <!-- Vista móvil -->
        <div class="d-block d-md-none">
          <div v-for="row in valueStatus.get_diagnostic_history" :key="row.id" class="diagnostic-card mb-2 p-2">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <span class="badge bg-secondary">{{ moment(row.created_at).format('DD/MM/YYYY') }}</span>
              <button
                type="button"
                class="btn btn-sm btn-outline-danger"
                @click="deleteCie10(row.id)"
                title="Eliminar"
              >
                <i class="fa fa-trash" aria-hidden="true"></i>
              </button>
            </div>
            <div class="mb-1">
              <strong class="text-black">CIE 10:</strong>
              <span class="ms-2">{{ row.code }}</span>
            </div>
            <div class="mb-1">
              <strong class="text-black">Diagnóstico:</strong>
              <span class="ms-2">{{ row.description.slice(0, 50) }}</span>
            </div>
            <div class="mb-1">
              <strong class="text-black">Origen:</strong>
              <span class="ms-2">{{ row.origin }}</span>
            </div>
            <div>
              <strong class="text-black">Tipo:</strong>
              <span class="ms-2">{{ row.type }}</span>
            </div>
          </div>
          <div class="">
            <BaseInput
              autocomplete="off"
              :disabled="isDisabled"
              @input="searchCieCodeDebounced"
              name="code_diagnostic"
              v-model="diagnostic.code_diagnostic"
              :error="msg_error.code_diagnostic"
              ref="code_diagnostic"
              @blur="handleBlur('cie10')"
              placeholder="Código CIE 10"
            />
            <ul class="autocompletedescription">
              <li
                v-for="row in getCie10"
                :key="row.id"
                @mousedown="isSelecting = true"
                @click="selecClickdescription(row.id, row.code, row.description)"
              >
                <span class="text-busqueda">{{ row.code }} {{ row.description.slice(0, 50) }}...</span>
              </li>
            </ul>
            <BaseInput
              autocomplete="off"
              :disabled="isDisabled"
              @input="searchDiagnosticDebounced"
              name="value_diagnostic"
              v-model="diagnostic.value_diagnostic"
              :error="msg_error.value_diagnostic"
              ref="value_diagnostic"
              @blur="handleBlur('diagnostic')"
              placeholder="Descripción"
              class="mt-2"
            />
            <ul class="autocompletedescription" v-if="diagnosticResults.length">
              <li
                v-for="row in diagnosticResults"
                :key="row.id"
                @mousedown="isSelecting = true"
                @click="selectDiagnostic(row.id, row.code, row.description)"
              >
                <span class="text-busqueda">{{ row.code }} {{ row.description.slice(0, 50) }}...</span>
              </li>
            </ul>
            <BaseSelect
              :disabled="isDisabled"
              name="origin_diagnostic"
              v-model="diagnostic.origin_diagnostic"
              :options="originOptions"
              :error="msg_error.origin_diagnostic"
              ref="origin_diagnostic"
              placeholder="Origen"
              class="mt-2"
            />
            <BaseSelect
              :disabled="isDisabled"
              name="type_diagnostic"
              v-model="diagnostic.type_diagnostic"
              :options="typeOptions"
              :error="msg_error.type_diagnostic"
              ref="type_diagnostic"
              placeholder="Tipo"
              class="mt-2"
            />
            <div v-if="valueStatus.key_status === 3" class="text-end mt-3">
              <argon-button
                type="submit"
                color="success"
                :disabled="spiner"
              >
                <span v-if="!spiner">Guardar</span>
                <div class="d-flex align-items-center" v-else>
                  <strong class="me-2">Guardando Datos</strong>
                  <div class="spinner-border ms-auto" role="status" aria-hidden="true"></div>
                </div>
              </argon-button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import ArgonButton from "@/components/ArgonButton.vue";
import { mapActions, mapGetters } from "vuex";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
import Loading from "../Utils/Loading.vue";
import moment from "moment";
import BaseInput from "../utilsComponents/BaseInput.vue";
import BaseSelect from "../utilsComponents/BaseSelect.vue";

export default {
  name: "formHistory",
  props: {
    valueStatus: Object,
  },
  data() {
    return {
      userValidate: {},
      fecha: new Date().toLocaleDateString(),
      showMenu: false,
      diagnostic: {
        code_diagnostic: "",
        value_diagnostic: "",
        origin_diagnostic: "",
        type_diagnostic: "",
        id_diagnostic: "",
        control_date: "",
        IDHistory: "",
        IDPatient: "",
      },
      msg_error: {},
      show: false,
      searchserviceOrder: this.valueStatus.id,
      searchKeyPatient: this.valueStatus.key_patient,
      spiner: false,
      keyHistory: "",
      keyPatient: "",
      KeyTypeCare: "",
      title: "Paraclinicos y Diagnósticos",
      cie10Results: [],
      diagnosticResults: [],
      isSelecting: false,
      searchValue: "",
      isLoading: true,
      originOptions: [
        { id: "", name: "Seleccionar..." },
        { id: "ENFERMEDAD GENERAL", name: "ENFERMEDAD GENERAL" },
        { id: "ENFERMEDAD PROFESIONAL", name: "ENFERMEDAD PROFESIONAL" },
        { id: "ACCIDENTE TRABAJO", name: "ACCIDENTE TRABAJO" },
        { id: "ACCIDENTE TRANSITO", name: "ACCIDENTE TRANSITO" },
        { id: "ACCIDENTE OFIDICO", name: "ACCIDENTE OFIDICO" },
        { id: "ACCIDENTE RABICO", name: "ACCIDENTE RABICO" },
        { id: "EVENTO CATASTROFICO", name: "EVENTO CATASTROFICO" },
        { id: "LESION AGRESION", name: "LESION AGRESION" },
        { id: "LESION AUTO INFLINGIDA", name: "LESION AUTO INFLINGIDA" },
        { id: "SOSPECHA ABUSO SEXUAL", name: "SOSPECHA ABUSO SEXUAL" },
        { id: "SOSPECHA MALTRATO EMOCIONAL", name: "SOSPECHA MALTRATO EMOCIONAL" },
        { id: "SOSPECHA MALTRATO FISICO", name: "SOSPECHA MALTRATO FISICO" },
        { id: "SOSPECHA VIOLENCIA SEXCUAL", name: "SOSPECHA VIOLENCIA SEXUAL" },
        { id: "OTRA", name: "OTRA" },
        { id: "OTRO TIPO ACCIDENTE", name: "OTRO TIPO ACCIDENTE" },
      ],
      typeOptions: [
        { id: "", name: "Seleccionar..." },
        { id: "Confirmado Nuevo", name: "Confirmado Nuevo" },
        { id: "Confirmado Repetido", name: "Confirmado Repetido" },
        { id: "Impresion Diagnostica", name: "Impresion Diagnostica" },
      ],
    };
  },
  components: {
    ArgonButton,
    Loading,
    BaseInput,
    BaseSelect,
  },
  computed: {
    ...mapGetters("History", ["gethistory", "getDiagnostic", "getCie10"]),
    isDisabled() {
      return this.valueStatus.key_status == 5 || this.valueStatus.key_status == 4;
    },
  },
  watch: {
    async getDiagnostic() {
      this.isLoading = true;
      if (this.valueStatus.id) {
        this.diagnostic = this.getDiagnostic;
        this.isLoading = false;
      }
    },
  },
  created() {
    this.isSelecting = false;
    this.searchCieCodeDebounced = this.debounce(this.searchCieCode, 300);
    this.searchDiagnosticDebounced = this.debounce(this.searchCieDescription, 300);
  },
  async mounted() {
    this.$store.state.isAbsolute = true;
    this.validateUser();
    if (this.searchserviceOrder) {
      await this.loadingActive();
    }
  },
  methods: {
    ...mapActions("History", [
      "SearchOrder",
      "addDiagnostic",
      "searchDiagnostic",
      "searchCie10",
      "cleadCie10",
      "destroyCie10",
    ]),
    debounce(func, wait) {
      let timeout;
      return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
      };
    },
    async getStoreserviceOrder() {
      if (this.searchserviceOrder) {
        await this.searchDiagnostic({ keyHistory: this.searchserviceOrder });
      }
    },
    async loadingActive() {
      this.isLoading = true;
      await this.getStoreserviceOrder();
      this.isLoading = false;
    },
    validateUser() {
      this.userValidate = JSON.parse(localStorage.getItem("user"));
    },
    clearDiagnostic() {
      this.diagnostic = {
        code_diagnostic: "",
        value_diagnostic: "",
        origin_diagnostic: "",
        type_diagnostic: "",
        id_diagnostic: "",
        control_date: "",
        IDHistory: "",
        IDPatient: "",
      };
      this.msg_error = {};
    },
    async sendFormsDiagnostic() {
      this.diagnostic.IDHistory = this.searchserviceOrder;
      this.diagnostic.IDPatient = this.searchKeyPatient;

      // Validaciones
      if (!this.$validatePropertyEmpty(this.diagnostic.code_diagnostic)) {
        this.msg_error.code_diagnostic = "Este campo es requerido";
        this.$refs.code_diagnostic.scrollIntoView({ behavior: "smooth" });
        return;
      }
      if (!this.$validatePropertyEmpty(this.diagnostic.value_diagnostic)) {
        this.msg_error.value_diagnostic = "Este campo es requerido";
        this.$refs.value_diagnostic.scrollIntoView({ behavior: "smooth" });
        return;
      }
      if (!this.$validatePropertyEmpty(this.diagnostic.origin_diagnostic)) {
        this.msg_error.origin_diagnostic = "Este campo es requerido";
        this.$refs.origin_diagnostic.scrollIntoView({ behavior: "smooth" });
        return;
      }
      if (!this.$validatePropertyEmpty(this.diagnostic.type_diagnostic)) {
        this.msg_error.type_diagnostic = "Este campo es obligatorio";
        this.$refs.type_diagnostic.scrollIntoView({ behavior: "smooth" });
        return;
      }

      this.spiner = true;
      const response = await this.addDiagnostic(this.diagnostic);
      if (response === true) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Datos agregado con exito",
          showConfirmButton: false,
          timer: 1500,
        });
        this.spiner = false;
        this.clearDiagnostic();
        this.$emit("saved");
      } else {
        this.spiner = false;
        Swal.fire({
          icon: "error",
          title: "Lo siento, los datos no se pudieron agregar",
          text: response,
        });
      }
    },
    async searchCieCode() {
      if (this.diagnostic.code_diagnostic.length > 2) {
        this.searchValue = this.diagnostic.code_diagnostic;
        await this.searchCie10(this.searchValue);
      }
    },
    async searchCieDescription() {
      if (this.diagnostic.value_diagnostic.length > 4) {
        this.searchValue = this.diagnostic.value_diagnostic;
        await this.searchCie10(this.diagnostic.value_diagnostic);
      }
    },
    selecClickcode(id, code, description) {
      this.diagnostic.id_diagnostic = id;
      this.diagnostic.value_diagnostic = description;
      this.diagnostic.code_diagnostic = code;
      this.cleadCie10();
    },
    selecClickdescription(id, code, description) {
      this.diagnostic.id_diagnostic = id;
      this.diagnostic.value_diagnostic = description;
      this.diagnostic.code_diagnostic = code;
      this.cleadCie10();
    },
    deleteCie10(id) {
      Swal.fire({
        title: "¿Está seguro que deseas eliminar el diagnostico?",
        text: "¡No podrás revertir esto!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "¡Sí, bórralo!",
      }).then((result) => {
        if (result.isConfirmed) {
          const destroy = {
            keyCie10: id,
            keyHistory: this.searchserviceOrder,
          };
          const response = this.destroyCie10(destroy);
          Swal.fire("¡Eliminado!", "El diagnostico ha sido eliminado.", "success");
          if (response) {
            this.$emit("saved");
          }
        }
      });
    },
    moment,
    handleBlur(type) {
      setTimeout(() => {
        if (!this.isSelecting && !this.diagnostic.id_diagnostic) {
          this.cleadCie10();
          this.clearDiagnostic();
        }
      }, 200);
    },
    selectCie10(id, code, description) {
      this.diagnostic.id_diagnostic = id;
      this.diagnostic.code_diagnostic = code;
      this.diagnostic.value_diagnostic = description;
      this.cie10Results = [];
      this.isSelecting = false;
    },
    selectDiagnostic(id, code, description) {
      this.diagnostic.id_diagnostic = id;
      this.diagnostic.code_diagnostic = code;
      this.diagnostic.value_diagnostic = description;
      this.diagnosticResults = [];
      this.isSelecting = false;
    },
  },
};
</script>

<style>
ul.autocompletecode,
ul.autocompletedescription {
  position: absolute;
  list-style: none;
  margin: 0;
  padding: 0;
  z-index: 101;
  background-color: white;
  max-height: 250px;
  overflow-y: auto;
  width: 100%;
}
ul.autocompletecode > li,
ul.autocompletedescription > li {
  padding: 5px 10px;
  border-bottom: 1px solid #ccc;
  cursor: pointer;
}
ul.autocompletecode > li:hover,
ul.autocompletedescription > li:hover {
  background: #d2d2d24d;
}
.text-busqueda {
  color: black;
}

/* Opcional: mejora visual para tarjetas en móvil */
@media (max-width: 767px) {
  .card {
    border-radius: 10px;
    box-shadow: 0 2px 8px #0001;
    position: relative;
  }
  .card .autocompletedescription {
    position: static !important;
    width: 100% !important;
    max-width: 100% !important;
    margin-top: -10px;
    left: 0 !important;
    right: 0 !important;
    box-shadow: 0 2px 8px #0002;
    border-radius: 0 0 8px 8px;
  }
  .card .autocompletedescription > li {
    border-radius: 0;
  }
}

.diagnostic-card {
  background: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0 2px 8px #0001;
  border: 1px solid #e0e0e0;
}
.diagnostic-card .badge {
  font-size: 0.9em;
}
.diagnostic-card strong {
  font-weight: 600;
}
.diagnostic-card + .diagnostic-card {
  margin-top: 10px;
}
</style>