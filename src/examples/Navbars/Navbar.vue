<template>
  <nav
    class="navbar navbar-main navbar-expand px-0 mx-0 shadow-none border-radius-xl"
    :class="this.$store.state.isRTL ? 'top-0 position-sticky z-index-sticky' : ''"
    v-bind="$attrs"
    id="navbarBlur"
    data-scroll="true"
  >
    <div class="px-1 py-1 container-fluid">
      <breadcrumbs :currentPage="currentRouteName" textWhite="text-white" />

      <div class="mt-2 collapse navbar-collapse mt-sm-0 me-md-0 me-sm-4" :class="this.$store.state.isRTL ? 'px-0' : 'me-sm-4'" id="navbar">
        <div class="pe-md-3 d-flex align-items-center" :class="this.$store.state.isRTL ? 'me-md-auto' : 'ms-md-auto'">
          <!-- Se oculta en dispositivos móviles -->
          <div class="d-none d-md-block">
            <input
              type="text"
              class="form-control form-control-sm"
              :placeholder="this.$store.state.isRTL ? 'أكتب هنا...' : 'Buscar '"
              autocomplete="off"
              name="identification"
              @hit="onUsersSeleccionado"
              @input="buscarUsers"
              v-model="busquedaUser"
            />
            <ul class="autocompleteUser" v-if="users.length">
              <li v-for="row in users" :key="row.id" @click="selecUser(row.id)">
                <span class="text-busqueda"> {{ row.name }} {{ row.last_name }} {{ row.identification }}</span>
              </li>
            </ul>
          </div>
        </div>
        <ul class="navbar-nav justify-content-end">
          <!-- Botón para alternar sidebar en móviles -->
          <li class="nav-item d-flex align-items-center me-3">
            <a @click="toggleSidebar" class="p-0 nav-link text-white">
              <div class="sidenav-toggler-inner">
                <i v-if="$store.state.sidebarVisible" class="fa fa-times"></i>
                <i v-else class="fa fa-bars"></i>
              </div>
            </a>
          </li>

          <!-- Botón para colapsar/expandir el menú -->
          <li class="nav-item d-flex align-items-center me-3">
            <a @click="toggleMenuCollapse" class="p-0 nav-link text-white">
              <div class="sidenav-toggler-inner">
                <i class="fa fa-chevron-left"></i>
              </div>
            </a>
          </li>

          <!-- Menú de sincronización y cerrar sesión para móviles -->
          <li class="nav-item dropdown d-flex align-items-center d-md-none me-3">
            <a class="p-0 nav-link text-white" id="mobileMenuButton" @click="toggleSidenav" aria-expanded="false">
              <i class="fa fa-caret-down"></i>
            </a>
            <ul class="dropdown-menu dropdown-menu-end">
              <li>
                <a @click="syncData()" class="dropdown-item">Sincronizar</a>
              </li>
              <li>
                <a @click="deleSesion()" class="dropdown-item">Cerrar sesión</a>
              </li>
            </ul>
          </li>

          <!-- Opciones para escritorio -->
          <li class="nav-item d-none d-md-flex align-items-center">
            <a @click="syncData()" class="px-0 me-3 nav-link font-weight-bold text-white session">
              <span>Sincronizar</span>
            </a>
          </li>
          <li class="nav-item d-none d-md-flex align-items-center">
            <a @click="deleSesion()" class="px-0 me-3 nav-link font-weight-bold text-white session">
              <span>Cerrar sesión</span>
            </a>
          </li>
          <!-- <li class="nav-item d-none d-md-flex align-items-center">
            <a @click="toggleDarkTheme" class="px-0 me-3 nav-link font-weight-bold text-white session" title="Tema oscuro">
              <span><i class="fa fa-moon"></i> Oscuro</span>
            </a>
          </li> -->

          <!-- <li class="nav-item dropdown d-flex align-items-center" :class="this.$store.state.isRTL ? 'ps-2' : 'pe-2'">
            <a class="p-0 nav-link text-white" :class="{ show: showMenu }" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false" @click="showMenu = !showMenu">
              <i class="cursor-pointer fa fa-bell"></i>
            </a>
            <ul class="px-2 py-3 dropdown-menu dropdown-menu-end me-sm-n4" :class="{ show: showMenu }" aria-labelledby="dropdownMenuButton">
              <li>
                <p class="text-nofi"><b>No tiene mensajes disponibles</b></p>
              </li>
            </ul>
          </li> -->
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import Breadcrumbs from "../Breadcrumbs.vue";
import { mapMutations, mapActions } from "vuex";
import auth from './../../auth/auth';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
import { API_URL } from './../../config/global.js';

