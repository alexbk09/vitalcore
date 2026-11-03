<template>
    <div>
      <Loading v-if="this.isLoading" :valuetitle="title" />
      <div class="" v-else>
        <form action="" v-on:submit.prevent="sendFormsOrders()" @keydown.enter.prevent>
          <div class="row align-items-center">
            <div class="col-md-6 col-xl-5 p-0">
              <label for="">Nombre</label>
              <select @input="searchMedicineDescription" autocomplete="off" name="description" @change="selecClickdescription"
                v-model="contentFocused" class="form-select "
                :disabled="validateStatus(valueStatus.key_status, disclaimer)">
                <option :value="Seleccione" selected>Seleccione</option>
                <option :value="row" :key="row.id" v-for="row in listProduct" >{{ '(' + row.code + ')' + ' ' + truncateText(row.description, 80) }}</option>
              </select>
            </div>
            <div class="col-md-3 col-xl-2 p-0" v-if="this.valuetitle != 'PROC'">
              <label for="">Cant T.</label>
              <input type="text" class="form-control " :readonly="this.valuetitle == 'PROC'"
                :disabled="validateStatus(valueStatus.key_status, disclaimer)" name="quantity"
                v-model="orders.quantity">
            </div>
            <div class="col-md-6 col-xl-4 p-0">
              <label for="">Observaciones</label>
              <input type="text" class="form-control "
                :disabled="validateStatus(valueStatus.key_status, disclaimer)" name="observation"
                v-model="orders.observation">
            </div>
            <div class="col-md-1 mt-4 p-0" v-if="(valueStatus.key_status != 5 || valueStatus.key_status != 4 || disclaimer == 4 || disclaimer == 5)">
              <argon-button type="submit" color="success " :disabled="spiner === true" class="ms-auto">
                <span v-if="spiner === false"><i class="fa fa-plus" aria-hidden="true"></i></span>
                <div class="d-flex align-items-center" v-if="spiner === true">
                  <div class="spinner-border ms-auto" role="status" aria-hidden="true"></div>
                </div>
              </argon-button>
            </div>
            <div class="col-12  mt-5">
              <b-alert v-if="msg_error.description" class="text-danger" variant="danger" show>{{
                msg_error.description }}</b-alert>
              <b-alert v-if="msg_error.frequency" class="text-danger" variant="danger" show>{{
                msg_error.frequency }}</b-alert>
              <b-alert v-if="msg_error.days" class="text-danger" variant="danger" show>{{ msg_error.days }}</b-alert>
              <b-alert v-if="msg_error.quantity" class="text-danger" variant="danger" show>{{ msg_error.quantity
                }}</b-alert>
              <b-alert v-if="msg_error.amount" class="text-danger" variant="danger" show>{{ msg_error.amount }}</b-alert>
            </div>
          </div>
        </form>
        <div class="row">
          <div class="col-md-12">
            <!-- Vista de tarjetas para móviles -->
            <div class="row mt-4 d-md-none">
              <div class="col-12 col-md-6 col-lg-4 mb-4" v-for="row in getResult" :key="row.id">
                <div class="card h-100 shadow-lg bg-body rounded card-content-history">
                  <div class="card-body">
                    <h5 class="card-title">{{ row.code }}</h5>
                    <p class="card-text">
                      <strong>Descripción:</strong> {{ truncateText(row.description, 30) }}<br>
                      <strong v-if="this.valuetitle != 'PROC'">Cantidad Total:</strong> <span v-if="this.valuetitle != 'PROC'">{{ row.quantity }}</span><br>
                      <strong>Observaciones:</strong> {{ row.observation }}
                    </p>
                    <div class="form-check">
                      <input type="checkbox" class="form-check-input" v-model="row.selected">
                      <label class="form-check-label">Seleccionar</label>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-12" v-if="this.getResult == ''"> No tenemos resultados</div>
            </div>
  
            <!-- Vista de tabla para pantallas grandes -->
            <div class="table-responsive p-0 mt-5 d-none d-md-block">
              <table class="table table-striped text-center mb-0">
                <thead style="background-color: #C8E4FF">
                  <tr>
                    <th class="text-uppercase text-black font-weight-bolder">Codigo</th>
                    <th class="text-uppercase text-black font-weight-bolder">Descr.</th>
                    <th class="text-uppercase text-black font-weight-bolder"
                      v-if="this.valuetitle != 'PROC'">Cant T</th>
                    <th class="text-uppercase text-black font-weight-bolder">Obs.</th>
                    <th class="text-uppercase text-black font-weight-bolder"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr :key="row.id" v-for="row in getResult">
                    <td class="align-middle"><span>{{ row.code }}</span></td>
                    <td class="align-middle"><span>{{ truncateText(row.description, 30) }}</span></td>
                    
                    <td class="align-middle" v-if="this.valuetitle != 'PROC'"><span>{{ row.quantity }}</span></td>
                    <td class="align-middle"><span>{{ row.observation }}</span></td>
                    
                    <td><input type="checkbox" class="form-check-input mt-3 border" v-model="row.selected"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {{ this.valueStatus.contracted_id }}
    </div>
  </template>
  <script>
  /* import ArgonButton from "@/components/ArgonButton.vue"; */
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
          description: '',
          quantity: 0,
          frequency: 0,
          days: 0,
          amount: 0,
          type_order: '',
          code: '',
          type_rips: '',
          invoiced: 0,
          id: '',
          IDHistory: '',
          IDPatient: '',
          observation: '',
          nroOrders: '',
          type: 0,
        },
        contentFocused: "Seleccionar...",
        msg_error: {
          description: '',
          quantity: '',
          frequency: 0,
          days: '',
          amount: '',
          type_order: '',
          code: '',
          type_rips: '',
          invoiced: '',
          id: '',
          IDHistory: '',
          IDPatient: '',
          observation: '',
        },
        searchservicHistory: this.valueStatus.id,
        searchKeyPatient: this.valueStatus.key_patient,
        searchContractedId: this.valueStatus.contracted_id,
        spiner: false,
        show: false,
  
        historyConsulter: {
          keyHistory: '',
          keyPatient: '',
          type: 0
        },
        KeyID: '',
        get: {},
        getResult: {},
        selectedMedicines: [],
        isLoading: true,
        title: 'Ordenes',
      }
  
    },
    /*   watch: {
        valueStatus: {
          immediate: true,
          handler(newValue) {
            if (newValue) {
              this.getOrders();
            }
          }
        }
      }, */
    components: {
      ArgonButton,
      Loading
    },
  
    async mounted() {
      if (this.valueStatus.id !== '' || this.valueStatus.id !== null || this.valueStatus.id !== undefined) {
        await this.loadingActive()
        //await this.getProcedures()
      }
      //Qqthis.procedureFodicalized()
      //Qqthis.getProduct(this.valueStatus.get_trade_agreement.id_transfer)
      this.getProductData(this.valueStatus.contracted_id)
  
    },
    methods: {
      ...mapActions('History', ["SearchOrder", "searchMedicine", "cleadMedicine", "addOrders", "getOrdersHistory", "destroyOrders", "searchSupply", "generateMedicines","procedureFodicalized"]),
      ...mapActions('Procedures', ["getProcedures"]),
      ...mapActions('Cups', ["searchCups", "cleadCups"]),
      ...mapActions("TradeAgreement", ["getProductData"]),
      async searchMedicineDescription() {
  
        if (this.orders.description.length > 3) {
          this.searchValue = this.orders.description
          if (this.valuetitle === 'MED') {
            await this.searchMedicine(this.searchValue)
            this.get = this.getmedicine
          }
          if (this.valuetitle === 'SUM') {
            await this.searchMedicine(this.searchValue)
            this.get = this.getmedicine
          }
          if (this.valuetitle === 'PROFOC') {
            await this.searchCups(this.searchValue)
            this.get = this.getCups
          }
        }
      },
      /* calculateQty() {
        this.orders.quantity = this.orders.days * this.orders.frequency
      }, */
      async generarMedicine() {
  
        const selectedIds = [];
        this.getResult.forEach(row => {
          if (row.selected) {
            selectedIds.push(row.id);
          }/* 
                console.log("🚀 ~ addMedicine ~ this.selectedMedicines:", selectedIds) */
        })
        const searchHistory = {
          keyHistory: this.searchservicHistory,
          keyPatient: this.searchKeyPatient,
          IDMedicine: [
            ...selectedIds
          ]
        };
        this.generateMedicines(searchHistory);
      },
      calculateQty() {
        if (this.orders.frequency > 0 && this.orders.days > 0 && this.orders.amount > 0) {
          const pastillasPorDia = Math.round(24 / this.orders.frequency);
          const totalPastillas = pastillasPorDia * this.orders.days * this.orders.amount;
          this.orders.quantity = totalPastillas;
        }
      },
      addOrderNumber() {
        const newOrderNumber = this.orderNumbers.length + 1;
        this.orderNumbers.push(newOrderNumber);
      },
      async loadingActive() {
        this.isLoading = true
        await this.getOrders()
        this.isLoading = false
      },
      selecClickdescription() {
        //console.log("🚀 ~ selecClickdescription ~ data:",this.contentFocused)
        this.isSelecting = true;
        this.orders.description = this.contentFocused.description
        this.orders.code = this.contentFocused.code
        this.isSelecting = false;
      },
      clearOrders() {
        this.orders.description = '',
          this.orders.quantity = 0,
          this.orders.amount = 0,
          this.orders.frequency = 0,
          this.orders.type_order = '',
          this.orders.code = '',
          this.orders.type_rips = '',
          this.orders.invoiced = 0,
          this.orders.days = 0,
          this.orders.observation = ''
        this.orders.type = 0
      },
      clearMsgError() {
        this.msg_error.description = ''
        this.msg_error.frequency = ''
        this.msg_error.days = ''
        this.msg_error.quantity = ''
        this.msg_error.amount = ''
      },
      async sendFormsOrders() {
        if (this.orders.type_order === 'MED') {
          this.orders.type_rips = 'AM'
        }
        this.clearMsgError()
        if (!this.$validatePropertyEmpty(this.orders.description)) {
          this.msg_error.description = "El nombre es obligatorio"
          return false
        }
        if (this.valuetitle === 'MED') {
          if (!this.$validatePropertyEmpty(this.orders.frequency)) {
            this.msg_error.frequency = "La frecuencia es obligatoria"
            return false
          }
          if (!this.$validatePropertyEmpty(this.orders.days) && this.valuetitle != 'PROC') {
            this.msg_error.days = "Los dias es obligatorio"
            return false
          }
        }
        if (!this.$validatePropertyEmpty(this.orders.quantity) && this.valuetitle != 'PROC') {
          this.msg_error.quantity = "La cantidad es obligatoria"
          return false
        }
        /* if (!this.$validatePropertyEmpty(this.orders.amount) && this.valuetitle != 'PROC') {
          this.msg_error.amount = "Total es obligatorio"
          return false
        } */
        this.orders.IDHistory = this.searchservicHistory
        this.orders.IDPatient = this.searchKeyPatient
        this.orders.type_order = this.valuetitle
        this.spiner = true
        const response = await this.addOrders(this.orders)
        if (response) {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Datos agregado con exito',
            showConfirmButton: false,
            timer: 1500
          })
          this.spiner = false
          this.contentFocused = ''
          await this.clearOrders()
          await this.getOrders()
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
      async getOrders() {
        this.historyConsulter.keyHistory = this.valueStatus.id
        this.historyConsulter.keyPatient = this.valueStatus.key_patient
        this.historyConsulter.type = this.valuetitle
        await this.getOrdersHistory(this.historyConsulter)
        this.getResult = this.getHistoryOrders
      },
      deleteOrdes(id) {
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
            const response = this.destroyOrders(this.KeyID)
            Swal.fire(
              '¡Eliminado!'
            )
            if (response) {
              this.getOrders()
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
            },
      truncateText(text, length) {
        return text.length > length ? text.substring(0, length) + '...' : text;
      }
    },
    computed: {
      ...mapGetters('History', ['gethistory', 'getmedicine', 'getHistoryOrders', 'getsupply','getProcedureFodicalized']),
      ...mapGetters('Cups', ['getCups']),
      ...mapGetters('Procedures', ['procedureGet']),
      /* ...mapGetters('Agreements', ['getProductData']), */
      ...mapGetters("TradeAgreement", ["listProduct"]),
    }
  };
  </script>
  <style>
ul.autocompletecode {
  position: absolute;
  list-style: none;
  margin: 0;
  padding: 0;
  width: 50%;
  z-index: 101;
  background-color: white;
  max-height: 200px; /* Altura máxima para la lista */
  overflow-y: auto; /* Habilitar desplazamiento vertical */
}

ul.autocompletecode>li {
  padding: 5px 10px;
  border-bottom: 1px solid #ccc;
  cursor: pointer;
}

ul.autocompletecode>li:hover {
  background: #d2d2d24d;
}
  
  th,
  td {
    font-size: 11px;
  }
  
  ul.autocompletedescription>li:hover {
    background: #d2d2d24d;
  }
  </style>