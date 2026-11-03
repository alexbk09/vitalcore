<template>

  <main class="mt-0 main-content">
    <section>
      <div class="page-header min-vh-100">
        <div class="container">
          <div class="row">
            <div class="mx-auto col-xl-4 col-lg-5 col-md-7 d-flex flex-column mx-lg-0">
              <div class="card card-plain">
                <div class="pb-0 card-header text-start">
                  <img src="../assets/img/AYTEC.jpg" width="300" alt="">
                  <h4 class="font-weight-bolder">BIENVENIDO AL SISTEMA AYTEC</h4>
                  <p class="mb-0">Ingrese su correo electrónico y contraseña para iniciar sesión</p>
                </div>
                <div class="card-body">
                  <form action="" v-on:submit.prevent="iniciarSesion">
                    <div class="mb-3">
                      <input type="text" class="form-control" placeholder="Email" name="username" v-model="dataForm.username" size="lg" />
                      <b-alert v-if="msg_error.username" class="text-danger" variant="danger" show>{{ msg_error.username }}</b-alert>
                    </div>
                    <div class="input-group mb-3">
                      <input type="password" class="form-control" style="text-transform:none !important" placeholder="Password" name="password" v-model="dataForm.password" size="lg" id="password">
                      <span class="input-group-text" id="basic-addon1" @click="mostrarContrasena()"><i :class="this.password === 'password' ? this.icono : this.icono"></i></span>
                      <b-alert v-if="msg_error.password" class="text-danger" variant="danger" show>{{ msg_error.password }}</b-alert>
                    </div>

                    <div class="text-center">
                      <b-alert v-if="msg_error.credentials" class="text-danger" variant="danger" show>{{ msg_error.credentials }}</b-alert>
                      <argon-button
                        class="mt-4"
                        variant="gradient"
                        color="info"
                        fullWidth
                        size="lg">
                        <span v-if="spiner === false">Ingresar</span>
                        <div class="d-flex align-items-center" v-if="spiner === true">
                          <strong>Ingresando...</strong>
                          <div class="spinner-border ms-auto" role="status" aria-hidden="true"></div>
                        </div>
                      </argon-button>
                    </div>
                  </form>
                </div>

              </div>
            </div>
            <div
              class="top-0 my-auto text-center col-6 d-lg-flex d-none h-100 pe-0 position-absolute end-0 justify-content-center flex-column">
              <div
                class="position-relative bg-gradient-primary h-100 m-3 px-7 border-radius-lg d-flex flex-column justify-content-center overflow-hidden"
                style="background-image: url('https://wallpaper.dog/large/20383255.jpg');
          background-size: cover;">
                <span class="mask bg-gradient-info opacity-6"></span>
                <h4
                  class="mt-5 text-white font-weight-bolder position-relative">Sistema de Historia Clinica</h4>
                <p
                  class="text-white position-relative">Desarrollamos el sistema de historia clinica más adaptado a tus necesidades.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
//import Navbar from "@/examples/PageLayout/Navbar.vue";
//import ArgonInput from "@/components/ArgonInput.vue";
/* import ArgonSwitch from "@/components/ArgonSwitch.vue"; */
/* import ArgonButton from "@/components/ArgonButton.vue"; */
import ArgonButton from "./../components/ArgonButton.vue";
const body = document.getElementsByTagName("body")[0];
import { API_URL } from './../config/global.js'

import auth from './../auth/auth'

export default {
  name: "signin",
  components: {

    //ArgonInput,
    /* ArgonSwitch, */
    ArgonButton,
  },
  data() {
    return {
      dataForm: {
        username: '',
        password: '',
      },
      msg_error: {
        username: '',
        password: '',
        credentials: '',
      },
      show: false,
      spiner: false,
      password: 'password',
      icono: 'fa fa-eye-slash',
    }
  },
  methods: {
    login() {
      // Aquí realizas la lógica para iniciar sesión.
      // Después de iniciar sesión correctamente:
      this.$router.push({ name: 'Home' }); // Redirige al inicio de tu sitio web.
    },
    iniciarSesion() {
      this.msg_error = {}
      if (this.dataForm.username.length == 0) {
        this.msg_error.username = "El Correo es obligatorio"
        return
      }
      if (this.dataForm.password.length == 0) {
        this.msg_error.password = "La clave es obligatorio"
        return
      }
      this.show = true
      var formData = new FormData()
      formData.append('user_name', this.dataForm.username)
      formData.append('password', this.dataForm.password)
      //console.log(this.$url)
      const config = {
        method: 'POST',
        body: formData,
        headers: {}
      }
      this.spiner = true
      fetch(`${API_URL}login`, config)
        .then((response) => {
          response.json().then((data) => {
            if (data.status) {
              auth.setUserLogged(data.access_token)
              auth.expiresIn(data.expires_in)
              this.$store.state.user = data.user
              this.$store.state.permission = data.privilegies
              localStorage.setItem('user', JSON.stringify(data.user))
              localStorage.setItem('privilegies', JSON.stringify(data.privilegies))
              setTimeout(() => {
                window.location.href = '/#/home'
              }, 2000)
              return
            }
            if (data.error == 'user Blocked') {
              this.msg_error.credentials = "Tu usuario esta bloqueado, comunicate con administración"
              this.show = false
              this.spiner = false
              return false
            }
            if (!data.state) {
              this.msg_error.credentials = "Las credenciales son incorrectas"
              this.show = false
              this.spiner = false
              return false
            }
          })
        })
    },
    mostrarContrasena() {
      this.password = document.getElementById("password");
      if (this.password.type == "password") {
        this.password.type = "text";
        this.icono = 'fa fa-eye'
      } else {
        this.password.type = "password";
        this.icono = 'fa fa-eye-slash'
      }
    }
  },
  mounted() {
    document.title = 'Portal Administrativo Aytech | Login'
    auth.validateSession()
  },
  created() {
    this.$store.state.hideConfigButton = true;
    this.$store.state.showNavbar = false;
    this.$store.state.showSidenav = false;
    this.$store.state.showFooter = false;
    body.classList.remove("bg-gray-100");
  },
  beforeUnmount() {
    this.$store.state.hideConfigButton = false;
    this.$store.state.showNavbar = true;
    this.$store.state.showSidenav = true;
    this.$store.state.showFooter = true;
    body.classList.add("bg-gray-100");
  },
};
</script>
../config/global.js