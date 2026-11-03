<script>
import { mapActions,mapGetters } from 'vuex';
import Loading from '../Utils/Loading.vue';
import moment from 'moment'
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'
//import auth from './../../../../auth/auth'
export default {
        name:'attentionList',
        data() {
          return {
                stateModal: false,
                userValidate:{},
                rolDetail: {
                  name_rol:'',
                  state:'',
                },
                isLoading: true,
                title:'Atenciones',
            }
        },
        methods: {
          ...mapActions('Attention',["get","Search","destroy"]),
          Update(updateseat){
            this.$router.push('/add/attention/'+updateseat)
          },
          deleteAttention(id){
            Swal.fire({
                title: '¿Está seguro que deseas eliminar este evento?',
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
                    'El evento ha sido eliminado.',
                    'success'
                  )
                  if(response){
                    await this.loadingActive()
                  }
                }
              })
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
            ...mapGetters('Attention',['getattention']),
        },
        async mounted() {
            await this.loadingActive();
            this.validateUser();
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
                                <div class="container-fluid text-end">
                                    <router-link to="/add/attention" class="btn mb-0 btn-outline-success btn-sm null null" title="Agregar Tipo de Atencion"><i class="fa fa-plus" aria-hidden="true"></i></router-link>
                                </div>
                                <div class="table-responsive p-0">
                                    <table class="table align-items-center mb-0">
                                    <thead>
                                        <tr>
                                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">#</th>
                                        <th
                                            class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                                        >Tipo de Atencion</th>
                                        <th
                                            class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                                        >ESTADO</th>
                                        <th
                                            class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                                        >INGRESADO</th>
                                        <th class="text-secondary opacity-7"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr :key="items.id_attention" v-for="items in getattention">
                                        <td>
                                            <div class="d-flex px-2 py-1">
                                            <div>
                                                
                                            </div>
                                            <div class="d-flex flex-column justify-content-center">
                                                <h6 class="mb-0 text-sm">{{ items.id_attention }}</h6>
                                                <p class="text-xs text-secondary mb-0"></p>
                                            </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="d-flex px-2 py-1">
                                            <div>
                                                
                                            </div>
                                            <div class="d-flex flex-column justify-content-center">
                                                <h6 class="mb-0 text-sm">{{ items.name_attention }}</h6>
                                                <p class="text-xs text-secondary mb-0"></p>
                                            </div>
                                            </div>
                                        </td>
                                        <td class="align-middle text-center text-sm">
                                            <span class="badge badge-sm bg-gradient-success" v-if="items.state == 1">Activo</span>
                                            <span class="badge badge-sm bg-gradient-secondary" v-if="items.state == 2">Desactivado</span>
                                        </td>
                                        <td class="align-middle text-center">
                                            <span class="text-secondary text-xs font-weight-bold">{{ moment(items.created_at).format('DD/MM/YYYY') }}</span>
                                        </td>
                                        <td class="align-middle">
                                            <button v-if="this.$validateUser('28')"
                                            class="text-secondary font-weight-bold text-xs btn btn-sm p-2 btn-outline-danger mt-2"
                                            @click="deleteAttention(items.id_attention)"
                                            >Borrar</button> 
                                            <button v-if="this.$validateUser('27')"
                                            class="text-secondary font-weight-bold text-xs ms-3 btn btn-sm p-2 btn-outline-info mt-2"
                                            data-toggle="tooltip"
                                            data-original-title="Edit user"
                                            @click="Update(items.id_attention)"
                                            >Edit</button>
                                        </td>
                                        </tr>
                                    </tbody>
                                    </table>
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