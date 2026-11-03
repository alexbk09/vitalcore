<script>
import { mapActions,mapGetters } from 'vuex';
import moment from 'moment'
import Loading from '../Utils/Loading.vue';
//import auth from './../../../../auth/auth'
export default {
        name:'agreementsList',
        data() {
          return {
                stateModal: false,
                rolDetail: {
                  name_rol:'',
                  state:'',
                },
                isLoading: true,
                title:'Acuerdos Comerciales',
                currentDate: moment().format("YYYY-MM-DD"),
            }
        },
        methods: {
          ...mapActions('Agreements',["get","Search"]),
          Update(updateseat){
            this.$router.push('/add/agreements/'+updateseat)
          },
/*           async getRolId(rol){
            console.log(rol)
            this.rolDetail = rol
            this.stateModal = true

          } */
          moment,
          async loadingActive(){
             this.isLoading = true 
            await  this.get()
             this.isLoading = false
          },
          validateUser(){
                this.userValidate = JSON.parse(localStorage.getItem('user'))
            },
        },
        computed:{
            ...mapGetters('Agreements',['getagreements']),
        },
        async mounted() {
            await this.loadingActive();
            await this.validateUser();
        },
        components:{
            Loading
        }
    }
</script>
<template>
    <div>
        <Loading v-if="this.isLoading " :valuetitle="title" />
        <div class="container-fluid py-7" v-else>
            <div class="row">
                <div class="col-12">
                    <div class="card">
                        <div class="card-header pb-0">
                            <div class="card-body px-0 pt-0 pb-2 mt-5">
                                <div class="container-fluid text-end" v-if="this.$validateUser('37')">
                                    <router-link to="/add/agreements" class="btn mb-0 btn-outline-success btn-sm null null" title="Agregar Vehiculo"><i class="fa fa-plus" aria-hidden="true"></i></router-link>
                                </div>
                                <div class="table-responsive p-0">
                                    <table class="table align-items-center mb-0">
                                    <thead>
                                        <tr>
                                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">#</th>
                                        <th
                                            class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                                        >Nombre del Contrato</th>
                                        <th
                                            class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                                        >Numero del Contrato</th>
                                        <th
                                            class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                                        >Estado</th>
                                        <th
                                            class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                                        >Vigencia Desde</th>
                                        <th
                                            class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                                        >Vigencia Hasta</th>
                                        <th
                                            class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                                        >INGRESADO</th>
                                        <th class="text-secondary opacity-7"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr :key="items.id_transfer" v-for="items in getagreements">
                                        <td>
                                            <div class="d-flex px-2 py-1">
                                            <div>
                                                
                                            </div>
                                            <div class="d-flex flex-column justify-content-center">
                                                <h6 class="mb-0 text-sm">{{ items.id_transfer }}</h6>
                                            </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="d-flex px-2 py-1">
                                            <div>
                                                
                                            </div>
                                            <div class="d-flex flex-column justify-content-center">
                                                <h6 class="mb-0 text-sm">{{ items.name_agreements }}</h6>
                                                <!-- <p class="text-xs text-secondary mb-0"><b>Email:</b> {{ items.email }}</p>
                                                <p class="text-xs text-secondary mb-0"><b>Cobertura:</b> {{ items.coverage }}</p>
                                                <p class="text-xs text-secondary mb-0"><b>Modalidad:</b> {{ items.modality }}</p>
                                                <p class="text-xs text-secondary mb-0"><b>Rips:</b> {{ items.generate_rips }}</p> -->
                                            </div>
                                            </div>
                                        </td>
                                        <td class="align-middle text-center text-sm">
                                          <h6 class="mb-0 text-sm">{{ items.number_contract }}</h6>
                                        </td>
                                        <td class="align-middle text-center text-sm">
                                            <span class="badge badge-sm bg-gradient-success" v-if="items.state == 1">Activo</span>
                                            <span class="badge badge-sm bg-gradient-secondary" v-if="items.state == 2">Desactivado</span>
                                        </td>
                                        <td class="align-middle text-center text-sm">
                                            <span class="text-secondary text-xs font-weight-bold">{{ moment(items.validity_since).format('DD/MM/YYYY') }}</span>
                                        </td>
                                        <td class="align-middle text-center text-sm">
                                            <span class="text-secondary text-xs font-weight-bold">{{ moment(items.validity_until).format('DD/MM/YYYY') }}</span> <br>
                                            <div class="badge  bg-danger text-white" v-if="this.currentDate >= items.validity_until" role="alert">
                                                Este contrato ha caducado
                                            </div>
                                        </td>
                                        <td class="align-middle text-center">
                                            <span class="text-secondary text-xs font-weight-bold">{{ moment(items.created_at).format('DD/MM/YYYY') }}</span> <br>
                                        </td>
                                        <td class="align-middle">
                                            <!-- <button
                                            class="text-secondary font-weight-bold text-xs btn btn-sm p-2 btn-outline-success mt-2"
                                            data-bs-toggle="modal" 
                                            data-bs-target="#RolModal"
                                            @click="getRolId(rol)"
                                            >Ver</button> -->
                                            <button v-if="this.$validateUser('40')"
                                            class="text-secondary font-weight-bold text-xs ms-3 btn btn-sm p-2 btn-outline-info mt-2"
                                            data-toggle="tooltip"
                                            data-original-title="Edit user"
                                            @click="Update(items.id_transfer)"
                                            >Edit</button>
                                        </td>
                                        </tr>
                                    </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>