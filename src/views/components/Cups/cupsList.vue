<script>
import { mapActions,mapGetters } from 'vuex';
import moment from 'moment'
import ErrorsMessage from '../Utils/ErrorsMessage.vue';
import Swal from 'sweetalert2'
import Loading from '../Utils/Loading.vue';
import 'sweetalert2/src/sweetalert2.scss' 
//import auth from './../../../../auth/auth'
export default {
        name:'cupsList',
        data() {
          return {
                stateModal: false,
                userValidate:{},
                rolDetail: {
                  name_rol:'',
                  state:'',
                },
                deleteId:'',
                isLoading: true,
                title:'Cups',
            }
        },
        methods: {
          ...mapActions('Cups',["get","search","destroy","searchCups"]),
          Update(updateseat){
            this.$router.push('/add/cups/'+updateseat)
          },
          deleteVehicle(id){
            Swal.fire({
                title: '¿Está seguro que deseas eliminar este cups?',
                text: "¡No podrás revertir esto!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: '¡Sí, bórralo!'
              }).then(async(result) => {
                if (result.isConfirmed) {
                  const response = this.destroy(id)
                  Swal.fire(
                    '¡Eliminado!',
                    'El cups ha sido eliminado.',
                    'success'
                  )
                  if(response){ 
                    await this.loadingActive()
                  }
                }
              })
          },
          async searchCupss(){
            await this.searchCups(this.busquedacups)
          },
          moment,
          validateUser(){
            this.userValidate = JSON.parse(localStorage.getItem('user'))
          },
          async loadingActive(){
             this.isLoading = true 
            await  this.get()
             this.isLoading = false
          }
        },
        computed:{
            ...mapGetters('Cups',['getCups']), 
        },
        async mounted() {
            await this.loadingActive();
            this.validateUser();
        },
        components:{
            ErrorsMessage,
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
                                <div class="container-fluid text-end">
                                    <div class="row justify-content-end">
                                        <div class="col-md-2">
                                            <div class="input-group">
                                                <span class="input-group-text text-body">
                                                  <i class="fas fa-search" aria-hidden="true"></i>
                                                </span>
                                                <input type="text" class="form-control form-control-sm" placeholder="Buscar"  autocomplete="off" name="busquedacups"   @input="searchCupss"  v-model="busquedacups" />
                                              </div>
                                        </div>
                                        <!-- <div class="col-md-1">
                                            <router-link to="/add/vehicle" class="btn mb-0 btn-outline-success btn-sm null null" title="Agregar Vehiculo"><i class="fa fa-plus" aria-hidden="true"></i></router-link>
                                        </div> -->
                                    </div>
                                </div>
                                <div class="table-responsive p-0">
                                    <table class="table align-items-center mb-0">
                                    <thead>
                                        <tr>
                                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">#</th>
                                        <th
                                            class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                                        >Codigo</th>
                                        <th
                                            class=" text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                                        >Descripcion</th>
                                        <th
                                            class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                                        >Monto</th>
                                        <th
                                            class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                                        >INGRESADO</th>
                                        <th class="text-secondary opacity-7"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr :key="items.id_cups" v-for="items in getCups">
                                            <td>
                                                <div class="d-flex px-2 py-1">
                                                <div>
                                                    
                                                </div>
                                                <div class="d-flex flex-column justify-content-center">
                                                    <h6 class="mb-0 text-sm">{{ items.id_cups }}</h6>
                                                    <p class="text-xs text-secondary mb-0"></p>
                                                </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div class="d-flex px-2 py-1">
                                                <div>
                                                    
                                                </div>
                                                <div class="d-flex flex-column justify-content-center">
                                                    <h6 class="mb-0 text-sm">{{ items.code }}</h6>
                                                    <p class="text-xs text-secondary mb-0"></p>
                                                </div>
                                                </div>
                                            </td>
                                            <td class="align-middle  text-sm">
                                                <div class="d-flex flex-column justify-content-center">
                                                    <h6 class="mb-0 text-sm">{{ items.description }}</h6>
                                                    <p class="text-xs text-secondary mb-0"></p>
                                                </div>
                                            </td>
                                            <td class="align-middle text-center text-sm">
                                                <div class="d-flex flex-column justify-content-center">
                                                    <h6 class="mb-0 text-sm">{{ items.price }}</h6>
                                                    <p class="text-xs text-secondary mb-0"></p>
                                                </div>
                                            </td>
                                            <td class="align-middle text-center">
                                                <span class="text-secondary text-xs font-weight-bold">{{ moment(items.created_at).format('DD/MM/YYYY') }}</span>
                                            </td>
                                            <!-- <td class="align-middle">
                                                <button v-if="this.userValidate.id === 1"
                                                class="text-secondary font-weight-bold text-xs btn btn-sm p-2 btn-outline-danger mt-2"
                                                @click="deleteVehicle(items.id_cups)"
                                                >Borrar</button> 
                                                <button
                                                class="text-secondary font-weight-bold text-xs ms-3 btn btn-sm p-2 btn-outline-info mt-2"
                                                data-toggle="tooltip"
                                                data-original-title="Edit user"
                                                @click="Update(items.id_cups)"
                                                >Editar</button>
                                            </td> -->
                                        </tr>
                                    </tbody>
                                    </table>
                                    <div class="text-center p-5">
                                        <ErrorsMessage v-if="!this.$validatePropertyEmpty(getCups)" valueError="No tenemos resultados disponible para" :valueinput="busquedacups" />
                                    </div>
                                </div>
                                <ModalUser />
                                <div class="modal fade" id="RolModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div class="modal-dialog">
                                        <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="exampleModalLabel">VISTA PREVIA DEL ROL</h5>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                            
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>