<template>
  <div>
    <Loading v-if="this.isLoading" :valuetitle="title" />
    <div class="" v-else>
      <form action="" v-on:submit.prevent="sendFormsOrders()" @keydown.enter.prevent>
        <div class="row align-items-center">
          <div class="col-md-3">
            <label for="">Nombre del Consentimiento</label>
            <select class="form-select" name="key_procedure" v-model="orders.key_procedure"
              :disabled="validateStatus(valueStatus.key_status, disclaimer)">
              <option v-for="option in procedureGet" :key="option.id" :value="option.id">{{ option.name }}</option>
            </select>
          </div>
          <div class="col-md-3">
            <label for="">Observaciones</label>
            <input type="text" class="form-control"
              :disabled="validateStatus(valueStatus.key_status, disclaimer)" name="observation"
              v-model="orders.observation">
          </div>
          <div class="col-md-3">
            <label for="">Aplicacion del consentimiento</label>
            <select class="form-select" :disabled="validateStatus(valueStatus.key_status, disclaimer)" v-model="orders.application_consent" name="application_consent">
              <option :value="true">aceptar</option>
              <option :value="false">desistir</option>
            </select>
          </div>
          <div class="col-md-3 mt-4" v-if="(valueStatus.key_status != 5 || valueStatus.key_status != 4 || disclaimer == 4 || disclaimer == 5)">
            <argon-button type="submit" color="success" :disabled="spiner === true" class="ms-auto">
              <span v-if="spiner === false"><i class="fa fa-plus" aria-hidden="true"></i></span>
              <div class="d-flex align-items-center" v-if="spiner === true">
                <div class="spinner-border ms-auto" role="status" aria-hidden="true"></div>
              </div>
            </argon-button>
          </div>
          <div class="col-12 mt-5">
            <b-alert v-if="msg_error.description" class="text-danger" variant="danger" show>{{ msg_error.description }}</b-alert>
            <b-alert v-if="msg_error.frequency" class="text-danger" variant="danger" show>{{ msg_error.frequency }}</b-alert>
            <b-alert v-if="msg_error.days" class="text-danger" variant="danger" show>{{ msg_error.days }}</b-alert>
            <b-alert v-if="msg_error.quantity" class="text-danger" variant="danger" show>{{ msg_error.quantity }}</b-alert>
            <b-alert v-if="msg_error.amount" class="text-danger" variant="danger" show>{{ msg_error.amount }}</b-alert>
          </div>
        </div>
      </form>
      <div class="row">
        <div class="col-md-12">
          <!-- Vista de tarjetas para móviles -->
          <div class="row mt-4 d-md-none">
            <div class="col-12 col-md-6 col-lg-4 mb-4" v-for="row in getProceduresHistory" :key="row.id">
              <div class="card h-100 shadow-lg bg-body rounded card-content-history">
                <div class="card-body">
                  <h5 class="card-title">{{ row.procedure.name }}</h5>
                  <p class="card-text">
                    <strong>Descripción:</strong> {{ row.procedure.description.slice(0, 50) }}....<br>
                    <strong>Observaciones:</strong> {{ row.observation }}
                  </p>
                  <button type="button" v-if="valueStatus.key_status == 3"
                    class="text-secondary font-weight-bold text-xs btn btn-sm p-1 btn-outline-danger mt-2 me-2"
                    @click="deleteProcedure(row.id)"><i class="fa fa-trash" aria-hidden="true"></i></button>
                </div>
              </div>
            </div>
            <div class="col-12" v-if="this.getProceduresHistory == ''"> No tenemos resultados</div>
          </div>

          <!-- Vista de tabla para pantallas grandes -->
          <div class="table-responsive p-0 mt-5 d-none d-md-block">
            <table class="table table-striped text-center mb-0">
              <thead style="background-color: #C8E4FF;">
                <tr>
                  <th class="text-uppercase text-black font-weight-bolder">Nombre</th>
                  <th class="text-uppercase text-black font-weight-bolder">Descripción</th>
                  <th class="text-uppercase text-black font-weight-bolder">Observaciones</th>
                  <th class="text-uppercase text-black font-weight-bolder">Aplicacion del consentimiento</th>
                  <th class="text-uppercase text-black font-weight-bolder"></th>
                </tr>
              </thead>
              <tbody>
                <tr :key="row.id" v-for="row in getProceduresHistory">
                  <td class="align-middle">{{ row.procedure.name }}</td>
                  <td class="align-middle">{{ row.procedure.description.slice(0, 50) }}....</td>
                  <td class="align-middle">{{ row.observation }}</td>
                  <td class="align-middle" v-if="row.confirm_patient === 1">Aceptada</td>
                  <td class="align-middle" v-else>Desistio</td>
                  <td>
                    <button type="button" v-if="valueStatus.key_status == 3"
                      class="text-secondary font-weight-bold text-xs btn btn-sm p-1 btn-outline-danger mt-2 me-2"
                      @click="deleteProcedure(row.id)"><i class="fa fa-trash" aria-hidden="true"></i></button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ArgonButton from "./../../../../components/ArgonButton.vue";