export default {
  name: "navbar",
  data() {
    return {
      showMenu: false,
      users: [],
      busquedaUser: "",
    };
  },
  props: ["minNav", "textWhite"],
  created() {
    this.minNav;
  },
  methods: {
    ...mapMutations(["navbarMinimize", "toggleConfigurator", "toggleSidebar"]),
    ...mapActions(["toggleSidebarColor"]),
    ...mapActions("ConsulterIndexDB", ["fetchAndSendDataToServer"]),

    selecUser(updateuser) {
      this.$router.push('/add/user/' + updateuser);
    },
    async buscarUsers() {
      if (this.busquedaUser.length < 8) {
        this.users = [];
        return;
      }

      try {
        let config = {
          method: 'GET',
          headers: { 'Authorization': 'Bearer ' + auth.getUserLogged() }
        };
        let url = `get/consulteruser?busquedaUser=${this.busquedaUser}`;
        const respuesta = await fetch(`${API_URL}${url}`, config);
        const datos = await respuesta.json();
        
        if (datos.status) {
          this.users = datos.content.data;
        } else {
          this.users = [];
          Swal.fire({ icon: 'error', title: 'Oops...', text: 'No tenemos registros disponibles' });
        }
      } catch (error) {
        console.error("Error en la búsqueda de usuarios:", error);
      }
    },
    deleSesion() {
      auth.logoutSession();
    },
    toggleSidebar() {
      this.$store.commit('toggleSidebar');
    },
    toggleMenuCollapse() {
      this.$store.commit('toggleMenuCollapsed');
      const sidenav = document.getElementById('sidenav-main');
      const mainContent = document.querySelector('.main-content');
      
      if (sidenav && mainContent) {
        const isCollapsed = this.$store.state.isMenuCollapsed;
        if (isCollapsed) {
          sidenav.classList.add('collapsed');
          mainContent.classList.add('sidenav-collapsed');
        } else {
          sidenav.classList.remove('collapsed');
          mainContent.classList.remove('sidenav-collapsed');
        }
      }
    },
    syncData() {
      this.fetchAndSendDataToServer();
    },
    toggleDarkTheme() {
      document.body.classList.toggle('dark-theme');
    },
    toggleSidenav() {
      const sidenav = document.getElementById('sidenav-main');
      if (sidenav) {
        const isCollapsed = sidenav.classList.contains('collapsed');
        if (isCollapsed) {
          sidenav.classList.remove('collapsed');
        } else {
          sidenav.classList.add('collapsed');
        }
      }
    }
  },
  components: {
    Breadcrumbs
  },
  computed: {
    currentRouteName() {
      return this.$route.name;
    }
  }
};
</script>

<style>
.text-nofi {
  font-size: 10px;
}

ul.autocompleteUser {
  background: white;
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;
  position: absolute;
  z-index: 101;
  bottom: -70px;
}

ul.autocompleteUser > li {
  padding: 5px 10px;
  border-bottom: 1px solid #ccc;
  cursor: pointer;
}

ul.autocompleteUser > li:hover {
  background: #d2d2d24d;
}

.text-busqueda {
  font-size: 13px;
  text-transform: capitalize;
}

.session span:hover {
  border-bottom: 1px solid white;
  cursor: pointer;
}

#iconNavbarSidenav {
  cursor: pointer;
}

@media (max-width: 768px) {
  .navbar-nav .d-md-flex {
    display: none !important;
  }
}


</style>
