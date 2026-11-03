<template>
    <div>
      
      <div class="container-fluid">
        <div class="col-12 mb-5">
        </div>
        <form action="" v-on:submit.prevent="sendFormsOrders()">
          <div class="row align-items-center">
            <div class="col-md-6 col-xl-6">
              <label for="">Nombre</label>
              <input type="text" @input="searchMedicineDescriptionDebounced" @blur="handleBlur" autocomplete="off"
                name="description" v-model="orders.description" class="form-control"
                >
              <ul class="autocompletecode">
                <li v-if="Array.isArray(get)" :key="row.id" v-for="row in get.slice(0, 10)"
                  @mousedown="isSelecting = true"
                  @click="selecClickdescription(row.id, row.code, row.description, row.type_cups, row.type_rips)">
                  <span class="text-busqueda">{{ '(' + row.code + ')' + ' ' + row.description }}</span>
                </li>
              </ul>
            </div>
            <div class="col-md-3 col-xl-4">
              <label for="">Cant.</label>
              <input type="text" class="form-control " 
                name="amount" v-model="orders.amount">
            </div>
            <div class="col-md-1 mt-4">
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
            <div class="table-responsive p-0 mt-5">

              <table class="table table-striped text-center  mb-0 ">
                <thead>
                  <tr>
                    <th class="text-uppercase text-secondary font-weight-bolder opacity-7">Código</th>
                    <th class="text-uppercase text-secondary font-weight-bolder opacity-7">Descr.</th>
                    <th class="text-uppercase text-secondary font-weight-bolder opacity-7"
                      v-if="this.valuetitle != 'PROC'">Cant.</th>
                  </tr>
                </thead>
                <tbody>
                  <tr :key="row.id" v-for="row in getResult">
                    <td class="align-middle"><span>{{ row.code }}</span></td>
                    <td class="align-middle"><span>{{ row.description }}</span></td>
                    <td class="align-middle" v-if="this.valuetitle != 'PROC'"><span>{{ row.amount }}cada</span></td>
                    <td class="align-middle" v-if="this.valuetitle != 'PROC'"><span>{{ row.frequency }}hrs</span></td>
                    <td class="align-middle" v-if="this.valuetitle != 'PROC'"><span>{{ row.days }} dias</span></td>
                    <td class="align-middle" v-if="this.valuetitle != 'PROC'"><span>{{ row.quantity }}</span></td>
                    <td class="align-middle"><span>{{ row.observation }}</span></td>
                    <td class="align-middle" v-if="this.valuetitle != 'SUM'"><span
                        v-if="row.type == 1">Administrados</span> <span v-if="row.type == 2">Usado</span></td>
  
                    <td><input type="checkbox" class="form-check-input mt-3 border" v-model="row.selected"></td>
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
  import ArgonButton from "@/components/ArgonButton.vue";
  //import ArgonButton from "./../../../../components/ArgonButton.vue";
  import { mapActions, mapGetters } from "vuex";
  import Swal from 'sweetalert2'
  import 'sweetalert2/src/sweetalert2.scss'
  //import Loading from '../../Utils/Loading.vue';
  export default {
    name: "formHistory",
    /* props: {
      valuetitle: String,
      valueStatus: Object
    }, */
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
        /* searchservicHistory: this.valueStatus.id,
        searchKeyPatient: this.valueStatus.key_patient, */
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

    components: {
       ArgonButton,
      /*Loading */
    },
  
    async mounted() {
        await this.loadingActive()
        await this.getProcedures()
     
  
    },
    methods: {
      ...mapActions('History', ["SearchOrder", "searchMedicine", "cleadMedicine", "addOrders", "getOrdersHistory", "destroyOrders", "searchSupply", "generateMedicines"]),
      ...mapActions('Procedures', ["getProcedures"]),
      ...mapActions('Cups', ["searchCups", "cleadCups"]),
      debounce(func, wait) {
        let timeout;
        return function (...args) {
          clearTimeout(timeout);
          timeout = setTimeout(() => func.apply(this, args), wait);
        };
      },
      async searchMedicineDescription() {
        if (this.orders.description.length > 3) {
          this.searchValue = this.orders.description;
        
            await this.searchMedicine(this.searchValue);
            this.get = this.getmedicine;  // Asegúrate de que getmedicine sea un array
        
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
        /* this.isLoading = true
        await this.getOrders()
        this.isLoading = false */
      },
      selecClickdescription(id, code, description, type_cups, type_rips) {
        //console.log(id, code, description, type_cups, type_rips)
        this.isSelecting = true;
        this.orders.id_diagnostic = id
        this.orders.description = description
        this.orders.code = code
        this.orders.type_rips = type_cups
        this.orders.type_rips = type_rips
  
        this.isSelecting = false;
        this.get = {}
      },
      clearOrders() {
        this.orders.description = '',
          this.orders.quantity = '',
          this.orders.amount = '',
          this.orders.frequency = '',
          this.orders.type_order = '',
          this.orders.code = '',
          this.orders.type_rips = '',
          this.orders.invoiced = '',
          this.orders.days = '',
          this.orders.observation = ''
        this.orders.type = ''
      },
      clearMsgError() {
        this.msg_error.description = ''
        this.msg_error.frequency = ''
        this.msg_error.days = ''
        this.msg_error.quantity = ''
        this.msg_error.amount = ''
      },
     
      /* async getOrders() {
        this.historyConsulter.keyHistory = this.valueStatus.id
        this.historyConsulter.keyPatient = this.valueStatus.key_patient
        this.historyConsulter.type = this.valuetitle
        await this.getOrdersHistory(this.historyConsulter)
        this.getResult = this.getHistoryOrders
      }, */
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
      handleBlur() {
        setTimeout(() => {
          if (!this.isSelecting && !this.orders.id_diagnostic) {
            // Solo limpiar si no está seleccionando y no hay un diagnóstico seleccionado
            this.clearOrders();
            this.get = {};
          }
        }, 200); // Retraso para asegurar que el click en la lista se registre
      }
    },
    created() {
      this.isSelecting = false;  // Inicializamos la bandera
      this.searchMedicineDescriptionDebounced = this.debounce(this.searchMedicineDescription, 300); // Retraso de 300ms
    },
    computed: {
      ...mapGetters('History', ['gethistory', 'getmedicine', 'getHistoryOrders', 'getsupply']),
      ...mapGetters('Cups', ['getCups']),
      ...mapGetters('Procedures', ['procedureGet'])
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
  }
  
  ul.autocompletecode>li {
    padding: 5px 10px;
    border-bottom: 1px solid #ccc;
    cursor: pointer;
  }
  
  ul.autocompletecode>li:hover {
    background: #d2d2d24d;
  }
  
  ul.autocompletedescription {
    position: absolute;
    list-style: none;
    margin: 0;
    padding: 0;
    width: 50%;
    z-index: 101;
    background-color: white;
  }
  
  ul.autocompletedescription>li {
    padding: 5px 10px;
    border-bottom: 1px solid #ccc;
    cursor: pointer;
  }
  
  th,
  td {
    font-size: 11px;
  }
  
  ul.autocompletedescription>li:hover {
    background: #d2d2d24d;
  }
  </style>