import { mapActions, mapGetters } from "vuex";
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'
import Loading from '../../Utils/Loading.vue';
export default {
    name: "formHistory",
    props: {
        valuetitle: String,
        valueStatus: Object,
        disclaimer: String
    },
    data() {
        return {
            orderNumbers: [1],
            orders: {
                key_procedure: '',
                IDHistory: '',
                IDPatient: '',
                observation: '',
                application_consent: true
            },
            msg_error: {
                description: '',
                IDHistory: '',
                IDPatient: '',
                observation: '',
            },
            searchservicHistory: this.valueStatus.id,
            searchKeyPatient: this.valueStatus.key_patient,
            spiner: false,
            show: false,
            historyConsulter: {
                keyHistory: '',
                keyPatient: '',
                type: 0
            },
            contentFocused: {}, 
            KeyID: '',
            get: {},
            getResult: {},
            selectedMedicines: [],
            isLoading: true,
            title: 'Ordenes',
        }
    },
    components: {
        ArgonButton,
        Loading
    },
    async mounted() {
        if (this.valueStatus.id !== '' || this.valueStatus.id !== null || this.valueStatus.id !== undefined) {
            await this.loadingActive()
            await this.getProcedures()
        }
    },
    methods: {
        ...mapActions('History', ["SearchOrder", "searchMedicine", "searchProcedure", "cleadMedicine", "addProcedure", "getOrdersHistory", "destroyPro", "searchSupply", "generateMedicines"]),
        ...mapActions('Procedures', ["getProcedures"]),
        async loadingActive() {
            this.isLoading = true
            await this.searchProcedure(this.valueStatus.id)
            this.isLoading = false
        },
        selecClickdescription() {
            //console.log("🚀 ~ selecClickdescription ~ data:",this.contentFocused)
            this.isSelecting = true;
            this.orders.description = this.contentFocused.description
            this.orders.code = this.contentFocused.reference
            this.isSelecting = false;
        },
        clearMsgError() {
            this.msg_error.description = ''
            this.msg_error.frequency = ''
            this.msg_error.days = ''
            this.msg_error.quantity = ''
            this.msg_error.amount = ''
        },
        async sendFormsOrders() {

            this.orders.IDHistory = this.valueStatus.id
            this.orders.IDPatient = this.valueStatus.key_patient
            this.orders.type_order = this.valuetitle
            this.orders.key_procedure = this.orders.key_procedure
            if (this.orders.key_procedure === '') {
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'Debes agregar un procedimiento',
                    showConfirmButton: false,
                    timer: 1500
                })
                return
            }
            if (this.orders.observation === '') {
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'Debes agregar una observacion',
                    showConfirmButton: false,
                    timer: 1500
                })
                return
            }
            this.orders.IDHistory = this.valueStatus.id
            this.orders.IDPatient = this.valueStatus.key_patient
            this.orders.type_order = this.valuetitle
            this.orders.key_procedure = this.orders.key_procedure
            this.spiner = true
            const response = await this.addProcedure(this.orders)
            if (response) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Datos agregado con exito',
                    showConfirmButton: false,
                    timer: 1500
                })
                this.spiner = false
                await this.clearProcedure()
                await this.searchProcedure(this.valueStatus.id)
            }
            if (response.status === false) {
                this.spiner = false
                var title = ''
                const errors = response.errors
                for (const key in errors) {
                    const element = errors[key];
                    element.map((error) => {
                        title = error + ' <br/>' + title
                    })
                }
                Swal.fire({
                    icon: 'error',
                    title: title,
                    text: 'Intentalo de nuevo',
                })
            }
        },
        clearProcedure() {
            this.orders.key_procedure = ''
            this.orders.observation = ''
        },
        deleteProcedure(id) {
            Swal.fire({
                title: '¿Está seguro que lo deseas eliminar?',
                text: "¡No podrás revertir esto!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: '¡Sí, bórralo!'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.KeyID = id
                    const response = this.destroyPro(this.KeyID)
                    if (response) {
                        Swal.fire(
                            '¡Eliminado!',
                            'El dato ha sido eliminado.',
                            'success'
                        )
                        this.searchProcedure(this.valueStatus.id)
                    } else {
                        Swal.fire(
                            '¡Lo siento!',
                            'El dato no puede ser eliminado.',
                            'error'
                        )
                    }
                }
            })
        },
        validateStatus(status, disclaimer) {
            if (status == 3) {
                return false;
            }
            if (!disclaimer) {
                return true;
            }
            if (status == 5) {
                return false
            }
            if (status == 4 && !disclaimer) {
                return false
            }
            if (disclaimer == 4 || disclaimer == 5) {
                return false
            }
            return true
            }
    },
    computed: {
        ...mapGetters('History', ['gethistory', 'getmedicine', 'getHistoryOrders', 'getsupply', 'getProceduresHistory']),
        ...mapGetters('Procedures', ['procedureGet'])
    }
};
</script>
