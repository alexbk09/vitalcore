<script>
import { mapActions,mapGetters } from 'vuex';
/* import ViewRol from '../../Users/rols/view-rol.vue'; */
import moment from 'moment'
/* import ErrorsMessage from '../../Utils/ErrorsMessage.vue'; */
import Loading from '../../Utils/Loading.vue';
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss' 
export default {
        name:'rolList',
        data() {
          return {
                stateModal: false,
                userValidate:{},
                rolDetail: {
                  name_rol:'',
                  state:'',
                },
                isLoading: true,
                title:'Roles',

            }
        },
        methods: {
          ...mapActions('Rol',["get","Search","searchRol","destroy"]),
          Update(updaterol){
            this.$router.push('/add/rol/'+updaterol)
          },
          async getRolId(rol){
            this.rolDetail = rol
            this.stateModal = true

          },
          deleteRol(id){
            Swal.fire({
                title: '¿Está seguro que deseas eliminar este rol?',
                text: "¡No podrás revertir esto!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: '¡Sí, bórralo!'
              }).then( async (result) => {
                if (result.isConfirmed) {
                  const response = await this.destroy(id)
                  if (!response) {
                    Swal.fire(
                      '¡Lo siento!',
                      'El rol no puede ser eliminado.',
                      'error'
                    )
                    return

                  }
                  if(response){
                    Swal.fire(
                    '¡Eliminado!',
                    'El rol ha sido eliminado.',
                    'success'
                  )
                  await this.loadingActive()
                  }
                }
              })
          },
          async searchRols(){
            await this.searchRol(this.rolSearch)
          },
          async loadingActive(){
             this.isLoading = true 
            await  this.get()
             this.isLoading = false
          },
          moment,
          validateUser(){
            this.userValidate = JSON.parse(localStorage.getItem('user'))
          },
          
        },
        computed:{
            ...mapGetters('Rol',['getrols']),
        },
        async mounted() {
            await this.loadingActive();
            this.validateUser();
            
        },
        components:{
          /* ViewRol, */
          /* ErrorsMessage, */
          Loading
        }
    }
</script>
<template>
    <div>
      <Loading v-if="this.isLoading " :valuetitle="title" />
      <div class="container-fluid py-7" v-else>
        <div class="card">
          <div class="card-body">
            <div class="row justify-content-end">
              <div class="col-md-2">
                <div class="input-group">
                    <span class="input-group-text text-body">
                      <i class="fas fa-search" aria-hidden="true"></i>
                    </span>
                    <input type="text" class="form-control form-control-sm" placeholder="Buscar"  autocomplete="off" name="rolSearch"   @input="searchRols"  v-model="rolSearch" />
                </div>
              </div>
              <div class="col-md-1">
                  <router-link to="/add/rol" class="btn mb-0 btn-outline-success btn-sm null null" title="Agregar Rol"><i class="fa fa-plus" aria-hidden="true"></i></router-link>
              </div>
          </div>
          <div class="row">
            <div class="col-12">
              <div class="table-responsive p-0">
                <table class="table align-items-center mb-0">
                  <thead>
                    <tr>
                      <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Rol</th>
                      <!-- <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Modulos</th> -->
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
                    <tr :key="items.id_rol" v-for="items in getrols">
                      
                      <td>
                        <div class="d-flex px-2 py-1">
                          <div>
                          </div>
                          <div class="d-flex flex-column justify-content-center">
                            <h6 class="mb-0 text-sm">{{ items.name_rol }}</h6>
                            <p class="text-xs text-secondary mb-0"></p>
                          </div>
                        </div>
                      </td>
<!--                       <td>
                        <div class="d-flex px-2 py-1">
                          <div>
                          </div>
                          <div class="d-flex flex-column justify-content-center">
                            <h6 class="mb-0 text-sm">Modulossss</h6>
                            <p class="text-xs text-secondary mb-0"></p>
                          </div>
                        </div>
                      </td> -->
                      <td class="align-middle text-center text-sm">
                        <span class="badge badge-sm bg-gradient-success" v-if="items.state == 1">Activo</span>
                        <span class="badge badge-sm bg-gradient-secondary" v-if="items.state == 2">Desactivado</span>
                      </td>
                      <td class="align-middle text-center">
                        <span class="text-secondary text-xs font-weight-bold">{{ moment(items.created_at).format('DD/MM/YYYY') }}</span>
                      </td>
                      <td class="align-middle">
                        <button v-if="this.$validateUser('12')"
                          class="text-secondary font-weight-bold text-xs btn btn-sm p-2 btn-outline-danger mt-2"
                          @click="deleteRol(items.id_rol)"
                          >Borrar</button> 
                        <button v-if="this.$validateUser('11')"
                          class="text-secondary font-weight-bold text-xs ms-3 btn btn-sm p-2 btn-outline-info mt-2"
                          data-toggle="tooltip"
                          data-original-title="Edit user"
                          @click="Update(items.id_rol)"
                        >Edit</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div class="text-center p-5">
                   <h4 v-if="!this.$validatePropertyEmpty(getrols)" class=" text-secondary">No tenemos resultados disponible para "{{ rolSearch }}"</h4> 
                  <!-- <ErrorsMessage v-if="!this.$validatePropertyEmpty(getrols)" valueError="No tenemos resultados disponible para" :valueinput="rolSearch" /> -->  
              </div>
            </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
</template>



