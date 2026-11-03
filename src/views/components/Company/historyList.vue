<script>
import { mapActions,mapGetters } from 'vuex';
import moment from 'moment'
//import auth from './../../../../auth/auth'
/* import ArgonButton from "@/components/ArgonButton.vue"; */
import Swal from 'sweetalert2'
import Loading from '../Utils/Loading.vue';
import 'sweetalert2/src/sweetalert2.scss'
export default {
        name:'HistoryList',
        data() {
          return {
                stateModal: false,
                document:'',
                key_trade_agreement:'',
                key_mission_company:'',
                start_date:'',
                end_date:'',
                agreements:'',
                service:{
                    id:'',
                    company:'',
                    id_mision:''
                },
                fecha: '',
                hora: '',
                ids: [1, 2, 3], // Aquí puedes agregar los IDs que recibas
                showModal: null,
                historyState:'',
                state:{
                    id_history:'',
                    state:'',
                    text:'CONFIRMAR LLEGADA'
                },
                isLoading: true,
                title:'Ordenes',
                
            }
        },
        created() {
            this.actualizarFechaHora();
            // Actualizar fecha y hora cada segundo
            setInterval(this.actualizarFechaHora, 1000);
        },
        methods: {
          ...mapActions('ServiceOrder',["get","search","searchCompany","getCompany","cleadCompany","updateState"]),
          ...mapActions('Agreements',["getagreement","getgeoreferencing"]),
          ...mapActions('History',["generatePdf","generateDiagnosis","generateMedicines","generateRemisions","generateIncapacities"]),
          Update(updateorder,key_patient){
            this.$router.push('/add/serviceOrder/'+updateorder+'/'+key_patient)
          },
          async generar(history, patient) {
    if (history !== undefined) {
        const searchHistory = {
            keyHistory: history,
            keyPatient: patient
        };

        // Mostrar SweetAlert2 mientras se genera el PDF
        Swal.fire({
            title: 'Generando PDF',
            html: 'Por favor, espera un momento...',
            allowOutsideClick: false,
            allowEscapeKey: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        try {

            await new Promise(resolve => setTimeout(resolve, 2000));

            await this.generatePdf(searchHistory);

            Swal.close();
        } catch (error) {
            // En caso de error, mostrar una alerta de error
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Ocurrió un error al generar el PDF.',
            });
        }
    }
}, 
            async generarDiagnosis(history,patient) {
                if (history != undefined) {
                    const searchHistory = {
                    keyHistory: history,
                    keyPatient: patient
                    }
                    await this.generateDiagnosis(searchHistory)
                }
            },
            async generarMedicine(history,patient) {
                if (history != undefined) {
                    const searchHistory = {
                    keyHistory: history,
                    keyPatient: patient,
                    IDMedicine: []
                    }
                    await this.generateMedicines(searchHistory)
                }
            }, 
            async generarRemison(history,patient) {
                if (history != undefined) {
                    const searchHistory = {
                    keyHistory: history,
                    keyPatient: patient
                    }
                    await this.generateRemisions(searchHistory)
                }
            }, 
            async generarIncapacidad(history,patient) {
                if (history != undefined) {
                    const searchHistory = {
                    keyHistory: history,
                    keyPatient: patient
                    }
                    await this.generateIncapacities(searchHistory)
                }
            },
          async searchOrder(){
            const searchDataFilter = {
                document : this.document,
                key_trade_agreement : this.userValidate.key_trade_agreement,
                key_mission_company : this.key_mission_company,
                start_date : this.start_date,
                end_date : this.end_date
            }
            await this.search(searchDataFilter)
            
          },
          SearchAgreements(){
            this.getCompany(this.userValidate.key_trade_agreement)
        },
        selecClickCompanny(id,name){    
            this.service.company = name
            this.service.id_mision = id
            return
        },
        createHistory(id,key_patient){
            this.sendFormStateHistory(3)
            this.$router.push('/add/formHistory/'+key_patient+'/'+id) 
        },
        createHistoryAttention(id,key_patient){
            this.$router.push('/add/formHistory/'+key_patient+'/'+id) 
        },
        stateHistory(id){
            this.historyState = id
            return
        },
        async sendFormStateHistory(state){

            this.state.id_history = this.historyState
            this.state.state = state
              const response = await this.updateState(this.state)
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Estado Actualizado',
                showConfirmButton: false,
                timer: 1500
              })
                if(response){
                    await this.get();
                }
        },
          async loadingActive(){
             this.isLoading = true 
            await  this.get()
             this.isLoading = false
          },
        moment,
            actualizarFechaHora() {
                const ahora = new Date(); 
                
                // Obtener la fecha
                const dia = ahora.getDate();
                const mes = this.obtenerNombreMes(ahora.getMonth());
                const año = ahora.getFullYear();
                this.fecha = `${dia} de ${mes} de ${año}`;

                // Obtener la hora
                const horas = ahora.getHours();
                const minutos = ahora.getMinutes();
                const segundos = ahora.getSeconds();
                this.hora = `${horas}:${minutos}:${segundos}`;
            },
            obtenerNombreMes(numeroMes) {
            const meses = [
                'enero',
                'febrero',
                'marzo',
                'abril',
                'mayo',
                'junio',
                'julio',
                'agosto',
                'septiembre',
                'octubre',
                'noviembre',
                'diciembre'
            ];
            return meses[numeroMes];
            },
            validateUser(){
                this.userValidate = JSON.parse(localStorage.getItem('user'))
            },
        },
        computed:{
            ...mapGetters('ServiceOrder',['getserviceOrder','getCompanyData']),
            ...mapGetters('Agreements',['getagreements']),
        },
        async mounted() {
            await this.loadingActive();
            await this.getagreement();
            await this.validateUser();
            await this.SearchAgreements();
        },
        components:{
            /* ArgonButton */
            Loading
        }
    }
