<template>
  <div>
    <div class="container-fluid">
      <form action="" class="" v-on:submit.prevent="sendFormsOrders()">
        <div class="row mb-5">
          <!-- Tipo de servicio -->
          <div class="col-12 col-md-6 mb-3 mb-md-0">
            <label class="form-control-label">Tipo de servicio:</label>
            <select name="key_type_service" class="form-select form-select-sm"
              :disabled="valueStatus.key_status == 5 || valueStatus.key_status == 4"
              v-model="dataOrders.key_type_service">
              <option value="" selected>Seleccionar</option>
              <option value="1">Traslado</option>
              <option value="2">Remisión</option>
              <option value="3">Certificado médico</option>
            </select>
          </div>
          <!-- Observaciones -->
          <div class="col-12 col-md-6 mb-3 mb-md-0">
            <label class="form-control-label">Observaciones:</label>
            <input name="observations_type_services" class="form-control form-control-sm"
              :disabled="valueStatus.key_status == 5 || valueStatus.key_status == 4"
              v-model="dataOrders.observations_type_services" placeholder="Observaciones">
          </div>
          <!-- Botón guardar -->
          <div class="col-12 text-end mt-3" v-if="valueStatus.key_status === 3">
            <argon-button type="submit" color="success" :disabled="spiner === true" size="sm" class="ms-auto mt-3">
              <span v-if="spiner === false">Guardar</span>
              <div class="d-flex align-items-center" v-if="spiner === true">
                <div class="spinner-border ms-auto sm" role="status" aria-hidden="true"></div>
              </div>
            </argon-button>
          </div>
          <!-- Tabla de historial en escritorio, tarjetas en móvil -->
          <div class="col-12">
            <!-- Escritorio: tabla -->
            <div class="table-responsive mt-5 d-none d-md-block">
              <table class="table text-center">
                <thead>
                  <tr>
                    <th scope="col">Fecha</th>
                    <th scope="col">Tipo de servicio</th>
                    <th scope="col">Observaciones</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="row in valueStatus.get_type_services_history" :key="row.id">
                    <td>{{ moment(row.created_at).format('DD/MM/YYYY') }}</td>
                    <td>{{ row.type_service ? row.type_service.name : 'N/A' }}</td>
                    <td>{{ row.observations_type_services }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!-- Móvil: tarjetas -->
            <div class="d-block d-md-none mt-4" style="max-height: 300px; overflow-y: auto;">
              <div class="accordion" id="ordersAccordion">
                <div v-for="row in valueStatus.get_type_services_history" :key="row.id"
                  class="accordion-item mb-2"
                  style="border-radius: 10px; overflow: hidden; box-shadow: 0 2px 8px #0001;">
                  <h2 class="accordion-header" :id="'heading-' + row.id">
                    <button class="accordion-button collapsed py-2 px-3" type="button" data-bs-toggle="collapse"
                      :data-bs-target="'#collapse-' + row.id" aria-expanded="false"
                      :aria-controls="'collapse-' + row.id" style="background: #f8f9fa;">
                      <span>
                        <strong class="text-primary">Fecha:</strong>
                        <span class="ms-2">{{ moment(row.created_at).format('DD/MM/YYYY') }}</span>
                        <span class="ms-3"><strong class="text-primary">Tipo:</strong> {{ row.type_service ?
                          row.type_service.name : 'N/A' }}</span>
                      </span>
                    </button>
                  </h2>
                  <div :id="'collapse-' + row.id" class="accordion-collapse collapse"
                    :aria-labelledby="'heading-' + row.id" data-bs-parent="#ordersAccordion">
                    <div class="accordion-body py-2 px-3">
                      <div class="mb-1">
                        <strong class="text-primary">Fecha:</strong>
                        <span class="ms-2">{{ moment(row.created_at).format('DD/MM/YYYY') }}</span>
                      </div>
                      <div class="mb-1">
                        <strong class="text-primary">Tipo de servicio:</strong>
                        <span class="ms-2">{{ row.type_service ? row.type_service.name : 'N/A' }}</span>
                      </div>
                      <div>
                        <strong class="text-primary">Observaciones:</strong>
                        <span class="ms-2">{{ row.observations_type_services }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr>

          </div>
          <div class="row">
            <div class="col-12">
              <h6 class="text-secondary">CITA DE CONTROL</h6>
            </div>
            <div class="col-md-6" v-if="dataOrders">
              <BaseInput
                :disabled="this.valueStatus.key_request_order === 2 || this.valueStatus.key_status === 5 || this.valueStatus.key_status === 4"
                name="date_control" v-model="dataOrders.date_control" label="FECHA:" type="date" />
            </div>
            <div class="col-md-6" v-if="dataOrders">
              <BaseSelect id="listProduct" label="MODALIDAD:" placeholder="Seleccionar" :options="listProduct"
                v-model="dataOrders.modality_date_control" :error="errors?.modality_date_control" />
            </div>
          </div>
        </div>

      </form>
      <ul class="nav nav-tabs nav-fill flex-nowrap" id="myTab" role="tablist" style="overflow-x: auto;">
        <li class="nav-item" role="presentation">
          <button class="nav-link active" id="focused-tab" data-bs-toggle="tab" data-bs-target="#focused" type="button"
            role="tab" aria-controls="focused" aria-selected="true">Medicamentos <br> focalizado</button>
        </li>
        <li class="nav-item" role="presentation">
          <button class="nav-link" id="procedureFocused-tab" data-bs-toggle="tab" data-bs-target="#procedureFocused"
            type="button" role="tab" aria-controls="procedureFocused" aria-selected="true">Procedimientos <br>
            focalizado</button>
        </li>
        <li class="nav-item" role="presentation">
          <button class="nav-link" id="drugsupplies-tab" data-bs-toggle="tab" data-bs-target="#drugsupplies"
            type="button" role="tab" aria-controls="drugsupplies" aria-selected="false">Medicamentos <br> en
            farmacia</button>
        </li>
        <li class="nav-item" role="presentation">
          <button class="nav-link" id="cups-tab" data-bs-toggle="tab" data-bs-target="#cups" type="button" role="tab"
            aria-controls="cups" aria-selected="false">Ordenes <br> procedimientos</button>
        </li>
        <li class="nav-item" role="presentation">
          <button class="nav-link" id="procedures-tab" data-bs-toggle="tab" data-bs-target="#procedures" type="button"
            role="tab" aria-controls="procedures" aria-selected="false">Orden <br> consentimiento</button>
        </li>
        <li class="nav-item" role="presentation">
          <button class="nav-link" id="disabilities-tab" data-bs-toggle="tab" data-bs-target="#disabilities"
            type="button" role="tab" aria-controls="disabilities" aria-selected="false">Ordenes <br>
            incapacidades</button>
        </li>
      </ul>
      <div class="tab-content  p-4" id="myTabContent" style="background: #CFFFE1;">
        <div class="tab-pane fade show active" id="focused" role="tabpanel" aria-labelledby="focused-tab">
          <viewFormfocused :valueStatus="valueStatus" :valuetitle="medicinesFoc" />
        </div>
        <div class="tab-pane fade" id="procedureFocused" role="tabpanel" aria-labelledby="procedureFocused-tab">
          <procedureFormfocused :valueStatus="valueStatus" :valuetitle="ProFoc" />
        </div>
        <div class="tab-pane fade" id="drugsupplies" role="tabpanel" aria-labelledby="drugsupplies-tab">
          <viewFormmedicides :valueStatus="valueStatus" :valuetitle="medicines" />
        </div>
        <div class="tab-pane fade" id="cups" role="tabpanel" aria-labelledby="cups-tab">
          <viewCups :valueStatus="valueStatus" :valuetitle="cups" />
        </div>
        <div class="tab-pane fade" id="procedures" role="tabpanel" aria-labelledby="procedures-tab">
          <viewProcedures :valueStatus="valueStatus" :valuetitle="procedures" />
        </div>
        <div class="tab-pane fade" id="disabilities" role="tabpanel" aria-labelledby="disabilities-tab">
          <viewImcapacities :valueStatus="valueStatus" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import viewFormmedicides from "./orders/formMedicines.vue"
import viewImcapacities from "./orders/formimcapacities.vue"
import viewProcedures from "./orders/formprocedure.vue"
import procedureFormfocused from "./orders/formProcedureFocused.vue"
import viewFormfocused from "./orders/formfocused.vue"
import viewCups from "./orders/formcups.vue"
import ArgonButton from "@/components/ArgonButton.vue";
import { mapActions, mapGetters } from "vuex";
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'
import moment from "moment"
import BaseInput from "../utilsComponents/BaseInput.vue";
import BaseSelect from "../utilsComponents/BaseSelect.vue"
export default {
  name: "formHistory",
  props: {
    valueStatus: Object
  },
  data() {
    return {
      userValidate: {},
      dataOrders: {
        key_type_service: '',
        IDHistory: '',
        observations_type_services: '',
        date_control: '',
        modality_date_control: '',
      },
      spiner: false,
      showMenu: false,
      medicines: 'MED',
      medicinesFoc: 'MEDFOC',
      drugsupplies: 'SUM',
      procedures: 'PROC',
      cups: 'PROC',
      disabilities: 'INCAP',
      focused: 'FOC',
      ProFoc: 'PROFOC',
      searchservicHistory: this.valueStatus.id,
      searchKeyPatient: this.valueStatus.key_patient,
    };

  },

  components: {
    viewFormmedicides,
    viewImcapacities,
    ArgonButton,
    viewProcedures,
    viewCups,
    viewFormfocused,
    procedureFormfocused,
    BaseInput,
    BaseSelect
  },

  async mounted() {
    this.getProduct();
    this.$store.state.isAbsolute = true;
    if (this.valueStatus.id !== '' && this.valueStatus.id !== null && this.valueStatus.id !== undefined) {
      //await this.getStoreserviceOrder()
      await this.gteTypeService()
      this.dataOrders.date_control = this.valueStatus.date_control
      this.dataOrders.modality_date_control = this.valueStatus.modality_date_control
    }
  },
  methods: {
    ...mapActions('History', ["SearchOrder", "addTypeService", "gteTypeService", "addOrders"]),
    ...mapActions("ContentConsultations", [
      "getProduct",
    ]),
    moment,
    async getStoreserviceOrder() {
      if (this.valueStatus.id != undefined) {
        const searchOrder = {
          keyHistory: this.valueStatus.id,
          keyPatient: this.searchKeyPatient
        }
        await this.SearchOrder(searchOrder)
      }
    },
    async sendFormsOrders() {
      this.dataOrders.IDHistory = this.valueStatus.id
      this.spiner = true
      const response = await this.addTypeService(this.dataOrders)
      if (response) {
        setTimeout(() => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Datos agregado con exito',
            showConfirmButton: false,
            timer: 1500
          })
          this.spiner = false
          //await this.getStoreserviceOrder()
          this.$emit('saved');
        }, 1600); // Retraso de 1.6 segundos para que la primera notificación se vea correctamente
      } else {
        this.spiner = false
        Swal.fire({
          icon: 'error',
          title: 'Lo siento, los datos no se pudieron agregar',
          text: 'Inténtalo de nuevo',
        })
      }
    },
  },
  computed: {
    ...mapGetters('History', ['gethistory', 'getRemission', 'getTypeServices']),
    ...mapGetters("ContentConsultations", ["listProduct"]),
  }
};
</script>

<style scoped>
@media (max-width: 767px) {
  .card {
    border-radius: 10px;
    box-shadow: 0 2px 8px #0001;
    background: #f8f9fa;
    margin-bottom: 10px;
  }

  .card strong {
    font-weight: 600;
    font-size: 1rem;
  }

  .card span {
    font-size: 0.98rem;
  }

  .form-control,
  .form-select {
    font-size: 1rem !important;
    min-height: 42px;
  }

  label.form-control-label {
    font-size: 1rem !important;
    margin-bottom: 4px;
    margin-top: 10px;
  }
}

.nav-tabs .nav-link.active,
.nav-tabs .nav-item.show .nav-link {
  background-color: #CFFFE1 !important;
  color: #222 !important;
  border-color: #dee2e6 #dee2e6 #fff;
}
</style>