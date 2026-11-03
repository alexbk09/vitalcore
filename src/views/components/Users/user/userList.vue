<script>
import { mapActions, mapGetters } from 'vuex';
import ProfileCard from '../../ProfileCard.vue';
import moment from 'moment'
import ErrorsMessage from '../../Utils/ErrorsMessage.vue';
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'
import Loading from '../../Utils/Loading.vue';
//import auth from './../../../../auth/auth'
export default {
  name: 'UserList',
  data() {
    return {
      stateModal: false,
      userValidate: {},
      isLoading: true,
      title: 'Usuarios',
      userDetail: {
        user_name: '',
        phone: '',
        name: ''
      },
      userstate: {
        id: '',
        state: ''
      },
      myDate: null // Set to whatever
    }
  },
  methods: {
    ...mapActions('Users', ["get", "Search", "searchUser", "destroy", "updateState"]),
    Update(updateuser) {
      this.$router.push('/add/user/' + updateuser)
    },
    async getUserId(user) {
      this.userDetail = user
      this.stateModal = true

    },
    deleteUser(id) {
      Swal.fire({
        title: '¿Está seguro que deseas eliminar este usuario?',
        text: "¡No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '¡Sí, bórralo!'
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response = this.destroy(id)
          Swal.fire(
            '¡Eliminado!',
            'El usuario ha sido eliminado.',
            'success'
          )
          if (response) {
            await this.loadingActive()
          }
        }
      })
    },
    async searchUsers() {
      await this.searchUser(this.userSearch)
    },
    moment,
    validateUser() {
      this.userValidate = JSON.parse(localStorage.getItem('user'))
    },
    async loadingActive() {
      this.isLoading = true
      await this.get()
      this.isLoading = false
    },
    getState(id) {
      this.userstate.id = id
      return
    },
    async sendFormUser() {
      const response = await this.updateState(this.userstate)
      if (response) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'El estado se cambio con exito',
          showConfirmButton: false,
          timer: 1500
        })
        await this.loadingActive();
      }
      if (response === false) {
        Swal.fire({
          icon: 'error',
          title: 'Lo siento, el estado no se pudo cambiar',
        })
      }
    },
    visiblePages() {
      const total = this.totalPages || 0;
      const current = this.currentPage || 1;
      const pages = [];

      if (isNaN(total) || isNaN(current)) {
        return pages;
      }

      if (total <= 7) {
        for (let i = 1; i <= total; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        if (current > 4) {
          pages.push('...');
        }
        for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) {
          pages.push(i);
        }
        if (current < total - 3) {
          pages.push('...');
        }
        pages.push(total);
      }

      return pages;
    },

    async changePage(page) {
      if (page !== '...' && page !== this.currentPage) {
        this.isLoading = true;
        await this.get(page);
        this.isLoading = false;
      }
    },
  },
  computed: {
    ...mapGetters('Users', ['getUsers', 'getCurrentPage', 'getTotalPages', 'getNextPageUrl', 'getPrevPageUrl']),
    currentPage() {
      return this.getCurrentPage || 1;
    },
    totalPages() {
      return this.getTotalPages || 10;
    },
    shouldShowPagination() {
      return this.getUsers.length >= this.perPage;
    }

  },
  async mounted() {
    await this.loadingActive();
    this.validateUser();
  },
  components: {
    //ModalUser,
    ProfileCard,
    ErrorsMessage,
    Loading
  }

}
</script>
<template>
  <div>
    <Loading v-if="this.isLoading" :valuetitle="title" />
    <div class="container-fluid py-7" v-else>
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header">
              <div class="card-body">
                <div class="container-fluid text-end">
                  <div class="row justify-content-end">
                    <div class="col-md-2">
                      <div class="input-group">
                        <span class="input-group-text text-body">
                          <i class="fas fa-search" aria-hidden="true"></i>
                        </span>
                        <input type="text" class="form-control form-control-sm" placeholder="Buscar" autocomplete="off"
                          name="userSearch" @input="searchUsers" v-model="userSearch" />
                      </div>
                    </div>
                    <div class="col-md-1">
                      <router-link to="/add/user" class="btn mb-0 btn-outline-success btn-sm null null"
                        title="Agregar Usuario"><i class="fa fa-plus" aria-hidden="true"></i></router-link>
                    </div>
                  </div>
                </div>
                <div class="table-responsive p-0">
                  <table class="table align-items-center mb-0">
                    <thead>
                      <tr>
                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">USUARIO</th>
                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">FUNCIÓN
                        </th>
                        <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                          ESTADO</th>
                        <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                          INGRESADO</th>
                        <th class="text-secondary opacity-7"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr :key="user.id" v-for="user in getUsers">
                        <td>
                          <div class="d-flex px-2 py-1">
                            <div>
                              <img src="./../../../../assets/img/usuario.png" class="avatar avatar-sm me-3"
                                alt="user1" />
                            </div>
                            <div class="d-flex flex-column justify-content-center">
                              <h6 class="mb-0 text-sm">{{ user.name }}</h6>
                              <p class="text-xs text-secondary mb-0">{{ user.email }}</p>
                            </div>
                          </div>
                        </td>
                        <td>
                          <p class="text-xs font-weight-bold mb-0">{{ user.name_rol }}</p>
                        </td>
                        <td class="align-middle text-center text-sm">
                          <span class="badge bg-gradient-success" v-if="user.state == 1">Activo</span>
                          <span class="badge bg-gradient-secondary" v-if="user.state == 2">Desactivado</span>
                          <span class="badge bg-gradient-danger" v-if="user.state == 0">Bloqueado</span>
                          <a href="#" class="ms-3" title="cambiar estado" data-bs-toggle="modal"
                            data-bs-target="#modalstate" @click="getState(user.id)"><i class="fa fa-refresh"
                              aria-hidden="true"></i></a>
                        </td>
                        <td class="align-middle text-center">
                          <span class="text-secondary text-xs font-weight-bold">{{
                            moment(user.created_at).format('DD/MM/YYYY') }}</span>
                        </td>
                        <td class="align-middle">
                          <button v-if="this.$validateUser('4')"
                            class="text-secondary font-weight-bold text-xs btn btn-sm p-2 me-2 btn-outline-danger mt-2"
                            @click="deleteUser(user.id)">Borrar</button>
                          <button
                            class="text-secondary font-weight-bold text-xs btn btn-sm p-2 btn-outline-success mt-2"
                            data-bs-toggle="modal" data-bs-target="#exampleModal" @click="getUserId(user)">Ver</button>
                          <button v-if="this.$validateUser('3')"
                            class="text-secondary font-weight-bold text-xs ms-3 btn btn-sm p-2 btn-outline-info mt-2"
                            data-toggle="tooltip" data-original-title="Edit user" @click="Update(user.id)">Edit</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div class="text-center p-5">
                    <!-- <h4 v-if="getUsers.length === 0" class=" text-secondary">No tenemos resultados disponible para "{{ userSearch }}"</h4> -->
                    <ErrorsMessage v-if="!this.$validatePropertyEmpty(getUsers)"
                      valueError="No tenemos resultados disponible para" :valueinput="userSearch" />
                  </div>
                </div>
                <nav aria-label="Page navigation">
                  <ul class="pagination justify-content-end">
                    <li class="page-item" :class="{ disabled: !getPrevPageUrl }">
                      <button class="page-link" @click="changePage(currentPage - 1)" :disabled="!getPrevPageUrl">
                        <i class="fas fa-angle-left"></i>
                      </button>
                    </li>
                    <li v-for="page in visiblePages()" :key="page" class="page-item"
                      :class="{ active: currentPage === page }">
                      <button v-if="page !== '...'" class="page-link" @click="changePage(page)">{{ page }}</button>
                      <span v-else class="page-link">...</span>
                    </li>
                    <li class="page-item" :class="{ disabled: !getNextPageUrl }">
                      <button class="page-link" @click="changePage(currentPage + 1)" :disabled="!getNextPageUrl">
                        <i class="fas fa-angle-right"></i>
                      </button>
                    </li>
                  </ul>
                </nav>
                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                  aria-hidden="true">
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">VISTA PREVIA DEL USUARIO</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div class="modal-body">
                        <ProfileCard v-show="stateModal" :user="userDetail" text="Hola" />
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="modal fade" id="modalstate" tabindex="-1" aria-labelledby="exampleModalLabel"
                  aria-hidden="true">
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <form action="" v-on:submit.prevent="sendFormUser()">
                        <div class="modal-header">
                          <h5 class="modal-title" id="exampleModalLabel">Estado del usuario</h5>
                        </div>
                        <div class="modal-body">
                          <select class="form-select" name="state" v-model="userstate.state">
                            <option selected>Seleccione una opción</option>
                            <option value="0">Bloqueado</option>
                            <option value="1">Activo</option>
                            <option value="2">Desactivado</option>
                          </select>
                        </div>
                        <div class="modal-footer">
                          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                          <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">Guardar Cambio</button>
                        </div>
                      </form>
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