</script>
<style>
ul.autocompleteCompañia{
    background: white;
    list-style: none;
    margin: 0;
    padding: 0;
    width: 15%;
    position:absolute;
    z-index: 101;
   }
   
   ul.autocompleteCompañia > li{
       padding: 5px 10px;
       border-bottom: 1px solid #ccc;
       cursor: pointer;
       text-align: left;
   }
   
   ul.autocompleteCompañia > li:hover{
       background: #d2d2d24d;
   }
  
   .text-busqueda{
    font-size: 13px;
    text-transform: capitalize;
   }
</style>
<template>
    <div>
        <Loading v-if="this.isLoading " :valuetitle="title" />
        <div class="container-fluid py-7" v-else>
            <div class="row">
                <div class="col-12">
                    <div class="card">
                        <div class="card-header pb-0">
                            <div class="card-body px-0 pt-0 pb-2 mt-5">
                                <div class="container-fluid text-end">
                                    <div class="row justify-content-end">
                                        <div class="col-md-2">
                                            <label for="">Desde</label>
                                            <input type="date" class="form-control form-control-sm" v-model="start_date" />
                                        </div>
                                        <div class="col-md-2">
                                            <label for="">Hasta</label>
                                            <input type="date" class="form-control form-control-sm" v-model="end_date" />
                                        </div>
                                        <div class="col-md-2">
                                            <label for="">identificacion</label>
                                            <div class="input-group">
                                                <span class="input-group-text text-body">
                                                  <i class="fas fa-search" aria-hidden="true"></i>
                                                </span>
                                                <input type="text" class="form-control form-control-sm" placeholder="Buscar paciente por documento"  autocomplete="off" name="orderSearch"   @input="searchOrder"  v-model="document" />
                                              </div>
                                        </div>
                                        <!-- <div class="col-md-2">
                                            <label for="">Acuerdos Comerciales</label>
                                            <select class="form-select form-select-sm" name="key_trade_agreement" v-model="key_trade_agreement"  id="">
                                                <option :value="items.id_transfer" :key="items.id_transfer" v-for="items in getagreements">{{ items.name_agreements }}</option>
                                              </select>
                                        </div> -->
                                        <div class="col-md-2">
                                            <label for="">Empresa en Mision</label>
                                            <select name="key_mission_company" class="form-select form-select-sm" v-model="key_mission_company"  id="">
                                                <option :value="row.id" :key="row.id" v-for="row in getCompanyData">{{ row.name }}</option>
                                            </select>
                                            <!-- <input type="text" class="form-control form-control-sm" placeholder="Buscar"  autocomplete="off" name="company"   @input="SearchCompanys"  v-model="company" />
                                            <ul class="autocompleteCompañia" >
                                                <li :key="row.id" v-for="row in getCompanyData"   @click="searchOrder(key_mission_company = row.id)" >{{ row.name }}</li>
                                            </ul> -->
                                        </div>
                                        <div class="col-md-1 mt-4">
                                            <button class="btn btn-primary btn-sm" @click="searchOrder()"><i class="fas fa-filter"></i> Filtrar</button>
                                        </div>
                                    </div>
                                </div>
                                <div class="table-responsive p-0 mt-5" style="height: 710px;">
                                    <table class="table align-items-center mb-0" >
                                    <thead>
                                        <tr>
                                            <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Fecha</th>
                                            <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Estado</th>
                                            <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Direccion</th>
                                            <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Diagnostico</th>
                                            <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Hora de llegada</th>
                                            <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Hora de Atención</th>
                                            <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">N° de identificacion</th>
                                            <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Nombre y Apellido</th>
                                            <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Empresa</th>
                                            
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr :key="items.id" v-for="items in getserviceOrder">
                                            <td>
                                                <div class="d-flex px-2 py-1">
                                                    <div class="d-flex flex-column justify-content-center">
                                                        <h6 class="mb-0 text-sm">{{ moment(items.created_at).format('DD/MM/YYYY') }}</h6>
                                                        <!-- <div class="d-grid gap-0">
                                                            <button @click="stateHistory(items.id)" v-if="items.key_status == 1" class="btn btn-sm mt-3" :style="items.key_status == 1 ? 'background-color: #fffe67; color: black' : ''" data-bs-toggle="modal" data-bs-target="#exampleModal">Estado</button> 
                                                            <button @click="createHistory(items.id,items.key_patient)" v-if="items.key_status == 2"  class="btn btn-sm mt-3 " :style="items.key_status == 2 ? 'background-color: #5e72e4; color: white' : ''">Atender Paciente</button>
                                                            <button @click="createHistoryAttention(items.id,items.key_patient)" v-if="items.key_status == 3 && this.$validateModule('18')" class="btn btn-sm mt-3 " :style="items.key_status == 3 ? 'background-color: #fb9933; color: white' : ''">Atender Paciente</button>
                                                            <button @click="createHistory(items.id,items.key_patient)" v-if="items.key_status == 4"  class="btn btn-sm mt-3 " :style="items.key_status == 4 ? 'background-color: #1466ff; color: white' : ''">Visualizar historia</button>
                                                            <button @click="createHistory(items.id,items.key_patient)" v-if="items.key_status == 5"  class="btn btn-sm mt-3 " :style="items.key_status == 5 ? 'background-color: #f90103; color: white' : ''">Visualizar historia</button>
                                                        </div> -->
                                                    </div>
                                                </div>
                                            </td>
                                            <td class="align-middle text-center text-sm">
                                                <span class="badge badge-sm" :style="items.key_status == 1 ? 'background-color: #fffe67; color: black' : ''" v-if="items.key_status == 1">Pendiente</span>
                                                <span class="badge badge-sm" :style="items.key_status == 2 ? 'background-color: #5e72e4; color: white' : ''"  v-if="items.key_status == 2">Activo</span>
                                                <span class="badge badge-sm" :style="items.key_status == 3 ? 'background-color: #fb9933; color: white' : ''"   v-if="items.key_status == 3">En Procesando</span>
                                                <span class="badge badge-sm" :style="items.key_status == 4 ? 'background-color: #1466ff; color: white' : ''"  v-if="items.key_status == 4">Finalizado</span>
                                                <span class="badge badge-sm" :style="items.key_status == 5 ? 'background-color: #f90103; color: white' : ''"  v-if="items.key_status == 5">Cancelado</span>
                                            </td>
                                            <td class="align-middle text-center">
                                                <span class="text-secondary text-xs font-weight-bold">{{ items.patient_ward }}</span>
                                            </td>
                                            <td class="align-middle text-center">
                                                <span class="text-secondary text-xs font-weight-bold" v-if="items.services == 1">EXTRAMURAL DOMICILIARIA</span>
                                                <span class="text-secondary text-xs font-weight-bold" v-if="items.services == 2">TELEMEDICINA INTERACTIVA</span>
                                            </td>
                                            <td class="align-middle text-center">
                                                <h6 class="mb-0 text-sm">{{ moment(items.startappointment).format('DD/MM/YYYY , h:mm:ss a') }}</h6>
                                            </td>
                                            <td class="align-middle text-center">
                                                <h6 class="mb-0 text-sm">{{ moment(items.agenda_process).format('DD/MM/YYYY , h:mm:ss a') }}</h6>
                                            </td>
                                            <td class="align-middle text-center">
                                                <span class="text-secondary text-xs font-weight-bold">{{ items.document }}</span>
                                            </td>
                                            <td class="align-middle text-center">
                                                <span class="text-secondary text-xs font-weight-bold">{{ items.firstname }} {{ items.first_surname }}</span>
                                            </td>
                                            <td class="align-middle text-center">
                                                <span class="text-secondary text-xs font-weight-bold">{{ items.name_mission_company }} </span>
                                            </td>
                                            <td>
                                                <div class="dropdown">
                                                    <button class="btn btn-secondary dropdown-toggle btn-sm p-2" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                                        <i class="fa fa-print" aria-hidden="true"></i>
                                                    </button>
                                                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                                        <li><a class="dropdown-item" @click="generarDiagnosis(items.id,items.key_patient)">Diagnostico</a></li>
                                                        <li><a class="dropdown-item" @click="generar(items.id,items.key_patient)">Historia Clinica</a></li>
                                                        <li><a class="dropdown-item" @click="generarMedicine(items.id,items.key_patient)">Recetario Medico</a></li>
                                                        <li><a class="dropdown-item" @click="generarRemison(items.id,items.key_patient)">Remisión</a></li>
                                                        <li><a class="dropdown-item" @click="generarIncapacidad(items.id,items.key_patient)">Incapacidad</a></li>
                                                    </ul>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr v-if=" this.getserviceOrder == '' || this.getserviceOrder == null || this.getserviceOrder == undefined"> No tenemos resultados</tr>
                                    </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content">
                    <form action="" v-on:submit.prevent="sendFormStateHistory(2)">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Registro de llegada</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                        <p class="h4 text-center">{{ this.fecha }} {{ this.hora }}</p>
                        
                            <div class="row">
                                <div class="col-md-10">
                                    <div class="input-group mb-3">
                                        <input type="text" class="form-control" name="text" placeholder="Confirmar" v-model="state.text">
                                        
                                    </div>
                                </div>
                                <div class="col-md-2">
                                    <button class="btn btn-success" type="submit" data-bs-dismiss="modal"><i class="fa fa-check-square-o" aria-hidden="true"></i></button>
                                </div>
                            </div>
                        
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
                            <button type="button" class="btn btn-primary">Enviar Correo</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>